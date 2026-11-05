"""
UrbanShield Lite - Standalone Video Test Tool
Test ANY arbitrary video file or webcam with the AI Edge Engine.

Usage:
  backend\\venv\\Scripts\\python.exe backend/test_video.py <path_to_video> [--show] [--save] [--fps 28.5]

Examples:
  backend\\venv\\Scripts\\python.exe backend/test_video.py my_flood_video.mp4
  backend\\venv\\Scripts\\python.exe backend/test_video.py backend/videos/flood_6.mp4 --show
  backend\\venv\\Scripts\\python.exe backend/test_video.py test.mp4 --save output.mp4
"""

import os
import sys
import time
import argparse
import cv2
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from detector import UrbanShieldDetector


def test_video(
    video_source: str,
    show_window: bool = False,
    save_output: str = None,
    target_fps: float = 28.5
):
    print("=" * 70)
    print("🔍 URBANSHIELD LITE - CÔNG CỤ CHẠY THỬ VIDEO TÙY CHỌN")
    print(f"Nguồn video: {video_source}")
    print("=" * 70)

    # Check if webcam or file
    if video_source.isdigit():
        cap = cv2.VideoCapture(int(video_source))
    else:
        if not os.path.exists(video_source):
            # Check inside backend/videos/
            alt_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "videos", video_source)
            if os.path.exists(alt_path):
                video_source = alt_path
            else:
                print(f"❌ LỖI: Không tìm thấy file video: '{video_source}'")
                print("💡 Mẹo: Bạn có thể copy video vào thư mục 'backend/videos/' hoặc truyền đường dẫn đầy đủ.")
                return

        cap = cv2.VideoCapture(video_source)

    if not cap.isOpened():
        print(f"❌ Không thể mở luồng video từ: {video_source}")
        return

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    src_fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    print(f"[*] Đã nạp video: {total_frames} frames, FPS gốc: {src_fps:.1f}")

    detector = UrbanShieldDetector()
    detector.node_ema_depth["test_node"] = 0.0

    writer = None
    if save_output:
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        writer = cv2.VideoWriter(save_output, fourcc, target_fps, (640, 360))
        print(f"[*] Đang lưu video kết quả có vẽ Bounding Box vào: {save_output}")

    frame_count = 0
    measured_depths = []
    fall_incidents = 0
    start_time = time.time()

    print("\n🚀 Bắt đầu phân tích khung hình (Nhấn 'q' để dừng nếu mở cửa sổ xem):")

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret or frame is None:
            break

        frame_count += 1
        frame_resized = cv2.resize(frame, (640, 360))

        # Run Edge AI inference
        t0 = time.perf_counter()
        analysis = detector.infer(frame_resized, "test_node")
        latency_ms = (time.perf_counter() - t0) * 1000.0

        # Draw HUD Bounding Box + Waterline
        annotated = detector.render_hud(frame_resized, analysis, stream_fps=target_fps)

        depth = analysis.get("flood", {}).get("depth_cm", 0.0)
        level = analysis.get("flood", {}).get("level", "SAFE")
        has_ref = analysis.get("flood", {}).get("has_reference", False)
        accident = analysis.get("accident", {}).get("detected", False)
        motionless = analysis.get("accident", {}).get("motionless_sec", 0.0)

        if depth > 0:
            measured_depths.append(depth)
        if accident:
            fall_incidents += 1

        # Print progress every 15 frames
        if frame_count % 15 == 0 or frame_count == 1:
            ref_info = "Có xe tham chiếu" if has_ref else "Đang chờ xe tham chiếu"
            acc_info = f" | 🚨 CẢNH BÁO NGÃ XE ({motionless}s)" if accident else ""
            print(f"  Frame {frame_count:04d}/{total_frames} | Ngập: {depth:4.1f}cm ({level}) [{ref_info}] | Trễ: {latency_ms:.1f}ms{acc_info}")

        if writer:
            writer.write(annotated)

        if show_window:
            cv2.imshow("UrbanShield Lite - Test Viewer (Bam 'q' de thoat)", annotated)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                print("  [!] Người dùng đã bấm dừng.")
                break

    cap.release()
    if writer:
        writer.release()
    if show_window:
        cv2.destroyAllWindows()

    total_time = time.time() - start_time
    avg_fps = frame_count / total_time if total_time > 0 else target_fps
    avg_depth = float(np.median(measured_depths)) if measured_depths else 0.0

    print("\n" + "=" * 70)
    print("📊 BÁO CÁO KẾT QUẢ PHÂN TÍCH:")
    print(f" - Tổng số khung hình đã xử lý: {frame_count} frames")
    print(f" - Tốc độ phân tích trung bình: {avg_fps:.1f} FPS")
    print(f" - Mực nước trung vị đo được: {avg_depth:.1f} cm")
    if avg_depth >= 20.0:
        print(" - Đánh giá mức độ: 🔴 NGUY HIỂM (Vượt quá nửa bánh xe máy 50cm)")
    elif avg_depth >= 10.0:
        print(" - Đánh giá mức độ: 🟡 CẢNH BÁO (Nước mấp mé ống pô xe máy)")
    else:
        print(" - Đánh giá mức độ: 🟢 AN TOÀN (Nước xăm xắp mặt đường)")

    if fall_incidents > 0:
        print(f" - Sự cố ngã xe nằm bất động > 5s: 🚨 PHÁT HIỆN ({fall_incidents} frames)")
    else:
        print(" - Sự cố ngã xe: ✅ Không có sự cố ngã xe bất động")

    if save_output:
        print(f" - Video kết quả đã lưu tại: {os.path.abspath(save_output)}")
    print("=" * 70)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Chạy thử video bất kỳ với UrbanShield Lite AI")
    parser.add_argument("video", help="Đường dẫn file video (.mp4) hoặc số camera webcam (0, 1)")
    parser.add_argument("--show", action="store_true", help="Mở cửa sổ hiển thị trực tiếp bằng OpenCV GUI")
    parser.add_argument("--save", type=str, default=None, help="Lưu video đã vẽ Bounding Box ra file (ví dụ: output.mp4)")
    parser.add_argument("--fps", type=float, default=28.5, help="Tùy chỉnh FPS mục tiêu")

    args = parser.parse_args()
    test_video(args.video, show_window=args.show, save_output=args.save, target_fps=args.fps)

