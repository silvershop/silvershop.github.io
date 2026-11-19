/**
 * Pre-render each client route to dist/<route>/index.html so GitHub Pages
 * serves a real file (HTTP 200) with full content and per-page meta, instead
 * of falling through to 404.html. Run after `vite build` and the SSR build.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");
const origin = `https://${readFileSync(resolve(root, "public/CNAME"), "utf8").trim()}`;

const { render, PRERENDER_PATHS } = await import(
  pathToFileURL(resolve(ssrDir, "entry-server.js")).href
);
const template = readFileSync(resolve(dist, "index.html"), "utf8");

const escapeAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`Template missing <meta ${attr}="${key}">`);
  return html.replace(re, `$1${escapeAttr(value)}$2`);
}

for (const path of PRERENDER_PATHS) {
  const { html: appHtml, handle } = await render(path);
  const url = origin + (path === "/" ? "/" : `${path}/`);

  let page = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  if (handle?.documentTitle) {
    const title = handle.documentTitle;
    page = page.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(title)}</title>`);
    page = setMeta(page, "property", "og:title", title);
    page = setMeta(page, "name", "twitter:title", title);
  }
  if (handle?.metaDescription) {
    const desc = handle.metaDescription;
    page = setMeta(page, "name", "description", desc);
    page = setMeta(page, "property", "og:description", desc);
    page = setMeta(page, "name", "twitter:description", desc);
  }
  page = setMeta(page, "property", "og:url", url);
  page = page.replace("</title>", `</title>\n    <link rel="canonical" href="${url}" />`);

  const outDir = path === "/" ? dist : resolve(dist, path.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), page);
  console.log(`prerendered ${path} -> ${outDir.replace(root + "/", "")}/index.html`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PRERENDER_PATHS.map((p) => `  <url><loc>${origin}${p === "/" ? "/" : `${p}/`}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(resolve(dist, "sitemap.xml"), sitemap);
writeFileSync(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);

rmSync(ssrDir, { recursive: true, force: true });
