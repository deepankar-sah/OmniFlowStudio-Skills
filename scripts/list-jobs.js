#!/usr/bin/env node

/**
 * OmniFlow Jobs & Asset Progress Viewer
 * Run: node scripts/list-jobs.js
 */

const BRIDGE_URL = process.env.OMNIFLOW_BRIDGE_URL || 'http://127.0.0.1:8792';

async function main() {
  try {
    const res = await fetch(`${BRIDGE_URL}/jobs`);
    if (!res.ok) {
      console.error(`❌ HTTP error: ${res.status}`);
      process.exit(1);
    }
    const jobs = await res.json();
    if (!Array.isArray(jobs) || jobs.length === 0) {
      console.log('ℹ️ No active or historical generation jobs found in queue.');
      return;
    }

    console.log(`📋 Total OmniFlow Jobs (${jobs.length}):\n`);
    for (const job of jobs.slice(-10)) {
      const statusIcon =
        job.status === 'completed'
          ? '✅'
          : job.status === 'running'
          ? '⏳'
          : job.status === 'failed'
          ? '❌'
          : '🕒';

      console.log(`${statusIcon} [${job.id}] ${job.status.toUpperCase()} (${job.mode})`);
      console.log(`   Prompt: "${job.prompt?.slice(0, 80)}..."`);
      if (job.stage) console.log(`   Stage:  ${job.stage}`);
      if (Array.isArray(job.files) && job.files.length > 0) {
        console.log(`   Output: ${job.files.map((f) => f.path || f.filename).join(', ')}`);
      }
      console.log('');
    }
  } catch (err) {
    console.error(`❌ Bridge connection error: ${err.message}`);
    process.exit(1);
  }
}

main();
