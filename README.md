# Survey Audio Input & AI Audit

A professional voice-enabled survey application with AI-powered audio verification and Google Sheets integration.

## Features
- **🎙️ Voice Recording**: Capture user feedback directly via microphone.
- **📁 File Upload**: Optional manual audio upload fallback.
- **🤖 AI Audit**: Automatic comparison between form data and audio transcript via ActivePieces/AI.
- **📊 Real-time Sync**: View results processed into Google Sheets.
- **🔊 Audio Playback**: Listen to recordings on the results page.
- **🚀 Vercel Ready**: Optimized for Vercel Serverless Functions to handle webhooks and CORS.

## Local Development

1.  **Static Files**: Open `survey.html` or `results.html` in any browser (or use Live Server).
2.  **Webhook Proxy**: To test webhooks locally without CORS issues:
    - Install dependencies: `npm install`
    - Run the proxy (if you have one) or use the Vercel CLI: `vercel dev`

## Deployment

Deploy directly to Vercel:
```bash
vercel --prod
```
The project is configured via `vercel.json` to route `/api/webhook` to the proxy function in `api/webhook.js`.

## Configuration
- **Webhook URL**: Update `api/webhook.js` with your ActivePieces sync URL.
- **Google Sheets**: Update the `SHEET_URL` in `survey.html` and `results.html` with your public JSON endpoint.
