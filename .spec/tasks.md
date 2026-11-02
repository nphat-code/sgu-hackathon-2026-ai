# 📋 TASKS BREAKDOWN (TASKS.MD)
## PROJECT: URBANSHIELD LITE
### REPOSITORY: sgu-hackathon-2026-ai | SPEC-DRIVEN DEVELOPMENT (SPEC KIT)

> **Legend:**
> - `[x]` Completed
> - `[ ]` Pending / Ready for execution

---

## 🏁 SPRINT 0: SPECIFICATION & INITIALIZATION (HOURS 00 - 02)

- [x] **TASK-001:** Setup `.spec/` directory conforming to GitHub Spec Kit:
  - [x] `constitution.md`: Core non-negotiable principles & privacy rules.
  - [x] `spec.md` / `functional-spec.md`: User stories & functional requirements.
  - [x] `plan.md` / `technical-spec.md`: Technical architecture & minimal API contract.
  - [x] `tasks.md`: Granular actionable checklist.
  - [x] `live-demo-spec.md`: 3-minute interactive demonstration sequence.
- [ ] **TASK-002:** Verify development environments (Python 3.10+ virtualenv, Node.js packages).
- [ ] **TASK-003:** Initialize `.specify/manifest.json` for SpecKit compatibility.

---

## 🧠 SPRINT 1: CORE AI ENGINE & GEOMETRIC VISION (HOURS 02 - 07)

- [ ] **TASK-010:** Calibrate optical wheel-occlusion flood depth algorithm with ~50cm motorcycle reference.
- [ ] **TASK-011:** Implement multi-stage fall detection state machine with strict $\ge 5.0\text{s}$ stationary debounce timer.
- [ ] **TASK-012:** Add CLAHE adaptive histogram equalization for low-light/nighttime camera feeds.
- [ ] **TASK-013:** Verify RAM-only volatile frame buffer lifecycle (`Zero-Disk write`).

---

## ⚡ SPRINT 2: MINIMAL API & TEXT REPORT ENGINE (HOURS 07 - 12)

- [ ] **TASK-020:** Refactor FastAPI endpoints to Minimal API standard with payload size strictly $< 150\text{ bytes}$.
- [ ] **TASK-021:** Implement `reporting.py` supporting Instant Alert (Template A) and Shift Digest (Template B).
- [ ] **TASK-022:** Integrate Telegram Bot webhook/dispatcher with GPS coordinates and concise text alerts.
- [ ] **TASK-023:** Expose `/health` endpoint returning system heartbeat, uptime, FPS, and memory footprint.

---

## 🗺️ SPRINT 3: WEBGIS DASHBOARD & LIVE DEMO SUITE (HOURS 12 - 16)

- [ ] **TASK-030:** Enhance Leaflet OpenStreetMap with real-time dynamic alleyway coloring (Green, Yellow, Red).
- [ ] **TASK-031:** Build 1-click scenario simulation switcher (Normal, Flood 22.5cm, Accident > 5s).
- [ ] **TASK-032:** Embed real-time hardware telemetry gauges (FPS counter, RAM usage).
- [ ] **TASK-033:** Implement 1-click "Export Plain-Text Report" button on Dashboard for field officers.

---

## 🧪 SPRINT 4: AUTOMATED TESTING & TEST REPORT (HOURS 16 - 20)

- [ ] **TASK-040:** Implement unit tests for flood depth calculation (`tests/test_flood_depth.py`).
- [ ] **TASK-041:** Implement unit tests for fall detection & 5s debounce (`tests/test_fall_detection.py`).
- [ ] **TASK-042:** Implement unit tests for Minimal API endpoints & payload constraints (`tests/test_minimal_api.py`).
- [ ] **TASK-043:** Implement unit tests for text report generation (`tests/test_text_report.py`).
- [ ] **TASK-044:** Automate test runner and generate verifiable [`docs/TEST_REPORT.md`](file:///c:/Competition/HackathonSGU2026/docs/TEST_REPORT.md).

---

## 🐳 SPRINT 5: CONTAINERIZATION, CI/CD & CLOUD READINESS (HOURS 20 - 24)

- [ ] **TASK-050:** Create production Dockerfiles (`backend/Dockerfile`, `frontend/Dockerfile`).
- [ ] **TASK-051:** Author `docker-compose.yml` for 1-command startup (`docker compose up -d`).
- [ ] **TASK-052:** Setup GitHub Actions CI pipeline (`.github/workflows/ci.yml`).
- [ ] **TASK-053:** Author Cloud Deployment Guide ([`docs/CLOUD_DEPLOYMENT_GUIDE.md`](file:///c:/Competition/HackathonSGU2026/docs/CLOUD_DEPLOYMENT_GUIDE.md)) for AWS / Google Cloud.
- [ ] **TASK-054:** Conduct 3-minute Live Demo dry run following `.spec/live-demo-spec.md`.
