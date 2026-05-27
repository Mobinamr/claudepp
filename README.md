# Claude Focus Videos

Een macOS applicatie die automatisch korte video's (TikTok/Instagram Reels/YouTube Shorts) laat zien terwijl Claude Code aan het werken is, en ze weghaalt zodra Claude klaar is of input nodig heeft.

## Features

- Automatische video popup tijdens Claude Code activiteit
- Demo mode login voor snelle testing
- Focus op je werk - video's verdwijnen wanneer je input nodig is
- Monitor Claude Code's activiteit via log files
- Native macOS integratie
- Modern dark UI met noisy grid design

## Quick Start

```bash
npm install
npm start
```

Open http://localhost:3000 en gebruik **demo mode** om in te loggen.

## Vereisten

- macOS (gebruikt Swift/AppleScript voor systeemintegratie)
- Node.js 18+
- Claude Code geïnstalleerd (optioneel voor monitoring)

## Gebruik

1. Start de applicatie met `npm start`
2. Open http://localhost:3000 in je browser
3. Gebruik demo mode login (geen API keys nodig)
4. Kies een platform (TikTok/Instagram/YouTube) en voer een username in
5. Je komt op het dashboard

## OAuth Login (Optioneel)

OAuth login is standaard uitgeschakeld. Zie [OAUTH_SETUP.md](OAUTH_SETUP.md) voor instructies om OAuth in te schakelen.

Voor de meeste gebruikers is demo mode voldoende.

## Configuratie

Zie [SETUP.md](SETUP.md) voor gedetailleerde setup instructies.
