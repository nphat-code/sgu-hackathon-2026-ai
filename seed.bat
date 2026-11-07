@echo off
chcp 65001 > nul
echo ========================================================
echo  URBANSHIELD LITE - HACKATHON REPO SEEDER LAUNCHER
echo ========================================================
backend\venv\Scripts\python.exe scripts\seed_fresh_repo.py %*
pause
