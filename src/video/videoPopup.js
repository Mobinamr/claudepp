const { exec } = require('child_process');
const path = require('path');

class VideoPopupManager {
  constructor() {
    this.active = false;
    this.currentVideoWindow = null;
    this.videoQueue = [];
    this.currentPlatform = null; // 'tiktok', 'instagram', or 'youtube'
  }

  async showVideo() {
    if (this.active) {
      console.log('Video already showing');
      return;
    }

    this.active = true;
    console.log('🎥 Showing video popup');

    // Use AppleScript to create a floating video window on macOS
    const script = `
      tell application "System Events"
        -- Create a floating window with video content
        display dialog "🎥 Video Player Active" buttons {"OK"} default button 1 giving up after 2
      end tell
    `;

    // For now, we'll use a simple approach
    // In production, you'd want to use Electron or a proper video player
    this.launchVideoPlayer();
  }

  hideVideo() {
    if (!this.active) {
      return;
    }

    this.active = false;
    console.log('🚫 Hiding video popup');

    // Close the video window
    this.closeVideoPlayer();
  }

  launchVideoPlayer() {
    // This is a placeholder - you'll want to implement actual video playback
    // Options:
    // 1. Launch Electron window with embedded video
    // 2. Use mpv or VLC with AppleScript
    // 3. Create a WebView with video content

    const script = `
      osascript -e 'display notification "Video playing..." with title "Claude Focus Videos"'
    `;

    exec(script, (error, stdout, stderr) => {
      if (error) {
        console.error('Error showing notification:', error);
      }
    });

    // Store reference for closing later
    this.currentVideoWindow = 'active';
  }

  closeVideoPlayer() {
    if (!this.currentVideoWindow) {
      return;
    }

    const script = `
      osascript -e 'display notification "Video stopped" with title "Claude Focus Videos"'
    `;

    exec(script, (error, stdout, stderr) => {
      if (error) {
        console.error('Error hiding notification:', error);
      }
    });

    this.currentVideoWindow = null;
  }

  isActive() {
    return this.active;
  }

  setVideoSource(platform, videos) {
    this.currentPlatform = platform;
    this.videoQueue = videos;
  }

  getNextVideo() {
    if (this.videoQueue.length === 0) {
      return null;
    }
    return this.videoQueue.shift();
  }
}

module.exports = { VideoPopupManager };
