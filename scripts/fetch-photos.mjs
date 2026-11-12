import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDir = path.resolve("public/images");
await mkdir(imageDir, { recursive: true });

const jobs = [
  {
    file: "hero.jpg",
    w: 1920,
    h: 1080,
    urls: [
      "https://images.pexels.com/photos/36609679/pexels-photo-36609679.jpeg?auto=compress&cs=tinysrgb&w=2400",
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=2400&q=80",
    ],
  },
  {
    file: "about.jpg",
    w: 1600,
    h: 1100,
    urls: [
      "https://images.pexels.com/photos/344034/pexels-photo-344034.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?auto=format&fit=crop&w=2000&q=80",
    ],
  },
  {
    file: "experience.jpg",
    w: 1600,
    h: 1000,
    urls: [
      "https://images.pexels.com/photos/7429770/pexels-photo-7429770.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=2000&q=80",
    ],
  },
  {
    file: "kids.jpg",
    w: 1400,
    h: 1000,
    urls: [
      "https://images.pexels.com/photos/9908694/pexels-photo-9908694.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/9821622/pexels-photo-9821622.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "family.jpg",
    w: 1600,
    h: 1000,
    urls: [
      "https://images.pexels.com/photos/13165149/pexels-photo-13165149.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/7429616/pexels-photo-7429616.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "birthday.jpg",
    w: 1600,
    h: 1000,
    urls: [
      "https://images.pexels.com/photos/8104171/pexels-photo-8104171.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/7429616/pexels-photo-7429616.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "offers.jpg",
    w: 1600,
    h: 900,
    urls: [
      "https://images.pexels.com/photos/5952897/pexels-photo-5952897.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/344034/pexels-photo-344034.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "contact.jpg",
    w: 1600,
    h: 900,
    urls: [
      "https://images.pexels.com/photos/31194336/pexels-photo-31194336.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/5952949/pexels-photo-5952949.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "guide-kids.jpg",
    w: 1400,
    h: 1600,
    urls: [
      "https://images.pexels.com/photos/9821622/pexels-photo-9821622.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/9908694/pexels-photo-9908694.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "guide-family.jpg",
    w: 1600,
    h: 1100,
    urls: [
      "https://images.pexels.com/photos/7429616/pexels-photo-7429616.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/13165149/pexels-photo-13165149.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "packages.jpg",
    w: 1400,
    h: 1600,
    urls: [
      "https://images.pexels.com/photos/8104171/pexels-photo-8104171.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/5952901/pexels-photo-5952901.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "og.jpg",
    w: 1200,
    h: 630,
    urls: [
      "https://images.pexels.com/photos/36609679/pexels-photo-36609679.jpeg?auto=compress&cs=tinysrgb&w=1800",
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1800&q=80",
    ],
  },
  {
    file: "gallery-1.jpg",
    w: 1600,
    h: 1200,
    urls: [
      "https://images.pexels.com/photos/344034/pexels-photo-344034.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "gallery-2.jpg",
    w: 1200,
    h: 1600,
    urls: [
      "https://images.pexels.com/photos/9908694/pexels-photo-9908694.jpeg?auto=compress&cs=tinysrgb&w=1800",
    ],
  },
  {
    file: "gallery-3.jpg",
    w: 1600,
    h: 1200,
    urls: [
      "https://images.pexels.com/photos/13165149/pexels-photo-13165149.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "gallery-4.jpg",
    w: 1400,
    h: 1280,
    urls: [
      "https://images.pexels.com/photos/8104171/pexels-photo-8104171.jpeg?auto=compress&cs=tinysrgb&w=1800",
    ],
  },
  {
    file: "gallery-5.jpg",
    w: 1600,
    h: 1066,
    urls: [
      "https://images.pexels.com/photos/7429588/pexels-photo-7429588.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/5952901/pexels-photo-5952901.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "gallery-6.jpg",
    w: 1200,
    h: 1466,
    urls: [
      "https://images.pexels.com/photos/9821622/pexels-photo-9821622.jpeg?auto=compress&cs=tinysrgb&w=1800",
    ],
  },
  {
    file: "gallery-7.jpg",
    w: 1600,
    h: 1200,
    urls: [
      "https://images.pexels.com/photos/7429616/pexels-photo-7429616.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
  {
    file: "gallery-8.jpg",
    w: 1600,
    h: 1330,
    urls: [
      "https://images.pexels.com/photos/5952901/pexels-photo-5952901.jpeg?auto=compress&cs=tinysrgb&w=2000",
      "https://images.pexels.com/photos/7429770/pexels-photo-7429770.jpeg?auto=compress&cs=tinysrgb&w=2000",
    ],
  },
];

const headers = {
  "User-Agent": "BowlingClubIslamabad/1.0 (local image fetch for website)",
  Accept: "image/jpeg,image/*,*/*",
};

async function download(urls) {
  let lastError;
  for (const url of urls) {
    try {
      const response = await fetch(url, { headers, redirect: "follow" });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      if (buffer.length < 8000) throw new Error(`too small ${url}`);
      await sharp(buffer).metadata();
      return buffer;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

for (const job of jobs) {
  const source = await download(job.urls);
  await sharp(source)
    .rotate()
    .resize(job.w, job.h, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(imageDir, job.file));
  console.log(`saved ${job.file}`);
}

console.log(`Wrote ${jobs.length} photographs.`);
