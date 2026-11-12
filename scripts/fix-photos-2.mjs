import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/images");
const headers = {
  "User-Agent": "BowlingClubIslamabad/1.0 (local image fetch for website)",
  Accept: "image/jpeg,image/*,*/*",
};

async function grab(url) {
  const response = await fetch(url, { headers, redirect: "follow" });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer).metadata();
  return buffer;
}

async function fromFile(name) {
  return sharp(path.join(dir, name)).rotate().toBuffer();
}

async function save(file, buffer, w, h, position = "centre") {
  await sharp(buffer)
    .rotate()
    .resize(w, h, { fit: "cover", position })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(dir, file));
  console.log(`saved ${file}`);
}

const balls = await grab(
  "https://images.pexels.com/photos/5952897/pexels-photo-5952897.jpeg?auto=compress&cs=tinysrgb&w=2000",
);
const neon = await grab(
  "https://images.pexels.com/photos/31194336/pexels-photo-31194336.jpeg?auto=compress&cs=tinysrgb&w=2000",
);
const childCoach = await grab(
  "https://images.pexels.com/photos/9821622/pexels-photo-9821622.jpeg?auto=compress&cs=tinysrgb&w=2000",
);
const alley = await fromFile("hero.jpg");
const people = await fromFile("experience.jpg");

await save("family.jpg", childCoach, 1600, 1000, "south");
await save("about.jpg", alley, 1600, 1100, "west");
await save("offers.jpg", balls, 1600, 900);
await save("contact.jpg", neon, 1600, 900, "north");
await save("packages.jpg", childCoach, 1400, 1600, "centre");
await save("gallery-7.jpg", people, 1600, 1200);

console.log("second pass done");
