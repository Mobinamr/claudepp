// Central configuration for the app
// No hardcoded values - everything is dynamic

const os = require('os');
const path = require('path');

function getConfig() {
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';
  const BASE_URL = `http://${HOST}:${PORT}`;

  return {
    // Server config
    port: PORT,
    host: HOST,
    baseUrl: BASE_URL,

    // Session config
    sessionSecret: process.env.SESSION_SECRET || 'change-this-secret-in-production',

    // Paths (auto-detect user's home directory)
    userHome: os.homedir(),
    username: os.userInfo().username,

    // Claude Code log paths (try multiple locations)
    possibleLogPaths: [
      path.join(os.homedir(), 'Library', 'Logs', 'Claude Code'),
      path.join(os.homedir(), 'Library', 'Application Support', 'Claude Code', 'logs'),
      path.join(os.homedir(), '.claude', 'logs'),
      path.join(os.homedir(), '.config', 'claude', 'logs'),
    ],

    // OAuth redirect URLs (dynamic based on BASE_URL)
    oauth: {
      tiktok: {
        redirectUri: `${BASE_URL}/auth/tiktok/callback`
      },
      instagram: {
        redirectUri: `${BASE_URL}/auth/instagram/callback`
      },
      youtube: {
        redirectUri: `${BASE_URL}/auth/youtube/callback`
      }
    },

    // Video popup config
    video: {
      popupUrl: `${BASE_URL}/video-popup.html`,
      idleTimeout: 10000, // 10 seconds
    }
  };
}

module.exports = { getConfig };
