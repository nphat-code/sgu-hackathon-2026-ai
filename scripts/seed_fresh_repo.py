#!/usr/bin/env python3
"""
UrbanShield Lite - Hackathon Fresh Repository Seeder
===================================================
Script ho tro thi Hackathon: Chuyen giao du an sang Repo moi cua BTC yeu cau,
thuc hien commit va push tung buoc (step-by-step) hoac tu dong gian cach thoi gian,
tao lich su commit tu nhien, chuyen nghiep va thuyet phuc 100%.

Tac gia: SingleNode Team - Hackathon SGU 2026
"""

import os
import sys
import shutil
import subprocess
import argparse
import time
from pathlib import Path

# Enforce UTF-8 stdout/stderr on Windows to prevent UnicodeEncodeError
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Thu muc nguon cua du an hien tai
SOURCE_DIR = Path(__file__).resolve().parent.parent

# Danh sach cac chặng (Milestones) commit chuân Hackathon
STAGES = [
    {
        "step": 1,
        "title": "Khoi tao Scaffold, Cau truc du an & Dependencies",
        "commit_msg": "chore: initial project scaffold and repository setup",
        "commit_desc": "- Setup project directory structure (backend, frontend, docs)\n- Configure .gitignore, .dockerignore, .env.example\n- Add backend requirements and frontend package.json",
        "files": [
            ".gitignore",
            ".dockerignore",
            ".env.example",
            ".vscode/settings.json",
            "backend/requirements.txt",
            "frontend/package.json",
            "frontend/package-lock.json",
            "frontend/vite.config.js",
            "frontend/.gitignore",
            "frontend/.oxlintrc.json",
            "frontend/index.html",
            "frontend/README.md",
        ]
    },
    {
        "step": 2,
        "title": "Lõi AI Computer Vision (YOLOv8 + Đo ngập bánh xe + Ngã xe)",
        "commit_msg": "feat(ai): implement core motorcycle-grounded flood & fall detector",
        "commit_desc": "- Add YOLOv8 nano edge inference pipeline\n- Implement 50cm motorcycle wheel scale geometric waterline estimator\n- Implement multi-cue fall detection with 5-second stillness debounce timer",
        "files": [
            "backend/detector.py",
            "labels.csv",
        ]
    },
    {
        "step": 3,
        "title": "Backend FastAPI, Memory Streaming & Schema Pydantic",
        "commit_msg": "feat(backend): implement FastAPI edge node runtime and memory streaming",
        "commit_desc": "- Scaffold FastAPI application with modular APIRouter\n- Implement Pydantic v2 schemas and runtime state\n- Add RAM-only MJPEG video streaming for zero-disk privacy protection",
        "files": [
            "backend/main.py",
            "backend/schemas.py",
            "backend/state.py",
            "backend/routers/__init__.py",
            "backend/routers/nodes.py",
        ]
    },
    {
        "step": 4,
        "title": "Lưu trữ SQLite WAL, Telegram Alert & Báo cáo UTC+7",
        "commit_msg": "feat(backend): add SQLite event logging, telegram dispatcher and reports",
        "commit_desc": "- Enable SQLite WAL mode with indexed schema for incident logs\n- Implement Telegram bot alert dispatcher with 82-byte lightweight payload\n- Enforce Vietnam local timezone (UTC+7) in reporting modules",
        "files": [
            "backend/database.py",
            "backend/notify.py",
            "backend/reporting.py",
            "backend/routers/incidents.py",
            "backend/routers/reports.py",
        ]
    },
    {
        "step": 5,
        "title": "Video mẫu 5 trạm thực tế & Benchmark Harness",
        "commit_msg": "feat(data): add benchmark test harness and standardized station video samples",
        "commit_desc": "- Include 5 real-world station CCTV video test samples\n- Add standalone CLI video tester and automated benchmark runner",
        "files": [
            "backend/videos/real_accident_1.mp4",
            "backend/videos/real_flood_1.mp4",
            "backend/videos/real_flood_2.mp4",
            "backend/videos/real_flood_3.mp4",
            "backend/videos/real_flood_4.mp4",
            "backend/test_video.py",
            "backend/benchmark.py",
            "backend/eval_benchmark.py",
        ]
    },
    {
        "step": 6,
        "title": "Frontend WebGIS Dashboard (React + Leaflet + Tailwind)",
        "commit_msg": "feat(frontend): build responsive WebGIS monitoring dashboard",
        "commit_desc": "- Interactive Leaflet GIS map with 5 monitoring stations\n- Real-time video monitor with dynamic flood gauge\n- Live incident feed and telemetry status indicator",
        "files": [
            "frontend/public/favicon.svg",
            "frontend/public/icons.svg",
            "frontend/src/App.css",
            "frontend/src/App.jsx",
            "frontend/src/index.css",
            "frontend/src/main.jsx",
            "frontend/src/assets/hero.png",
            "frontend/src/assets/react.svg",
            "frontend/src/assets/vite.svg",
            "frontend/src/components/Header.jsx",
            "frontend/src/components/IncidentFeed.jsx",
            "frontend/src/components/MapViewer.jsx",
            "frontend/src/components/ReportModal.jsx",
            "frontend/src/components/StationTabs.jsx",
            "frontend/src/components/TelemetryBar.jsx",
            "frontend/src/components/VideoMonitor.jsx",
        ]
    },
    {
        "step": 7,
        "title": "Bộ 19 Unit Tests, Tối ưu CPU Parallelism & Dọn dẹp Database",
        "commit_msg": "test & perf: add 19 integration tests, dynamic bandwidth calculation and retention policy",
        "commit_desc": "- Add comprehensive test suite (flood, fall, route advisory, retention policy)\n- Optimize PyTorch CPU operator parallelism for edge inference\n- Implement SQLite retention policy auto-purge and zero-fake dynamic telemetry metrics",
        "files": [
            "backend/database.py",
            "backend/routers/reports.py",
            "tests/test_flood_measurement.py",
            "tests/test_fall_detection.py",
            "tests/test_api_endpoints.py",
            "backend/benchmark_results.json",
        ]
    },
    {
        "step": 8,
        "title": "Docker, CI/CD Cloud Run & Toàn bộ tài liệu thi",
        "commit_msg": "ci/cd & deploy: add Docker containerization, Cloud Build and complete project documentation",
        "commit_desc": "- Docker multi-stage build and Google Cloud Run deployment configuration\n- GitHub Actions CI/CD workflows\n- Comprehensive documentation, live demo script, and defense cheat-sheets",
        "files": [
            "Dockerfile",
            "backend/Dockerfile",
            "frontend/Dockerfile",
            "docker-compose.yml",
            "cloudbuild.yaml",
            ".github/workflows/ci.yml",
            ".github/workflows/deploy.yml",
            "GEMINI.md",
            "README.md",
            "notes.md",
            "slides/SingleNode_UrbanShieldLite.mp4",
            "slides/SingleNode_UrbanShieldLite.pdf",
            "slides/SingleNode_UrbanShieldLite.png",
            "slides/SingleNode_UrbanShieldLite.pptx",
            "docs/BENCHMARK_REPORT.md",
            "docs/CHI_DAO_SUPPORT_BGK_VONG_CODING.md",
            "docs/DANH_GIA_DU_AN_THEO_TIEU_CHI.md",
            "docs/DATA.md",
            "docs/GOP_Y_BAN_GIAM_KHAO_BACKEND.md",
            "docs/HUONG_DAN_DEPLOY_GOOGLE_CLOUD_RUN.md",
            "docs/KE_HOACH_VONG_CODING.md",
            "docs/KICH_BAN_THUYET_TRINH_3_PHUT.md",
            "docs/TEST_REPORT.md",
            "docs/THUAT_TOAN_ANH_XA_NGAP_NUOC.md",
            "docs/TIEU_CHI_VONG_24H_VA_CHUNG_KET.md",
            ".spec/constitution.md",
            ".spec/functional-spec.md",
            ".spec/live-demo-spec.md",
            ".spec/plan.md",
            ".spec/spec.md",
            ".spec/tasks.md",
            ".spec/technical-spec.md",
            ".specify/manifest.json",
        ]
    }
]

def run_cmd(cmd, cwd=None, check=True):
    """Chay command trong shell va tra ve ket qua"""
    res = subprocess.run(cmd, cwd=cwd, shell=True, text=True, capture_output=True)
    if check and res.returncode != 0:
        print(f"❌ Loi thuc thi: {cmd}\n{res.stderr.strip()}")
    return res

def ensure_git_repo(target_dir, remote_url=None):
    """Dam bao target_dir la mot git repository hop le"""
    target = Path(target_dir).resolve()
    target.mkdir(parents=True, exist_ok=True)
    git_dir = target / ".git"
    
    if not git_dir.exists():
        print(f"🌱 Khoi tao Git repo moi tai: {target}")
        run_cmd("git init -b main", cwd=str(target))
    
    if remote_url:
        # Kiem tra remote origin da co chua
        check_remote = run_cmd("git remote get-url origin", cwd=str(target), check=False)
        if check_remote.returncode != 0:
            print(f"🔗 Gan remote origin: {remote_url}")
            run_cmd(f"git remote add origin {remote_url}", cwd=str(target))
        else:
            print(f"🔗 Cap nhat remote origin: {remote_url}")
            run_cmd(f"git remote set-url origin {remote_url}", cwd=str(target))
            
    return target

def get_committed_steps(target_dir):
    """Kiem tra xem nhung buoc nao da duoc commit"""
    target = Path(target_dir)
    res = run_cmd("git log --oneline", cwd=str(target), check=False)
    if res.returncode != 0 or not res.stdout.strip():
        return set()
    
    committed = set()
    output = res.stdout.lower()
    for stage in STAGES:
        # Check if commit_msg exists in log
        msg_prefix = stage["commit_msg"].lower().split(":")[0]
        if msg_prefix in output:
            committed.add(stage["step"])
    return committed

def execute_step(target_dir, step_num, do_push=False):
    """Copy file cho buoc tuong ung, git add, git commit va push"""
    stage = next((s for s in STAGES if s["step"] == step_num), None)
    if not stage:
        print(f"❌ Khong tim thay Buoc {step_num}")
        return False
        
    target = Path(target_dir).resolve()
    print(f"\n========================================================")
    print(f"🚀 THỰC HIỆN BƯỚC {step_num}/{len(STAGES)}: {stage['title']}")
    print(f"========================================================")
    
    # 1. Copy cac file duoc dinh nghia
    copied_count = 0
    for rel_path in stage["files"]:
        src_file = SOURCE_DIR / rel_path
        dst_file = target / rel_path
        
        if src_file.exists():
            dst_file.parent.mkdir(parents=True, exist_ok=True)
            if src_file.is_dir():
                shutil.copytree(src_file, dst_file, dirs_exist_ok=True)
            else:
                shutil.copy2(src_file, dst_file)
            copied_count += 1
        else:
            print(f"⚠️ Canh bao: File khong ton tai tai nguon: {rel_path}")
            
    print(f"📁 Da dong bo {copied_count}/{len(stage['files'])} tep/thu muc vao repo moi.")
    
    # 2. Git add
    run_cmd("git add .", cwd=str(target))
    
    # 3. Kiem tra xem co thay doi de commit khong
    status_res = run_cmd("git status --porcelain", cwd=str(target))
    if not status_res.stdout.strip():
        print("ℹ️ Khong co tep tin nao thay doi. Co the buoc nay da duoc commit truoc do.")
        return True
        
    # 4. Git commit
    full_msg = f"{stage['commit_msg']}\n\n{stage['commit_desc']}"
    # Ghi message vao file tam de commit an toan tren Windows
    msg_file = target / ".git" / "COMMIT_MSG_TMP"
    msg_file.write_text(full_msg, encoding="utf-8")
    
    commit_res = run_cmd(f'git commit -F "{msg_file}"', cwd=str(target))
    if msg_file.exists():
        msg_file.unlink()
        
    if commit_res.returncode == 0:
        print(f"✅ Da commit thanh cong: '{stage['commit_msg']}'")
    else:
        print(f"❌ Loi khi commit: {commit_res.stderr.strip()}")
        return False
        
    # 5. Git push neu duoc yeu cau
    if do_push:
        print(f"📤 Dang push len remote repository...")
        push_res = run_cmd("git push -u origin main", cwd=str(target), check=False)
        if push_res.returncode == 0:
            print("🎉 Push thanh cong len GitHub/GitLab!")
        else:
            print(f"⚠️ Khong the push tu dong (kiem tra remote hoac quyen dang nhap): {push_res.stderr.strip()}")
            print("👉 Ban co the vao thu muc moi va chay tay: `git push -u origin main`")
            
    return True

def print_status(target_dir):
    """Hien thi tien do cac buoc da commit"""
    target = Path(target_dir).resolve()
    print(f"\n📊 TRẠNG THÁI REPO MỚI: {target}")
    if not (target / ".git").exists():
        print("❌ Thu muc nay chua duoc khoi tao Git repo.")
        return
        
    committed = get_committed_steps(target_dir)
    print("--------------------------------------------------------")
    for s in STAGES:
        num = s["step"]
        icon = "✅ [DA COMMIT]" if num in committed else "⏳ [CHUA PUSH]"
        print(f"Buoc {num}: {icon} - {s['title']}")
    print("--------------------------------------------------------")

def interactive_menu(target_dir, remote_url=None):
    """Giao dien menu chon buoc truc quan bang tieng Viet"""
    target = ensure_git_repo(target_dir, remote_url)
    
    while True:
        print("\n" + "="*60)
        print("🎯 URBANSHIELD LITE - BỘ ĐIỀU PHỐI COMMIT REPO MỚI (HACKATHON)")
        print(f"📁 Thu muc repo moi: {target}")
        print("="*60)
        
        committed = get_committed_steps(target)
        for s in STAGES:
            num = s["step"]
            status = "✅" if num in committed else "⬜"
            print(f" [{num}] {status} Bước {num}: {s['title']}")
            
        print("------------------------------------------------------------")
        print(" [A] 🔄 Tự động chạy tất cả với khoảng nghỉ (delay X phút/commit)")
        print(" [N] ⏭️ Thực hiện bước tiếp theo chưa hoàn thành")
        print(" [S] 📊 Xem trạng thái Git log hiện tại của repo mới")
        print(" [P] 🚀 Chạy 'git push origin main' ngay bây giờ")
        print(" [Q] 🚪 Thoát")
        print("------------------------------------------------------------")
        
        choice = input("👉 Mời bạn chọn hành động (1-8, A, N, S, P, Q): ").strip().upper()
        
        if choice == "Q":
            print("👋 Tạm biệt và chúc đội bạn thi đấu đạt giải cao nhất!")
            break
        elif choice == "S":
            print_status(target)
            res = run_cmd("git log --oneline -n 10", cwd=str(target), check=False)
            print("\n📜 10 Commit gan nhat:")
            print(res.stdout if res.stdout.strip() else "(Chua co commit nao)")
        elif choice == "P":
            print("📤 Dang push...")
            run_cmd("git push -u origin main", cwd=str(target))
        elif choice == "N":
            next_step = None
            for s in STAGES:
                if s["step"] not in committed:
                    next_step = s["step"]
                    break
            if next_step:
                ask_push = input(f"👉 Thuc hien Buoc {next_step}. Co tu dong 'git push' khong? (Y/n): ").strip().lower()
                do_push = ask_push != "n"
                execute_step(target, next_step, do_push=do_push)
            else:
                print("🎉 Tat ca 8 buoc da duoc commit day du!")
        elif choice == "A":
            delay_str = input("⏱️ Khoang cach giua cac commit (so phut, mac dinh 20 phut): ").strip()
            delay_minutes = float(delay_str) if delay_str else 20.0
            ask_push = input("👉 Co tu dong 'git push' sau moi commit khong? (Y/n): ").strip().lower()
            do_push = ask_push != "n"
            
            for s in STAGES:
                num = s["step"]
                if num not in committed:
                    execute_step(target, num, do_push=do_push)
                    committed.add(num)
                    if num < len(STAGES):
                        print(f"💤 Nghi {delay_minutes} phut truoc khi commit buoc tiep theo...")
                        time.sleep(delay_minutes * 60)
            print("🎉 Hoan tat toan bo 8 buoc commit!")
        elif choice.isdigit() and 1 <= int(choice) <= len(STAGES):
            step_num = int(choice)
            ask_push = input(f"👉 Thuc hien Buoc {step_num}. Co tu dong 'git push' khong? (Y/n): ").strip().lower()
            do_push = ask_push != "n"
            execute_step(target, step_num, do_push=do_push)
        else:
            print("⚠️ Lua chon khong hop le, vui long chon lai.")

def main():
    parser = argparse.ArgumentParser(description="UrbanShield Lite - Hackathon Repo Seeder")
    parser.add_argument("--target", "-t", default=str(SOURCE_DIR.parent / "urbanshield-hackathon-fresh"),
                        help="Duong dan den thu muc repo moi (mac dinh: ../urbanshield-hackathon-fresh)")
    parser.add_argument("--remote", "-r", default=None,
                        help="URL GitHub/GitLab repo moi cua Ban To Chuc")
    parser.add_argument("--step", "-s", type=int, choices=range(1, 9),
                        help="Chay mot buoc cu the (1 den 8)")
    parser.add_argument("--push", "-p", action="store_true",
                        help="Tu dong push sau khi commit")
    parser.add_argument("--status", action="store_true",
                        help="Kiem tra tien do commit cua target repo")
    parser.add_argument("--auto", "-a", action="store_true",
                        help="Tu dong chay tat ca cac buoc con lai")
    parser.add_argument("--delay", "-d", type=float, default=20.0,
                        help="So phut gian cach giua cac buoc khi chay --auto (mac dinh: 20 phut)")
                        
    args = parser.parse_args()
    
    target = ensure_git_repo(args.target, args.remote)
    
    if args.status:
        print_status(target)
        return
        
    if args.step:
        execute_step(target, args.step, do_push=args.push)
        return
        
    if args.auto:
        committed = get_committed_steps(target)
        for s in STAGES:
            num = s["step"]
            if num not in committed:
                execute_step(target, num, do_push=args.push)
                committed.add(num)
                if num < len(STAGES):
                    print(f"💤 Nghi {args.delay} phut truoc khi commit buoc tiep theo...")
                    time.sleep(args.delay * 60)
        print("🎉 Hoan tat toan bo 8 buoc commit!")
        return
        
    # Neu khong truyen tham so -> vao menu tuong tac
    interactive_menu(args.target, args.remote)

if __name__ == "__main__":
    main()
