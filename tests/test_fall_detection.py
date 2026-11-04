import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from detector import evaluate_fall_candidate


def test_upright_person_riding_normally():
    """Người đi bộ hoặc ngồi thẳng trên xe (W/H < 0.9) -> Không phải ứng viên ngã xe."""
    res = evaluate_fall_candidate(
        box_w=45,
        box_h=120,
        person_center=(200.0, 250.0),
        vehicle_centers=[(205.0, 265.0)],
        motionless_sec=10.0
    )
    assert res["is_candidate"] is False
    assert res["detected"] is False


def test_person_bending_to_pick_up_item_under_5_seconds():
    """
    Chống báo động giả: Người dân cúi nhặt đồ hoặc dừng xe chống chân (W/H > 1.15)
    nhưng thời gian chỉ 2.8 giây (< 5.0 giây) -> Không kích hoạt báo động.
    """
    res = evaluate_fall_candidate(
        box_w=135,
        box_h=95,
        person_center=(300.0, 320.0),
        vehicle_centers=[(330.0, 325.0)],
        motionless_sec=2.8
    )
    assert res["is_candidate"] is True
    assert res["detected"] is False
    assert "Đang kiểm tra bất động" in res["reason"]


def test_person_fallen_motionless_over_5_seconds():
    """
    Phát hiện sự cố ngã xe thật: Khung người nằm ngang (W/H = 1.47 > 1.15)
    gần xe máy (< 180px) và nằm bất động liên tục 5.4 giây (>= 5.0 giây).
    """
    res = evaluate_fall_candidate(
        box_w=140,
        box_h=95,
        person_center=(320.0, 310.0),
        vehicle_centers=[(350.0, 315.0)],
        motionless_sec=5.4
    )
    assert res["is_candidate"] is True
    assert res["detected"] is True
    assert res["motionless_sec"] == 5.4
    assert "vượt ngưỡng 5s" in res["reason"]

