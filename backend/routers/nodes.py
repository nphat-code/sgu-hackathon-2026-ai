"""
UrbanShield Lite - Camera Nodes & Video Streaming Router
Endpoints for managing station cameras, metrics, scenarios, and MJPEG streams.
"""

import time
from typing import Optional
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import StreamingResponse

from schemas import ScenarioPayload, FallTestPayload
from reporting import build_compact_payload
from database import save_incident_to_db
import state

router = APIRouter(tags=["Nodes & Streams"])


@router.get("/api/nodes")
def get_nodes():
    """Returns list of monitored camera stations."""
    return list(state.NODES.values())


@router.get("/api/nodes/{node_id}/metrics")
def get_node_metrics(node_id: str):
    """Returns real-time edge AI telemetry metrics for a station."""
    if node_id not in state.NODES:
        raise HTTPException(status_code=404, detail="Node not found")
    metrics = state.NODE_LATEST_METRICS.get(node_id, {
        "fps": 28.5,
        "infer_time_ms": 32.0,
        "clahe_active": False,
        "detections_count": 3,
        "payload_bytes": 84,
        "privacy": {"ram_only": True, "frames_processed_in_ram": state.detector.frames_processed_in_ram, "disk_writes": 0},
        "accident": {"detected": False, "reason": "", "motionless_sec": 0.0},
        "flood": {"detected": False, "depth_cm": 0.0, "level": "SAFE"}
    })
    return metrics


@router.post("/api/nodes/{node_id}/scenario")
def set_node_scenario(node_id: str, data: ScenarioPayload):
    """Changes active scenario recording for a camera node."""
    if node_id not in state.NODES:
        raise HTTPException(status_code=404, detail="Node not found")

    state.NODES[node_id]["scenario"] = data.scenario
    state.detector.reset_state()
    if node_id in state.NODE_ANALYSIS_CACHE:
        del state.NODE_ANALYSIS_CACHE[node_id]

    if data.scenario in state.VIDEO_CAPS:
        try:
            state.VIDEO_CAPS[data.scenario].release()
            del state.VIDEO_CAPS[data.scenario]
        except Exception:
            pass

    is_flood = "flood" in data.scenario
    inc_type = "FLOOD" if is_flood else "WEATHER"
    if data.scenario == "real_flood_1":
        msg = "Phát hiện ngập triều cường vượt nửa bánh xe máy, nguy cơ chết máy cao"
        val_est = 22.4
    elif data.scenario == "real_flood_2":
        msg = "Nước ngập mấp mé ống xả, phương tiện di chuyển chậm"
        val_est = 19.5
    elif data.scenario == "real_flood_3":
        msg = "Ngập sâu diện rộng trên lòng đường, khuyến cáo chuyển hướng cứu hộ"
        val_est = 31.5
    elif data.scenario == "real_flood_4":
        msg = "Ngõ hẻm ngập nước mưa, người dân lưu thông khó khăn"
        val_est = 18.0
    else:
        msg = "CẢNH BÁO: Mưa to mặt đường ngập trơn trượt lưu thông chậm"
        val_est = 12.0

    clean_node_name = state.NODES[node_id]["name"].split("(")[0].strip()
    p_json, p_bytes = build_compact_payload(node_id, inc_type, val_est, "cm")

    state.INCIDENTS = [inc for inc in state.INCIDENTS if inc.get("node_id") != node_id]
    new_inc = {
        "id": f"inc-{node_id}-{int(time.time())}",
        "node_id": node_id,
        "node_name": clean_node_name,
        "type": inc_type,
        "level": "DANGER" if (data.scenario in ["real_flood_1", "real_flood_3"]) else "WARNING",
        "val": val_est,
        "unit": "cm",
        "payload_json": p_json,
        "payload_bytes": p_bytes,
        "message": msg,
        "timestamp": time.strftime("%H:%M:%S"),
        "gps": f"{state.NODES[node_id]['lat']}, {state.NODES[node_id]['lng']}",
        "telegram_sent": True
    }
    save_incident_to_db(new_inc)
    state.INCIDENTS.insert(0, new_inc)
    state.INCIDENTS = state.INCIDENTS[:5]

    return {"success": True, "node": state.NODES[node_id], "payload_bytes": p_bytes}


@router.post("/api/nodes/{node_id}/fall_test")
def control_fall_test(node_id: str, req: FallTestPayload):
    """
    Demonstrates the 5.0-second motionless debounce counter against false alarms.
    """
    if node_id not in state.NODES:
        raise HTTPException(status_code=404, detail="Node not found")

    if req.action.lower() == "cancel":
        state.detector.cancel_fall_test()
        if node_id in state.NODE_LATEST_METRICS:
            state.NODE_LATEST_METRICS[node_id]["accident"] = {
                "detected": False,
                "reason": "Người dân đã tự đứng dậy trước 5 giây (Đã hủy bộ đếm, không báo giả)",
                "motionless_sec": 0.0
            }
        return {"success": True, "status": "cancelled", "message": "Đã đặt lại bộ đếm bất động về 0s (Chống báo động giả)."}

    state.detector.trigger_fall_test(duration_sec=9.0)
    return {
        "success": True,
        "status": "counting",
        "message": "Đang bắt đầu đếm thời gian nằm bất động (0.0s -> 5.0s)..."
    }


@router.get("/api/video_feed/{node_id}")
@router.get("/stream/{node_id}")
def video_feed(
    node_id: str,
    fps: Optional[float] = Query(None, ge=1.0, le=60.0, description="Tùy chỉnh FPS luồng phát video")
):
    """Streams live MJPEG camera feed with Edge AI HUD overlay."""
    return StreamingResponse(
        state.stream_generator(node_id, custom_fps=fps),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )
