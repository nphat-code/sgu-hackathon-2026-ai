import os
import sys
import numpy as np

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from detector import estimate_wheel_flood_depth, UrbanShieldDetector


def test_wheel_flood_depth_safe_level():
    """Mức 1 (An toàn < 10cm): Bánh xe 50cm lộ rõ 44px/50px -> ngập 6.0cm."""
    depth_cm, level = estimate_wheel_flood_depth(visible_wheel_h_px=44.0, full_wheel_h_px=50.0, wheel_diameter_cm=50.0)
    assert depth_cm == 6.0
    assert level == "SAFE"


def test_wheel_flood_depth_warning_level():
    """Mức 2 (Chú ý 10-20cm): Bánh xe 50cm lộ 35px/50px -> ngập 15.0cm (mấp mé ống xả)."""
    depth_cm, level = estimate_wheel_flood_depth(visible_wheel_h_px=35.0, full_wheel_h_px=50.0, wheel_diameter_cm=50.0)
    assert depth_cm == 15.0
    assert level == "WARNING"


def test_wheel_flood_depth_danger_half_wheel():
    """Mức 3 (Nguy hiểm >= 20cm): Bánh xe 50cm ngập quá nửa (lộ 22px/50px -> ngập 28.0cm)."""
    depth_cm, level = estimate_wheel_flood_depth(visible_wheel_h_px=22.0, full_wheel_h_px=50.0, wheel_diameter_cm=50.0)
    assert depth_cm == 28.0
    assert level == "DANGER"


def test_wheel_flood_depth_edge_cases():
    """Kiểm tra trường hợp biên: chiều cao bánh bằng 0 hoặc bị che khuất hoàn toàn."""
    d_zero, l_zero = estimate_wheel_flood_depth(0.0, 0.0)
    assert d_zero == 0.0
    assert l_zero == "SAFE"

    d_full, l_full = estimate_wheel_flood_depth(0.0, 60.0, 50.0)
    assert d_full == 50.0
    assert l_full == "DANGER"


def test_clahe_night_and_day_preprocessing():
    """Kiểm tra thuật toán cân bằng sáng thích ứng CLAHE cho khung hình ban đêm thiếu sáng."""
    detector = UrbanShieldDetector()

    # Khung hình tối ban đêm (độ sáng thấp < 115) -> Bật CLAHE
    dark_frame = np.full((240, 320, 3), 35, dtype=np.uint8)
    _, clahe_dark = detector.preprocess_clahe(dark_frame)
    assert clahe_dark is True

    # Khung hình ban ngày đủ sáng và độ tương phản tốt -> Không cần bật CLAHE
    bright_frame = np.zeros((240, 320, 3), dtype=np.uint8)
    bright_frame[:120, :] = 220
    bright_frame[120:, :] = 70
    _, clahe_bright = detector.preprocess_clahe(bright_frame)
    assert clahe_bright is False
