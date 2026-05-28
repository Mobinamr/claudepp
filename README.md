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

## Installation (Any User)

```bash
# Clone the repo
git clone https://github.com/Mobinamr/claudepp.git
cd claudepp

# Install and run
npm install
npm start
```

Then just use Claude Code normally - TikTok will appear automatically!

## For Claude Code Users

Tell your Claude:

```
I want TikTok while you work. Install from https://github.com/Mobinamr/claudepp.git
and start it for me.
```

Claude will:
- ✅ Clone the repo
- ✅ Install dependencies
- ✅ Start the server
- ✅ TikTok appears automatically when you work!

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
