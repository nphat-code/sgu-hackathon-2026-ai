import cv2
import numpy as np
import os
import math
import time

VIDEOS_DIR = os.path.join(os.path.dirname(__file__), "videos")
os.makedirs(VIDEOS_DIR, exist_ok=True)

WIDTH = 640
HEIGHT = 480
FPS = 25

def draw_cctv_hud(frame, camera_name, frame_idx, total_frames, extra_info=""):
    """Overlays realistic CCTV timestamp, camera ID and recording indicator."""
    # Blinking REC dot
    if (frame_idx // 12) % 2 == 0:
        cv2.circle(frame, (25, 25), 6, (0, 0, 240), -1)
    cv2.putText(frame, "REC", (38, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (220, 220, 220), 1)

    # Timestamp
    curr_sec = int(frame_idx / FPS)
    timestamp_str = f"2026-11-03 10:15:{curr_sec:02d}.{(frame_idx % FPS)*40:03d}"
    cv2.putText(frame, camera_name, (90, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
    cv2.putText(frame, timestamp_str, (WIDTH - 240, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

    if extra_info:
        cv2.putText(frame, extra_info, (20, HEIGHT - 20), cv2.FONT_HERSHEY_SIMPLEX, 0.55, (0, 255, 255), 2)

def draw_alley_background():
    """Generates an overhead perspective view of a typical Vietnamese alley."""
    bg = np.zeros((HEIGHT, WIDTH, 3), dtype=np.uint8)

    # Upper portion: Alley walls and houses (dark tones)
    bg[:180, :] = [50, 50, 55]

    # Wall texture and doorway
    for x in range(0, WIDTH, 160):
        # House rolling doors / walls
        cv2.rectangle(bg, (x + 10, 40), (x + 150, 180), (65, 60, 60), -1)
        # Door frame
        cv2.rectangle(bg, (x + 20, 60), (x + 140, 180), (80, 75, 70), 1)
        for y_door in range(70, 180, 15):
            cv2.line(bg, (x + 20, y_door), (x + 140, y_door), (50, 45, 45), 1)

    # Sidewalk curb
    bg[180:210, :] = [90, 90, 95] # Sidewalk surface
    # Yellow-black safety stripes on curb
    for x in range(0, WIDTH, 40):
        color = (30, 200, 220) if (x // 40) % 2 == 0 else (30, 30, 30)
        cv2.rectangle(bg, (x, 205), (x + 40, 215), color, -1)

    # Asphalt road (perspective from y=215 to y=480)
    bg[215:, :] = [45, 45, 48]

    # Road asphalt subtle grain
    noise = np.random.randint(-5, 6, (HEIGHT - 215, WIDTH, 3), dtype=np.int16)
    road_area = bg[215:, :].astype(np.int16) + noise
    bg[215:, :] = np.clip(road_area, 0, 255).astype(np.uint8)

    # Lane markings (dashed center line)
    for x in range(0, WIDTH, 70):
        cv2.line(bg, (x, 345), (x + 35, 345), (200, 200, 200), 2)

    return bg

def draw_motorcycle(frame, x, y, direction=1, scale=1.0, color=(30, 160, 240), submerged_px=0):
    """
    Draws a realistic motorcycle with rider seen from high-angle CCTV.
    direction: 1 (left to right), -1 (right to left)
    submerged_px: how many pixels from the bottom of wheels are submerged in water
    """
    w_bike = int(90 * scale)
    h_bike = int(55 * scale)

    wheel_radius = int(16 * scale)
    wheel_y = y + h_bike - wheel_radius

    # Wheel 1 (front)
    wheel1_x = x + int(18 * scale) if direction == -1 else x + w_bike - int(18 * scale)
    # Wheel 2 (rear)
    wheel2_x = x + w_bike - int(18 * scale) if direction == -1 else x + int(18 * scale)

    # Draw wheels (if not fully submerged)
    for wx in [wheel1_x, wheel2_x]:
        cv2.circle(frame, (wx, wheel_y), wheel_radius, (15, 15, 15), -1)
        cv2.circle(frame, (wx, wheel_y), wheel_radius - 4, (120, 120, 120), 2)
        cv2.circle(frame, (wx, wheel_y), 4, (180, 180, 180), -1)

    # Bike body / frame
    pts_body = np.array([
        [x + int(15 * scale), y + int(35 * scale)],
        [x + int(45 * scale), y + int(25 * scale)],
        [x + int(75 * scale), y + int(30 * scale)],
        [x + int(60 * scale), y + int(48 * scale)],
        [x + int(25 * scale), y + int(48 * scale)],
    ], np.int32)
    cv2.fillPoly(frame, [pts_body], color)
    cv2.polylines(frame, [pts_body], True, (20, 20, 20), 2)

    # Exhaust pipe (silver/grey)
    ex_x1 = x + int(20 * scale) if direction == 1 else x + int(50 * scale)
    ex_x2 = x + int(50 * scale) if direction == 1 else x + int(20 * scale)
    cv2.line(frame, (ex_x1, y + int(45 * scale)), (ex_x2, y + int(43 * scale)), (170, 170, 175), 4)

    # Headlight
    hl_x = x + w_bike if direction == 1 else x
    cv2.circle(frame, (hl_x, y + int(28 * scale)), 5, (100, 255, 255), -1)

    # Rider body
    rider_center_x = x + int(45 * scale)
    rider_torso_y = y + int(12 * scale)
    # Torso (jacket)
    cv2.rectangle(frame, (rider_center_x - int(12 * scale), rider_torso_y),
                  (rider_center_x + int(12 * scale), y + int(32 * scale)), (40, 90, 150), -1)
    # Helmet
    helmet_y = y - int(6 * scale)
    cv2.circle(frame, (rider_center_x, helmet_y), int(12 * scale), (230, 60, 40), -1)
    cv2.circle(frame, (rider_center_x + (4 if direction == 1 else -4), helmet_y + 2),
               int(4 * scale), (30, 30, 30), -1) # Visor

    # Handlebar and arms
    arm_x = x + int(65 * scale) if direction == 1 else x + int(25 * scale)
    cv2.line(frame, (rider_center_x, rider_torso_y + 5), (arm_x, y + int(25 * scale)), (40, 90, 150), 3)

def draw_fallen_scene(frame, x, y, scale=1.0, elapsed_fallen_sec=0.0):
    """
    Draws a realistic fallen motorcycle and rider lying horizontally on the ground.
    Enforces aspect ratio W/H > 1.2 and proximity < 180px.
    """
    w_bike = int(110 * scale)
    h_bike = int(35 * scale)

    # Fallen motorcycle lying on its side
    # Wheels placed horizontally
    cv2.circle(frame, (x + 20, y + 25), 16, (20, 20, 20), -1)
    cv2.circle(frame, (x + 20, y + 25), 11, (100, 100, 100), 2)
    cv2.circle(frame, (x + 90, y + 22), 16, (20, 20, 20), -1)
    cv2.circle(frame, (x + 90, y + 22), 11, (100, 100, 100), 2)

    # Bike chassis horizontal on asphalt
    pts_chassis = np.array([
        [x + 15, y + 15],
        [x + 85, y + 10],
        [x + 95, y + 30],
        [x + 30, y + 35]
    ], np.int32)
    cv2.fillPoly(frame, [pts_chassis], (180, 50, 40))
    cv2.polylines(frame, [pts_chassis], True, (20, 20, 20), 2)
    # Headlight pointing sideways
    cv2.line(frame, (x + 95, y + 20), (x + 130, y + 20), (50, 200, 255), 2)

    # Fallen person lying horizontally next to the bike (distance ~ 45-60px)
    px = x + 35
    py = y + 42
    pw = 95 # Width > Height -> Aspect ratio = 95 / 24 = 3.95 > 1.15
    ph = 22

    # Body (jacket/clothes) lying prone
    cv2.rectangle(frame, (px + 20, py), (px + pw - 25, py + ph), (50, 100, 160), -1)
    cv2.polylines(frame, [np.array([[px+20, py], [px+pw-25, py], [px+pw-25, py+ph], [px+20, py+ph]])], True, (20, 20, 20), 1)

    # Legs extended
    cv2.line(frame, (px + pw - 25, py + 8), (px + pw, py + 6), (40, 40, 40), 5)
    cv2.line(frame, (px + pw - 25, py + 16), (px + pw - 5, py + 18), (40, 40, 40), 5)

    # Helmet/head on ground
    cv2.circle(frame, (px + 10, py + 11), 12, (240, 70, 50), -1)
    cv2.circle(frame, (px + 12, py + 12), 4, (30, 30, 30), -1)

    # If fallen, show timer badge on screen
    if elapsed_fallen_sec > 0:
        badge_color = (0, 0, 255) if elapsed_fallen_sec >= 5.0 else (0, 165, 255)
        text = f"BAT DONG: {elapsed_fallen_sec:.1f}s / 5.0s" if elapsed_fallen_sec < 5.0 else f"SOS: NGUOI NGA BAT DONG {elapsed_fallen_sec:.1f}s"
        cv2.rectangle(frame, (px - 10, py - 35), (px + 220, py - 10), (15, 15, 15), -1)
        cv2.rectangle(frame, (px - 10, py - 35), (px + 220, py - 10), badge_color, 2)
        cv2.putText(frame, text, (px - 5, py - 17), cv2.FONT_HERSHEY_SIMPLEX, 0.45, badge_color, 1)

# ==============================================================================
# 1. GENERATE NORMAL.MP4 (Normal Traffic Flow in Alley)
# ==============================================================================
def generate_normal_video():
    video_path = os.path.join(VIDEOS_DIR, "normal.mp4")
    print(f"[*] Generating: {video_path}...")
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(video_path, fourcc, FPS, (WIDTH, HEIGHT))

    total_frames = FPS * 10 # 10 seconds

    for i in range(total_frames):
        frame = draw_alley_background()

        # Motorbike 1 moving from left to right (y = 280)
        bike1_x = int(-100 + (i * 4.2)) % (WIDTH + 200) - 50
        draw_motorcycle(frame, bike1_x, 270, direction=1, scale=1.0, color=(30, 160, 240))

        # Motorbike 2 moving in opposite direction (y = 350)
        bike2_x = int(WIDTH + 100 - (i * 3.8)) % (WIDTH + 200) - 50
        draw_motorcycle(frame, bike2_x, 340, direction=-1, scale=1.1, color=(50, 180, 80))

        # Pedestrian walking on sidewalk
        ped_x = int(20 + (i * 1.5)) % (WIDTH - 40)
        cv2.circle(frame, (ped_x, 175), 8, (230, 200, 170), -1) # Head
        cv2.rectangle(frame, (ped_x - 6, 183), (ped_x + 6, 203), (120, 80, 140), -1) # Body
        cv2.line(frame, (ped_x - 3, 203), (ped_x - 3, 212), (30, 30, 30), 2) # Leg

        draw_cctv_hud(frame, "CAM-01 [HEM 254 NGUYEN HIEP]", i, total_frames, "TRANG THAI: BINH THUONG")
        out.write(frame)

    out.release()
    print(f"[+] Successfully saved {video_path}")

# ==============================================================================
# 2. GENERATE FLOOD.MP4 (Water Level ~26cm Submerging Wheels)
# ==============================================================================
def generate_flood_video():
    video_path = os.path.join(VIDEOS_DIR, "flood.mp4")
    print(f"[*] Generating: {video_path}...")
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(video_path, fourcc, FPS, (WIDTH, HEIGHT))

    total_frames = FPS * 10 # 10 seconds

    for i in range(total_frames):
        frame = draw_alley_background()

        # Water level covering the road from y=240 to bottom
        water_surface_y = 245
        water_overlay = frame.copy()

        # Muddy water color (Brownish-grey reflection typical of Saigon tides)
        cv2.rectangle(water_overlay, (0, water_surface_y), (WIDTH, HEIGHT), (115, 95, 75), -1)
        # Blend water surface with road
        cv2.addWeighted(water_overlay, 0.70, frame, 0.30, 0, frame)

        # Animated water waves / ripples
        for ripple_y in range(water_surface_y + 15, HEIGHT, 30):
            offset = int(math.sin((i * 0.15) + (ripple_y * 0.05)) * 15)
            for rx in range(0, WIDTH, 80):
                cv2.ellipse(frame, (rx + offset, ripple_y), (35, 6), 0, 0, 180, (145, 125, 105), 1)

        # Subtle rain streaks
        np.random.seed(i)
        for _ in range(40):
            rx = np.random.randint(0, WIDTH)
            ry = np.random.randint(0, HEIGHT - 20)
            cv2.line(frame, (rx, ry), (rx - 4, ry + 16), (190, 190, 205), 1)

        # Motorbike wading in flood water (slower speed due to high water)
        bike_x = int(-80 + (i * 2.5)) % (WIDTH + 180) - 40
        bike_y = 275
        draw_motorcycle(frame, bike_x, bike_y, direction=1, scale=1.05, color=(240, 140, 20), submerged_px=18)

        # Water splash / wake behind wheels
        if 0 < bike_x < WIDTH - 40:
            splash_offset = (i * 3) % 8
            cv2.ellipse(frame, (bike_x + 20, bike_y + 48), (22 + splash_offset, 6), 0, 0, 360, (210, 210, 220), -1)
            cv2.ellipse(frame, (bike_x + 80, bike_y + 48), (18 + splash_offset, 5), 0, 0, 360, (210, 210, 220), -1)

        # Water level indicator / Gauge pole on curb
        pole_x = 480
        cv2.rectangle(frame, (pole_x, 190), (pole_x + 12, 340), (240, 240, 240), -1)
        cv2.rectangle(frame, (pole_x, 190), (pole_x + 12, 340), (30, 30, 30), 2)
        # 10cm, 20cm, 30cm markers
        cv2.line(frame, (pole_x, 290), (pole_x + 12, 290), (0, 0, 255), 2)
        cv2.line(frame, (pole_x, 265), (pole_x + 12, 265), (0, 165, 255), 2)
        cv2.putText(frame, "MUC NUOC: 26cm (NGUY HIEM)", (pole_x - 170, 220), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (0, 165, 255), 1)

        draw_cctv_hud(frame, "CAM-02 [HEM 184 HUYNH TAN PHAT]", i, total_frames, "CANH BAO: NGAP NUOC 26cm - NGUY HIEM")
        out.write(frame)

    out.release()
    print(f"[+] Successfully saved {video_path}")

# ==============================================================================
# 3. GENERATE ACCIDENT.MP4 (Bike Falls, Rider Motionless > 5s)
# ==============================================================================
def generate_accident_video():
    video_path = os.path.join(VIDEOS_DIR, "accident.mp4")
    print(f"[*] Generating: {video_path}...")
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(video_path, fourcc, FPS, (WIDTH, HEIGHT))

    total_frames = FPS * 12 # 12 seconds
    fall_frame_start = int(FPS * 2.5) # Falls at t=2.5s (frame 62)

    for i in range(total_frames):
        frame = draw_alley_background()

        # Slick/wet road reflections
        wet_overlay = frame.copy()
        cv2.rectangle(wet_overlay, (0, 220), (WIDTH, HEIGHT), (60, 60, 70), -1)
        cv2.addWeighted(wet_overlay, 0.25, frame, 0.75, 0, frame)

        # Rain streaks
        np.random.seed(i)
        for _ in range(50):
            rx = np.random.randint(0, WIDTH)
            ry = np.random.randint(0, HEIGHT - 20)
            cv2.line(frame, (rx, ry), (rx - 3, ry + 14), (180, 180, 200), 1)

        if i < fall_frame_start:
            # Phase 1: Riding before fall
            bike_x = int(60 + (i * 4.2))
            draw_motorcycle(frame, bike_x, 300, direction=1, scale=1.05, color=(40, 120, 220))
            draw_cctv_hud(frame, "CAM-03 [HEM 98 TRAN XUAN SOAN]", i, total_frames, "TRANG THAI: BINH THUONG")
        elif i < fall_frame_start + 15:
            # Phase 2: Slipping / skidding transition (0.6s)
            skid_idx = i - fall_frame_start
            tilt_x = int(165 + (skid_idx * 3))
            tilt_y = int(300 + (skid_idx * 2))
            draw_fallen_scene(frame, tilt_x, tilt_y, scale=1.05, elapsed_fallen_sec=0.0)
            # Skid mark on asphalt
            cv2.line(frame, (150, 320), (tilt_x + 30, tilt_y + 25), (20, 20, 20), 3)
            draw_cctv_hud(frame, "CAM-03 [HEM 98 TRAN XUAN SOAN]", i, total_frames, "CANH BAO: TRUOT NGA XE MAY")
        else:
            # Phase 3: Fallen on road, motionless countdown
            elapsed_sec = (i - (fall_frame_start + 15)) / FPS
            fall_x = 210
            fall_y = 330
            # Skid marks
            cv2.line(frame, (150, 320), (fall_x + 30, fall_y + 25), (25, 25, 25), 4)

            draw_fallen_scene(frame, fall_x, fall_y, scale=1.05, elapsed_fallen_sec=elapsed_sec)

            if elapsed_sec >= 5.0:
                status_hud = f"SOS KHAN CAP: NGUOI NGA BAT DONG {elapsed_sec:.1f}s (> 5s)"
                # Flashing red border on full frame
                if (i // 6) % 2 == 0:
                    cv2.rectangle(frame, (0, 0), (WIDTH - 1, HEIGHT - 1), (0, 0, 255), 6)
            else:
                status_hud = f"THEO DOI: NGUOI NGA BAT DONG {elapsed_sec:.1f}s / 5.0s"

            draw_cctv_hud(frame, "CAM-03 [HEM 98 TRAN XUAN SOAN]", i, total_frames, status_hud)

        out.write(frame)

    out.release()
    print(f"[+] Successfully saved {video_path}")

if __name__ == "__main__":
    print("[*] Starting UrbanShield Lite Demo Video Generator...")
    generate_normal_video()
    generate_flood_video()
    generate_accident_video()
    print("[OK] All 3 demo videos successfully generated in:", VIDEOS_DIR)

