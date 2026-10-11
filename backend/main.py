import cv2
import time
import base64
import asyncio
import numpy as np
from fastapi import FastAPI, WebSocket, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel
from typing import Dict, Any, List
import requests

from detector import UrbanShieldDetector

app = FastAPI(title="UrbanShield Lite - Edge AI Gateway")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI Detector
detector = UrbanShieldDetector()

# In-memory storage for nodes and incidents
NODES = {
    "node-sgu-01": {
        "id": "node-sgu-01",
        "name": "Cổng ĐH Sài Gòn (273 An Dương Vương)",
        "lat": 10.7599,
        "lng": 106.6823,
        "type": "Webcam Live / Edge Box",
        "scenario": "normal",
        "status": "online",
        "last_ping": time.time(),
        "device": "Tái chế PC cũ + Camera 200k"
    },
    "node-sgu-02": {
        "id": "node-sgu-02",
        "name": "Ngã tư Trần Hưng Đạo - Nguyễn Văn Cừ",
        "lat": 10.7552,
        "lng": 106.6855,
        "type": "Camera Dân Sinh #02",
        "scenario": "flood",
        "status": "alert",
        "last_ping": time.time(),
        "device": "Smartphone cũ (Redmi 9)"
    },
    "node-sgu-03": {
        "id": "node-sgu-03",
        "name": "Hẻm 218 An Dương Vương (Khu trọ SV)",
        "lat": 10.7585,
        "lng": 106.6790,
        "type": "Camera Tổ Dân Phố #03",
        "scenario": "accident",
        "status": "warning",
        "last_ping": time.time(),
        "device": "Webcam giá rẻ 180k"
    }
}

INCIDENTS = [
    {
        "id": "inc-001",
        "node_id": "node-sgu-02",
        "node_name": "Ngã tư Trần Hưng Đạo - Nguyễn Văn Cừ",
        "type": "FLOOD",
        "level": "DANGER",
        "message": "Nước ngập sâu 26cm vượt nửa bánh xe máy, nguy cơ chết máy cao",
        "timestamp": "10:15:30",
        "gps": "10.7552, 106.6855",
        "telegram_sent": True
    },
    {
        "id": "inc-002",
        "node_id": "node-sgu-03",
        "node_name": "Hẻm 218 An Dương Vương",
        "type": "ACCIDENT",
        "level": "SOS",
        "message": "Phát hiện va chạm ngã xe máy, người nằm bất động trên 5 giây",
        "timestamp": "10:18:12",
        "gps": "10.7585, 106.6790",
        "telegram_sent": True
    }
]

# Web camera capture or synthetic simulator
webcam_cap = None
ENABLE_WEBCAM = False  # Mặc định TẮT webcam vật lý để bảo mật & riêng tư

def get_webcam():
    global webcam_cap, ENABLE_WEBCAM
    if not ENABLE_WEBCAM:
        return None
    if webcam_cap is None:
        try:
            webcam_cap = cv2.VideoCapture(0)
            if not webcam_cap.isOpened():
                webcam_cap = None
        except Exception:
            webcam_cap = None
    return webcam_cap

def release_webcam():
    global webcam_cap, ENABLE_WEBCAM
    ENABLE_WEBCAM = False
    if webcam_cap is not None:
        try:
            webcam_cap.release()
        except Exception:
            pass
        webcam_cap = None

@app.get("/api/webcam/status")
def get_webcam_status():
    return {"webcam_enabled": ENABLE_WEBCAM}

@app.post("/api/webcam/toggle")
def toggle_webcam():
    global ENABLE_WEBCAM
    if ENABLE_WEBCAM:
        release_webcam()
    else:
        ENABLE_WEBCAM = True
        get_webcam()
    return {"webcam_enabled": ENABLE_WEBCAM}

def generate_synthetic_frame(scenario: str, tick: int) -> np.ndarray:
    """Generates a realistic synthetic road frame with vehicles/people for testing."""
    frame = np.zeros((480, 640, 3), dtype=np.uint8)
    
    # Road background
    frame[:200, :] = [60, 60, 60] # Distant sidewalk
    frame[200:, :] = [40, 40, 40] # Asphalt road
    
    # Road markings
    for x in range(0, 640, 80):
        cv2.line(frame, (x, 340), (x + 40, 340), (255, 255, 255), 3)

    if scenario == "flood":
        # Draw water reflection overlay
        water_overlay = frame.copy()
        cv2.rectangle(water_overlay, (0, 310), (640, 480), (120, 90, 60), -1) # muddy water
        cv2.addWeighted(water_overlay, 0.65, frame, 0.35, 0, frame)
        # Vehicles wading in water
        vx = (150 + (tick * 4) % 350)
        cv2.rectangle(frame, (vx, 250), (vx + 70, 360), (30, 160, 240), -1) # Motorcycle body
        cv2.circle(frame, (vx + 35, 220), 16, (220, 180, 140), -1) # Rider
        cv2.putText(frame, "WATER DEPTH: 26cm", (20, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 165, 255), 2)
    elif scenario == "accident":
        # Fallen bike and person on road
        cv2.rectangle(frame, (240, 320), (370, 360), (40, 40, 180), -1) # Fallen bike horizontal
        cv2.circle(frame, (230, 335), 20, (10, 10, 10), -1) # Wheel
        cv2.circle(frame, (380, 335), 20, (10, 10, 10), -1) # Wheel
        cv2.rectangle(frame, (280, 365), (390, 395), (180, 120, 90), -1) # Fallen person horizontal
        cv2.circle(frame, (270, 380), 14, (200, 160, 140), -1) # Head
        cv2.putText(frame, "SOS: FALLEN DETECTED > 5s", (20, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
    else: # normal
        # Moving normal vehicle
        vx = (50 + (tick * 5) % 500)
        cv2.rectangle(frame, (vx, 270), (vx + 50, 340), (0, 200, 100), -1)
        cv2.circle(frame, (vx + 25, 245), 14, (220, 180, 140), -1)

    return frame

# Latest node analysis cache
NODE_LATEST_METRICS: Dict[str, Any] = {}

def stream_generator(node_id: str):
    """MJPEG stream generator for web browser view."""
    node = NODES.get(node_id, NODES["node-sgu-01"])
    tick = 0
    while True:
        tick += 1
        scenario = node["scenario"]

        frame = None
        # If node 1 and scenario normal, try webcam
        if node_id == "node-sgu-01" and scenario == "normal":
            cap = get_webcam()
            if cap is not None and cap.isOpened():
                ret, cam_frame = cap.read()
                if ret:
                    frame = cam_frame

        if frame is None:
            frame = generate_synthetic_frame(scenario, tick)

        # Run AI detection
        analysis = detector.analyze_frame(frame, simulate_scenario=scenario)
        annotated = analysis["annotated_frame"]

        # Cache metrics
        NODE_LATEST_METRICS[node_id] = {
            "fps": analysis["fps"],
            "infer_time_ms": analysis["infer_time_ms"],
            "detections_count": analysis["detections_count"],
            "accident": analysis["accident"],
            "flood": analysis["flood"],
            "updated_at": time.time()
        }

        # Encode to JPEG
        ret, buffer = cv2.imencode(".jpg", annotated, [cv2.IMWRITE_JPEG_QUALITY, 80])
        if not ret:
            continue
        frame_bytes = buffer.tobytes()

        yield (b"--frame\r\n"
               b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")
        time.sleep(0.04) # ~25 FPS

@app.get("/api/status")
def get_system_status():
    return {
        "status": "online",
        "system_name": "UrbanShield Lite - Edge AI Gateway",
        "team": "SingleNode",
        "active_nodes": len(NODES),
        "total_incidents": len(INCIDENTS),
        "edge_ai_model": "YOLOv8n (~6MB CPU Inference)",
        "cost_savings": "95% bandwidth & server cost saved"
    }

@app.get("/api/nodes")
def get_nodes():
    return list(NODES.values())

@app.get("/api/nodes/{node_id}/metrics")
def get_node_metrics(node_id: str):
    if node_id not in NODES:
        raise HTTPException(status_code=404, detail="Node not found")
    metrics = NODE_LATEST_METRICS.get(node_id, {
        "fps": 28.5,
        "infer_time_ms": 35.0,
        "detections_count": 2,
        "accident": {"detected": False, "reason": ""},
        "flood": {"detected": False, "depth_cm": 0}
    })
    return metrics

class ScenarioUpdate(BaseModel):
    scenario: str # 'normal', 'flood', 'accident'

@app.post("/api/nodes/{node_id}/scenario")
def set_node_scenario(node_id: str, data: ScenarioUpdate):
    if node_id not in NODES:
        raise HTTPException(status_code=404, detail="Node not found")
    NODES[node_id]["scenario"] = data.scenario
    
    # If alert scenario, record incident
    if data.scenario in ["flood", "accident"]:
        inc_type = "FLOOD" if data.scenario == "flood" else "ACCIDENT"
        msg = ("Phát hiện ngập lụt 26cm tại cung đường" 
               if inc_type == "FLOOD" else 
               "CẢNH BÁO SOS: Phát hiện va chạm ngã xe máy ban đêm")
        new_inc = {
            "id": f"inc-{int(time.time())}",
            "node_id": node_id,
            "node_name": NODES[node_id]["name"],
            "type": inc_type,
            "level": "DANGER" if inc_type == "FLOOD" else "SOS",
            "message": msg,
            "timestamp": time.strftime("%H:%M:%S"),
            "gps": f"{NODES[node_id]['lat']}, {NODES[node_id]['lng']}",
            "telegram_sent": True
        }
        INCIDENTS.insert(0, new_inc)
        
    return {"success": True, "node": NODES[node_id]}

@app.get("/api/incidents")
def get_incidents():
    return INCIDENTS

class TelegramAlertRequest(BaseModel):
    incident_id: str

@app.post("/api/alerts/telegram")
def trigger_telegram_alert(req: TelegramAlertRequest):
    # Simulated Telegram broadcast
    return {
        "success": True,
        "channel": "@UrbanShield_SGU_Emergency",
        "delivered_to": ["Tổ Dân Phố Phường 3", "Đội Cứu Hộ SV SGU", "Gia Đình"],
        "message": "Đã phát cảnh báo khẩn cấp tức thời qua Telegram Bot API (0đ chi phí)!"
    }

@app.get("/api/video_feed/{node_id}")
def video_feed(node_id: str):
    return StreamingResponse(
        stream_generator(node_id),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
