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
  console.log('   • Claude working → TikTok visible (watch while Claude works!)');
  console.log('   • Claude waiting for you → TikTok docks (focus on responding)');
  console.log('   • You send message → TikTok undocks (watch again!)\n');
  console.log('Press Ctrl+C to stop\n');

  // Monitor Claude Code activity
  let lastClaudeActivity = Date.now();
  let isMinimized = false;
  let browserType = null;
  let claudeIsWorking = true; // Start with TikTok visible

  // Detect browser type
  exec("pgrep -f Safari", (err, stdout) => {
    if (stdout) browserType = 'safari';
    else {
      exec("pgrep -f 'Google Chrome'", (err, stdout) => {
        if (stdout) browserType = 'chrome';
      });
    }
  });

  // Monitor Claude Code process activity
  const monitorInterval = setInterval(() => {
    // Check if Claude Code is actively processing (using CPU)
    exec("ps aux | grep 'Claude Code' | grep -v grep | awk '{print $3}'", (err, stdout) => {
      if (err) return;

      const cpuUsage = parseFloat(stdout.trim());

      // If Claude is using CPU (working), show TikTok
      if (cpuUsage > 0.5) {
        lastClaudeActivity = Date.now();

        if (isMinimized && browserType) {
          console.log('💫 Claude is working - undocking TikTok (watch while Claude works!)');
          restoreWindow(browserType);
          isMinimized = false;
          claudeIsWorking = true;
        }
      } else {
        // If idle for 3 seconds, dock TikTok (Claude waiting for user)
        const timeSinceActivity = Date.now() - lastClaudeActivity;

        if (timeSinceActivity > 3000 && !isMinimized && browserType && claudeIsWorking) {
          console.log('⏸️  Claude waiting - docking TikTok (focus on responding!)');
          minimizeWindow(browserType);
          isMinimized = true;
          claudeIsWorking = false;
        }
      }
    });
  }, 1000);

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
