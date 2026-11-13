# OmniFlowStudio-Skills

> **Autonomous AI Agent Skill for OmniFlow Studio** — Connect your AI coding agents (Antigravity, Claude Code, Cursor, Codex, OpenGSD) directly to Google Flow, Veo 3.1, and browser-driven generative media pipelines with zero API fees.

[![Version](https://img.shields.io/badge/version-1.2.0-indigo.svg)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome%20Web%20Store-Install%20Extension-blue.svg?logo=googlechrome)](https://chromewebstore.google.com/detail/fipkgokjnfakoapmfelkdfcikigicpgk)
[![Platform](https://img.shields.io/badge/Platform-Chrome%20MV3%20%2B%20Cloudflare%20D1-emerald.svg)](https://sanifydigital.com)

---

## 🧩 Official Chrome Extension

Before running agent automations, ensure the OmniFlow Studio Chrome Extension is installed:  
👉 **[Add OmniFlow Studio to Google Chrome](https://chromewebstore.google.com/detail/fipkgokjnfakoapmfelkdfcikigicpgk)** (Official Web Store)

---

## 🌟 What is OmniFlow Studio?

[OmniFlow Studio](https://omniflow.sanifydigital.com) is an autonomous bridge and Chrome Extension that controls generative AI canvases (such as Google Flow & Veo 3.1) directly inside the Chromium engine using trusted DevTools Protocol input events.

This skill allows your AI agents to act as **Autonomous Film Directors** and **Creative Producers**:
- **🎬 Agent-Centric Director Mode (Zero UI Overhead)**: Agents interview the user conversationally regarding story, visual aesthetic, aspect ratio, and camera direction, then autonomously direct multi-shot films with automated last-frame handoff.
- **🛡️ Autonomous Error Recovery & Self-Healing**: Resilient in-page retry for rate limits and failed tiles, strictly capped at 1 retry per tile to eliminate infinite loops.
- **⚡ 10x Turbo Speed (Studio Max)**: Raw CDN stream sniffer intercepts media packets 3–5 seconds before web UI rendering completes.
- **🎞️ Lossless Master Video Stitcher**: Automatically concatenates all completed scene MP4 clips into a single master video in `Downloads/`.
- **🛡️ Multi-Device Cloud Seat Architecture**: 2 concurrent active seats on Pro and 4 seats on Studio Max with 1-click Spotify/Cursor-style device takeover.

---

## 💎 Tier & Entitlement Structure

| Capability | Free Tier (₹0) | Pro Tier (₹149 / $2) | **Studio Max (₹999 / $10)** |
|---|---|---|---|
| **Daily Generations** | 20 shots / day | **Unlimited** | **Unlimited + VIP Priority** |
| **Generation Speed** | 1x Standard (Human Paced) | **5x Speed Boost** (Pipelined) | **10x Ultra Speed** (Zero Latency) |
| **Active Multi-Device Seats** | 1 Device | **2 Devices** (Office + Laptop) | **4 Devices** (Multi-Workstation) |
| **Seamless Device Takeover** | ❌ | **Included (1-Click Switch)** | **Included (1-Click Switch)** |
| **🎬 Director Mode (Script-to-Film)** | ❌ | ❌ | **Full Multi-Shot Continuity** |
| **Character Consistency Lock** | ❌ | Basic Portrait Upload | **4-Angle Turnaround Sheet Anchor** |
| **Frame-to-Frame Continuity Engine**| ❌ | ❌ | **Lossless Canvas Last-Frame Handoff** |
| **Lossless Video Concatenation** | ❌ | ❌ | **Native Stream MP4 Stitcher** |

---

## 📦 How to Install This Skill in AI Agents

### Option 1: Claude Code / Google Antigravity / OpenGSD (Recommended)
Clone or symlink this repository into your global or project skills directory:

```bash
# Global Agent Skills directory for Claude Code:
git clone https://github.com/deepankar-sah/OmniFlowStudio-Skills.git ~/.claude/skills/omniflow-studio

# Global Agent Skills directory for Antigravity / Gemini CLI:
git clone https://github.com/deepankar-sah/OmniFlowStudio-Skills.git ~/.gemini/config/skills/omniflow-studio
```

Once installed, simply prompt your agent:
> *"Produce a 3-shot cyberpunk film teaser using OmniFlow Studio."*

The agent will automatically load [`SKILL.md`](SKILL.md) and execute the conversational director workflow.

---

### Option 2: Model Context Protocol (MCP) Integration
Add OmniFlow's native MCP server to your `claude_desktop_config.json` or `antigravity.json`:

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

Now your agents have direct access to 18 native studio and director tools including `flow_director_session`, `flow_director_plan`, `flow_director_generate_scene`, `flow_retry`, `flow_configure_settings`, and `flow_director_stitch`.

---

## 🚀 Quick Usage for Agents

### 1. Verify Bridge Daemon
```bash
npx omniflow-studio doctor
# Or curl directly:
curl -s http://127.0.0.1:8792/status
```

### 2. Director Mode Workflow Example
```typescript
// Step 1: Session setup
await callTool('flow_director_session', {
  title: 'Cyber Samurai',
  genre: 'Cyberpunk Action',
  visual_aesthetic: '35mm anamorphic, neon rain reflections, volumetric rim light',
  aspect_ratio: '16:9'
});

// Step 2: Storyboard plan
await callTool('flow_director_plan', {
  scenes: [
    { scene_number: 1, prompt: 'A cyber samurai unsheathing a glowing plasma katana in an alley', camera: 'slow push-in', duration: 6, continuity_from_previous: false },
    { scene_number: 2, prompt: 'The samurai dashes forward, katana trailing blue sparks into a group of drone sentinels', camera: 'tracking', duration: 6, continuity_from_previous: true }
  ]
});

// Step 3: Render Scene 1 & 2
await callTool('flow_director_generate_scene', { scene_number: 1 });
await callTool('flow_director_generate_scene', { scene_number: 2 });

// Step 4: Stitch Master Cut
await callTool('flow_director_stitch', { output_filename: 'Cyber_Samurai_Master.mp4' });
```

---

## 📚 Complete Documentation

- [`SKILL.md`](SKILL.md) — Master AI Agent Skill manifest and instructions.
- [`references/mcp-tools.md`](references/mcp-tools.md) — Complete 18-tool MCP definitions.
- [`references/api-reference.md`](references/api-reference.md) — Local Loopback REST API & Cloudflare Auth documentation.
- [`references/cli-cheatsheet.md`](references/cli-cheatsheet.md) — CLI flags, multi-tier admin commands, and quota status.
- [`references/architecture-and-security.md`](references/architecture-and-security.md) — Port 8792 isolation, loopback security, and encrypted vault secrets.

---

## 👨‍💻 Author & Support

Crafted with precision by **Deepankar Sah** ([Sanify Digital](https://sanifydigital.com)).
- Web: [sanifydigital.com](https://sanifydigital.com)
- OmniFlow Studio: [omniflow.sanifydigital.com](https://omniflow.sanifydigital.com)
- License: [MIT](LICENSE)
