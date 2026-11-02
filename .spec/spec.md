# 📋 PRODUCT SPECIFICATION (SPEC.MD)
## PROJECT: URBANSHIELD LITE
### REPOSITORY: sgu-hackathon-2026-ai | SPEC-DRIVEN DEVELOPMENT (SPEC KIT)

---

## 🎯 1. OVERVIEW & USER STORIES

### US-01: Neighborhood Flood Depth Monitoring
- **As a** Ward Civil Defense Officer (Cán bộ Dân quân / Trực ban UBND),
- **I want to** immediately know the real-time flood depth in specific alleyways categorized into 3 actionable levels (<10cm Safe, 10-20cm Warning, >20cm Danger),
- **So that** I can deploy flood diversion barriers and warn residents before motorcycles stall.

### US-02: Rapid Fallen Motorcycle Incident Alert
- **As an** Alleyway Safety Volunteer / Resident Guard,
- **I want to** receive an automated text notification when a rider slips and remains fallen on the ground for more than 5 seconds,
- **So that** I can rush to help without relying on someone happening to walk by in the dark.

### US-03: Resident Privacy Preservation
- **As a** Citizen living in the monitored alleyway,
- **I want to** be certain that the security camera is not recording my daily life, capturing my face, or streaming my front door to an unknown cloud server,
- **So that** my constitutional privacy and freedom remain completely protected.

---

## 🔍 2. FUNCTIONAL ACCEPTANCE CRITERIA

### AC-01: Geometric Wheel-Occlusion Flood Measurement
- Given a video frame containing a moving or stationary motorcycle in water:
  - The detector identifies the motorcycle bounding box.
  - The lower region of the bounding box is analyzed for ground/water occlusion.
  - Depth is estimated as:
    $$\text{Depth} = 50\text{ cm} \times (1 - \text{Visible Wheel Ratio})$$
  - Values are clamped between $0\text{ cm}$ and $60\text{ cm}$.
  - System updates the status:
    - `SAFE`: $< 10\text{ cm}$
    - `WARNING`: $10 - 20\text{ cm}$
    - `DANGER`: $> 20\text{ cm}$

### AC-02: Debounced Fall & Accident Detection
- Given a person bounding box and a motorcycle bounding box:
  - Horizontal aspect ratio gate: $\text{Width} / \text{Height} > 1.15$.
  - Spatial proximity gate: Euclidean distance between centers $< 180\text{ pixels}$.
  - Inactivity timer gate: The candidate must remain stationary for $\ge 5.0\text{ seconds}$.
  - If the person stands up or walks before 5.0 seconds, the state is cleared with zero false alerts.

### AC-03: Minimal API Payload (< 150 Bytes)
- All incident reports dispatched to upstream receivers must strictly fit within 150 bytes:
  ```json
  {"node_id":"hem_254_q4","type":"FLOOD","val":22.5,"unit":"cm","time":1729145700}
  ```

### AC-04: Plain-Text Civil Report Generation
- The system must provide human-readable text summaries without sensationalist language:
  - **Instant Alert Template:** Location, timestamp, incident type, measured value, recommended action.
  - **Shift Digest Template:** Total events, peak water level, system uptime percentage.

---

## ⚡ 3. EDGE CASES & MITIGATIONS

1. **Heavy Rain & Low-Light Reflection (Nighttime):**
   - *Risk:* Water reflections create glare and false edge contours.
   - *Mitigation:* Apply Contrast Limited Adaptive Histogram Equalization (CLAHE) on the luminance channel prior to thresholding.
2. **Pedestrian Bending Down to Pick Up Belongings:**
   - *Risk:* Aspect ratio $W/H > 1.15$ momentarily triggered.
   - *Mitigation:* Inactivity timer requires $\ge 5.0\text{ seconds}$ continuous horizontal state. Casual movements or quick recovery reset the timer.
3. **Network Connection Drops (Local LAN Offline):**
   - *Risk:* Edge node cannot reach cloud servers.
   - *Mitigation:* Edge node functions completely autonomously; alerts are queued locally in SQLite and flushed once the network is restored.
