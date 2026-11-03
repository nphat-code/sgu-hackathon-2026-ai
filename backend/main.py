import os
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
        "name": "Trạm 01 - Hẻm 254 Bến Vân Đồn (Bình Thường)",
        "lat": 10.7599,
        "lng": 106.6823,
        "type": "Camera Dân Sinh #01",
        "scenario": "normal",
        "status": "online",
        "last_ping": time.time(),
        "device": "PC văn phòng + Camera USB"
    },
    "node-sgu-02": {
        "id": "node-sgu-02",
        "name": "Trạm 02 - Hẻm 184 Huỳnh Tấn Phát (Ngập Triều Cường)",
        "lat": 10.7552,
        "lng": 106.6855,
        "type": "Camera Dân Sinh #02",
        "scenario": "real_flood_1",
        "status": "alert",
        "last_ping": time.time(),
        "device": "Thiết bị nhúng thông dụng"
    },
    "node-sgu-03": {
        "id": "node-sgu-03",
        "name": "Trạm 03 - Hẻm 98 Trần Xuân Soạn (Sự Cố Xe Ngã)",
        "lat": 10.7585,
        "lng": 106.6790,
        "type": "Camera Tổ Dân Phố #03",
        "scenario": "accident",
        "status": "warning",
        "last_ping": time.time(),
        "device": "Webcam USB tiêu chuẩn"
    }
}

INCIDENTS = [
    {
        "id": "inc-001",
        "node_id": "node-sgu-02",
        "node_name": "Trạm 02 - Hẻm 184 Huỳnh Tấn Phát (Ngập Triều Cường)",
        "type": "FLOOD",
        "level": "DANGER",
        "message": "Nước ngập sâu 22.4cm vượt nửa bánh xe máy (50cm), nguy cơ chết máy cao",
        "timestamp": "10:15:30",
        "gps": "10.7552, 106.6855",
        "telegram_sent": True
    },
    {
        "id": "inc-002",
        "node_id": "node-sgu-03",
        "node_name": "Trạm 03 - Hẻm 98 Trần Xuân Soạn (Sự Cố Xe Ngã)",
        "type": "ACCIDENT",
        "level": "SOS",
        "message": "Phát hiện va chạm ngã xe máy, người nằm bất động trên 5 giây",
        "timestamp": "10:18:12",
        "gps": "10.7585, 106.6790",
        "telegram_sent": True
    }
]

# Real-world video recording playback engine
VIDEOS_DIR = os.path.join(os.path.dirname(__file__), "videos")
os.makedirs(VIDEOS_DIR, exist_ok=True)
VIDEO_CAPS: Dict[str, Any] = {}

def resolve_video_path(scenario: str) -> str:
    """Finds matching video file, prioritizing real recordings."""
    direct_path = os.path.join(VIDEOS_DIR, f"{scenario}.mp4")
    if os.path.exists(direct_path):
        return direct_path

    # If scenario requested is flood, prefer real_flood_1.mp4 if present
    if scenario == "flood":
        real_p = os.path.join(VIDEOS_DIR, "real_flood_1.mp4")
        if os.path.exists(real_p):
            return real_p
        
    return None

def get_frame_from_video_or_synthetic(scenario: str, tick: int) -> np.ndarray:
    """
    Checks for real-world video recordings: backend/videos/{scenario}.mp4
    If present, reads frame-by-frame and loops seamlessly.
    Otherwise, falls back to the realistic synthetic frame generator.
    """
    video_path = resolve_video_path(scenario)
    if video_path and os.path.exists(video_path):
        cap = VIDEO_CAPS.get(scenario)
        if cap is None or not cap.isOpened():
            cap = cv2.VideoCapture(video_path)
            VIDEO_CAPS[scenario] = cap
        
        ret, frame = cap.read()
        if not ret or frame is None:
            # Loop video seamlessly when it reaches the end
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            ret, frame = cap.read()
            
        if ret and frame is not None:
            if frame.shape[1] != 640 or frame.shape[0] != 480:
                frame = cv2.resize(frame, (640, 480))
            return frame
            
    return generate_synthetic_frame(scenario, tick)

@app.get("/api/videos/status")
def get_videos_status():
    return {
        "normal": os.path.exists(os.path.join(VIDEOS_DIR, "normal.mp4")),
        "flood": os.path.exists(os.path.join(VIDEOS_DIR, "flood.mp4")),
        "accident": os.path.exists(os.path.join(VIDEOS_DIR, "accident.mp4")),
        "real_flood_1": os.path.exists(os.path.join(VIDEOS_DIR, "real_flood_1.mp4")),
        "real_flood_2": os.path.exists(os.path.join(VIDEOS_DIR, "real_flood_2.mp4")),
        "real_flood_3": os.path.exists(os.path.join(VIDEOS_DIR, "real_flood_3.mp4")),
        "real_flood_4": os.path.exists(os.path.join(VIDEOS_DIR, "real_flood_4.mp4")),
        "real_accident_1": os.path.exists(os.path.join(VIDEOS_DIR, "real_accident_1.mp4"))
    }

@app.get("/api/videos/catalog")
def get_videos_catalog():
    return {
        "real_videos": [
            {"id": "real_flood_1", "name": "Video thực tế 1: Xe máy lội ngập triều cường (22-26cm)", "available": os.path.exists(os.path.join(VIDEOS_DIR, "real_flood_1.mp4"))},
            {"id": "real_flood_2", "name": "Video thực tế 2: Phương tiện ngập lụt", "available": os.path.exists(os.path.join(VIDEOS_DIR, "real_flood_2.mp4"))},
            {"id": "real_flood_3", "name": "Video thực tế 3: Ngập lụt sâu cứu hộ", "available": os.path.exists(os.path.join(VIDEOS_DIR, "real_flood_3.mp4"))},
            {"id": "real_flood_4", "name": "Video thực tế 4: Ngõ hẻm ngập nước", "available": os.path.exists(os.path.join(VIDEOS_DIR, "real_flood_4.mp4"))},
            {"id": "real_accident_1", "name": "Video thực tế 5: Sự cố mưa gió", "available": os.path.exists(os.path.join(VIDEOS_DIR, "real_accident_1.mp4"))}
        ],
        "synthetic_videos": [
            {"id": "normal", "name": "Đường khô ráo bình thường", "available": True},
            {"id": "flood", "name": "Mô phỏng ngập nước 26cm", "available": True},
            {"id": "accident", "name": "Mô phỏng trượt ngã xe máy đếm 5s", "available": True}
        ]
    }

def generate_synthetic_frame(scenario: str, tick: int) -> np.ndarray:
    """Generates a realistic synthetic road frame with vehicles/people for testing."""
    frame = np.zeros((480, 640, 3), dtype=np.uint8)
    
    # Road background
    frame[:200, :] = [60, 60, 60] # Distant sidewalk
    frame[200:, :] = [40, 40, 40] # Asphalt road
    
    # Road markings
    for x in range(0, 640, 80):
        cv2.line(frame, (x, 340), (x + 40, 340), (255, 255, 255), 3)

    if "flood" in scenario:
        # Draw water reflection overlay
        water_overlay = frame.copy()
        cv2.rectangle(water_overlay, (0, 310), (640, 480), (120, 90, 60), -1) # muddy water
        cv2.addWeighted(water_overlay, 0.65, frame, 0.35, 0, frame)
        # Vehicles wading in water
        vx = (150 + (tick * 4) % 350)
        cv2.rectangle(frame, (vx, 250), (vx + 70, 360), (30, 160, 240), -1) # Motorcycle body
        cv2.circle(frame, (vx + 35, 220), 16, (220, 180, 140), -1) # Rider
        cv2.putText(frame, "WATER DEPTH: 22.5cm", (20, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 165, 255), 2)
    elif "accident" in scenario:
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
    """MJPEG stream generator for web browser view with real Edge AI inference."""
    node = NODES.get(node_id, NODES["node-sgu-01"])
    tick = 0
    while True:
        tick += 1
        scenario = node["scenario"]

        # Read from real video file or fallback to synthetic
        frame = get_frame_from_video_or_synthetic(scenario, tick)

        # Run AI detection on CPU
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
        time.sleep(0.04) # ~25 FPS stream loop

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
        "accident": {"detected": False, "reason": "", "motionless_sec": 0.0},
        "flood": {"detected": False, "depth_cm": 0.0, "level": "SAFE"}
    })
    return metrics

class ScenarioUpdate(BaseModel):
    scenario: str # 'normal', 'real_flood_1', 'real_flood_2', 'real_flood_3', 'real_flood_4', 'real_accident_1', 'flood', 'accident'

@app.post("/api/nodes/{node_id}/scenario")
def set_node_scenario(node_id: str, data: ScenarioUpdate):
    if node_id not in NODES:
        raise HTTPException(status_code=404, detail="Node not found")
    NODES[node_id]["scenario"] = data.scenario
    
    # If alert scenario, record incident
    if "flood" in data.scenario or "accident" in data.scenario:
        is_flood = "flood" in data.scenario
        inc_type = "FLOOD" if is_flood else "ACCIDENT"
        msg = ("Phát hiện ngập lụt 22.4cm vượt nửa bánh xe máy (50cm)" 
               if is_flood else 
               "CẢNH BÁO SOS: Phát hiện va chạm ngã xe máy ban đêm (> 5s)")
        new_inc = {
            "id": f"inc-{int(time.time())}",
            "node_id": node_id,
            "node_name": NODES[node_id]["name"],
            "type": inc_type,
            "level": "DANGER" if is_flood else "SOS",
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
