# OmniFlow Bridge & Cloudflare Auth API Reference (v1.1.0)

OmniFlow provides two layers of APIs:
1. **Cloudflare Production Auth API** (`https://omniflow.sanifydigital.com`): Handles global payments, multi-device seat management, and cloud verification without requiring a local bridge.
2. **Local Loopback Bridge Daemon** (`http://127.0.0.1:8792`): Coordinates browser DevTools automation, FIFO media jobs, and filesystem downloads for local AI agents.

---

## 1. Cloudflare Production Auth Endpoints

### `POST /api/v1/auth/check-email`
Verifies user subscription and binds the requesting device.
- **Request Body**:
```json
{
  "email": "creator@example.com",
  "deviceId": "dev_4b8f21e09c1248a1",
  "deviceName": "Chrome on Windows",
  "platform": "chrome-extension",
  "replaceDeviceId": "optional_device_id_to_takeover"
}
```
- **Response `200 OK` (Active Studio Max User)**:
```json
{
  "success": true,
  "isPro": true,
  "tier": "max",
  "unlimited": true,
  "speedMultiplier": 10,
  "maxSlots": 4,
  "email": "creator@example.com",
  "licenseKey": "OMNI-MAX-A996-3F45-7E7D",
  "expiresAt": 1796563619304,
  "message": "Active Studio Max Subscription found (10x Speed Multiplier)!"
}
```
- **Error `409 Conflict` (Device Limit Reached)**:
```json
{
  "error": "DEVICE_LIMIT_REACHED",
  "tier": "pro",
  "maxSlots": 2,
  "activeDevices": [
    {
      "deviceId": "dev_office_pc",
      "deviceName": "Office Desktop (Win11)",
      "lastActive": 1793961126000
    },
    {
      "deviceId": "dev_home_laptop",
      "deviceName": "MacBook Pro M3",
      "lastActive": 1793951126000
    }
  ],
  "message": "Device limit reached (2 max). Select an existing device to replace."
}
```

### `POST /api/v1/license/bind`
Direct cloud license key verification with hardware seat takeover. Bypasses the local bridge.
- **Request Body**:
```json
{
  "licenseKey": "OMNI-PRO-D215-AE10-AF88",
  "deviceId": "dev_4b8f21e09c1248a1",
  "deviceName": "Chrome on Windows",
  "replaceDeviceId": "optional_device_id_to_takeover"
}
```
- **Response `200 OK`**:
```json
{
  "valid": true,
  "tier": "pro",
  "speedMultiplier": 5,
  "maxSlots": 2,
  "unlimited": true,
  "expiresAt": 1799145059106,
  "seatBound": true
}
```

### `POST /api/v1/auth/unlink-device`
Releases a physical computer seat from Cloudflare D1 without cancelling the paid subscription.
- **Request Body**:
```json
{
  "email": "creator@example.com",
  "licenseKey": "OMNI-PRO-D215-AE10-AF88",
  "deviceId": "dev_4b8f21e09c1248a1"
}
```
- **Response `200 OK`**:
```json
{
  "success": true,
  "unlinked": true,
  "message": "Device seat released."
}
```

---

## 2. Local Loopback Bridge API (`127.0.0.1:8792`)

### `GET /health`
Quick ping endpoint to verify the bridge server is running.
```json
{
  "status": "ok",
  "bridgeVersion": "1.1.0"
}
```

### `GET /status`
Full state of bridge, browser extension, and Chrome tabs.
```json
{
  "bridge": "up",
  "bridgeVersion": "1.1.0",
  "extensionConnected": true,
  "extensionVersion": "1.0.0",
  "tabVisible": true,
  "browser": "chrome",
  "activeJobs": 0,
  "queuedJobs": 0,
  "quota": {
    "isPro": true,
    "tier": "max",
    "speedMultiplier": 10,
    "dailyUsage": 4,
    "dailyLimit": 999999,
    "remaining": 999995
  }
}
```

---

## 3. Jobs & Media Queue

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
- **Director Mode Screenplay Request**:
```json
{
  "mode": "flow-director-mode",
  "prompt": "Multi-shot scene continuation",
  "params": {
    "characterAnchorSeed": "anchor_img_9214a",
    "sceneIndex": 2,
    "handoffLastFrame": true,
    "aspectRatio": "16:9",
    "continuityDelta": "Maintain character jacket and lighting, camera pans left"
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
    "prompt": "Cinematic wide shot...",
    "status": "completed",
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
