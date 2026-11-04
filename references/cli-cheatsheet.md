# OmniFlow CLI Cheatsheet

The `omniflow` command-line interface provides full control over local generation, bridge daemon lifecycle, and licensing.

---

## 1. Daemon Management

```bash
# Start bridge daemon in foreground
omniflow bridge start

# Start bridge daemon on custom port
omniflow bridge start --port 8792 --host 127.0.0.1

# Check daemon & extension connection
omniflow status
```

---

## 2. Submitting Generation Jobs

```bash
# Generate a cinematic 16:9 video shot
omniflow submit "A futuristic cybernetic tiger stalking through a misty bamboo grove at twilight" \
  --mode video \
  --aspect-ratio 16:9 \
  --duration 6s \
  --subfolder "Cyber_Tiger"

# Generate a 9:16 vertical video for mobile / reels
omniflow submit "Model walking down a rainy neon Tokyo alleyway, slow motion close up" \
  --mode video \
  --aspect-ratio 9:16 \
  --duration 8s

# Generate an 8k photorealistic image
omniflow submit "Hyperdetailed architectural photograph of a brutalist glass villa hanging over ocean cliffs" \
  --mode image \
  --aspect-ratio 16:9 \
  --model nano-banana-pro
```

---

## 3. Queue & Asset Monitoring

```bash
# List all active and finished jobs with download paths
omniflow jobs

# Show current daily quota usage & Pro status
omniflow quota

# Activate an official Pro license key
omniflow license activate --key OMNI-PRO-XXXX-XXXX-XXXX --email user@example.com
```

---

## 4. MCP Server for AI Agents

```bash
# Launch stdio MCP server for agent integration
omniflow mcp
```
