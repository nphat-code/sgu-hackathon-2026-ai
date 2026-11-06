"""
UrbanShield Lite - Edge AI Minimal API Gateway
Refactored Clean Architecture with FastAPI APIRouter.
"""

import os
import sys
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from routers.reports import router as reports_router
from routers.incidents import router as incidents_router
from routers.nodes import router as nodes_router


def _load_env_if_needed():
    """Tự động nạp cấu hình từ .env nếu có mà không phụ thuộc thư viện ngoài."""
    candidates = [
        ".env",
        os.path.join(os.path.dirname(__file__), "..", ".env"),
        os.path.join(os.path.dirname(__file__), ".env")
    ]
    for candidate in candidates:
        if os.path.exists(candidate):
            try:
                with open(candidate, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line and not line.startswith("#") and "=" in line:
                            k, v = line.split("=", 1)
                            k = k.strip()
                            v = v.strip().strip("'").strip('"')
                            if k and k not in os.environ:
                                os.environ[k] = v
                break
            except Exception:
                pass


_load_env_if_needed()

app = FastAPI(
    title="UrbanShield Lite - Edge AI Minimal API Gateway",
    version="2.0.0",
    description="Hệ thống giám sát ngập nước bánh xe máy 50cm & phát hiện ngã xe bất động 5s tại ngõ hẻm bằng Edge AI trên CPU."
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Modular Domain Routers with OpenAPI Tags
app.include_router(reports_router, tags=["Reports & Health Monitoring"])
app.include_router(incidents_router, tags=["Incidents & Telegram Alerts"])
app.include_router(nodes_router, tags=["Nodes & Camera Streams"])

# Production Single-Container SPA static serving (for Google Cloud Run / Cloud deployment)
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")
if not os.path.exists(STATIC_DIR):
    parent_dist = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
    if os.path.exists(parent_dist):
        STATIC_DIR = parent_dist

if os.path.exists(STATIC_DIR) and os.path.exists(os.path.join(STATIC_DIR, "index.html")):
    from fastapi.staticfiles import StaticFiles
    from fastapi.responses import FileResponse
    assets_dir = os.path.join(STATIC_DIR, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa_frontend(full_path: str):
        if (full_path.startswith("api/") or
            full_path.startswith("health") or
            full_path.startswith("stream/") or
            full_path.startswith("docs") or
            full_path.startswith("openapi.json")):
            raise HTTPException(status_code=404, detail="API endpoint not found")
        target_file = os.path.join(STATIC_DIR, full_path)
        if full_path and os.path.exists(target_file) and os.path.isfile(target_file):
            return FileResponse(target_file)
        return FileResponse(os.path.join(STATIC_DIR, "index.html"))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
