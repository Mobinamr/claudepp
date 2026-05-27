const { exec } = require('child_process');
const path = require('path');
const { getConfig } = require('../config');

class VideoPopupManager {
  constructor() {
    this.active = false;
    this.currentVideoWindow = null;
    this.videoQueue = [];
    this.currentPlatform = 'demo';
    this.config = getConfig();
  }

  async showVideo(platform = 'demo') {
    if (this.active) {
      console.log('Video already showing');
      return;
    }

    this.active = true;
    this.currentPlatform = platform;
    console.log(`🎥 Showing video popup for ${platform}`);

    this.launchVideoPlayer();
  }

  hideVideo() {
    if (!this.active) {
      return;
    }

    this.active = false;
    console.log('🚫 Hiding video popup');

    this.closeVideoPlayer();
  }

  launchVideoPlayer() {
    // Open video popup in a new browser window using AppleScript
    const videoUrl = `${this.config.video.popupUrl}?platform=${this.currentPlatform}`;

    // AppleScript to open URL in a new, minimal browser window
    const script = `
      osascript -e 'tell application "Safari"
        activate
        set windowBounds to {100, 100, 600, 900}
        set newDoc to make new document
        set URL of newDoc to "${videoUrl}"
        set bounds of window 1 to windowBounds
      end tell'
    `;

    exec(script, (error, stdout, stderr) => {
      if (error) {
        console.error('Error launching video player:', error);
        // Fallback: try Chrome
        this.launchWithChrome(videoUrl);
      } else {
        this.currentVideoWindow = 'safari';
        console.log('✅ Video popup launched in Safari');
      }
    });
  }

  launchWithChrome(videoUrl) {
    // Fallback to Chrome if Safari fails
    const script = `
      osascript -e 'tell application "Google Chrome"
        activate
        set windowBounds to {100, 100, 600, 900}
        make new window
        set URL of active tab of window 1 to "${videoUrl}"
      end tell'
    `;

    exec(script, (error, stdout, stderr) => {
      if (error) {
        console.error('Error launching with Chrome:', error);
        // Last resort: use open command
        exec(`open "${videoUrl}"`, (err) => {
          if (!err) {
            this.currentVideoWindow = 'default';
            console.log('✅ Video popup launched with default browser');
          }
        });
      } else {
        this.currentVideoWindow = 'chrome';
        console.log('✅ Video popup launched in Chrome');
      }
    });
  }

  closeVideoPlayer() {
    if (!this.currentVideoWindow) {
      return;
    }

    // Close the video window using AppleScript
    let closeScript = '';

    if (this.currentVideoWindow === 'safari') {
      closeScript = `
        osascript -e 'tell application "Safari"
          set windowCount to count of windows
          if windowCount > 0 then
            set currentURL to URL of current tab of window 1
            if currentURL contains "video-popup.html" then
              close window 1
            end if
          end if
        end tell'
      `;
    } else if (this.currentVideoWindow === 'chrome') {
      closeScript = `
        osascript -e 'tell application "Google Chrome"
          set windowCount to count of windows
          if windowCount > 0 then
            close window 1
          end if
        end tell'
      `;
    }

    if (closeScript) {
      exec(closeScript, (error) => {
        if (error) {
          console.error('Error closing video window:', error);
        } else {
          console.log('✅ Video popup closed');
        }
      });
    }

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
