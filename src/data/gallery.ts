export const galleryCategories = ["All", "Lanes", "Kids", "Family", "Birthdays"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  src: string;
  alt: string;
  caption: string;
  ratio: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "lane-screens",
    title: "On the lanes",
    category: "Lanes",
    src: "/images/club/lanes/screens.jpg",
    alt: "Bowling lanes at Leisure City Bowling Club with the club name on the screens",
    caption: "Photographed at Leisure City Bowling Club, Jinnah Park.",
    ratio: "aspect-[4/3]",
  },
  {
    id: "child-roll",
    title: "A smaller start",
    category: "Kids",
    src: "/images/hd/club/bowling/child.jpg",
    alt: "A child bowling with an orange ball at Leisure City Bowling Club",
    caption: "Kids bowling with the adults who come along.",
    ratio: "aspect-square",
  },
  {
    id: "friends-ready",
    title: "Ready to play",
    category: "Family",
    src: "/images/hd/club/bowling/friends.jpg",
    alt: "Young people choosing bowling balls at the club",
    caption: "Friends and families sharing the same visit.",
    ratio: "aspect-[4/3]",
  },
  {
    id: "party-banner",
    title: "Party at the club",
    category: "Birthdays",
    src: "/images/hd/club/celebration/party-banner.jpg",
    alt: "Leisure City Bowling Club banner with balloons in the venue",
    caption: "A birthday can be built around a game.",
    ratio: "aspect-square",
  },
  {
    id: "action-lane",
    title: "Take a turn",
    category: "Lanes",
    src: "/images/hd/club/bowling/action.jpg",
    alt: "A player releasing a bowling ball as the group watches",
    caption: "Wooden lanes, real games, real cheers.",
    ratio: "aspect-square",
  },
  {
    id: "soft-play",
    title: "Kids play area",
    category: "Kids",
    src: "/images/hd/club/play-area/soft-play.jpg",
    alt: "Indoor kids play area at Leisure City Bowling Club",
    caption: "A play area for younger children at the club.",
    ratio: "aspect-square",
  },
  {
    id: "family-guests",
    title: "Together at the club",
    category: "Family",
    src: "/images/hd/club/family/guests.jpg",
    alt: "Guests standing together in front of the Leisure City lanes",
    caption: "A visit that is easy to share.",
    ratio: "aspect-[4/3]",
  },
  {
    id: "medals-night",
    title: "After the game",
    category: "Birthdays",
    src: "/images/hd/club/celebration/medals.jpg",
    alt: "Players celebrating with medals at Leisure City Bowling Club",
    caption: "Celebrations belong beside the lanes.",
    ratio: "aspect-square",
  },
  {
    id: "lane-interior",
    title: "Lane approach",
    category: "Lanes",
    src: "/images/hd/club/lanes/interior.jpg",
    alt: "Interior view of the bowling lanes at Leisure City Bowling Club",
    caption: "The approach at Leisure City Bowling Club.",
    ratio: "aspect-[4/3]",
  },
  {
    id: "toddler-area",
    title: "For little ones",
    category: "Kids",
    src: "/images/hd/club/play-area/toddler-area.jpg",
    alt: "Toddler ball-pit area at Leisure City Bowling Club",
    caption: "Space for little ones while the game is on.",
    ratio: "aspect-[4/3]",
  },
  {
    id: "family-group",
    title: "The whole group",
    category: "Family",
    src: "/images/hd/club/family/group.jpg",
    alt: "A group photo at Leisure City Bowling Club",
    caption: "Parents, children and relatives on one visit.",
    ratio: "aspect-[4/3]",
  },
  {
    id: "winners",
    title: "A day to remember",
    category: "Birthdays",
    src: "/images/hd/club/celebration/winners.jpg",
    alt: "A group celebrating together after bowling",
    caption: "Ask the club what it can host for your group.",
    ratio: "aspect-[4/3]",
  },
];
