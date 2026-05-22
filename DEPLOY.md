# Deploying on Vercel

## Why `/pages/*` was 404

Vercel was serving an old **single-page Vite build** (`dist/index.html` only). Links like `/pages/overview.html` did not exist in that output.

This repo now includes `vite.config.js` so `npm run build` emits **all 19 HTML pages** under `dist/`.

## Required Vercel project settings

In [Vercel Dashboard](https://vercel.com) → your **fevotech.com** project → **Settings** → **Build & Deployment**:

| Setting | Value |
|--------|--------|
| Framework Preset | **Other** (not Vite-only defaults that ignore `vercel.json`) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Root Directory | *(leave empty)* |
| Production Branch | `main` |

Turn **off** overrides that ignore `vercel.json`, or set the same values in the UI.

## After pushing to GitHub

1. Open **Deployments** and confirm the latest commit (`495d69e` or newer) built successfully.
2. If there is no new deployment, click **Redeploy** on `main` or reconnect the GitHub repo.
3. Ensure custom domain **fevotech.com** is attached to **this** project (not an old one).

## Verify production

- https://fevotech.com/ — homepage should load
- https://fevotech.com/pages/overview.html — should return **200**, not 404

If the homepage still references hashed files like `logo-BFltIPt_.svg`, production is still on an **old deployment** — trigger a fresh deploy from `main`.

## Local check

```bash
npm run build
ls dist/pages/overview.html
```
