# OAuth Setup Instructies

OAuth login is momenteel uitgeschakeld omdat het API credentials vereist. Gebruik demo mode om de applicatie te testen.

## Waarom OAuth uitgeschakeld is

Om OAuth login te gebruiken moet je:
1. Developer accounts aanmaken bij elke platform
2. OAuth applicaties registreren
3. Redirect URLs configureren
4. API credentials krijgen en in `.env` plaatsen

Dit is complex en de meeste users hebben dit niet nodig voor testing.

## OAuth Inschakelen (Geavanceerd)

Als je echt OAuth wilt gebruiken, volg deze stappen:

### YouTube OAuth

1. Ga naar [Google Cloud Console](https://console.cloud.google.com/)
2. Maak een nieuw project
3. Enable YouTube Data API v3
4. Ga naar "Credentials" > "Create Credentials" > "OAuth 2.0 Client ID"
5. Configureer OAuth consent screen
6. Kies "Web application"
7. Voeg redirect URI toe: `http://localhost:3000/auth/youtube/callback`
8. Kopieer Client ID en Client Secret naar `.env`:
   ```
   YOUTUBE_CLIENT_ID=your_client_id_here
   YOUTUBE_CLIENT_SECRET=your_client_secret_here
   ```

### Instagram OAuth

1. Ga naar [Facebook Developers](https://developers.facebook.com/)
2. Maak een app aan
3. Voeg Instagram Basic Display toe
4. Configureer OAuth Redirect URI: `http://localhost:3000/auth/instagram/callback`
5. Kopieer App ID en App Secret naar `.env`:
   ```
   INSTAGRAM_CLIENT_ID=your_app_id_here
   INSTAGRAM_CLIENT_SECRET=your_app_secret_here
   ```

### TikTok OAuth

1. Ga naar [TikTok Developers](https://developers.tiktok.com/)
2. Maak een app aan
3. Configureer Login Kit
4. Voeg redirect URI toe: `http://localhost:3000/auth/tiktok/callback`
5. Kopieer Client Key en Client Secret naar `.env`:
   ```
   TIKTOK_CLIENT_KEY=your_client_key_here
   TIKTOK_CLIENT_SECRET=your_client_secret_here
   ```

### OAuth Buttons Inschakelen

Na het configureren van credentials, update `public/login.html`:

1. Verwijder `disabled` class van de OAuth buttons
2. Verwijder `#` en voeg de juiste `/auth/...` URLs terug toe
3. Verwijder of update de oauth-notice

## Aanbeveling

Voor de meeste gebruikers is **demo mode** voldoende om de applicatie te testen. OAuth is alleen nodig als je daadwerkelijk video's wilt fetchen van deze platforms.
