// Simple real-time activity monitor
// Triggers video popup when there's activity in the session

class SimpleActivityMonitor {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.isActive = false;
    this.lastActivityTime = Date.now();
    this.activityTimeout = null;
    this.checkInterval = null;
    this.idleStartTime = null; // Track when idle started
  }

  start() {
    console.log('🔍 Starting simple activity monitor');

    // Check activity every 1 second
    this.checkInterval = setInterval(() => {
      this.checkActivity();
    }, 1000);

    console.log('✅ Simple activity monitor started');
  }

  checkActivity() {
    const now = Date.now();
    const timeSinceLastActivity = now - this.lastActivityTime;

    // If no activity for 3 seconds, dock TikTok (waiting for user response)
    if (timeSinceLastActivity > 3000 && this.isActive) {
      this.setIdle();
    }
  }

  // Call this whenever there's activity (API calls, etc.)
  recordActivity() {
    this.lastActivityTime = Date.now();

    // If was idle (docked), restore TikTok
    if (!this.isActive) {
      this.setActive();
    }
  }

  setActive() {
    this.isActive = true;
    console.log('🟢 Activity detected - showing/restoring TikTok');
    this.callbacks.onActive?.();
  }

  setIdle() {
    this.isActive = false;
    console.log('⏸️  Idle (3s) - docking TikTok');
    this.callbacks.onIdle?.();
  }

  stop() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    if (this.activityTimeout) {
      clearTimeout(this.activityTimeout);
    }
    console.log('🛑 Simple activity monitor stopped');
  }
}

let monitorInstance = null;

function startSimpleMonitor(callbacks) {
  if (monitorInstance) {
    monitorInstance.stop();
  }
  monitorInstance = new SimpleActivityMonitor(callbacks);
  monitorInstance.start();
  return monitorInstance;
}

function stopSimpleMonitor() {
  if (monitorInstance) {
    monitorInstance.stop();
    monitorInstance = null;
  }
}

function recordActivity() {
  if (monitorInstance) {
    monitorInstance.recordActivity();
  }
}

module.exports = {
  SimpleActivityMonitor,
  startSimpleMonitor,
  stopSimpleMonitor,
  recordActivity
};
