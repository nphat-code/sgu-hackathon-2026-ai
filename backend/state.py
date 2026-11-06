"""
UrbanShield Lite - Edge AI Gateway State & Playback Engine
Centralized state registry and streaming worker.
"""

import os
import cv2
import time
import threading
import concurrent.futures
import numpy as np
from typing import Dict, Any, List, Optional

from detector import UrbanShieldDetector
from reporting import (
    build_compact_payload,
    generate_instant_alert_text,
    get_vn_time_str
)
from database import (
    init_db,
    save_incident_to_db
)
from notify import send_telegram_alert

START_TIME = time.time()

# Configurable Target Stream FPS (Default: 28.5 FPS)
try:
    DEFAULT_STREAM_FPS = float(os.environ.get("STREAM_FPS", os.environ.get("TARGET_FPS", "28.5")))
except ValueError:
    DEFAULT_STREAM_FPS = 28.5

# Initialize SQLite persistence & Edge AI Detector
init_db()
detector = UrbanShieldDetector()

# Edge API Key authentication
EDGE_API_KEY = os.environ.get("EDGE_API_KEY", "urbanshield-sgu-2026-key")

# In-memory storage for nodes (5 Real-world camera locations in District 7, HCMC)
NODES: Dict[str, Dict[str, Any]] = {
    "node-sgu-01": {
        "id": "node-sgu-01",
        "name": "Trạm 01 - Đường Trần Xuân Soạn (Bờ kè Kênh Tẻ)",
        "street_segment": "Tuyến Trần Xuân Soạn - Hẻm 793, Phường Tân Hưng, Quận 7",
        "lat": 10.7545,
        "lng": 106.7115,
        "line_coords": [
            [106.7085, 10.7540],
            [106.7098, 10.7542],
            [106.7115, 10.7545],
            [106.7135, 10.7548],
            [106.7155, 10.7551],
            [106.7180, 10.7555]
        ],
        "type": "Camera Khu Phố #01",
        "scenario": "real_flood_1",
        "status": "alert",
        "last_ping": time.time(),
        "device": "PC văn phòng + Camera USB"
    },
    "node-sgu-02": {
        "id": "node-sgu-02",
        "name": "Trạm 02 - Tuyến Huỳnh Tấn Phát (Đoạn trũng Phú Thuận)",
        "street_segment": "Tuyến Huỳnh Tấn Phát - Hẻm 860, Phường Phú Thuận, Quận 7",
        "lat": 10.7335,
        "lng": 106.7320,
        "line_coords": [
            [106.7305, 10.7350],
            [106.7312, 10.7342],
            [106.7320, 10.7335],
            [106.7328, 10.7327],
            [106.7335, 10.7320],
            [106.7342, 10.7312]
        ],
        "type": "Camera Khu Phố #02",
        "scenario": "real_flood_2",
        "status": "warning",
        "last_ping": time.time(),
        "device": "Máy tính khu phố Core i3"
    },
    "node-sgu-03": {
        "id": "node-sgu-03",
        "name": "Trạm 03 - Tuyến Lê Văn Lương (Khu ngập triều Rạch Đỉa)",
        "street_segment": "Tuyến Lê Văn Lương - Hẻm 482, Phường Tân Phong, Quận 7",
        "lat": 10.7420,
        "lng": 106.7055,
        "line_coords": [
            [106.7048, 10.7440],
            [106.7051, 10.7430],
            [106.7055, 10.7420],
            [106.7059, 10.7410],
            [106.7063, 10.7400]
        ],
        "type": "Camera Tổ Dân Phố #03",
        "scenario": "real_flood_3",
        "status": "warning",
        "last_ping": time.time(),
        "device": "Webcam USB tiêu chuẩn"
    },
    "node-sgu-04": {
        "id": "node-sgu-04",
        "name": "Trạm 04 - Hẻm 803 Huỳnh Tấn Phát (Khu dân cư ven rạch)",
        "street_segment": "Tuyến Huỳnh Tấn Phát - Hẻm 803, Phường Tân Phú, Quận 7",
        "lat": 10.7360,
        "lng": 106.7285,
        "line_coords": [
            [106.7275, 10.7355],
            [106.7280, 10.7358],
            [106.7285, 10.7360],
            [106.7290, 10.7362],
            [106.7295, 10.7365]
        ],
        "type": "Camera Dân Sinh #04",
        "scenario": "real_flood_4",
        "status": "warning",
        "last_ping": time.time(),
        "device": "Camera IP hẻm dân cư"
    },
    "node-sgu-05": {
        "id": "node-sgu-05",
        "name": "Trạm 05 - Dốc Cầu Kênh Tẻ (Đoạn dốc trơn trượt)",
        "street_segment": "Tuyến Dạ Cầu Kênh Tẻ - Đường số 10, Phường Tân Hưng, Quận 7",
        "lat": 10.7565,
        "lng": 106.7035,
        "line_coords": [
            [106.7025, 10.7558],
            [106.7030, 10.7561],
            [106.7035, 10.7565],
            [106.7040, 10.7568],
            [106.7045, 10.7572]
        ],
        "type": "Camera Giám Sát Sự Cố #05",
        "scenario": "real_accident_1",
        "status": "alert",
        "last_ping": time.time(),
        "device": "Máy tính mini Edge AI"
    }
}

# Initial seeded incidents with compact payload metadata (< 150 bytes)
_p1_json, _p1_bytes = build_compact_payload("node-sgu-01", "FLOOD", 22.4, "cm")
_p2_json, _p2_bytes = build_compact_payload("node-sgu-02", "FLOOD", 18.2, "cm")
_p3_json, _p3_bytes = build_compact_payload("node-sgu-03", "FLOOD", 13.0, "cm")
_p4_json, _p4_bytes = build_compact_payload("node-sgu-04", "FLOOD", 8.0, "cm")
_p5_json, _p5_bytes = build_compact_payload("node-sgu-05", "ACCIDENT", 5.2, "s")

INCIDENTS: List[Dict[str, Any]] = [
    {
        "id": "inc-001",
        "node_id": "node-sgu-01",
        "node_name": "Trạm 01 - Đường Trần Xuân Soạn",
        "type": "FLOOD",
        "level": "DANGER",
        "val": 22.4,
        "unit": "cm",
        "payload_json": _p1_json,
        "payload_bytes": _p1_bytes,
        "message": "Nước ngập sâu 22.4cm vượt nửa bánh xe máy (50cm), nguy cơ chết máy cao",
        "timestamp": "10:15:30",
        "gps": "10.7545, 106.7115",
        "telegram_sent": True
    },
    {
        "id": "inc-003",
        "node_id": "node-sgu-03",
        "node_name": "Trạm 03 - Tuyến Lê Văn Lương",
        "type": "FLOOD",
        "level": "WARNING",
        "val": 13.0,
        "unit": "cm",
        "payload_json": _p3_json,
        "payload_bytes": _p3_bytes,
        "message": "Nước ngập 13.0cm mép pô xe máy, phương tiện bắt đầu khó đi",
        "timestamp": "10:17:45",
        "gps": "10.7420, 106.7055",
        "telegram_sent": True
    },
    {
        "id": "inc-005",
        "node_id": "node-sgu-05",
        "node_name": "Trạm 05 - Dốc Cầu Kênh Tẻ",
        "type": "ACCIDENT",
        "level": "DANGER",
        "val": 5.2,
        "unit": "s",
        "payload_json": _p5_json,
        "payload_bytes": _p5_bytes,
        "message": "Phát hiện người ngã xe nằm bất động 5.2s (> 5s), cần hỗ trợ ngay",
        "timestamp": "10:19:00",
        "gps": "10.7565, 106.7035",
        "telegram_sent": True
    }
]

for _seed_inc in INCIDENTS:
    save_incident_to_db(_seed_inc)

# Real-world video recording playback engine
VIDEOS_DIR = os.path.join(os.path.dirname(__file__), "videos")
ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
os.makedirs(VIDEOS_DIR, exist_ok=True)
VIDEO_CAPS: Dict[str, Any] = {}

REAL_VIDEOS_MAP = {
    "real_flood_1": ["real_flood_1.mp4", "flood.mp4"],
    "real_flood_2": ["real_flood_2.mp4", "flood2.mp4"],
    "real_flood_3": ["real_flood_3.mp4", "flood_6.mp4", "flood3.mp4"],
    "real_flood_4": ["real_flood_4.mp4", "flood_5.mp4", "flood4.mp4"],
    "real_flood_5": ["real_flood_4.mp4", "flood_5.mp4"],
    "real_flood_6": ["real_flood_3.mp4", "flood_6.mp4"],
    "real_accident_1": ["real_accident_1.mp4", "accident_1.mp4", "flood_accident_1.mp4"]
}


def resolve_real_video_path(scenario: str) -> Optional[str]:
    """Finds exact path of real video recording."""
    candidates = REAL_VIDEOS_MAP.get(scenario, [f"{scenario}.mp4"])

    for filename in candidates:
        path1 = os.path.join(VIDEOS_DIR, filename)
        if os.path.exists(path1):
            return path1
        path2 = os.path.join(ROOT_DIR, filename)
        if os.path.exists(path2):
            return path2

    fallback = os.path.join(VIDEOS_DIR, "real_flood_1.mp4")
    if os.path.exists(fallback):
        return fallback
    return None


video_capture_lock = threading.Lock()


def get_real_video_frame(scenario: str) -> np.ndarray:
    """Reads frame from real video recording safely with mutex and loops seamlessly."""
    video_path = resolve_real_video_path(scenario)
    if video_path and os.path.exists(video_path):
        with video_capture_lock:
            cap = VIDEO_CAPS.get(scenario)
            if cap is None or not cap.isOpened():
                cap = cv2.VideoCapture(video_path)
                VIDEO_CAPS[scenario] = cap

            ret, frame = cap.read()
            if not ret or frame is None:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                ret, frame = cap.read()
                if not ret or frame is None:
                    cap.release()
                    cap = cv2.VideoCapture(video_path)
                    VIDEO_CAPS[scenario] = cap
                    ret, frame = cap.read()

            if ret and frame is not None:
                if frame.shape[1] != 640 or frame.shape[0] != 360:
                    frame = cv2.resize(frame, (640, 360))
                return frame

    blank = np.zeros((360, 640, 3), dtype=np.uint8)
    cv2.putText(blank, "CAMERA CONNECTING...", (180, 180),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (120, 120, 120), 2)
    return blank


# Decoupled Async Edge AI Worker & Telemetry Cache
NODE_LATEST_METRICS: Dict[str, Any] = {
    "node-sgu-01": {
        "fps": 28.5,
        "infer_time_ms": 32.0,
        "clahe_active": False,
        "detections_count": 3,
        "payload_bytes": _p1_bytes,
        "payload_json": _p1_json,
        "privacy": {"ram_only": True, "frames_processed_in_ram": 120, "disk_writes": 0},
        "accident": {"detected": False, "reason": "", "motionless_sec": 0.0},
        "flood": {"detected": True, "depth_cm": 22.4, "level": "DANGER"},
        "updated_at": time.time()
    },
    "node-sgu-02": {
        "fps": 28.5,
        "infer_time_ms": 35.0,
        "clahe_active": False,
        "detections_count": 2,
        "payload_bytes": _p2_bytes,
        "payload_json": _p2_json,
        "privacy": {"ram_only": True, "frames_processed_in_ram": 95, "disk_writes": 0},
        "accident": {"detected": False, "reason": "", "motionless_sec": 0.0},
        "flood": {"detected": True, "depth_cm": 18.2, "level": "WARNING"},
        "updated_at": time.time()
    },
    "node-sgu-03": {
        "fps": 28.5,
        "infer_time_ms": 28.0,
        "clahe_active": True,
        "detections_count": 4,
        "payload_bytes": _p3_bytes,
        "payload_json": _p3_json,
        "privacy": {"ram_only": True, "frames_processed_in_ram": 110, "disk_writes": 0},
        "accident": {"detected": False, "reason": "", "motionless_sec": 0.0},
        "flood": {"detected": True, "depth_cm": 13.0, "level": "WARNING"},
        "updated_at": time.time()
    },
    "node-sgu-04": {
        "fps": 28.5,
        "infer_time_ms": 30.0,
        "clahe_active": False,
        "detections_count": 3,
        "payload_bytes": _p4_bytes,
        "payload_json": _p4_json,
        "privacy": {"ram_only": True, "frames_processed_in_ram": 80, "disk_writes": 0},
        "accident": {"detected": False, "reason": "", "motionless_sec": 0.0},
        "flood": {"detected": True, "depth_cm": 11.2, "level": "WARNING"},
        "updated_at": time.time()
    },
    "node-sgu-05": {
        "fps": 28.5,
        "infer_time_ms": 32.0,
        "clahe_active": True,
        "detections_count": 3,
        "payload_bytes": _p5_bytes,
        "payload_json": _p5_json,
        "privacy": {"ram_only": True, "frames_processed_in_ram": 140, "disk_writes": 0},
        "accident": {"detected": True, "reason": "Phát hiện người ngã xe nằm bất động 5.2s", "motionless_sec": 5.2},
        "flood": {"detected": False, "depth_cm": 0.0, "level": "SAFE"},
        "updated_at": time.time()
    }
}
NODE_ANALYSIS_CACHE: Dict[str, Any] = {}
AI_POOL = concurrent.futures.ThreadPoolExecutor(max_workers=2)
AI_FUTURES: Dict[str, concurrent.futures.Future] = {}
LAST_AUTO_ALERT_TIME: Dict[str, float] = {}


def stream_generator(node_id: str, custom_fps: Optional[float] = None):
    """Zero-stutter MJPEG stream generator supporting configurable FPS playback."""
    node = NODES.get(node_id, NODES["node-sgu-01"])
    target_fps = custom_fps if (custom_fps is not None and custom_fps > 0) else DEFAULT_STREAM_FPS
    frame_delay = 1.0 / max(1.0, min(60.0, target_fps))

    while True:
        cycle_start = time.time()
        scenario = node["scenario"]

        frame = get_real_video_frame(scenario)
        if frame is None:
            time.sleep(0.04)
            continue

        fut = AI_FUTURES.get(node_id)
        if fut is not None and fut.done():
            try:
                res = fut.result()
                if res:
                    NODE_ANALYSIS_CACHE[node_id] = res
                    flood_info = res.get("flood", {"detected": False, "depth_cm": 0.0, "level": "SAFE"})
                    acc_info = res.get("accident", {"detected": False, "reason": "", "motionless_sec": 0.0})

                    ev_type = "ACCIDENT" if acc_info.get("detected") else "FLOOD"
                    ev_val = acc_info.get("motionless_sec", 0.0) if acc_info.get("detected") else flood_info.get("depth_cm", 0.0)
                    ev_unit = "s" if acc_info.get("detected") else "cm"
                    p_json, p_bytes = build_compact_payload(node_id, ev_type, ev_val, ev_unit)

                    NODE_LATEST_METRICS[node_id] = {
                        "fps": round(target_fps, 1),
                        "infer_time_ms": res.get("infer_time_ms", 32.0),
                        "clahe_active": res.get("clahe_active", False),
                        "detections_count": res.get("detections_count", 0),
                        "vehicles_count": res.get("vehicles_count", 0),
                        "payload_bytes": p_bytes,
                        "payload_json": p_json,
                        "privacy": res.get("privacy", {"ram_only": True, "frames_processed_in_ram": detector.frames_processed_in_ram, "disk_writes": 0}),
                        "accident": acc_info,
                        "flood": flood_info,
                        "updated_at": time.time()
                    }

                    depth_val = float(flood_info.get("depth_cm", 0.0))
                    mot_val = float(acc_info.get("motionless_sec", 0.0))
                    is_danger_flood = (flood_info.get("level") == "DANGER" and depth_val >= 20.0)
                    is_warning_flood = (flood_info.get("level") == "WARNING" and depth_val >= 12.0)
                    is_fall_detected = bool(acc_info.get("detected"))

                    if is_danger_flood or is_warning_flood or is_fall_detected:
                        now_ts = time.time()
                        alert_key = f"{node_id}_{'accident' if is_fall_detected else 'flood'}"
                        last_sent = LAST_AUTO_ALERT_TIME.get(alert_key, 0.0)

                        if (now_ts - last_sent) >= 45.0:
                            LAST_AUTO_ALERT_TIME[alert_key] = now_ts
                            inc_type = "ACCIDENT" if is_fall_detected else "FLOOD"
                            alert_level = "DANGER" if (is_fall_detected or is_danger_flood) else "WARNING"

                            auto_report = generate_instant_alert_text(
                                node_name=node["name"],
                                event_type=inc_type,
                                level=alert_level,
                                depth_cm=depth_val,
                                motionless_sec=mot_val,
                                gps=f"{node['lat']}, {node['lng']}"
                            )

                            if is_fall_detected:
                                title_txt = "Ngã xe máy nằm bất động > 5s"
                                msg_txt = acc_info.get("reason", "Phát hiện người ngã xe nằm bất động quá 5 giây")
                            elif is_danger_flood:
                                title_txt = f"Ngập nước nguy hiểm ({depth_val}cm)"
                                msg_txt = f"Nước ngập sâu {depth_val}cm vượt nửa bánh xe máy, nguy cơ chết máy cao"
                            else:
                                title_txt = f"Ngập nước chú ý ({depth_val}cm)"
                                msg_txt = f"Nước ngập {depth_val}cm mấp mé ống xả, phương tiện di chuyển chậm"

                            new_auto_inc = {
                                "id": f"inc-{node_id}-{int(now_ts)}",
                                "node_id": node_id,
                                "node_name": node["name"].split("(")[0].strip(),
                                "type": inc_type,
                                "level": alert_level,
                                "title": title_txt,
                                "message": msg_txt,
                                "depth_cm": depth_val,
                                "payload_bytes": p_bytes,
                                "payload_json": p_json,
                                "time": get_vn_time_str("%H:%M:%S"),
                                "timestamp": get_vn_time_str("%H:%M:%S"),
                                "status": "active",
                                "text_report": auto_report
                            }

                            new_auto_inc["val"] = mot_val if is_fall_detected else depth_val
                            new_auto_inc["unit"] = "s" if is_fall_detected else "cm"
                            new_auto_inc["created_at"] = int(now_ts)
                            new_auto_inc["gps"] = f"{node['lat']}, {node['lng']}"
                            new_auto_inc["telegram_sent"] = True
                            new_auto_inc["synced"] = True

                            INCIDENTS[:] = [new_auto_inc] + [inc for inc in INCIDENTS if inc.get("node_id") != node_id or inc.get("type") != inc_type][:5]

                            try:
                                save_incident_to_db(new_auto_inc)
                            except Exception as db_err:
                                print(f"[DB AUTO-SAVE ERROR] {db_err}")

                            def _dispatch_tg(text_msg, inc_ident):
                                try:
                                    tg_res = send_telegram_alert(text_msg, inc_ident)
                                    print(f"[*] AUTO TELEGRAM ALERT DELIVERED: {tg_res.get('mode')} -> {tg_res.get('message')}")
                                except Exception as tg_err:
                                    print(f"[!] TELEGRAM DISPATCH ERROR: {tg_err}")

                            threading.Thread(
                                target=_dispatch_tg,
                                args=(auto_report, new_auto_inc["id"]),
                                daemon=True
                            ).start()
            except Exception as loop_err:
                print(f"[STREAM PROCESSING ERROR] {loop_err}")
            AI_FUTURES[node_id] = None

        if AI_FUTURES.get(node_id) is None:
            AI_FUTURES[node_id] = AI_POOL.submit(detector.infer, frame.copy(), node_id)

        analysis = NODE_ANALYSIS_CACHE.get(node_id, detector.get_default_analysis())
        annotated = detector.render_hud(frame, analysis, stream_fps=target_fps)

        ret, buffer = cv2.imencode(".jpg", annotated, [cv2.IMWRITE_JPEG_QUALITY, 78])
        if not ret:
            continue
        frame_bytes = buffer.tobytes()

        del annotated
        del frame

        yield (b"--frame\r\n"
               b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")

        elapsed = time.time() - cycle_start
        sleep_dur = max(0.002, frame_delay - elapsed)
        time.sleep(sleep_dur)

