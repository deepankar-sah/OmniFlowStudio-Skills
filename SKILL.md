---
name: omniflow-studio
description: Autonomous AI media generation, cinematic multi-shot film production, and Google Flow automation bridge. Enables AI agents to queue text-to-video, text-to-image, and character consistency workflows with zero API costs.
compatibility: Claude Code, Google Antigravity, Cursor, Codex, OpenGSD, MCP-compatible agents
metadata:
  author: Deepankar Sah (Sanify Digital)
  version: 1.1.0
  port: 8792
  protocol: HTTP / WebSocket / MCP Stdio / Cloudflare Auth
---

# OmniFlow Studio Agent Skill (v1.1.0)

This skill grants AI coding and orchestration agents direct control over **OmniFlow Studio** — an autonomous bridge connecting local AI agents to high-fidelity generative media canvases in Google Chrome.

## When to Use This Skill

Use this skill whenever:
1. The user asks to generate cinematic AI videos, B-roll footage, concept art, or storyboards.
2. Directing an autonomous multi-shot short film or ad creative using **Director Mode** (character & wardrobe consistency across consecutive scenes).
3. Utilizing **Studio Max (10x Speed)** raw stream sniffing or **Pro (5x Speed)** fast batch dispatch.
4. Managing multi-device seat activations (2 seats on Pro, 4 seats on Studio Max) with seamless cloud takeover.
5. Inquiring about OmniFlow bridge status, generation quotas, or active queue progress.

---

## 💎 Tier & Performance Matrix

OmniFlow operates on a 3-tier architecture with Cloudflare D1 hardware seat management:

| Tier | Pricing | Speed Multiplier | Daily Quota | Allowed Active Seats | Key Capabilities |
|---|---|---|---|---|---|
| **Free** | ₹0 / $0 | **1x Standard** | 20 Shots / day | 1 Device | Basic human-paced UI automation |
| **Pro** | ₹149/mo ($2/mo) | **5x Speed** | **Unlimited** | **2 Devices** (Office + Laptop) | Fast CDP text insert, FIFO batch queue, 1-click presets |
| **Studio Max** | **₹499/mo ($10/mo)** | **10x Turbo** | **Unlimited (VIP)** | **4 Devices** (Multi-Workstation) | **Director Mode**, Frame-to-frame handoff, Raw CDN stream sniffer, 4K bridge |

---

## 🎬 Director Mode: Multi-Shot Cinematic Continuity

Director Mode solves the #1 challenge in generative AI filmmaking: maintaining character face, clothing, and environment consistency across sequential camera shots.

### The 4-Stage Director Pipeline:
1. **Character DNA Anchor**: Renders a 4-angle turnaround sheet (Front, 45°, Profile, Close-Up) and locks the visual seed.
2. **Scene 1 Establishing Shot**: Generates the opening scene clip using the anchor tokens.
3. **Lossless Last-Frame Extraction**: The extension's HTML5 `<video>` canvas grabber extracts the exact 100% PNG frame at the end of Scene 1.
4. **Frame-to-Frame Continuity Handoff**: Auto-injects Scene 1's last frame into Google Flow's image-to-video input and appends continuity camera deltas (`[Continuation: Match lighting, wardrobe, and action of attached frame]`).

---

## 🚀 Quick Execution Protocol for Agents

### Step 1: Health & Bridge Check
Verify the local OmniFlow bridge daemon is running on `http://127.0.0.1:8792`:
```bash
node scripts/check-bridge.js
# Or curl directly:
curl -s http://127.0.0.1:8792/status
```
- **If Offline:** Run `omniflow bridge start` or start the bridge background daemon.
- **If Online:** Check `extensionConnected === true` and `tabVisible === true`.

### Step 2: Submit a Generation Job
Agents can submit via REST API or the provided helper scripts:

```bash
# Helper script:
node scripts/submit-shot.js --mode flow-text-to-video --prompt "Cinematic drone flyover neon cyberpunk Tokyo rain 8k" --aspectRatio 16:9 --duration 6s

# Direct HTTP POST:
curl -s -X POST http://127.0.0.1:8792/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "mode": "flow-text-to-video",
    "prompt": "Cinematic drone flyover neon cyberpunk Tokyo rain 8k",
    "params": {
      "aspectRatio": "16:9",
      "duration": "6s",
      "videoModel": "veo-3.1-fast",
      "downloadSubfolder": "MyProject"
    }
  }'
```

### Step 3: Monitor & Retrieve Downloaded Media
Poll until the job status changes to `completed`:
```bash
node scripts/list-jobs.js
# Or:
curl -s http://127.0.0.1:8792/jobs
```
When `status === "completed"`, retrieve the local file path from the `files` array (e.g. `Downloads/MyProject/...mp4`).

---

## 🛡️ Multi-Device Authentication & Seat Takeover

Chrome extension users do NOT need to run the local bridge to activate Pro or Max licenses. Cloud authentication runs standalone:

- **Email Login (`POST https://omniflow.sanifydigital.com/api/v1/auth/check-email`)**:
  - Automatically checks active subscription in Cloudflare D1.
  - Binds the current device to the user's quota.
- **License Key Activation (`POST https://omniflow.sanifydigital.com/api/v1/license/bind`)**:
  - Verifies key directly against Cloudflare encrypted secrets with zero bridge dependency.
- **Seamless Device Takeover (Spotify/Cursor Style)**:
  - If a Pro user exceeds 2 devices (or Max user exceeds 4 devices), the API returns `409 DEVICE_LIMIT_REACHED` with the list of active devices.
  - Passing `replaceDeviceId` atomically disconnects the old PC and transfers access to the current machine.
- **Unlink Device (`POST https://omniflow.sanifydigital.com/api/v1/auth/unlink-device`)**:
  - Releases this PC's slot without cancelling or affecting the underlying paid subscription.

---

## 🛠️ Supported Generation Modes

| Mode ID | Description | Key Parameters |
|---|---|---|
| `flow-text-to-video` | Generates motion video from a text description | `prompt`, `aspectRatio` (16:9, 9:16, 1:1), `duration` (4s, 6s, 8s) |
| `flow-text-to-image` | Generates photorealistic or stylized still images | `prompt`, `aspectRatio`, `imageModel` (`nano-banana-pro`) |
| `flow-frame-to-video` | Extends a still image or keyframe into continuous video | `prompt`, `duration`, reference asset token |
| `flow-create-character` | Generates 4-angle turnaround sheet for facial consistency | `characterName`, `visualDescription`, `voicePreset` |
| `flow-director-mode` | Multi-shot sequential film production with frame handoff | `screenplay`, `characterAnchor`, `aspectRatio` |

---

## 💡 Best Practices for Cinematic Prompts

For photorealistic video outputs with Veo 3.1:
1. **Specify Camera Motion**: E.g. `[Camera: drone-wide]`, `[Camera: slow push-in]`, `[Camera: tracking shot]`.
2. **Specify Lighting & Atmospherics**: E.g. `volumetric rim lighting`, `golden hour anamorphic haze`, `35mm film grain`.
3. **Avoid Jargon**: Google Flow responds best to clear visual narrative descriptions rather than software tags.

See `references/api-reference.md` and `examples/cinematic-short-film.json` for ready-to-run multi-scene templates.
