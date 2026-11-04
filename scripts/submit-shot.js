#!/usr/bin/env node

/**
 * OmniFlow Quick Shot Submitter
 * Usage:
 *   node scripts/submit-shot.js --prompt "Cinematic dusk shot" --mode video --aspectRatio 16:9
 */

const BRIDGE_URL = process.env.OMNIFLOW_BRIDGE_URL || 'http://127.0.0.1:8792';

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    prompt: '',
    mode: 'flow-text-to-video',
    aspectRatio: '16:9',
    duration: '6s',
    subfolder: 'OmniFlow_Agent_Output',
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--prompt' && args[i + 1]) params.prompt = args[++i];
    else if (args[i] === '--mode' && args[i + 1]) {
      const m = args[++i].toLowerCase();
      params.mode = m === 'image' ? 'flow-text-to-image' : 'flow-text-to-video';
    } else if (args[i] === '--aspectRatio' && args[i + 1]) params.aspectRatio = args[++i];
    else if (args[i] === '--duration' && args[i + 1]) params.duration = args[++i];
    else if (args[i] === '--subfolder' && args[i + 1]) params.subfolder = args[++i];
  }

  return params;
}

async function main() {
  const params = parseArgs();
  if (!params.prompt) {
    console.error('❌ Missing required flag: --prompt "Your visual prompt"');
    process.exit(1);
  }

  try {
    const res = await fetch(`${BRIDGE_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: params.mode,
        prompt: params.prompt,
        params: {
          aspectRatio: params.aspectRatio,
          duration: params.duration,
          downloadSubfolder: params.subfolder,
        },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error(`❌ Job rejected: ${data.error || res.statusText}`);
      process.exit(1);
    }

    console.log(`✅ Shot Queued Successfully!`);
    console.log(`   • Job ID:  ${data.jobId}`);
    console.log(`   • Status:  ${data.status}`);
    console.log(`   • Prompt:  "${params.prompt}"`);
  } catch (err) {
    console.error(`❌ Failed to connect to OmniFlow bridge: ${err.message}`);
    process.exit(1);
  }
}

main();
