const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const os = require('os');

class ClaudeMonitor {
  constructor(callbacks) {
    this.callbacks = callbacks;
    this.isClaudeActive = false;
    this.lastActivity = Date.now();
    this.logPath = this.findClaudeLogPath();
    this.watcher = null;
    this.checkInterval = null;
  }

  findClaudeLogPath() {
    // Try environment variable first
    if (process.env.CLAUDE_LOG_PATH && fs.existsSync(process.env.CLAUDE_LOG_PATH)) {
      return process.env.CLAUDE_LOG_PATH;
    }

    // macOS default paths for Claude Code
    const possiblePaths = [
      path.join(os.homedir(), 'Library', 'Logs', 'Claude Code'),
      path.join(os.homedir(), 'Library', 'Application Support', 'Claude Code', 'logs'),
      path.join(os.homedir(), '.claude', 'logs')
    ];

    for (const logPath of possiblePaths) {
      if (fs.existsSync(logPath)) {
        console.log(`✅ Found Claude Code logs at: ${logPath}`);
        return logPath;
      }
    }

    console.warn('⚠️  Could not find Claude Code logs. Please set CLAUDE_LOG_PATH in .env');
    return null;
  }

  start() {
    if (!this.logPath) {
      console.warn('⚠️  Running in demo mode - Claude Code monitoring disabled');
      console.warn('💡 To enable monitoring, set CLAUDE_LOG_PATH in .env to your Claude Code logs directory');
      return;
    }

    console.log(`🔍 Starting Claude Code monitor on: ${this.logPath}`);

    // Watch for file changes in log directory
    this.watcher = chokidar.watch(this.logPath, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: false
    });

    this.watcher
      .on('add', (filePath) => this.onFileChange(filePath))
      .on('change', (filePath) => this.onFileChange(filePath))
      .on('error', (error) => console.error(`Watcher error: ${error}`));

    // Check for idle state every 2 seconds
    this.checkInterval = setInterval(() => this.checkIdleState(), 2000);

    console.log('✅ Claude Code monitor started');
  }

  onFileChange(filePath) {
    this.lastActivity = Date.now();

    // Read last lines of log file to detect state
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').slice(-10); // Last 10 lines

      const hasWaitingPattern = lines.some(line =>
        line.includes('waiting for user input') ||
        line.includes('user input required') ||
        line.includes('AskUserQuestion') ||
        line.includes('pending user response')
      );

      const hasActivePattern = lines.some(line =>
        line.includes('tool use') ||
        line.includes('executing') ||
        line.includes('processing')
      );

      if (hasWaitingPattern) {
        this.setWaitingForInput();
      } else if (hasActivePattern) {
        this.setActive();
      }
    } catch (error) {
      // Ignore read errors (file might be locked)
    }
  }

  checkIdleState() {
    const idleTimeout = 5000; // 5 seconds
    const timeSinceLastActivity = Date.now() - this.lastActivity;

    if (timeSinceLastActivity > idleTimeout && this.isClaudeActive) {
      this.setIdle();
    }
  }

  setActive() {
    if (!this.isClaudeActive) {
      this.isClaudeActive = true;
      this.callbacks.onActive?.();
    }
  }

  setIdle() {
    if (this.isClaudeActive) {
      this.isClaudeActive = false;
      this.callbacks.onIdle?.();
    }
  }

  setWaitingForInput() {
    if (this.isClaudeActive) {
      this.isClaudeActive = false;
      this.callbacks.onWaitingForInput?.();
    }
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
    }
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    console.log('🛑 Claude Code monitor stopped');
  }
}

let monitorInstance = null;

function startClaudeMonitor(callbacks) {
  if (monitorInstance) {
    monitorInstance.stop();
  }
  monitorInstance = new ClaudeMonitor(callbacks);
  monitorInstance.start();
  return monitorInstance;
}

function stopClaudeMonitor() {
  if (monitorInstance) {
    monitorInstance.stop();
    monitorInstance = null;
  }
}

module.exports = {
  ClaudeMonitor,
  startClaudeMonitor,
  stopClaudeMonitor
};
