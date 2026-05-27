# Claude Brainrot

> Show TikTok/Instagram Reels/YouTube Shorts while Claude Code is working on your prompts

A macOS app that automatically displays short-form videos when you're actively using Claude Code, helping you stay focused and entertained during long AI interactions.

## What This Does

When you're working with Claude Code and it's processing your requests:
- 🎥 A video popup automatically appears
- 📺 Plays short videos in loop
- ✨ Closes automatically when Claude needs your input
- 🔄 Reopens when you start working again

## Quick Setup (2 steps)

### Step 1: Download and Extract

1. Download this repo as ZIP
2. Extract it anywhere on your Mac
3. Open Terminal and navigate to the folder:
   ```bash
   cd /path/to/extracted/folder
   ```

### Step 2: Start It Up

```bash
npm install
npm start
```

That's it! Open http://localhost:3000 in your browser.

## First Time Use

1. **Login Page** will appear
2. **Use Demo Mode** at the bottom (no setup needed!)
3. Enter any username (e.g., "myusername")
4. Choose a platform (TikTok/Instagram/YouTube)
5. Click "Start Demo Mode"
6. You're in!

The video popup will show automatically when you interact with the dashboard.

## For Claude Code Users

Want Claude to set this up for you? Just paste this in your next Claude Code prompt:

```
Hey Claude, I downloaded "claude brainrot" from GitHub.
It's in my Downloads folder as "claudepp-main.zip".
Please extract it, install dependencies, and start the server for me.
Then explain how to use it.
```

Claude will:
- ✅ Extract the files
- ✅ Run `npm install`
- ✅ Start the server
- ✅ Guide you through using it

## How It Works

The app monitors your activity through HTTP requests. When you:
- 🖱️ Refresh the dashboard
- 📊 Check status updates
- 🎮 Interact with the app

It detects activity and shows videos. After 10 seconds of no activity, videos auto-close.

## Customization (Optional)

### Change Port

Create a `.env` file:
```bash
PORT=3001
HOST=localhost
```

### OAuth Login (Advanced)

OAuth buttons are disabled by default. See [OAUTH_SETUP.md](OAUTH_SETUP.md) for instructions.

## Troubleshooting

**Port already in use?**
```bash
# Use a different port
PORT=3001 npm start
```

**Can't see videos?**
- Make sure you're logged in via demo mode
- Check browser console for errors
- Try clicking "Show Video Popup" manually

**Safari won't open?**
The app tries: Safari → Chrome → Default Browser automatically.

## Project Structure

```
claudepp/
├── src/
│   ├── index.js           # Main server
│   ├── config.js          # Dynamic configuration
│   ├── auth/              # Authentication
│   ├── monitor/           # Activity tracking
│   └── video/             # Video popup management
├── public/
│   ├── login.html         # Login interface
│   ├── dashboard.html     # Main dashboard
│   └── video-popup.html   # Video player
└── package.json
```

## Requirements

- macOS (uses AppleScript for browser control)
- Node.js 18 or higher
- A browser (Safari/Chrome/Firefox)

## Privacy & Security

- ✅ No credentials stored
- ✅ No data sent anywhere
- ✅ Everything runs locally
- ✅ `.env` files are gitignored
- ✅ Demo mode needs no API keys

## Contributing

This is a fun side project! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT

---

Made with Claude Code 🤖
