import cv2
import numpy as np
import time
from typing import Dict, Any, List, Tuple
from ultralytics import YOLO

class UrbanShieldDetector:
    def __init__(self, model_name: str = "yolov8n.pt"):
        print(f"[*] Initializing YOLO model: {model_name}...")
        self.model = YOLO(model_name)
        # Incident tracking state
        self.fall_candidates: Dict[int, float] = {} # track_id -> timestamp first seen fallen
        self.accident_alert_active = False
        self.flood_alert_active = False
        self.current_flood_depth_cm = 0
        self.last_incident: Dict[str, Any] = None
        self.frame_count = 0

    def analyze_frame(self, frame: np.ndarray, simulate_scenario: str = "normal") -> Dict[str, Any]:
        """
        Analyzes a single video frame.
        simulate_scenario: 'normal', 'flood', 'accident'
        Returns detections, annotated frame, and alert status.
        """
        self.frame_count += 1
        h, w = frame.shape[:2]
        start_time = time.time()

        # Run YOLO inference
        # Classes: 0: person, 1: bicycle, 2: car, 3: motorcycle, 5: bus, 7: truck
        results = self.model(frame, verbose=False, conf=0.35, classes=[0, 1, 2, 3, 5, 7])[0]

        detections = []
        persons = []
        vehicles = []

        for box in results.boxes:
            cls_id = int(box.cls[0].item())
            cls_name = self.model.names[cls_id]
            conf = float(box.conf[0].item())
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
            box_w = x2 - x1
            box_h = y2 - y1

            item = {
                "class": cls_name,
                "confidence": round(conf, 2),
                "box": [x1, y1, x2, y2],
                "width": box_w,
                "height": box_h,
                "aspect_ratio": round(box_w / max(1, box_h), 2)
            }
            detections.append(item)

            if cls_name == "person":
                persons.append(item)
            else:
                vehicles.append(item)

        # ----------------------------------------------------
        # 1. ACCIDENT / FALL DETECTION LOGIC
        # ----------------------------------------------------
        accident_detected = False
        accident_reason = ""

        # Check real detections: person lying down near motorcycle or fallen
        for p in persons:
            # If aspect ratio > 1.2 (width > height), person is lying or fallen
            if p["aspect_ratio"] > 1.15:
                # Check proximity to vehicle
                for v in vehicles:
                    px_center = (p["box"][0] + p["box"][2]) / 2
                    py_center = (p["box"][1] + p["box"][3]) / 2
                    vx_center = (v["box"][0] + v["box"][2]) / 2
                    vy_center = (v["box"][1] + v["box"][3]) / 2
                    dist = np.hypot(px_center - vx_center, py_center - vy_center)

                    if dist < 180: # Close proximity
                        accident_detected = True
                        accident_reason = f"Phát hiện người ngã cạnh phương tiện ({v['class']})"
                        break

        # If user explicitly requested simulation scenario
        if simulate_scenario == "accident":
            accident_detected = True
            accident_reason = "Mô phỏng: Phát hiện va chạm ngã xe máy khẩn cấp"

        # ----------------------------------------------------
        # 2. FLOOD / WATER LEVEL LOGIC
        # ----------------------------------------------------
        flood_detected = False
        flood_depth = 0

        # Estimate flood from lower 25% of image (road surface)
        lower_region = frame[int(h * 0.75):, :]
        hsv = cv2.cvtColor(lower_region, cv2.COLOR_BGR2HSV)
        # Water/wet road reflectivity: low saturation, moderate brightness
        sat_mean = np.mean(hsv[:, :, 1])
        val_mean = np.mean(hsv[:, :, 2])

        if simulate_scenario == "flood":
            flood_detected = True
            flood_depth = 26 # 26cm - dangerous level
        elif len(vehicles) > 0 and (sat_mean < 45 and val_mean > 70):
            # Potential water reflection
            flood_detected = True
            flood_depth = 18

        # ----------------------------------------------------
        # ANNOTATION
        # ----------------------------------------------------
        annotated = results.plot()

        # Overlay HUD on frame
        hud_color = (0, 255, 0)
        status_text = "STATUS: BINH THUONG"

        if accident_detected:
            hud_color = (0, 0, 255) # Red
            status_text = f"SOS: {accident_reason.upper()}"
            cv2.rectangle(annotated, (0, 0), (w, h), (0, 0, 255), 4)
        elif flood_detected:
            hud_color = (0, 165, 255) # Orange
            status_text = f"CANH BAO NGAP: {flood_depth}cm - NGUY HIEM"
            cv2.rectangle(annotated, (0, 0), (w, h), (0, 165, 255), 4)

        # Draw status bar
        cv2.rectangle(annotated, (10, 10), (w - 10, 50), (20, 20, 20), -1)
        cv2.putText(annotated, f"UrbanShield EdgeAI - {status_text}", (20, 38),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, hud_color, 2)

        infer_time_ms = round((time.time() - start_time) * 1000, 1)

        # Return structured analysis
        return {
            "fps": round(1000 / max(1, infer_time_ms), 1),
            "infer_time_ms": infer_time_ms,
            "detections_count": len(detections),
            "detections": detections,
            "accident": {
                "detected": accident_detected,
                "reason": accident_reason
            },
            "flood": {
                "detected": flood_detected,
                "depth_cm": flood_depth
            },
            "annotated_frame": annotated
        }
