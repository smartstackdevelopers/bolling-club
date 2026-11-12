import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "_club-photos");
const images = join(root, "public", "images");
const club = join(images, "club");

function wa(n) {
  if (n === 0) return join(src, "WhatsApp Image 2026-11-10 at 5.37.23 PM.jpeg");
  return join(src, `WhatsApp Image 2026-11-10 at 5.37.23 PM (${n}).jpeg`);
}

function copy(from, to) {
  mkdirSync(dirname(to), { recursive: true });
  if (!existsSync(from)) {
    throw new Error(`Missing source: ${from}`);
  }
  copyFileSync(from, to);
  console.log(`copied ${to.replace(root + "\\", "")}`);
}

const pageSlots = {
  "hero.jpg": 68,
  "about.jpg": 0,
  "experience.jpg": 17,
  "kids.jpg": 22,
  "family.jpg": 6,
  "birthday.jpg": 29,
  "offers.jpg": 37,
  "contact.jpg": 70,
  "guide-kids.jpg": 52,
  "guide-family.jpg": 4,
  "packages.jpg": 28,
  "og.jpg": 68,
  "gallery-1.jpg": 0,
  "gallery-2.jpg": 22,
  "gallery-3.jpg": 21,
  "gallery-4.jpg": 29,
  "gallery-5.jpg": 17,
  "gallery-6.jpg": 50,
  "gallery-7.jpg": 6,
  "gallery-8.jpg": 24,
};

const clubFiles = {
  "lanes/interior.jpg": 0,
  "lanes/screens.jpg": 68,
  "bowling/action.jpg": 17,
  "bowling/friends.jpg": 21,
  "bowling/teen.jpg": 18,
  "bowling/child.jpg": 22,
  "bowling/group.jpg": 16,
  "bowling/pink-ball.jpg": 20,
  "family/guests.jpg": 6,
  "family/group.jpg": 4,
  "family/award.jpg": 7,
  "celebration/medals.jpg": 24,
  "celebration/team.jpg": 25,
  "celebration/winners.jpg": 28,
  "celebration/party-banner.jpg": 29,
  "play-area/soft-play.jpg": 50,
  "play-area/indoor-play.jpg": 52,
  "play-area/toddler-area.jpg": 45,
  "play-area/ball-pit.jpg": 48,
  "exterior/entrance.jpg": 37,
  "exterior/night.jpg": 70,
  "exterior/building.jpg": 36,
};

mkdirSync(club, { recursive: true });

for (const [name, id] of Object.entries(pageSlots)) {
  copy(wa(id), join(images, name));
}

for (const [name, id] of Object.entries(clubFiles)) {
  copy(wa(id), join(club, name));
}

console.log("Club photographs arranged.");
