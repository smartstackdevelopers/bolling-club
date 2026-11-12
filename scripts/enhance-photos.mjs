import { mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import sharp from "sharp";

const imagesRoot = join(process.cwd(), "public", "images");
const source68 = join(process.cwd(), "_club-photos", "WhatsApp Image 2026-11-10 at 5.37.23 PM (68).jpeg");

async function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.jpe?g$/i.test(extname(full))) files.push(full);
  }
  return files;
}

async function makeHero() {
  await sharp(source68)
    .extract({ left: 0, top: 0, width: 960, height: 400 })
    .resize(1920, 800, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.9 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(imagesRoot, "hero.jpg"));

  await sharp(source68)
    .resize(1200, 630, { fit: "cover", position: "top" })
    .sharpen({ sigma: 0.7 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(imagesRoot, "og.jpg"));

  await sharp(source68)
    .extract({ left: 0, top: 0, width: 960, height: 400 })
    .resize(1600, 667, { kernel: "lanczos3" })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(imagesRoot, "club", "lanes", "screens.jpg"));

  console.log("hero, og and lane banner sharpened");
}

async function upscaleFile(file) {
  const meta = await sharp(file).metadata();
  if (!meta.width || meta.width >= 800) return;
  const size = Math.max(meta.width, meta.height) * 4;
  const target = Math.min(824, size);
  const dest = join(imagesRoot, "hd", relative(imagesRoot, file));
  mkdirSync(dirname(dest), { recursive: true });
  const buffer = await sharp(file)
    .resize(target, target, { fit: "cover", kernel: "lanczos3" })
    .sharpen({ sigma: 1, m1: 1, m2: 0.15 })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
  writeFileSync(dest, buffer);
  console.log(`upscaled ${relative(imagesRoot, file)} ${meta.width} -> ${target}`);
}

await makeHero();
const files = await walk(imagesRoot);
for (const file of files) {
  if (file.endsWith("hero.jpg") || file.endsWith("og.jpg") || file.endsWith("screens.jpg")) continue;
  await upscaleFile(file);
}
console.log("Photo enhancement complete.");
