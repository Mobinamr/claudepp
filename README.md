# Claude Focus Videos

Een macOS applicatie die automatisch korte video's (TikTok/Instagram Reels/YouTube Shorts) laat zien terwijl Claude Code aan het werken is, en ze weghaalt zodra Claude klaar is of input nodig heeft.

## Features

- 🎥 Automatische video popup tijdens Claude Code activiteit
- 🔐 Login met social media accounts (TikTok/Instagram/YouTube)
- 🎯 Focus op je werk - video's verdwijnen wanneer je input nodig is
- 📊 Monitor Claude Code's activiteit via log files
- ⚡ Native macOS integratie

## Vereisten

- macOS (gebruikt Swift/AppleScript voor systeemintegratie)
- Node.js 18+
- Claude Code geïnstalleerd

## Installatie

```bash
npm install
cp .env.example .env
# Vul je API keys in .env in
npm start
```

## Gebruik

1. Start de applicatie
2. Log in met je social media account
3. De applicatie monitort automatisch Claude Code
4. Video's verschijnen tijdens Claude's werk
5. Video's verdwijnen wanneer Claude klaar is of input nodig heeft

## Configuratie

Zie `.env.example` voor alle configuratie opties.
