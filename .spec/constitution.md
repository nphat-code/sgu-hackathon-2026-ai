# 📜 PROJECT CONSTITUTION (GITHUB SPEC KIT)
## PROJECT: URBANSHIELD LITE
### REPOSITORY: sgu-hackathon-2026-ai | TEAM: SINGLENODE

> **Purpose:** This document defines the non-negotiable principles, architectural invariants, privacy guardrails, and engineering standards for UrbanShield Lite. All technical specifications, development plans, and generated code MUST comply with this Constitution.

---

## 🏛️ ARTICLE I: CORE TECHNICAL PHILOSOPHY (PROBLEM-FIRST & ANTI-HYPE)

1. **Problem-First Invariant:**
   - Every feature must directly address a proven civil pain point: localized urban flooding in low-lying alleyways and unassisted traffic accidents during adverse weather.
   - Solutions must prioritize municipal reality and grassroots adoption over theoretical complexity.

2. **Anti-Hype & Technical Honesty:**
   - **No Superlatives:** Forbid the use of exaggerated terminology (e.g., "super-lightweight", "hyper-AI", "golden hour of rescue"). Use grounded, professional descriptions (e.g., "compact", "alert dispatch", "timely assistance").
   - **Accessible Hardware First:** The core vision pipeline MUST run comfortably on commodity consumer x86 CPUs (e.g., Intel Core i3/i5 4th gen or newer, 25-30 FPS) without requiring discrete GPUs.
   - **Geometric Ground-Truth:** Flood depth estimation must rely on physical optical geometry against standard motorcycle wheel dimensions (~50cm outer diameter), not unverifiable neural depth maps.

---

## 🛡️ ARTICLE II: PRIVACY-BY-DESIGN (CIVIL LIBERTY GUARDRAIL)

1. **Zero-Disk Video Storage:**
   - Video frames ingested from local community cameras MUST only exist temporarily within volatile system memory (RAM).
   - Once YOLOv8-nano inference and geometric analysis are complete, frame buffers MUST be released immediately (`del frame`).
   - The system is constitutionally forbidden from persisting raw video streams or arbitrary frame captures to persistent disk storage.

2. **No Facial or PII Tracking:**
   - The object detection model is restricted strictly to general mobility classes (`person`, `motorcycle`, `bicycle`, `car`).
   - Facial recognition (FR), biometric tracking, and automated license plate recognition (ALPR) are strictly prohibited.

---

## ⚡ ARTICLE III: BANDWIDTH & RESOURCE STEWARDSHIP

1. **Event-Driven Telemetry (< 150 Bytes):**
   - Edge nodes must never continuously stream video feeds to upstream servers or cloud infrastructure.
   - Communication with upstream dispatchers is strictly event-driven: only structured JSON alerts with payload sizes strictly under **150 bytes** are transmitted upon verified incident confirmation.

2. **Anti-False-Positive State Machines:**
   - All incident detections must pass a multi-stage debounce gate:
     - Fall detection requires a continuous stationary threshold of **> 5.0 seconds** before triggering an alert.
     - Temporary actions (bending down, pushing a broken motorcycle, unloading cargo) must gracefully reset the debounce timer.

---

## 🧪 ARTICLE IV: VERIFICATION & EMPIRICAL EVIDENCE

1. **Mandatory Test Evidence:**
   - No feature or optimization is considered complete without automated unit tests (`pytest`) covering happy paths, boundary conditions, and edge cases.
   - A human-readable and machine-verifiable Test Report ([`docs/TEST_REPORT.md`](file:///c:/Competition/HackathonSGU2026/docs/TEST_REPORT.md)) must be continuously maintained and updated with pass rates and latency benchmarks.

2. **Zero-Downtime Live Demo:**
   - Code artifacts must guarantee 100% stable execution during interactive live demonstrations without crashing or unhandled exceptions.
