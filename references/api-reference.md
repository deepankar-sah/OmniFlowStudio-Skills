# OmniFlow Bridge REST API Reference

The OmniFlow Bridge Daemon runs on local loopback `http://127.0.0.1:8792`. It exposes HTTP and WebSocket endpoints to enable local AI agents to submit jobs and inspect studio state.

---

## 1. System & Health

### `GET /health`
Quick ping endpoint to verify the bridge server is running.
- **Response `200 OK`**:
```json
{
  "status": "ok",
  "bridgeVersion": "1.0.0"
}
```

### `GET /status`
Full state of bridge, browser extension, and Chrome tabs.
- **Response `200 OK`**:
```json
{
  "bridge": "up",
  "bridgeVersion": "1.0.0",
  "extensionConnected": true,
  "extensionVersion": "1.0.0",
  "tabVisible": true,
  "browser": "chrome",
  "activeJobs": 0,
  "queuedJobs": 0,
  "quota": {
    "isPro": true,
    "dailyUsage": 4,
    "dailyLimit": 999999,
    "remaining": 999995
  }
}
```

---

## 2. Jobs & Media Queue

### `POST /jobs`
Submits a new generation job to the sequential FIFO queue.
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "mode": "flow-text-to-video",
  "prompt": "Cinematic wide shot of an ancient sandstone temple illuminated by bioluminescent moss at dusk",
  "params": {
    "aspectRatio": "16:9",
    "duration": "6s",
    "videoModel": "veo-3.1-fast",
    "characterName": "EXPLORER",
    "downloadSubfolder": "Sandstone_Temple",
    "fileNameTemplate": "{character}_{index} - {slug}"
  }
}
```
- **Response `202 Accepted`**:
```json
{
  "jobId": "job_1730700000_a1b2c",
  "status": "queued"
}
```
- **Error `429 Too Many Requests`**:
```json
{
  "error": "QUOTA_EXCEEDED",
  "message": "Daily free limit reached (20/day). Upgrade to Pro for unlimited generation.",
  "quota": { "isPro": false, "dailyUsage": 20, "dailyLimit": 20 }
}
```

### `GET /jobs`
Lists all queued, running, and completed generation jobs with their local download paths.
- **Response `200 OK`**:
```json
[
  {
    "id": "job_1730700000_a1b2c",
    "mode": "flow-text-to-video",
    "prompt": "Cinematic wide shot...",
    "status": "completed",
    "stage": "rendering (100%)",
    "percentage": 100,
    "files": [
      {
        "filename": "EXPLORER_001 - cinematic-wide-shot.mp4",
        "path": "C:\\Users\\User\\Downloads\\Sandstone_Temple\\EXPLORER_001.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 14589200
      }
    ]
  }
]
```

---

## 3. Quota & Licensing

### `GET /quota`
Returns current tier, daily usage, and limits.
- **Response `200 OK`**:
```json
{
  "isPro": true,
  "dailyUsage": 12,
  "dailyLimit": 999999,
  "remaining": 999987,
  "userEmail": "creator@example.com"
}
```

### `POST /license/activate`
Activates an official OmniFlow Pro license key.
- **Body**: `{ "licenseKey": "OMNI-PRO-XXXX-XXXX-XXXX", "email": "user@domain.com" }`

---

## 4. Studio Controls

### `POST /flow/settings`
Directly configures active settings on the Google Flow canvas.
- **Body**:
```json
{
  "mode": "video",
  "aspectRatio": "16:9",
  "model": "veo-3.1-fast",
  "outputsPerPrompt": 1
}
```
