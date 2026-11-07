@echo off
chcp 65001 > nul
echo ========================================================
echo  URBANSHIELD LITE - HACKATHON REPO SEEDER LAUNCHER
echo  Repo: https://github.com/nphat-code/singlenode-urbanshield-lite
echo ========================================================
backend\venv\Scripts\python.exe scripts\seed_fresh_repo.py --target "C:\Competition\singlenode-urbanshield-lite" --remote "https://github.com/nphat-code/singlenode-urbanshield-lite.git" %*
pause
