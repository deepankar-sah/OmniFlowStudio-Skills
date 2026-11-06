# OmniFlowStudio-Skills

> **Autonomous AI Agent Skill for OmniFlow Studio** — Connect your AI coding agents (Antigravity, Claude Code, Cursor, Codex, OpenGSD) directly to Google Flow, Veo 3.1, and browser-driven generative media pipelines with zero API fees.

[![Version](https://img.shields.io/badge/version-1.1.0-indigo.svg)](package.json)
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
- **🎬 Director Mode (Multi-Shot Film Engine)**: Maintain character face, clothing, and lighting consistency across sequential camera shots with lossless last-frame handoff.
- **⚡ 10x Turbo Speed (Studio Max)**: Raw CDN stream sniffer intercepts media packets 3–5 seconds before web UI rendering completes.
- **🛡️ Multi-Device Cloud Seat Architecture**: 2 concurrent active seats on Pro (Home + Office) and 4 concurrent seats on Studio Max, with 1-click Spotify/Cursor-style device takeover.
- **Zero Bridge Requirement for Licensing**: Regular Chrome extension users activate instantly via Cloudflare Worker (`/api/v1/auth/check-email` & `/api/v1/license/bind`).

---

## 💎 Tier & Entitlement Structure

| Capability | Free Tier (₹0) | Pro Tier (₹149 / $2) | **Studio Max (₹499 / $10)** |
|---|---|---|---|
| **Daily Generations** | 20 shots / day | **Unlimited** | **Unlimited + VIP Priority** |
| **Generation Speed** | 1x Standard (Human Paced) | **5x Speed Boost** (Pipelined) | **10x Ultra Speed** (Zero Latency) |
| **Active Multi-Device Seats** | 1 Device | **2 Devices** (Office + Laptop) | **4 Devices** (Multi-Workstation) |
| **Seamless Device Takeover** | ❌ | **Included (1-Click Switch)** | **Included (1-Click Switch)** |
| **🎬 Director Mode (Script-to-Film)** | ❌ | ❌ | **Full Multi-Shot Continuity** |
| **Character Consistency Lock** | ❌ | Basic Portrait Upload | **4-Angle Turnaround Sheet Anchor** |
| **Frame-to-Frame Continuity Engine**| ❌ | ❌ | **Lossless Canvas Last-Frame Handoff** |

---

## 📦 How to Install This Skill in AI Agents

### Option 1: Claude Code / Google Antigravity / OpenGSD (Recommended)
Clone or symlink this repository into your global or project skills directory:

```bash
# Global Agent Skills directory:
git clone https://github.com/deepankar-sah/OmniFlowStudio-Skills.git ~/.claude/skills/omniflow-studio
# Or for Antigravity:
git clone https://github.com/deepankar-sah/OmniFlowStudio-Skills.git ~/.gemini/config/skills/omniflow-studio
```

Once installed, simply prompt your agent:
> *"Produce a 3-shot cyberpunk film teaser using OmniFlow Studio."*

The agent will automatically load [`SKILL.md`](SKILL.md) and execute the workflow.

---

### Option 2: Model Context Protocol (MCP) Integration
Add OmniFlow's native MCP server to your `claude_desktop_config.json` or `antigravity.json`:

```json
{
  "mcpServers": {
    "omniflow": {
      "command": "node",
      "args": ["packages/omniflow-cli/bin/omniflow.js", "mcp"]
    }
  }
}
```

Now your agents have access to tools like `omniflow_generate_shot`, `omniflow_produce_movie`, and `omniflow_status`.

---

## 🚀 Quick Usage for Agents

### 1. Verify Bridge Daemon
```bash
node scripts/check-bridge.js
# Output:
# ✅ OmniFlow Bridge Status:
#    • Bridge Server:       UP (v1.1.0)
#    • Chrome Extension:    🟢 Connected
#    • Canvas Tab Visible:  🟢 Yes
#    • Plan:                Studio Max (10x Speed, 4 Seats)
```

### 2. Submit a Shot
```bash
node scripts/submit-shot.js \
  --prompt "Cinematic wide shot of an ancient sandstone temple illuminated by bioluminescent moss at dusk" \
  --mode video \
  --aspectRatio 16:9 \
  --duration 6s \
  --subfolder "Temple_Teaser"
```

### 3. Track Generation & Get Downloaded Files
```bash
node scripts/list-jobs.js
# Output:
# ✅ [job_17307001_x9] COMPLETED (flow-text-to-video)
#    Output: C:\Users\User\Downloads\Temple_Teaser\cinematic-wide-shot.mp4
```

---

## 📚 Complete Documentation

- [`SKILL.md`](SKILL.md) — Master AI Agent Skill manifest and instructions.
- [`references/api-reference.md`](references/api-reference.md) — Local Loopback REST API & Cloudflare Auth documentation.
- [`references/mcp-tools.md`](references/mcp-tools.md) — Model Context Protocol tool definitions.
- [`references/cli-cheatsheet.md`](references/cli-cheatsheet.md) — CLI flags, multi-tier admin commands, and quota status.
- [`references/architecture-and-security.md`](references/architecture-and-security.md) — Port 8792 isolation, loopback security, and encrypted vault secrets.
- [`examples/cinematic-short-film.json`](examples/cinematic-short-film.json) — Multi-shot screenplay JSON template.
- [`examples/prompt-matrix.md`](examples/prompt-matrix.md) — Camera direction and lighting prompt formula.

---

## 👨‍💻 Author & Support

Crafted with precision by **Deepankar Sah** ([Sanify Digital](https://sanifydigital.com)).
- Web: [sanifydigital.com](https://sanifydigital.com)
- OmniFlow Studio: [omniflow.sanifydigital.com](https://omniflow.sanifydigital.com)
- License: [MIT](LICENSE)
