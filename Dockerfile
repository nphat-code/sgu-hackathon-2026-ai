# Multi-stage Dockerfile for Google Cloud Run Deployment
# Stage 1: Build React WebGIS Dashboard Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage 2: Production Python Backend + Pre-built Frontend (Single Container)
FROM python:3.10-slim
WORKDIR /app

# Install minimal OS dependencies for OpenCV CPU headless
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# Copy backend application code
COPY backend/ ./backend/

# Copy compiled frontend build into backend static directory
COPY --from=frontend-builder /app/frontend/dist ./backend/static/

ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV STREAM_FPS=28.5

EXPOSE 8080

CMD ["sh", "-c", "uvicorn main:app --app-dir backend --host 0.0.0.0 --port ${PORT:-8080}"]

