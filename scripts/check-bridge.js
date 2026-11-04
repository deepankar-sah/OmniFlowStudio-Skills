#!/usr/bin/env node

/**
 * OmniFlow Bridge Health & Status Checker
 * Run: node scripts/check-bridge.js
 */

const BRIDGE_URL = process.env.OMNIFLOW_BRIDGE_URL || 'http://127.0.0.1:8792';

async function main() {
  try {
    const res = await fetch(`${BRIDGE_URL}/status`, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) {
      console.error(`❌ Bridge responded with HTTP error: ${res.status}`);
      process.exit(1);
    }
    const data = await res.json();
    console.log('✅ OmniFlow Bridge Status:');
    console.log(`   • Bridge Server:       UP (v${data.bridgeVersion})`);
    console.log(`   • Chrome Extension:    ${data.extensionConnected ? '🟢 Connected' : '🔴 Disconnected'}`);
    console.log(`   • Canvas Tab Visible:  ${data.tabVisible ? '🟢 Yes' : '🟡 No active Flow tab'}`);
    console.log(`   • Active / Queued:     ${data.activeJobs} active / ${data.queuedJobs} queued`);
    if (data.quota) {
      console.log(`   • Plan:                ${data.quota.isPro ? '⭐ PRO (Unlimited)' : 'FREE (20/day)'}`);
      console.log(`   • Daily Usage:         ${data.quota.dailyUsage} generations`);
    }
  } catch {
    console.error(`❌ OmniFlow Bridge is OFFLINE at ${BRIDGE_URL}.`);
    console.error(`   To start: run 'omniflow bridge start' in your terminal.`);
    process.exit(1);
  }
}

main();
