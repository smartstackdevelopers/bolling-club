export type OfferSlot = {
  id: string;
  title: string;
  audience: string;
  summary: string;
  bookingType: "family-bowling" | "kids-bowling" | "birthday-party" | "general-visit";
};

export const offerSlots: OfferSlot[] = [
  {
    id: "family-offer",
    title: "Family visit offer",
    audience: "Families",
    summary: "Reserved for a family price or inclusion once Leisure City Bowling Club confirms it. No discount is advertised here yet.",
    bookingType: "family-bowling",
  },
  {
    id: "kids-offer",
    title: "Kids session offer",
    audience: "Children with adults",
    summary: "Reserved for a kids session offer. Age rules and any included help for children are confirmed by the club.",
    bookingType: "kids-bowling",
  },
  {
    id: "birthday-offer",
    title: "Birthday gathering offer",
    audience: "Birthday groups",
    summary: "Reserved for a birthday price or add-on. It is not a live package until the club publishes the inclusions.",
    bookingType: "birthday-party",
  },
  {
    id: "group-offer",
    title: "Group gathering offer",
    audience: "Larger groups",
    summary: "Reserved for a group enquiry. Capacity and pricing stay with Leisure City Bowling Club until they are confirmed.",
    bookingType: "general-visit",
  },
];

export const packageSlots = [
  {
    id: "package-1",
    kicker: "Package frame 01",
    title: "Awaiting a package name",
    text: "Use this frame for the club’s first confirmed birthday package. Price, guest count, duration and inclusions are intentionally blank.",
  },
  {
    id: "package-2",
    kicker: "Package frame 02",
    title: "Awaiting a package name",
    text: "Use this frame for a second option, such as a longer celebration, only after the club approves the wording and the price.",
  },
  {
    id: "package-3",
    kicker: "Package frame 03",
    title: "Awaiting a package name",
    text: "Use this frame for a smaller children’s celebration once the club confirms who it suits and what is included.",
  },
];
