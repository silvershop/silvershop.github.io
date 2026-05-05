# SilverShop website

Marketing site for [SilverShop](https://github.com/silvershop/silvershop-core), built with **Vite**, **React**, **TypeScript**, and **React Router**.

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
```

Output is written to `dist/`. A `404.html` copy of `index.html` is produced so deep links work on **GitHub Pages** with client-side routing.

## Deploying to GitHub Pages

1. In the repository **Settings → Pages**, set **Build and deployment** source to **GitHub Actions** (not only a static branch without a build publishing `dist/`).
2. Push to `main`. The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) runs `npm ci`, `npm run build`, and publishes `dist/`.
3. Custom domain: `public/CNAME` is copied into `dist/` on build (currently `www.silvershop.io`).

Static assets (images, `CNAME`, and other files copied verbatim) live under `public/`.
