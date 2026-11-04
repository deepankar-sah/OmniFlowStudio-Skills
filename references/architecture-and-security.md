# OmniFlow Architecture & Security Blueprint

OmniFlow operates across four isolated runtime boundaries to guarantee security, stability, and zero API costs.

---

## Architecture Flow

```text
┌─────────────────────────────────┐
│     AI Agent (Claude / IDE)     │
└────────────────┬────────────────┘
                 │ HTTP REST / MCP Stdio / WebSocket
                 ▼
┌─────────────────────────────────┐
│  OmniFlow Daemon (127.0.0.1)    │ ◄── Enforces FIFO queue, circuit breakers, & Smart Delays
└────────────────┬────────────────┘
                 │ Loopback WebSocket (/ws) with Origin Verification
                 ▼
┌─────────────────────────────────┐
│ Chrome Extension (Service Worker)│ ◄── Handles download renaming & tab management
└────────────────┬────────────────┘
                 │ Chrome DevTools Protocol (CDP) + Content Script
                 ▼
┌─────────────────────────────────┐
│   Google Flow Web Studio Tab    │ ◄── Dispatches trusted synthetic clicks & prompt injection
└─────────────────────────────────┘
```

---

## Security Invariants

1. **Loopback Isolation**: The daemon binds strictly to `127.0.0.1`. It does not listen on public network interfaces (`0.0.0.0`), preventing local network access.
2. **Origin Validation Guard**: HTTP and WebSocket servers validate incoming `Origin` headers. Requests from untrusted external websites visiting arbitrary tabs are rejected with `403 Forbidden`.
3. **Zero Remote Prompt Uploads**: Prompts are executed locally inside your active browser session. No third-party proxy intercepts your creative ideas.
4. **Trusted Synthetic Inputs**: Low-level mouse and keyboard dispatches utilize Chromium's CDP (`Input.dispatchMouseEvent`, `Input.insertText`) certified as `isTrusted: true`, preventing automation detection without modifying client DOM scripts.
