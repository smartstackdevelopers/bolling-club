import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/images");
const headers = {
  "User-Agent": "BowlingClubIslamabad/1.0 (local image fetch for website)",
  Accept: "image/jpeg,image/*,*/*",
};

async function grab(urls) {
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

async function save(file, buffer, w, h, position = "centre") {
  await sharp(buffer)
    .rotate()
    .resize(w, h, { fit: "cover", position })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(dir, file));
  console.log(`saved ${file}`);
}

const unsplashAlley = await grab([
  "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=2400&q=80",
]);
const unsplashPins = await grab([
  "https://images.unsplash.com/photo-1546443046-ed1ce6ffd1ab?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=2000&q=80",
]);
const personBall = await grab([
  "https://images.pexels.com/photos/2600243/pexels-photo-2600243.jpeg?auto=compress&cs=tinysrgb&w=2000",
  "https://images.pexels.com/photos/5952949/pexels-photo-5952949.jpeg?auto=compress&cs=tinysrgb&w=2000",
]);
const shoes = await grab([
  "https://images.pexels.com/photos/5952949/pexels-photo-5952949.jpeg?auto=compress&cs=tinysrgb&w=2000",
  "https://images.pexels.com/photos/5952897/pexels-photo-5952897.jpeg?auto=compress&cs=tinysrgb&w=2000",
]);
const alleyBalls = await grab([
  "https://images.pexels.com/photos/344034/pexels-photo-344034.jpeg?auto=compress&cs=tinysrgb&w=2400",
]);
const childCoach = await grab([
  "https://images.pexels.com/photos/9821622/pexels-photo-9821622.jpeg?auto=compress&cs=tinysrgb&w=2000",
]);
const friendsPlay = await grab([
  "https://images.pexels.com/photos/7429616/pexels-photo-7429616.jpeg?auto=compress&cs=tinysrgb&w=2000",
]);
const couplePlay = await grab([
  "https://images.pexels.com/photos/7429770/pexels-photo-7429770.jpeg?auto=compress&cs=tinysrgb&w=2000",
]);

await save("hero.jpg", alleyBalls, 1920, 1080, "east");
await save("og.jpg", alleyBalls, 1200, 630, "east");
await save("about.jpg", unsplashAlley, 1600, 1100);
await save("family.jpg", childCoach, 1600, 1000, "north");
await save("gallery-1.jpg", alleyBalls, 1600, 1200, "west");
await save("gallery-3.jpg", friendsPlay, 1600, 1200);
await save("gallery-7.jpg", couplePlay, 1600, 1200);
await save("offers.jpg", personBall, 1600, 900);
await save("packages.jpg", childCoach, 1400, 1600);
await save("experience.jpg", couplePlay, 1600, 1000);
await save("guide-family.jpg", friendsPlay, 1600, 1100);
await save("contact.jpg", unsplashPins, 1600, 900);

const extraLane = await grab([
  "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=2000&q=80",
  "https://images.pexels.com/photos/5952949/pexels-photo-5952949.jpeg?auto=compress&cs=tinysrgb&w=2000",
]);
await save("gallery-8.jpg", extraLane, 1600, 1330);

console.log("replacements done");
void shoes;
