// Vercel Serverless Function — proxies form data to ActivePieces webhook
// This eliminates CORS errors because the browser calls same-origin /api/webhook

export const config = {
    api: {
        bodyParser: false, // We forward the raw request body (multipart/form-data)
    },
    // Vercel max function duration (seconds) — Pro plan allows up to 300s
    maxDuration: 180,
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const WEBHOOK_URL =
        'https://cloud.activepieces.com/api/v1/webhooks/UWcyBeIHyqXTwGKVQm3s8/sync';

    try {
        // Collect the raw body from the incoming request
        const chunks = [];
        for await (const chunk of req) {
            chunks.push(chunk);
        }
        const body = Buffer.concat(chunks);

        // Forward to ActivePieces with 3-minute timeout
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 170000); // 170s

        const upstream = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': req.headers['content-type'] || 'application/octet-stream',
            },
            body,
            signal: controller.signal,
        });

        clearTimeout(timeout);
        const text = await upstream.text();

        // Mirror status and forward response body
        res.status(upstream.status);
        const ct = upstream.headers.get('content-type');
        if (ct) res.setHeader('Content-Type', ct);
        res.send(text);
    } catch (err) {
        console.error('Webhook proxy error:', err);
        res.status(502).json({ error: 'Failed to reach webhook', details: err.message });
    }
}
