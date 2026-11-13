# OmniFlow Model Context Protocol (MCP) Tools Reference (v1.2.0)

OmniFlow provides a standard Model Context Protocol (MCP) server communicating over stdio. AI coding and orchestration agents (Antigravity, Claude Code, Cursor, Codex, OpenGSD) can register this server to access 18 native studio and director tools.

---

## Configuration

Add the following to your agent's MCP configuration (`claude_desktop_config.json`, `antigravity.json`, or `.mcp.json`):

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

---

## 🎬 1. Director Mode Tools

### `flow_director_session`
Initializes or configures an autonomous Director Mode production session. Sets project title, visual aesthetic, aspect ratio, speed profile, and character locks.
- **Parameters**:
  - `title` (string, required): Title of the film, commercial, or narrative sequence.
  - `genre` (string, default: `"Cinematic"`): Genre/style (e.g. Cyberpunk, Studio Ghibli, Noir, Sci-Fi).
  - `visual_aesthetic` (string, required): Visual direction: lighting, color palette, camera lens, resolution.
  - `aspect_ratio` (enum, default: `"16:9"`): `'16:9' | '9:16' | '1:1' | '4:3' | '3:4'`.
  - `speed_profile` (enum, default: `"balanced"`): `'stealth' | 'balanced' | 'turbo'`.
  - `default_duration` (enum, default: `"6"`): `'4' | '6' | '8' | '10'`.
  - `character_name` (string, optional): Lead character handle to bind to all scenes.

### `flow_director_plan`
Registers a storyboard plan of sequential cinematic shots for the active production. Validates continuity and camera motions.
- **Parameters**:
  - `scenes` (array, required): Ordered list of scenes:
    - `scene_number` (number): 1-indexed scene number.
    - `prompt` (string): Detailed action and environment description.
    - `camera` (string): Camera movement (`drone-wide`, `slow push-in`, `tracking`, `orbit 360`, `close-up`).
    - `duration` (number, default: 6): Scene duration in seconds.
    - `continuity_from_previous` (boolean, default: false): Whether to link previous scene's last frame.
    - `character` (string, optional): Character handle appearing in scene.

### `flow_director_generate_scene`
Executes an individual planned scene on Google Flow. Automatically injects camera motion tags, aesthetic cues, and links the previous scene's last frame if continuity is enabled.
- **Parameters**:
  - `scene_number` (number, required): Scene number from the planned storyboard to generate.
  - `video_model` (enum, default: `"veo-3.1-fast"`): `'veo-3.1-fast' | 'veo-3.1-quality' | 'veo-2' | 'omni-flash'`.

### `flow_director_character`
Generates and locks a reusable character's visual DNA (front portrait + 4-angle turnaround sheet) to prevent face and costume drift across multi-scene films.
- **Parameters**:
  - `name` (string, required): Character handle (e.g. `"ELENA"`, `"DETECTIVE"`).
  - `visual_description` (string, required): Full head-to-toe description: face, hair, eyes, physique, costume materials, color palette.
  - `voice_preset` (string, optional): Google Flow voice preset (e.g. `"Achird"`, `"Algenib"`).

### `flow_director_stitch`
Losslessly concatenates all completed scene MP4 clips into a final master film via native stream copy without quality degradation.
- **Parameters**:
  - `scene_files` (string[], optional): Specific MP4 files to stitch. If omitted, stitches all completed scenes from active session.
  - `output_filename` (string, optional): Output filename (e.g. `"Elena_Master_Cut.mp4"`).

### `flow_director_status`
Inspects real-time status of the active Director production: scenes planned, currently rendering jobs, completed video paths, and bridge connection.
- **Parameters**: *(none)*

---

## 🛠️ 2. Studio Control & Diagnostics Tools

### `flow_retry`
Autonomously triggers in-page error recovery by detecting failed generation tiles or "unusual activity" errors and clicking the in-page Retry button. Strictly capped at 1 retry per tile to prevent duplicate generation storms.
- **Parameters**: *(none)*

### `flow_get_settings`
Inspects Google Flow's categorized settings divided into 7 distinct categories: Mode, Video Subtype, Aspect Ratio, Video Quality, Model, Duration, and Output Count.
- **Parameters**: *(none)*

### `flow_configure_settings`
Autonomously configures Google Flow media generation parameters across the 7 categories with humanized 1-second pacing.
- **Parameters**:
  - `mode` (enum, optional): `'image' | 'video'`.
  - `video_subtype` (enum, optional): `'frames' | 'ingredients'`.
  - `aspect_ratio` (enum, optional): `'16:9' | '9:16' | '1:1' | '4:3' | '3:4'`.
  - `quality` (enum, optional): `'360p' | '720p' | '1080p'`.
  - `model` (string, optional): Model name (e.g. `"Omni 1.1 Flash"`, `"Nano Banana Pro"`).
  - `duration` (enum, optional): `'4' | '6' | '8' | '10'`.
  - `outputs_per_prompt` (number, optional): `1 | 2 | 4`.

### `flow_inspect_state`
Inspects Google Flow's real-time studio state: active mode, model, aspect ratio, duration, project title, character library, attached ingredients, and recently generated media items.
- **Parameters**: *(none)*

### `flow_list_characters`
Scrapes and returns all registered character avatars and handles saved in Google Flow's Character Library.
- **Parameters**: *(none)*

### `flow_upload_character`
Uploads a character reference image and saves it to Google Flow's Character Library. Accepts either a local file path or base64 data.
- **Parameters**:
  - `name` (string, required): Unique character handle.
  - `file_path` (string, optional): Local image file path.
  - `base64_data` (string, optional): Base64 encoded image string.
  - `mime_type` (string, default: `"image/png"`): MIME type.

### `flow_add_ingredients`
Attaches a reference image directly into Google Flow's ingredients bar for multi-modal guided generation.
- **Parameters**:
  - `file_path` (string, optional): Local image file path.
  - `base64_data` (string, optional): Base64 image data.
  - `mime_type` (string, default: `"image/png"`): MIME type.
  - `filename` (string, default: `"reference.png"`): File display name.

### `flow_manage_project`
Creates a brand new project workspace in Google Flow.
- **Parameters**:
  - `action` (enum, default: `"create-new"`): `'create-new'`.

---

## ⏱️ 3. Smart Delays & Anti-Detection Tools

### `flow_configure_delays`
Configures anti-detection typing speeds and pacing profiles.
- **Parameters**:
  - `profile` (enum, optional): `'stealth' | 'balanced' | 'turbo'`.
  - `custom_wpm` (number, optional): Custom typing speed in words per minute (e.g. 140–200 WPM).

### `flow_inspect_delays`
Returns the current active anti-detection profile, WPM, and circuit breaker status.
- **Parameters**: *(none)*

---

## 🚀 4. Core Media Generation Tools

### `omniflow_status`
Checks bridge daemon health, Chrome extension connection, and Google Flow tab visibility.
- **Parameters**: *(none)*

### `omniflow_list_jobs`
Lists all queued, rendering, and completed media generation jobs with percentage progress and local file paths.
- **Parameters**: *(none)*

### `omniflow_generate_shot`
Queues an individual media generation shot with camera direction and aspect ratio.
- **Parameters**:
  - `mode` (enum, default: `"flow-text-to-video"`): `'flow-text-to-video' | 'flow-text-to-image' | 'flow-frame-to-video'`.
  - `prompt` (string, required): Visual description with lighting and action.
  - `aspect_ratio` (enum, default: `"16:9"`): `'16:9' | '9:16' | '1:1'`.
  - `duration` (enum, default: `"6"`): `'4' | '6' | '8' | '10'`.
  - `camera_movement` (string, optional): Camera movement direction.
  - `character_name` (string, optional): Bound character handle.
  - `subfolder` (string, optional): Subdirectory in Downloads.

### `omniflow_create_character`
Generates a character turnaround reference sheet with front portrait and 4-angle turnaround.
- **Parameters**:
  - `name` (string, required): Character handle.
  - `visual_description` (string, required): Physical appearance details.
  - `voice_preset` (string, optional): Voice ID.

### `omniflow_produce_movie`
High-level screenplay-to-film pipeline. Takes an array of cinematic shots and executes them sequentially.
- **Parameters**:
  - `title` (string, required): Project title.
  - `shots` (array, required): Array of shot definitions.
  - `aspect_ratio` (enum, default: `"16:9"`): Target aspect ratio.
