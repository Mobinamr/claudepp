# Setup Instructies

## Stap 1: Installeer Dependencies

```bash
npm install
```

## Stap 2: Configuratie

1. Kopieer `.env.example` naar `.env`:
```bash
cp .env.example .env
```

2. Update het Claude Code log pad in `.env`:
```bash
CLAUDE_LOG_PATH=/Users/JOUW_GEBRUIKERSNAAM/Library/Logs/Claude Code
```

Vervang `JOUW_GEBRUIKERSNAAM` met je eigen macOS gebruikersnaam.

## Stap 3: API Keys (Optioneel)

Voor echte OAuth integratie met TikTok/Instagram/YouTube, voeg je API keys toe aan `.env`:

### TikTok API
1. Ga naar https://developers.tiktok.com/
2. Maak een app aan
3. Krijg je Client Key en Client Secret
4. Voeg toe aan `.env`

### Instagram API
1. Ga naar https://developers.facebook.com/
2. Maak een app aan met Instagram Basic Display
3. Krijg je Client ID en Secret
4. Voeg toe aan `.env`

### YouTube API
1. Ga naar https://console.cloud.google.com/
2. Maak een project aan
3. Enable YouTube Data API v3
4. Krijg OAuth credentials
5. Voeg toe aan `.env`

**Let op:** Voor demo doeleinden kun je de app gebruiken zonder API keys via de "Demo Mode" op de login pagina.

## Stap 4: Start de Applicatie

```bash
npm start
```

De applicatie draait nu op http://localhost:3000

## Stap 5: Gebruik

1. Open http://localhost:3000 in je browser
2. Log in met je social media account (of gebruik Demo Mode)
3. Laat de browser open
4. Start Claude Code in je terminal
5. Wanneer Claude actief is, krijg je een notificatie (video popup komt later)

## Volgende Stappen

Om een echte video popup te maken, heb je nog nodig:

1. **Electron integratie** - Om een native window te openen met video's
2. **Video API's** - Om daadwerkelijk video's op te halen van platforms
3. **Video speler** - Om de video's af te spelen in een floating window

### Quick Win: Lokale Video's

Als je snel wilt testen, kun je lokale video bestanden gebruiken:

1. Maak een `videos/` folder
2. Download wat TikTok/YouTube Shorts video's
3. Update `videoPopup.js` om deze lokale video's af te spelen

## Troubleshooting

### "Could not find Claude Code logs"

Je moet het juiste pad naar Claude Code's logs instellen. Probeer:

```bash
# Zoek naar Claude Code logs
find ~/Library -name "*claude*" -type d 2>/dev/null

# Of handmatig checken:
ls ~/Library/Logs/
ls ~/Library/Application\ Support/
```

### "Port 3000 is already in use"

Wijzig de port in `.env`:
```bash
PORT=3001
```

### Monitoring werkt niet

1. Check of Claude Code daadwerkelijk logs schrijft
2. Controleer de permissions op de log folder
3. Check de console output voor errors

## macOS Permissions

Je moet mogelijk toegang geven tot:
- Bestanden en mappen
- Notificaties
- Accessibility (voor AppleScript)

Ga naar **Systeem Voorkeuren** > **Privacy & Beveiliging** en geef de nodige toegang.
