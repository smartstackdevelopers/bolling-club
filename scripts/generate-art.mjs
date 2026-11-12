import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDir = path.resolve("public/images");
await mkdir(imageDir, { recursive: true });

/**
 * Branded illustration plates. These are placeholders until the club supplies photographs.
 * No text is drawn here, so missing system fonts cannot corrupt the artwork.
 */
function plate({ w, h, a, b, c, shift = 0, mood = "lane" }) {
  const ballX = w * (0.22 + (shift % 5) * 0.04);
  const ballY = h * (mood === "kids" ? 0.58 : 0.64);
  const ballR = mood === "kids" ? h * 0.11 : h * 0.16;
  const pinStart = w * (0.5 + (shift % 3) * 0.02);
  const pins = Array.from({ length: mood === "family" ? 6 : 10 }, (_, i) => {
    const col = i % (mood === "family" ? 3 : 5);
    const row = Math.floor(i / (mood === "family" ? 3 : 5));
    const x = pinStart + col * w * 0.055;
    const y = h * 0.2 + row * h * 0.16;
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${mood === "kids" ? 0.85 : 1})">
      <ellipse cx="0" cy="34" rx="14" ry="5" fill="rgba(0,0,0,.35)"/>
      <path d="M0-30c8 0 14 10 14 20 0 7-3 12-6 17 6 3 10 9 10 18 0 13-8 24-18 24S-18 38-18 25c0-9 4-15 10-18-3-5-6-10-6-17 0-10 6-20 14-20z" fill="#f7f4ef"/>
      <rect x="-9" y="-4" width="18" height="4.5" rx="2" fill="#fb7185"/>
      <rect x="-8" y="4" width="16" height="3.5" rx="1.5" fill="#fb7185"/>
    </g>`;
  }).join("");

  const confetti =
    mood === "birthday"
      ? Array.from({ length: 18 }, (_, i) => {
          const x = (w * ((i * 47 + shift * 13) % 100)) / 100;
          const y = (h * ((i * 29) % 70)) / 100;
          const color = [a, b, c, "#fde68a"][i % 4];
          return `<rect x="${x}" y="${y}" width="14" height="8" rx="2" fill="${color}" transform="rotate(${i * 18} ${x} ${y})" opacity="0.85"/>`;
        }).join("")
      : "";

  const familyBalls =
    mood === "family"
      ? `<circle cx="${w * 0.18}" cy="${h * 0.7}" r="${h * 0.1}" fill="${a}"/>
         <circle cx="${w * 0.3}" cy="${h * 0.76}" r="${h * 0.075}" fill="${b}"/>
         <circle cx="${w * 0.12}" cy="${h * 0.8}" r="${h * 0.06}" fill="${c}"/>`
      : "";

  const kidOrbs =
    mood === "kids"
      ? `<circle cx="${w * 0.16}" cy="${h * 0.28}" r="${h * 0.12}" fill="${c}" opacity="0.9"/>
         <circle cx="${w * 0.28}" cy="${h * 0.18}" r="${h * 0.06}" fill="${b}"/>
         <circle cx="${w * 0.12}" cy="${h * 0.46}" r="${h * 0.045}" fill="#fde68a"/>`
      : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="35%" r="75%">
      <stop offset="0%" stop-color="${b}"/>
      <stop offset="42%" stop-color="#141833"/>
      <stop offset="100%" stop-color="#07091a"/>
    </radialGradient>
    <radialGradient id="ball" cx="34%" cy="32%" r="70%">
      <stop offset="0%" stop-color="#ddd6fe"/>
      <stop offset="28%" stop-color="${a}"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </radialGradient>
    <linearGradient id="lane" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(125,211,252,0.15)"/>
      <stop offset="100%" stop-color="rgba(56,189,248,0.45)"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <circle cx="${w * 0.82}" cy="${h * 0.12}" r="${h * 0.55}" fill="${a}" opacity="0.22"/>
  <circle cx="${w * 0.08}" cy="${h}" r="${h * 0.48}" fill="${c}" opacity="0.18"/>
  <polygon points="${w * 0.2},${h} ${w * 0.8},${h} ${w * 0.63},${h * 0.16} ${w * 0.37},${h * 0.16}" fill="url(#lane)" stroke="rgba(186,230,253,0.55)" stroke-width="3"/>
  <polygon points="${w * 0.485},${h} ${w * 0.515},${h} ${w * 0.505},${h * 0.18} ${w * 0.495},${h * 0.18}" fill="#fbbf24"/>
  ${pins}
  ${confetti}
  ${kidOrbs}
  ${familyBalls}
  <ellipse cx="${ballX}" cy="${ballY + ballR * 0.85}" rx="${ballR}" ry="${ballR * 0.28}" fill="rgba(0,0,0,.35)"/>
  <circle cx="${ballX}" cy="${ballY}" r="${ballR}" fill="url(#ball)"/>
  <circle cx="${ballX - ballR * 0.28}" cy="${ballY - ballR * 0.22}" r="${ballR * 0.11}" fill="#07091a"/>
  <circle cx="${ballX - ballR * 0.02}" cy="${ballY - ballR * 0.38}" r="${ballR * 0.11}" fill="#07091a"/>
  <circle cx="${ballX - ballR * 0.22}" cy="${ballY + ballR * 0.08}" r="${ballR * 0.11}" fill="#07091a"/>
  <rect x="0" y="${h - 10}" width="${w}" height="10" fill="${a}"/>
</svg>`;
}

const jobs = [
  ["hero.png", 1600, 900, "#7c3aed", "#38bdf8", "#f472b6", 0, "lane"],
  ["about.png", 1400, 1000, "#6366f1", "#22d3ee", "#fbbf24", 1, "lane"],
  ["experience.png", 1400, 1000, "#8b5cf6", "#818cf8", "#fb7185", 2, "lane"],
  ["kids.png", 1400, 1000, "#f472b6", "#fbbf24", "#38bdf8", 3, "kids"],
  ["family.png", 1400, 1000, "#38bdf8", "#a78bfa", "#fbbf24", 4, "family"],
  ["birthday.png", 1400, 1000, "#fbbf24", "#f472b6", "#c084fc", 2, "birthday"],
  ["offers.png", 1400, 900, "#22d3ee", "#8b5cf6", "#fde68a", 5, "lane"],
  ["contact.png", 1400, 900, "#312e81", "#38bdf8", "#f472b6", 1, "family"],
  ["guide-kids.png", 1400, 1000, "#fb7185", "#fde68a", "#67e8f9", 4, "kids"],
  ["guide-family.png", 1400, 1000, "#818cf8", "#38bdf8", "#f9a8d4", 3, "family"],
  ["packages.png", 1400, 1000, "#f59e0b", "#e879f9", "#38bdf8", 6, "birthday"],
  ["og.png", 1200, 630, "#7c3aed", "#38bdf8", "#f472b6", 0, "lane"],
  ["gallery-1.png", 1200, 900, "#38bdf8", "#6366f1", "#fbbf24", 0, "lane"],
  ["gallery-2.png", 900, 1200, "#f472b6", "#fbbf24", "#22d3ee", 1, "kids"],
  ["gallery-3.png", 1200, 900, "#818cf8", "#38bdf8", "#f9a8d4", 2, "family"],
  ["gallery-4.png", 1200, 1100, "#fbbf24", "#fb7185", "#a78bfa", 3, "birthday"],
  ["gallery-5.png", 1200, 800, "#22d3ee", "#4f46e5", "#e9d5ff", 4, "lane"],
  ["gallery-6.png", 900, 1100, "#f9a8d4", "#67e8f9", "#fde68a", 5, "kids"],
  ["gallery-7.png", 1200, 900, "#a78bfa", "#38bdf8", "#fbbf24", 6, "family"],
  ["gallery-8.png", 1200, 1000, "#e879f9", "#fbbf24", "#38bdf8", 7, "birthday"],
];

for (const [name, w, h, a, b, c, shift, mood] of jobs) {
  const png = await sharp(Buffer.from(plate({ w, h, a, b, c, shift, mood }))).png({ compressionLevel: 9 }).toBuffer();
  await sharp(png).toFile(path.join(imageDir, name));
}

const icon = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="116" fill="#07091a"/>
  <circle cx="196" cy="268" r="112" fill="#7c3aed"/>
  <circle cx="156" cy="230" r="16" fill="#07091a"/>
  <circle cx="196" cy="206" r="16" fill="#07091a"/>
  <circle cx="168" cy="262" r="16" fill="#07091a"/>
  <g transform="translate(300 132) scale(2.15)">
    <path d="M20 2c8 0 14 9 14 18 0 6-2 11-5 15 5 3 9 8 9 16 0 12-8 22-18 22S2 63 2 51c0-8 4-13 9-16-3-4-5-9-5-15C6 11 12 2 20 2z" fill="#f8f5ef"/>
    <rect x="11" y="24" width="18" height="4" rx="2" fill="#fb7185"/>
  </g>
</svg>`);

const iconPng = await sharp(icon).png().toBuffer();
await sharp(iconPng).toFile(path.resolve("src/app/icon.png"));
await sharp(iconPng).resize(180, 180).toFile(path.resolve("src/app/apple-icon.png"));

console.log(`Wrote ${jobs.length} illustrations plus app icons.`);
