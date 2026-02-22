# BetPawa Proxy Server

This proxy routes API calls through the server to bypass CORS restrictions.

## Deploy to Railway (Free)

### Step 1 - Create GitHub Repo
1. Go to github.com and sign in (or create free account)
2. Click "New repository"
3. Name it `betpawa-proxy`
4. Click "Create repository"
5. Upload all 3 files: server.js, package.json, railway.toml

### Step 2 - Deploy on Railway
1. Go to railway.app and sign in with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `betpawa-proxy` repo
5. Railway will auto-deploy it
6. Click your project → Settings → Networking → "Generate Domain"
7. Copy your new URL (e.g. `https://betpawa-proxy-production.up.railway.app`)

### Step 3 - Update Your Predictor App
In your existing predictor app on Railway, find where it calls BetPawa API and replace:
```
https://www.betpawa.co.zm/api/...
```
With your new proxy URL:
```
https://YOUR-PROXY-URL.up.railway.app/api/...
```

## How It Works
Browser → Proxy Server → BetPawa API → Back to you

The proxy adds all required headers including `X-Pawa-Brand: betpawa-zambia`
and makes the request server-side, bypassing CORS completely.

## Test It
Visit: https://YOUR-PROXY-URL.up.railway.app/
You should see: {"status":"BetPawa Proxy is running ✅"}

Test API: https://YOUR-PROXY-URL.up.railway.app/api/sportsbook/virtual/v1/seasons/list/actual
