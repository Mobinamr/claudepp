# Claude Brainrot 🧠

> Automatic TikTok/YouTube Shorts/Instagram Reels while Claude Code works

Ultra-simple app that opens short-form video feeds in your browser when you're actively using Claude Code. No login, no API keys, just entertainment.

## How It Works

1. You start the app
2. It monitors activity
3. When you interact → TikTok/YouTube/Instagram opens in browser
4. Watch videos while Claude processes your prompts
5. Close when done

**That's it. No login, no configuration, no setup.**

## Quick Start

```bash
npm install
npm start
```

Open http://localhost:3000 and click "Test Video Popup"

## For Claude Code Users

Want Claude to set this up? Just say:

```
Hey Claude, I want to use "Claude Brainrot" - setup the project for me.
The files are in my current directory.
```

Claude will:
- ✅ Install dependencies
- ✅ Start the server
- ✅ Open it in your browser

## What Opens

The app rotates through:
- 🎵 TikTok For You page
- ▶️ YouTube Shorts feed
- 📸 Instagram Reels

No login needed - just browse like normal!

## Customization

Want different sites? Edit `src/video/videoPopup.js`:

```javascript
this.videoUrls = [
  'https://www.tiktok.com/foryou',
  'https://www.youtube.com/shorts',
  'https://your-favorite-site.com'
];
```

## Requirements

- macOS (uses AppleScript)
- Node.js 18+
- A browser

## How Activity Detection Works

The app monitors HTTP requests. When you:
- 🔄 Refresh the page
- 🖱️ Click buttons
- 📊 Make API calls

It detects activity and opens videos. After 10 seconds idle, it considers you done.

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
