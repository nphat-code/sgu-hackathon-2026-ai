import os
import sys
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from main import app

client = TestClient(app)


def test_health_endpoint_and_privacy_zero_disk():
    """Kiểm tra /health trả về đúng cam kết kỹ thuật: FPS >= 25, RAM < 500MB, Zero-Disk."""
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "healthy"
    assert data["fps"] >= 25.0
    assert data["ram_used_mb"] < 500
    assert data["zero_disk_verified"] is True
    assert data["disk_files_written"] == 0


def test_flood_incident_minimal_api_under_150_bytes():
    """Kiểm tra POST /api/v1/incidents/flood đóng gói mẩu tin < 150 bytes."""
    resp = client.post("/api/v1/incidents/flood", json={
        "node_id": "node-sgu-01",
        "depth_cm": 23.5,
        "level": "DANGER"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "recorded"
    assert data["under_150_bytes"] is True
    assert data["payload_bytes"] < 150
    assert "23.5 cm" in data["text_report"]


def test_accident_incident_debounce_and_trigger():
    """Kiểm tra bộ lọc 5 giây trên API /api/v1/incidents/accident."""
    # Trường hợp < 5s -> Bỏ qua báo động giả
    resp_short = client.post("/api/v1/incidents/accident", json={
        "node_id": "node-sgu-03",
        "stationary_sec": 3.2,
        "vehicle": "motorcycle"
    })
    assert resp_short.status_code == 200
    assert resp_short.json()["alert_triggered"] is False

    # Trường hợp >= 5s -> Ghi nhận sự cố và tạo Text Report
    resp_valid = client.post("/api/v1/incidents/accident", json={
        "node_id": "node-sgu-03",
        "stationary_sec": 5.6,
        "vehicle": "motorcycle"
    })
    assert resp_valid.status_code == 200
    data_valid = resp_valid.json()
    assert data_valid["alert_triggered"] is True
    assert data_valid["payload_bytes"] < 150
    assert "5.6 giây" in data_valid["text_report"]


def test_geojson_map_segments():
    """Kiểm tra GET /api/v1/map/segments trả về GeoJSON LineString hợp lệ."""
    resp = client.get("/api/v1/map/segments")
    assert resp.status_code == 200
    geojson = resp.json()
    assert geojson["type"] == "FeatureCollection"
    assert len(geojson["features"]) >= 3
    first_feat = geojson["features"][0]
    assert first_feat["geometry"]["type"] == "LineString"
    assert first_feat["properties"]["status_color"] in ("green", "amber", "red")


def test_text_reports_anti_hype_compliance():
    """Kiểm tra Báo cáo văn bản (Mẫu A & Mẫu B) không chứa từ ngữ phóng đại bị cấm."""
    resp = client.get("/api/v1/reports/summary?type=instant&node_id=node-sgu-01")
    assert resp.status_code == 200
    data = resp.json()
    combined_text = (data["instant_report"] + " " + data["shift_report"]).lower()

    banned_phrases = ["siêu nhẹ", "siêu ai", "siêu nhanh", "thời gian vàng", "mắt thần"]
    for phrase in banned_phrases:
        assert phrase not in combined_text

