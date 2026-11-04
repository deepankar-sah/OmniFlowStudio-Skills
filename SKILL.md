---
name: omniflow-studio
description: Autonomous AI media generation, cinematic multi-shot film production, and Google Flow automation bridge. Enables AI agents to queue text-to-video, text-to-image, and character consistency workflows with zero API costs.
compatibility: Claude Code, Google Antigravity, Cursor, Codex, OpenGSD, MCP-compatible agents
metadata:
  author: Deepankar Sah (Sanify Digital)
  version: 1.0.0
  port: 8792
  protocol: HTTP / WebSocket / MCP Stdio
---

# OmniFlow Studio Agent Skill

This skill grants AI coding and orchestration agents direct control over **OmniFlow Studio** — an autonomous bridge connecting local AI agents to high-fidelity generative media canvases in Google Chrome.

## When to Use This Skill

Use this skill whenever:
1. The user asks to generate cinematic AI videos, B-roll footage, concept art, or storyboards.
2. Building or directing an autonomous multi-shot short film or ad creative.
3. Generating character reference sheets (turnaround consistency) across multiple video scenes.
4. Automating batch image/video generation queues without paying per-minute API fees.
5. Inquiring about current OmniFlow bridge status, generation quotas, or active queue progress.

---

## 🚀 Quick Execution Protocol for Agents

Before dispatching media jobs, every agent must follow this 3-step verification loop:

### Step 1: Health & Bridge Check
Verify the local OmniFlow bridge daemon is running on `http://127.0.0.1:8792`:
```bash
node scripts/check-bridge.js
# Or curl directly:
curl -s http://127.0.0.1:8792/status
```
- **If Offline:** Instruct the user or run: `omniflow bridge start` (or start the bridge background task).
- **If Online:** Check `extensionConnected` is `true` and `tabVisible` is `true` (means Chrome has Google Flow open).

### Step 2: Submit a Generation Job
Agents can submit via REST API or the provided helper scripts:

```bash
# Helper script (easiest):
node scripts/submit-shot.js --mode flow-text-to-video --prompt "Cinematic drone flyover neon cyberpunk Tokyo rain 8k" --aspectRatio 16:9 --duration 6s

# Or direct HTTP POST:
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

## 🛠️ Supported Generation Modes

| Mode ID | Description | Key Parameters |
|---|---|---|
| `flow-text-to-video` | Generates motion video from a text description | `prompt`, `aspectRatio` (16:9, 9:16, 1:1), `duration` (4s, 6s, 8s) |
| `flow-text-to-image` | Generates photorealistic or stylized still images | `prompt`, `aspectRatio`, `imageModel` (`nano-banana-pro`) |
| `flow-frame-to-video` | Extends a still image or keyframe into continuous video | `prompt`, `duration`, reference asset token |
| `flow-create-character` | Generates 4-angle turnaround sheet for facial consistency | `characterName`, `visualDescription`, `voicePreset` |

---

## 🎛️ MCP Tool Invocations (If MCP Server is Active)

If OmniFlow's MCP server is connected in your agent environment, call these native tools directly:
- `omniflow_status`: Check bridge and browser connection status.
- `omniflow_generate_shot`: Queue a single shot with camera movement (`drone-wide`, `close-up`, `tracking`).
- `omniflow_produce_movie`: Pass a complete screenplay array of ordered shots to produce an entire short film sequentially.
- `omniflow_create_character`: Lock a character tag with front & profile turnaround consistency.
- `omniflow_list_jobs`: List active, queued, and finished generation jobs with disk download paths.

---

## 💡 Best Practices for Cinematic Prompts

For photorealistic video outputs with Veo 3.1:
1. **Specify Camera Motion**: E.g. `[Camera: drone-wide]`, `[Camera: slow push-in]`, `[Camera: tracking shot]`.
2. **Specify Lighting & Atmospherics**: E.g. `volumetric rim lighting`, `golden hour anamorphic haze`, `35mm film grain`.
3. **Avoid Jargon**: Google Flow responds best to clear visual narrative descriptions rather than software tags.

See `references/api-reference.md` and `examples/cinematic-short-film.json` for ready-to-run multi-scene templates.
