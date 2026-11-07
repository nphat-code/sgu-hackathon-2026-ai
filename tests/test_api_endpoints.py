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


def test_process_time_and_clean_arch_headers():
    """Kiểm tra Header X-Process-Time và X-Backend-Architecture gắn tự động bởi middleware."""
    resp = client.get("/health")
    assert resp.status_code == 200
    assert "x-process-time" in resp.headers
    assert "ms" in resp.headers["x-process-time"]
    assert resp.headers.get("x-backend-architecture") == "Clean-FastAPI-Edge-v2"


def test_historical_incidents_pagination_from_sqlite():
    """Kiểm tra API phân trang lịch sử sự cố có Index từ SQLite: /api/v1/incidents/history."""
    resp = client.get("/api/v1/incidents/history?limit=2&page=1")
    assert resp.status_code == 200
    data = resp.json()
    assert "items" in data
    assert "pagination" in data
    assert data["pagination"]["limit"] == 2
    assert data["pagination"]["page"] == 1
    assert data["pagination"]["total_items"] >= 1
    assert len(data["items"]) <= 2


def test_consistent_v1_api_versioning():
    """Kiểm tra toàn bộ API hỗ trợ chuẩn RESTful v1: /api/v1/nodes, /api/v1/health."""
    resp_nodes = client.get("/api/v1/nodes")
    assert resp_nodes.status_code == 200
    assert len(resp_nodes.json()) >= 5

    resp_health = client.get("/api/v1/health")
    assert resp_health.status_code == 200
    assert resp_health.json()["status"] == "healthy"


def test_public_route_advisory_for_citizens():
    """Kiểm tra Cổng thông tin tra cứu lộ trình dân sinh: /api/v1/public/route-advisory."""
    resp = client.get("/api/v1/public/route-advisory")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "success"
    assert "timestamp_vn" in data
    assert data["total_routes_monitored"] >= 5
    assert len(data["routes"]) >= 5

    first_route = data["routes"][0]
    assert "station_name" in first_route
    assert "water_depth_cm" in first_route
    assert "detour_recommendation" in first_route
    assert "advisory" in first_route
    assert "scooter" in first_route["advisory"]
    assert "underbone" in first_route["advisory"]
    assert "car" in first_route["advisory"]
    assert "overall_action" in first_route["advisory"]


def test_public_route_advisory_filter_by_query_and_vehicle():
    """Kiểm tra lọc tra cứu lộ trình theo từ khóa tên đường và phân loại xe."""
    resp = client.get("/api/v1/public/route-advisory?query=tran+xuan+soan&vehicle=scooter")
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_routes_monitored"] >= 1
    matched = data["routes"][0]
    assert "Trần Xuân Soạn" in matched["station_name"]
    # Kiểm tra đã lọc đúng thông tin xe tay ga
    assert "scooter" in matched["advisory"]
    assert matched["advisory"]["scooter"]["status"] in ("SAFE", "WARNING", "DANGER")


def test_sqlite_data_retention_and_hot_backup():
    """Kiểm tra chính sách dọn dẹp dữ liệu cũ (Retention) và tính năng sao lưu nóng Online Hot-Backup."""
    from database import purge_old_incidents, create_online_backup
    
    # 1. Kiểm tra dọn dẹp sự cố cũ hơn 90 ngày (không bị lỗi)
    purged_count = purge_old_incidents(retention_days=90)
    assert purged_count >= 0

    # 2. Kiểm tra tạo Online Hot-Backup thành công và file tồn tại
    backup_file = create_online_backup()
    assert os.path.exists(backup_file)
    assert os.path.getsize(backup_file) > 0
    # Dọn dẹp file test backup sau khi kiểm thử xong
    try:
        os.remove(backup_file)
    except Exception:
        pass



