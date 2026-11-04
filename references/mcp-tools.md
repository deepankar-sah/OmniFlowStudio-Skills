# OmniFlow Model Context Protocol (MCP) Tools Reference

OmniFlow provides a standard MCP server communicating over stdio. AI coding agents (Claude Code, Cursor, Antigravity) can add this server to their `mcpServers` configuration to call studio tools natively.

---

## Configuration

In `mcpServers` configuration:
```json
{
  "omniflow": {
    "command": "node",
    "args": ["packages/omniflow-cli/bin/omniflow.js", "mcp"]
  }
}
```

---

## Available Tools

### 1. `omniflow_generate_shot`
Queues an individual media generation shot with camera direction and aspect ratio.
- **Parameters**:
  - `mode`: `'flow-text-to-video' | 'flow-text-to-image' | 'flow-frame-to-video'` (default: `'flow-text-to-video'`)
  - `prompt`: String (Visual description with lighting and action)
  - `aspect_ratio`: `'16:9' | '9:16' | '1:1'` (default: `'16:9'`)
  - `duration`: `'4' | '6' | '8' | '10'` seconds
  - `camera_movement`: `'drone-wide' | 'close-up' | 'dolly-in' | 'tracking' | 'static'`
  - `character_name`: Optional character handle to preserve identity
  - `subfolder`: Target folder in Downloads directory

### 2. `omniflow_create_character`
Generates a character reference sheet with front portrait and 4-angle turnaround to lock facial and clothing consistency.
- **Parameters**:
  - `name`: Unique uppercase handle (e.g. `"ELENA"`, `"WARRIOR"`)
  - `visual_description`: Detailed physical, facial, and outfit specifications
  - `voice_preset`: Optional voice ID
  - `voice_style`: Performance style note

### 3. `omniflow_produce_movie`
Autonomous multi-shot film director tool. Takes an array of cinematic shots and executes them sequentially with continuity preservation.
- **Parameters**:
  - `title`: Project title
  - `shots`: Array of `{ shotNumber, scenePrompt, cameraAngle, durationSeconds, characterTag }`
  - `aspect_ratio`: Target aspect ratio

### 4. `omniflow_status`
Inspects real-time connection status with bridge daemon, Chrome extension, and active canvas tabs.

### 5. `omniflow_list_jobs`
Lists historical and active generation jobs with percentage progress and local file paths.
