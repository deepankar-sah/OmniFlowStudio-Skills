#!/usr/bin/env python3
"""
OmniFlow Python Test Verification Script
Run: python scripts/test-connection.py
"""

import sys
import json
import urllib.request
import urllib.error

BRIDGE_URL = "http://127.0.0.1:8792/status"

def check_connection():
    try:
        req = urllib.request.Request(BRIDGE_URL, headers={"User-Agent": "OmniFlow-Python-Client/1.0"})
        with urllib.request.urlopen(req, timeout=2.5) as resp:
            if resp.status == 200:
                data = json.loads(resp.read().decode("utf-8"))
                print("✅ OmniFlow Bridge Connected via Python!")
                print(f"   Extension: {'Connected' if data.get('extensionConnected') else 'Disconnected'}")
                print(f"   Active Jobs: {data.get('activeJobs', 0)} | Queued: {data.get('queuedJobs', 0)}")
                return True
    except urllib.error.URLError as e:
        print(f"❌ Failed to reach OmniFlow Bridge at {BRIDGE_URL}: {e}")
        return False

if __name__ == "__main__":
    success = check_connection()
    sys.exit(0 if success else 1)
