# 🛠️ TECHNICAL ARCHITECTURE PLAN (PLAN.MD)
## PROJECT: URBANSHIELD LITE
### REPOSITORY: sgu-hackathon-2026-ai | SPEC-DRIVEN DEVELOPMENT (SPEC KIT)

---

## 🏗️ 1. ARCHITECTURAL BLUEPRINT

```
┌────────────────────────────────────────────────────────┐
│                   EDGE TIER (COMMUNITY PC)             │
│   • Video Source: USB Webcam / RTSP IP Cam             │
│   • Model: YOLOv8-nano (~6.5MB ONNX/PyTorch) on CPU    │
│   • Algorithms: Wheel Occlusion Ratio + 5s Fall Debounce│
│   • Privacy Layer: Zero-Disk volatile memory frame buffer│
└──────────────────────────┬─────────────────────────────┘
                           │ Event JSON (<150 Bytes)
                           ▼
┌────────────────────────────────────────────────────────┐
│                   GATEWAY & DISPATCH TIER              │
│   • Framework: FastAPI (Minimal, Stateless, Uvicorn)   │
│   • Event Dispatcher: Telegram Bot API                 │
│   • Report Generator: Plain-Text Civil Templates       │
│   • Real-Time Bus: WebSocket Telemetry                 │
└──────────────────────────┬─────────────────────────────┘
                           │ JSON Telemetry / GeoJSON
                           ▼
┌────────────────────────────────────────────────────────┐
│                   OPERATIONAL DASHBOARD                │
│   • Framework: Vite + React 18 + Leaflet GIS           │
│   • Features: Live Alley Coloring, Simulation Toggles  │
│   • Tech Proofs: Real-time FPS, RAM Zero-Disk monitor  │
└────────────────────────────────────────────────────────┘
```

---

## 📦 2. COMPONENT DECOMPOSITION

1. **`detector.py` (Edge Vision Engine):**
   - Encapsulates `UrbanShieldDetector`.
   - Manages YOLOv8-nano model loading and CPU inference.
   - Computes motorcycle wheel geometry and horizontal human aspect ratio.
   - Enforces 5.0-second continuous debounce tracking.

2. **`reporting.py` (Text Report Engine):**
   - Generates structured, unembellished civil alerts and shift digests.
   - Formats outputs for Telegram and SMS delivery without hype words.

3. **`main.py` (FastAPI Minimal Gateway):**
   - Exposes RESTful endpoints: `/health`, `/api/v1/incidents/flood`, `/api/v1/incidents/accident`, `/api/v1/reports/summary`.
   - Manages WebSocket broadcaster for live Dashboard telemetry.

4. **`frontend/src/` (Dashboard WebGIS):**
   - Visualizes alleyway GeoJSON segments (`green`, `yellow`, `red`).
   - Provides 1-click simulation toggles for live demonstration.
   - Displays real-time hardware telemetry (FPS, RAM usage).

---

## 🔒 3. PRIVACY & SECURITY GUARDRAILS

- **RAM Isolation:** Video frames are immediately deleted from Python heap (`gc` / `del frame`) upon inference completion.
- **Payload Sanitization:** No video binaries or uncompressed base64 images are sent over public channels.
- **CORS & Environment:** Strict environment variable configurations for Telegram bot tokens and API keys (`.env`).

---

## 🚀 4. DEPLOYMENT & CONTAINERIZATION BLUEPRINT

- **Backend Container:** Python 3.10-slim with OpenCV headless and PyTorch CPU wheels (`backend/Dockerfile`).
- **Frontend Container:** Multi-stage build with Node.js 18 and Alpine Nginx (`frontend/Dockerfile`).
- **Orchestration:** `docker-compose.yml` defining networks, resource limits, and one-command execution (`docker compose up -d`).
