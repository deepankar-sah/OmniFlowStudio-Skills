# OmniFlow Bridge & Cloudflare Auth API Reference (v1.2.0)

OmniFlow provides two layers of APIs:
1. **Cloudflare Production Auth API** (`https://omniflow.sanifydigital.com`): Handles global payments, multi-device seat management, and cloud verification without requiring a local bridge.
2. **Local Loopback Bridge Daemon** (`http://127.0.0.1:8792`): Coordinates browser DevTools automation, FIFO media jobs, autonomous error recovery, and filesystem downloads for local AI agents.

---

## 1. Local Loopback Bridge API (`127.0.0.1:8792`)

### `GET /health`
Quick health check ping.
```json
{
  "status": "ok",
  "bridgeVersion": "1.2.0"
}
```

### `GET /status`
Full state of bridge, browser extension, and Chrome tabs.
```json
{
  "bridge": "up",
  "bridgeVersion": "1.2.0",
  "extensionConnected": true,
  "extensionVersion": "1.0.0",
  "tabVisible": true,
  "browser": "chrome",
  "activeJobs": 0,
  "queuedJobs": 0,
  "quota": {
    "tier": "max",
    "dailyUsage": 3,
    "dailyLimit": 999999,
    "remaining": 999996
  }
}
```

### `POST /reload-extension`
Hot-reloads the unpacked Chrome extension and re-attaches DevTools hooks.
```bash
curl -X POST http://127.0.0.1:8792/reload-extension
```

---

## 2. Autonomous Studio Control & Self-Healing Endpoints

### `POST /flow/retry`
Autonomously detects unhandled failed generation tiles or "unusual activity" notices on Google Flow and triggers an in-page retry.
- **Deduplication Guarantee**: Strictly capped at 1 retry per tile instance. Never double-clicks or loops.
- **Response**:
```json
{
  "success": true,
  "data": {
    "success": true,
    "method": "in-page-retry"
  }
}
```
If no unhandled failed card exists:
```json
{
  "success": false,
  "error": "Error: No retryable failed tile found"
}
```

### `GET /flow/settings`
Scrapes all categorized generation settings from Google Flow across 7 distinct categories.
- **Response**:
```json
{
  "success": true,
  "data": {
    "mode": "video",
    "videoSubtype": "frames",
    "aspectRatio": "16:9",
    "videoQuality": "1080p",
    "model": "veo-3.1-fast",
    "duration": "6s",
    "outputsPerPrompt": 1
  }
}
```

### `POST /flow/configure`
Autonomously applies settings across the 7 categories directly in the Google Flow DOM.
- **Request Body**:
```json
{
  "mode": "video",
  "aspectRatio": "16:9",
  "model": "veo-3.1-fast",
  "duration": "6",
  "outputsPerPrompt": 1
}
```

### `GET /flow/state`
Returns real-time DOM telemetry: current canvas title, active character handles, attached ingredients, and recent media URLs.

### `POST /flow/stitch`
Studio Max Lossless Video Stitcher: Concatenates multiple scene MP4 files into a single master video in `Downloads/`.
- **Request Body**:
```json
{
  "sceneFiles": [
    "C:/Users/ASUS/Downloads/OmniFlow/Scene_1.mp4",
    "C:/Users/ASUS/Downloads/OmniFlow/Scene_2.mp4"
  ],
  "outputFilename": "Master_Cut.mp4"
}
```

### `POST /flow/characters`
Uploads a reference portrait image and registers it into Google Flow's Character Library.
- **Request Body**:
```json
{
  "name": "ELENA",
  "base64": "data:image/png;base64,...",
  "mimeType": "image/png"
}
```

### `POST /flow/ingredients`
Attaches a reference image directly into the Google Flow prompt composer.

---

## 3. Media Generation Queue Endpoints

### `POST /jobs`
Submits a media generation job to the sequential FIFO queue.
- **Request Body**:
```json
{
  "mode": "flow-text-to-video",
  "prompt": "[Camera: drone-wide] Cyberpunk rain-slicked metropolis at dusk, 8k",
  "params": {
    "aspectRatio": "16:9",
    "duration": "6s",
    "videoModel": "veo-3.1-fast",
    "downloadSubfolder": "Cyberpunk_Teaser",
    "autoRenameFiles": true
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

### `GET /jobs`
Lists all queued, running, and completed generation jobs with their local download paths.
- **Response `200 OK`**:
```json
[
  {
    "id": "job_1730700000_a1b2c",
    "mode": "flow-text-to-video",
    "prompt": "[Camera: drone-wide] Cyberpunk rain-slicked metropolis at dusk, 8k",
    "status": "completed",
    "percentage": 100,
    "files": [
      {
        "filename": "Cyberpunk_Teaser_001.mp4",
        "path": "C:\\Users\\ASUS\\Downloads\\Cyberpunk_Teaser\\Cyberpunk_Teaser_001.mp4",
        "mimeType": "video/mp4",
        "sizeBytes": 14589200
      }
    ]
  }
]
```

---

## 4. Cloudflare Production Auth Endpoints

### `POST https://omniflow.sanifydigital.com/api/v1/auth/check-email`
Verifies user subscription in Cloudflare D1 and binds the requesting hardware seat.

### `POST https://omniflow.sanifydigital.com/api/v1/license/bind`
Cloud license key validation with hardware seat takeover (Spotify/Cursor style).

### `POST https://omniflow.sanifydigital.com/api/v1/auth/unlink-device`
Releases a physical computer seat without cancelling the user's paid subscription.
