/**
 * Builds favicon.ico, Open Graph / Twitter preview image, and apple-touch-icon
 * from the source logo at repo root (silvershop-logo.png).
 */
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcPath = join(root, "silvershop-logo.png");
const publicDir = join(root, "public");

const SITE_ORIGIN = "https://www.silvershop.io";

async function main() {
  try {
    await sharp(srcPath).metadata();
  } catch {
    console.error(`generate-brand-assets: missing or unreadable source: ${srcPath}`);
    process.exit(1);
  }

  const OG_WIDTH = 1200;
  const OG_HEIGHT = 630;

  const { data: ogLogo, info: ogInfo } = await sharp(srcPath)
    .resize({ height: 400, width: 520, fit: "inside" })
    .png()
    .toBuffer({ resolveWithObject: true });

  const ogTop = Math.round((OG_HEIGHT - ogInfo.height) / 2);
  const ogLeft = Math.round((OG_WIDTH - ogInfo.width) / 2);

  await sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 4,
      background: { r: 251, g: 251, b: 252, alpha: 1 },
    },
  })
    .composite([{ input: ogLogo, top: ogTop, left: ogLeft }])
    .png()
    .toFile(join(publicDir, "og-image.png"));

  await sharp(srcPath)
    .resize(180, 180, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile(join(publicDir, "apple-touch-icon.png"));

  const tmp = mkdtempSync(join(tmpdir(), "silvershop-ico-"));
  try {
    const sizes = [16, 32, 48];
    const paths = [];
    for (const size of sizes) {
      const p = join(tmp, `${size}.png`);
      await sharp(srcPath)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png()
        .toFile(p);
      paths.push(p);
    }
    const ico = await pngToIco(paths);
    writeFileSync(join(publicDir, "favicon.ico"), ico);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  console.log(
    `generate-brand-assets: wrote public/favicon.ico, og-image.png, apple-touch-icon.png (from silvershop-logo.png; use ${SITE_ORIGIN}/og-image.png in meta tags).`,
  );
}

await main();
