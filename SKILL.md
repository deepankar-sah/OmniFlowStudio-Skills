---
name: omniflow-studio
description: Autonomous AI media generation, cinematic multi-shot film production, and Google Flow automation bridge. Enables AI agents to queue text-to-video, text-to-image, character consistency, and autonomous self-healing workflows with zero API costs.
compatibility: Claude Code, Google Antigravity, Cursor, Codex, OpenGSD, MCP-compatible agents
metadata:
  author: Deepankar Sah (Sanify Digital)
  version: 1.2.0
  port: 8792
  protocol: HTTP / WebSocket / MCP Stdio / Cloudflare Auth
---

# OmniFlow Studio Agent Skill (v1.2.0)

This skill empowers AI coding and orchestration agents to act as **Autonomous Film Directors** and **Generative Media Producers** through **OmniFlow Studio** — a high-performance local bridge and Chrome Extension that controls Google Flow and Veo 3.1 canvases directly inside Google Chrome with zero API fees.

---

## 🎬 When to Use This Skill

Activate this skill whenever the user or task involves:
1. **Generating High-Fidelity Videos or Images**: Photorealistic video clips, cinematic b-roll, stylized stills, or concept art.
2. **Autonomous Multi-Shot Film Direction (Director Mode)**: Multi-scene narrative continuity, character face/clothing consistency, and automated last-frame handoff between shots.
3. **Studio Max (10x Turbo)** or **Pro (5x Speed)** media pipeline execution.
4. **Autonomous Error Recovery & Self-Healing**: Resilient generation recovery against transient Google Flow failures or "unusual activity" notices without human intervention.
5. **Checking Quotas & Bridge Status**: Verifying local bridge health, active generation queue progress, or seat licensing.

---

## 🤖 The Agent-Centric Director Protocol (Zero UI Overhead)

OmniFlow operates under an **Agent-Centric Architecture**: there are no confusing browser UI buttons for the user to fiddle with. The AI agent manages the entire production cycle directly via native Model Context Protocol (MCP) tools or local HTTP endpoints.

### 💬 Conversational User Alignment (Interview First)
Before dispatching scenes to Google Flow, the AI agent must conduct a brief, friendly interview with the user to establish the creative vision:
1. **Narrative & Story**: What is the core storyline, theme, or concept?
2. **Visual Aesthetic**: What lighting, color palette, and lens style are desired? (e.g. *Anamorphic Cyberpunk, Golden Hour 35mm, Studio Ghibli Anime, Dark Nordic Noir*).
3. **Aspect Ratio**: 
   - `16:9` (Cinematic Film, YouTube, Desktop)
   - `9:16` (Vertical Reels, TikTok, YouTube Shorts)
   - `1:1` (Square Social Media)
4. **Camera Language**: What camera movements best tell the story? (`drone-wide`, `slow tracking push-in`, `extreme close-up`, `orbit 360`, `low-angle tilt`).
5. **Speed & Anti-Detection Profile**: `balanced` (recommended default), `stealth` (safe human cadence), or `turbo` (10x Studio Max).

> **Crucial Rule:** The agent must always announce its chosen parameters and storyboard plan to the user before dispatching render jobs!

---

## 🎬 The 5-Step Director Mode Workflow

```
┌────────────────────────────────────────────────────────┐
│ 1. Initialize Session ('flow_director_session')        │
│    Set Title, Genre, Visual Aesthetic, Aspect Ratio    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ 2. Character DNA Lock ('flow_director_character')      │
│    Render 4-angle turnaround sheet to anchor identity  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ 3. Register Storyboard Plan ('flow_director_plan')     │
│    Validate ordered scenes and camera cinematics       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ 4. Sequential Scene Generation                         │
│    ('flow_director_generate_scene')                    │
│    Auto-extracts Scene N-1 last frame for continuity   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ 5. Lossless Master Cut Stitch ('flow_director_stitch') │
│    Concatenates scene MP4s into final film in Downloads│
└────────────────────────────────────────────────────────┘
```

---

## 🛠️ Complete MCP Tools Catalog

Add OmniFlow's MCP server to your agent's config (`mcpServers`):
```json
{
  "mcpServers": {
    "omniflow": {
      "command": "npx",
      "args": ["-y", "omniflow-studio", "mcp"]
    }
  }
}
```

### 1. Director Mode Tools
| Tool Name | Purpose | Key Parameters |
|---|---|---|
| `flow_director_session` | Initializes production session settings | `title`, `genre`, `visual_aesthetic`, `aspect_ratio` (`16:9`, `9:16`, `1:1`), `speed_profile` (`balanced`, `stealth`, `turbo`), `default_duration` |
| `flow_director_plan` | Registers an ordered storyboard of shots | `scenes`: Array of `{ scene_number, prompt, camera, duration, continuity_from_previous, character }` |
| `flow_director_generate_scene` | Generates a specific planned scene on Google Flow | `scene_number`, `video_model` (`veo-3.1-fast`, `veo-3.1-quality`, `veo-2`) |
| `flow_director_character` | Locks character facial & wardrobe consistency | `name`, `visual_description`, `voice_preset` |
| `flow_director_stitch` | Losslessly joins scene MP4s into a master cut | `scene_files` (optional), `output_filename` |
| `flow_director_status` | Returns production state, active jobs, and file paths | *(none)* |

### 2. Studio Control & Error Recovery Tools
| Tool Name | Purpose | Key Parameters |
|---|---|---|
| `flow_retry` | Autonomous in-page self-healing for failed tiles | *(none)* — Automatically finds unhandled failed tiles |
| `flow_get_settings` | Inspects Google Flow settings across 7 categories | *(none)* |
| `flow_configure_settings` | Configures mode, quality, duration, aspect ratio, model | `mode`, `aspect_ratio`, `quality`, `model`, `duration`, `outputs_per_prompt` |
| `flow_inspect_state` | Returns live DOM state: title, characters, media | *(none)* |
| `flow_upload_character` | Uploads character reference image to Flow library | `name`, `file_path` or `base64_data`, `mime_type` |
| `flow_add_ingredients` | Attaches reference image into Flow prompt bar | `file_path` or `base64_data`, `filename` |
| `flow_manage_project` | Creates a new Google Flow project canvas | `action`: `'create-new'` |
| `flow_configure_delays` | Configures anti-detection typing speeds and delays | `profile`: `'stealth' \| 'balanced' \| 'turbo'` |

### 3. Core Generation & Queue Tools
| Tool Name | Purpose | Key Parameters |
|---|---|---|
| `omniflow_status` | Checks Bridge daemon and extension connectivity | *(none)* |
| `omniflow_list_jobs` | Lists all historical and active media jobs | *(none)* |
| `omniflow_generate_shot` | Queues single standalone video or image shot | `prompt`, `mode`, `aspect_ratio`, `duration`, `camera_movement` |
| `omniflow_create_character` | Generates turnaround reference sheet | `name`, `visual_description`, `voice_preset` |
| `omniflow_produce_movie` | High-level screenplay-to-film pipeline | `title`, `shots`, `aspect_ratio` |

---

## 🛡️ Autonomous Error Recovery & Rate Limit Self-Healing

OmniFlow features an autonomous in-page error recovery system that monitors the Google Flow DOM for:
- "Unusual activity" or rate limit warnings
- "Generation failed" or "Something went wrong" tile cards

### How the Recovery Engine Works:
1. **Strict 1-Retry Cap per Tile**: To prevent infinite loops and runaway generation costs, each failed tile is retried at most **1 time**.
2. **Dual-Layer Deduplication**:
   - The failed button and card are tagged in the DOM with `data-omniflow-retried="true"`.
   - The tile's spatial fingerprint is registered in an in-memory `Set` and `WeakSet`.
   - Query selectors use `:not([data-omniflow-retried])` to guarantee handled cards are permanently ignored.
3. **Visual Lock**: The retried button is dimmed (`opacity: 0.4; pointer-events: none`) so neither scripts nor accidental clicks can trigger duplicate runs.
4. **Circuit Breaker Cooldown**: Enforces a 25-second minimum backoff between consecutive recovery cycles.
5. **Manual Trigger**: Agents can also manually invoke recovery at any time using the `flow_retry` MCP tool or `POST http://127.0.0.1:8792/flow/retry`.

---

## ⚡ Quick Start for AI Agents

### Step 1: Check System Health
Run `npx omniflow-studio doctor` or query `omniflow_status`:
```bash
npx omniflow-studio doctor
```
Ensure:
- Bridge is listening on `http://127.0.0.1:8792`.
- Extension is connected.
- Google Flow tab (`https://flow.google.com`) is open and logged in Chrome.

### Step 2: Start Bridge Daemon (if offline)
```bash
npx omniflow-studio bridge daemon
```

### Step 3: Directing a Film via MCP
```typescript
// 1. Start Session
await callTool('flow_director_session', {
  title: 'Neon Odyssey',
  genre: 'Cyberpunk Sci-Fi',
  visual_aesthetic: 'Anamorphic lens flares, volumetric rain, neon blue and amber rim lighting, 8k hyperreal',
  aspect_ratio: '16:9',
  speed_profile: 'balanced'
});

// 2. Register Storyboard Plan
await callTool('flow_director_plan', {
  scenes: [
    {
      scene_number: 1,
      prompt: 'A solitary rogue hacker in an iridescent trenchcoat stands on a rain-slicked skyscraper balcony looking over Neo-Shibuya',
      camera: 'drone-wide',
      duration: 6,
      continuity_from_previous: false
    },
    {
      scene_number: 2,
      prompt: 'The hacker steps forward, pulling up a glowing cyan holographic data gauntlet while sirens reflect in the puddles',
      camera: 'tracking push-in',
      duration: 6,
      continuity_from_previous: true
    }
  ]
});

// 3. Generate Scenes
await callTool('flow_director_generate_scene', { scene_number: 1 });
// Wait for Scene 1 completion, then generate Scene 2 with automatic frame chaining:
await callTool('flow_director_generate_scene', { scene_number: 2 });

// 4. Stitch Master Video
await callTool('flow_director_stitch', { output_filename: 'Neon_Odyssey_Master.mp4' });
```

---

## 📚 Reference Links
- [`references/mcp-tools.md`](references/mcp-tools.md) — Exhaustive MCP tool arguments and schemas.
- [`references/api-reference.md`](references/api-reference.md) — HTTP REST endpoints and JSON payloads.
- [`references/cli-cheatsheet.md`](references/cli-cheatsheet.md) — CLI commands and flags.
