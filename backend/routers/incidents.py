"""
UrbanShield Lite - Incident Events & Dispatch Router
Endpoints for flood events, accident events, and Telegram alerts.
"""

import time
from typing import Optional
from fastapi import APIRouter, Header, HTTPException, Query

from schemas import FloodIncidentPayload, AccidentIncidentPayload, TelegramAlertPayload
from detector import estimate_wheel_flood_depth
from reporting import (
    build_compact_payload,
    generate_instant_alert_text,
    get_vn_time_str
)
from database import save_incident_to_db, get_incidents_history
from notify import send_telegram_alert
import state

router = APIRouter(tags=["Incidents"])


@router.get("/api/incidents")
@router.get("/api/v1/incidents")
def get_incidents():
    """Returns the most recent active and recorded incidents."""
    return state.INCIDENTS


@router.get("/api/incidents/history")
@router.get("/api/v1/incidents/history")
def get_historical_incidents(
    limit: int = Query(10, ge=1, le=100, description="Số lượng sự cố trên một trang"),
    page: int = Query(1, ge=1, description="Số trang phân trang"),
    node_id: Optional[str] = Query(None, description="Lọc theo mã trạm camera")
):
    """
    Returns indexed historical incident records from SQLite edge database with limit/offset pagination.
    """
    return get_incidents_history(limit=limit, page=page, node_id=node_id)


@router.post("/api/v1/incidents/flood")
@router.post("/api/v1/events/flood")
def post_flood_incident(
    payload: FloodIncidentPayload,
    x_edge_key: Optional[str] = Header(default=None)
):
    """
    Minimal API endpoint for Flood Events (< 150 bytes payload).
    """
    if x_edge_key and x_edge_key != state.EDGE_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid X-Edge-Key")

    _, computed_level = estimate_wheel_flood_depth(50.0 - min(50.0, payload.depth_cm), 50.0, 50.0)
    level = payload.level or computed_level
    compact_json, byte_size = build_compact_payload(
        payload.node_id, "FLOOD", payload.depth_cm, "cm", payload.timestamp
    )

    node_info = state.NODES.get(payload.node_id, {
        "name": f"Trạm {payload.node_id}",
        "lat": 10.7599,
        "lng": 106.6823
    })
    clean_name = node_info["name"].split("(")[0].strip()
    gps_str = f"{node_info['lat']}, {node_info['lng']}"

    msg = f"Nước ngập {payload.depth_cm:.1f}cm đo qua bánh xe máy 50cm (Mức: {level})"
    new_inc = {
        "id": f"inc-flood-{int(time.time()*1000)}",
        "node_id": payload.node_id,
        "node_name": clean_name,
        "type": "FLOOD",
        "level": level,
        "val": payload.depth_cm,
        "unit": "cm",
        "payload_json": compact_json,
        "payload_bytes": byte_size,
        "message": msg,
        "timestamp": get_vn_time_str("%H:%M:%S"),
        "gps": gps_str,
        "telegram_sent": True
    }
    save_incident_to_db(new_inc)

    state.INCIDENTS = [inc for inc in state.INCIDENTS if inc.get("node_id") != payload.node_id]
    state.INCIDENTS.insert(0, new_inc)
    state.INCIDENTS = state.INCIDENTS[:6]

    text_report = generate_instant_alert_text(
        node_name=clean_name,
        event_type="FLOOD",
        level=level,
        depth_cm=payload.depth_cm,
        gps=gps_str
    )

    return {
        "status": "recorded",
        "payload_bytes": byte_size,
        "under_150_bytes": byte_size < 150,
        "compact_payload": compact_json,
        "incident": new_inc,
        "text_report": text_report
    }


@router.post("/api/v1/incidents/accident")
@router.post("/api/v1/events/accident")
def post_accident_incident(
    payload: AccidentIncidentPayload,
    x_edge_key: Optional[str] = Header(default=None)
):
    """
    Minimal API endpoint for Fall / Accident Events.
    Enforces the 5.0-second motionless anti-false-alarm rule.
    """
    if x_edge_key and x_edge_key != state.EDGE_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid X-Edge-Key")

    if payload.stationary_sec < 5.0:
        return {
            "status": "debounced_ignored",
            "reason": f"Thời gian bất động {payload.stationary_sec:.1f}s < 5.0s (Tự động lọc báo động giả)",
            "alert_triggered": False
        }

    compact_json, byte_size = build_compact_payload(
        payload.node_id, "ACCIDENT", payload.stationary_sec, "s", payload.timestamp
    )

    node_info = state.NODES.get(payload.node_id, {
        "name": f"Trạm {payload.node_id}",
        "lat": 10.7585,
        "lng": 106.6790
    })
    clean_name = node_info["name"].split("(")[0].strip()
    gps_str = f"{node_info['lat']}, {node_info['lng']}"

    msg = f"Phát hiện người ngã xe nằm bất động {payload.stationary_sec:.1f}s (> 5s), cần hỗ trợ ngay"
    new_inc = {
        "id": f"inc-acc-{int(time.time()*1000)}",
        "node_id": payload.node_id,
        "node_name": clean_name,
        "type": "ACCIDENT",
        "level": "DANGER",
        "val": payload.stationary_sec,
        "unit": "s",
        "payload_json": compact_json,
        "payload_bytes": byte_size,
        "message": msg,
        "timestamp": get_vn_time_str("%H:%M:%S"),
        "gps": gps_str,
        "telegram_sent": True
    }
    save_incident_to_db(new_inc)

    state.INCIDENTS = [inc for inc in state.INCIDENTS if inc.get("node_id") != payload.node_id]
    state.INCIDENTS.insert(0, new_inc)
    state.INCIDENTS = state.INCIDENTS[:6]

    text_report = generate_instant_alert_text(
        node_name=clean_name,
        event_type="ACCIDENT",
        level="DANGER",
        motionless_sec=payload.stationary_sec,
        gps=gps_str
    )

    return {
        "status": "recorded",
        "alert_triggered": True,
        "payload_bytes": byte_size,
        "under_150_bytes": byte_size < 150,
        "compact_payload": compact_json,
        "incident": new_inc,
        "text_report": text_report
    }


@router.post("/api/alerts/telegram")
@router.post("/api/v1/alerts/telegram")
def trigger_telegram_alert(req: TelegramAlertPayload):
    """Manual or automated dispatch of instant text alert to Telegram."""
    node_id = req.node_id or "node-sgu-01"
    node = state.NODES.get(node_id, state.NODES["node-sgu-01"])
    metrics = state.NODE_LATEST_METRICS.get(node_id, {})
    flood_info = metrics.get("flood", {"depth_cm": 22.4, "level": "DANGER"})
    acc_info = metrics.get("accident", {"detected": False, "motionless_sec": 0.0})

    is_acc = bool(acc_info.get("detected"))
    text_report = generate_instant_alert_text(
        node_name=node["name"],
        event_type="ACCIDENT" if is_acc else "FLOOD",
        level="DANGER" if is_acc else flood_info.get("level", "DANGER"),
        depth_cm=float(flood_info.get("depth_cm", 22.4)),
        motionless_sec=float(acc_info.get("motionless_sec", 0.0)),
        gps=f"{node['lat']}, {node['lng']}"
    )
    return send_telegram_alert(text_report, req.incident_id)

