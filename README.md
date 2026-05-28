# Claude Brainrot 🧠

> Automatic TikTok while Claude Code works - dock/undock system

Watch TikTok automatically while working with Claude Code! The app docks TikTok when waiting for your response, and restores it when you send a new prompt. Keep watching the same video across your entire session!

## How It Works

1. You start the app
2. Send a prompt to Claude → TikTok opens
3. TikTok plays while Claude works
4. After 3s idle → TikTok docks (waiting for you)
5. Send new prompt → TikTok restores (same video!)
6. Keep watching throughout your session

**No login, no configuration, 100% automatic**

---

## Complete Setup Guide (Step-by-Step)

### Prerequisites

Before you start, make sure you have:
- ✅ **macOS** (uses AppleScript for window control)
- ✅ **Node.js 18+** installed ([Download here](https://nodejs.org/))
- ✅ **Safari or Chrome** browser
- ✅ **Claude Code** installed and running

To check if you have Node.js:
```bash
node --version
# Should show v18.0.0 or higher
```

---

### Option 1: Manual Installation (For Any User)

#### Step 1: Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/Mobinamr/claudepp.git
cd claudepp
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Start the App
```bash
npm start
```

You should see:
```
🧠 Claude Brainrot - Running!
🚀 Open: http://localhost:3000
📺 Videos will open automatically when you interact
👤 User: yourusername
```

#### Step 4: Use Claude Code Normally
- Open Claude Code in your terminal
- Start working on any task
- TikTok will automatically open in the top-right corner!
- When you stop typing (waiting for Claude), TikTok docks after 3 seconds
- When you send a new prompt, TikTok undocks automatically

#### Step 5: Stop the App (When Done)
Press `Ctrl+C` in the terminal where the app is running

---

### Option 2: Let Claude Do It For You

If you're already in Claude Code, just tell Claude:

```
I want TikTok while you work. Install from https://github.com/Mobinamr/claudepp.git
and start it for me.
```

Claude will:
- ✅ Clone the repo
- ✅ Install dependencies
- ✅ Start the server
- ✅ TikTok appears automatically when you work!

---

## Quick Test

Want to test if it's working? After starting the app:

1. Visit http://localhost:3000 in your browser
2. Click the "🎥 Test TikTok Popup" button
3. TikTok should open in the top-right corner of your screen!

---

## Troubleshooting

### TikTok doesn't open
- Make sure Safari or Chrome is installed
- Check that the app is running (`npm start`)
- Try clicking "Test TikTok Popup" at http://localhost:3000

### Window opens off-screen
- The app positions TikTok at coordinates (900, 50, 1400, 850)
- If you have a small screen, you can customize this in `src/video/videoPopup.js`

### Port 3000 already in use
Run with a different port:
```bash
PORT=3001 npm start
```

### App not detecting Claude Code activity
- Make sure you're actively using the terminal/browser where the app is running
- The app monitors HTTP requests to detect activity

## What Opens

- 🎵 TikTok For You page (no login needed!)
- Opens in Safari/Chrome in top-right area
- Docks automatically when waiting for your input
- Restores when you send new prompts

## Customization

Want different video site? Edit `src/video/videoPopup.js`:

```javascript
this.tiktokUrl = 'https://www.youtube.com/shorts'; // or any site!
```

## Requirements

- macOS (uses AppleScript for window control)
- Node.js 18+
- Safari or Chrome

## How It Works Technically

The app monitors HTTP activity from Claude Code:
- Detects when you send prompts → Shows TikTok
- After 3s idle → Docks TikTok to tray
- New prompt → Restores TikTok window
- Same session continues throughout!

## Privacy

- ✅ No data collection
- ✅ No tracking
- ✅ No external servers
- ✅ Everything runs locally
- ✅ No login/passwords needed

## Project Structure

```
claudepp/
├── src/
│   ├── index.js              # Main server (all-in-one)
│   ├── config.js             # Dynamic config
│   ├── monitor/
│   │   └── simpleMonitor.js  # Activity tracking
│   └── video/
│       └── videoPopup.js     # Browser opener
└── package.json
```

## Why "Claude Brainrot"?

Because watching TikTok while Claude works is peak productivity. 😎

## License

MIT - Do whatever you want with it

---

Made with Claude Code 🤖
