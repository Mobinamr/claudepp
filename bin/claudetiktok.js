#!/usr/bin/env node

// Claude Brainrot - Direct TikTok popup command
// Just run 'claudetiktok' and TikTok opens automatically!

const { exec } = require('child_process');

console.log('🧠 Claude Brainrot - Opening TikTok...\n');

const tiktokUrl = 'https://www.tiktok.com/foryou';

// Try Safari first, then Chrome, then default browser
function openTikTok() {
  console.log('📺 Opening TikTok in top-right corner');

  // Position in top-right corner: more visible
  const safariScript = `
    osascript -e 'tell application "Safari"
      activate
      make new document with properties {URL:"${tiktokUrl}"}
      set bounds of window 1 to {900, 50, 1400, 850}
    end tell'
  `;

  exec(safariScript, (error, stdout, stderr) => {
    if (error) {
      console.log('Safari not available, trying Chrome...');
      openWithChrome();
    } else {
      console.log('✅ TikTok opened in Safari (top-right corner)');
      console.log('🎵 Enjoy watching while Claude works!\n');
      console.log('💡 Tip: Keep this window open to watch throughout your session');

      // Start monitoring for dock/undock behavior
      startMonitoring();
    }
  });
}

function openWithChrome() {
  const chromeScript = `
    osascript -e 'tell application "Google Chrome"
      activate
      make new window
      set URL of active tab of window 1 to "${tiktokUrl}"
      set bounds of front window to {900, 50, 1400, 850}
    end tell'
  `;

  exec(chromeScript, (error, stdout, stderr) => {
    if (error) {
      console.log('Chrome not available, using default browser...');
      exec(`open "${tiktokUrl}"`, (err) => {
        if (!err) {
          console.log('✅ TikTok opened in default browser');
          console.log('🎵 Enjoy watching while Claude works!\n');
          startMonitoring();
        } else {
          console.log('❌ Could not open TikTok. Please install Safari or Chrome.');
          process.exit(1);
        }
      });
    } else {
      console.log('✅ TikTok opened in Chrome (top-right corner)');
      console.log('🎵 Enjoy watching while Claude works!\n');
      console.log('💡 Tip: Keep this window open to watch throughout your session');
      startMonitoring();
    }
  });
}

function startMonitoring() {
  console.log('\n⚡ Monitoring your Claude session...');
  console.log('   • Active work → TikTok visible');
  console.log('   • Waiting for response → TikTok docks after 3s');
  console.log('   • New prompt → TikTok restores automatically\n');
  console.log('Press Ctrl+C to stop\n');

  // Simple activity monitoring
  let lastActivity = Date.now();
  let isMinimized = false;
  let browserType = null;

  // Detect browser type
  exec("pgrep -f Safari", (err, stdout) => {
    if (stdout) browserType = 'safari';
    else {
      exec("pgrep -f 'Google Chrome'", (err, stdout) => {
        if (stdout) browserType = 'chrome';
      });
    }
  });

  // Check for activity every second
  const monitorInterval = setInterval(() => {
    const timeSinceActivity = Date.now() - lastActivity;

    // After 3 seconds of idle, dock TikTok
    if (timeSinceActivity > 3000 && !isMinimized && browserType) {
      console.log('⏸️  Idle detected - docking TikTok (waiting for your response)');
      minimizeWindow(browserType);
      isMinimized = true;
    }
  }, 1000);

  // Listen for stdin to detect new activity
  process.stdin.on('data', () => {
    lastActivity = Date.now();

    if (isMinimized && browserType) {
      console.log('💫 New activity - restoring TikTok');
      restoreWindow(browserType);
      isMinimized = false;
    }
  });

  // Cleanup on exit
  process.on('SIGINT', () => {
    console.log('\n\n👋 Stopping Claude Brainrot...');
    clearInterval(monitorInterval);
    process.exit(0);
  });
}

function minimizeWindow(browser) {
  if (browser === 'safari') {
    exec(`osascript -e 'tell application "Safari" to set miniaturized of window 1 to true'`);
  } else if (browser === 'chrome') {
    exec(`osascript -e 'tell application "System Events" to tell process "Google Chrome" to set value of attribute "AXMinimized" of window 1 to true'`);
  }
}

function restoreWindow(browser) {
  if (browser === 'safari') {
    exec(`osascript -e 'tell application "Safari"
      set miniaturized of window 1 to false
      activate
    end tell'`);
  } else if (browser === 'chrome') {
    exec(`osascript -e 'tell application "System Events" to tell process "Google Chrome" to set value of attribute "AXMinimized" of window 1 to false
    tell application "Google Chrome" to activate'`);
  }
}

// Start the app
openTikTok();
