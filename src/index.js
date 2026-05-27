#!/usr/bin/env node

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const { startClaudeMonitor } = require('./monitor/claudeMonitor');
const { initAuth } = require('./auth/authManager');
const { VideoPopupManager } = require('./video/videoPopup');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'claude-focus-videos-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize authentication
initAuth(app);

// Video popup manager
const videoManager = new VideoPopupManager();

// Routes
app.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/api/status', (req, res) => {
  res.json({
    loggedIn: !!req.session.user,
    user: req.session.user,
    claudeActive: videoManager.isActive()
  });
});

// Manual trigger routes for testing
app.post('/api/video/show', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const platform = req.session.user.platform || 'demo';
  videoManager.showVideo(platform);
  res.json({ success: true, message: 'Video popup launched' });
});

app.post('/api/video/hide', (req, res) => {
  videoManager.hideVideo();
  res.json({ success: true, message: 'Video popup closed' });
});

// Start Claude Code monitor
startClaudeMonitor({
  onActive: () => {
    console.log('Claude Code is active - showing video');
    videoManager.showVideo();
  },
  onIdle: () => {
    console.log('Claude Code is idle - hiding video');
    videoManager.hideVideo();
  },
  onWaitingForInput: () => {
    console.log('Claude Code waiting for input - hiding video');
    videoManager.hideVideo();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Claude Focus Videos running on http://localhost:${PORT}`);
  console.log('👉 Open your browser and login to start');
});
