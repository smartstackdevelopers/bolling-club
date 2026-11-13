export type ChangeFrequency = "weekly" | "monthly" | "yearly";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  changeFrequency: ChangeFrequency;
  priority: number;
};

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Leisure City Bowling Club | Kids & Family Bowling in Jinnah Park",
    description:
      "Leisure City Bowling Club in Jinnah Park, Rawalpindi welcomes families, children, friends and birthday groups. Book a game on WhatsApp and wait for the club to confirm.",
    absoluteTitle: true,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    title: "About Us",
    description:
      "Leisure City Bowling Club is a family bowling club in Jinnah Park, Rawalpindi. Learn how a visit is arranged and how the club confirms every request.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/experience",
    title: "Our Experience",
    description:
      "Kids bowling, family bowling and birthday gatherings at Leisure City Bowling Club in Jinnah Park. Every visit starts as a WhatsApp request.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/kids-bowling",
    title: "Kids Bowling in Rawalpindi",
    description:
      "Kids bowling at Leisure City Bowling Club, Jinnah Park. Bring the children and the adults with them, then ask about ages and timing on WhatsApp.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/play-area",
    title: "Kids Play Area",
    description:
      "The indoor kids play area at Leisure City Bowling Club in Jinnah Park, with slides and a ball pit. Ask on WhatsApp how a play visit is arranged.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/family-bowling",
    title: "Family Bowling in Rawalpindi",
    description:
      "Family bowling at Leisure City Bowling Club for parents, children and relatives. Share your group size and preferred time for the club to confirm.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/birthday-parties",
    title: "Birthday Parties",
    description:
      "Birthday parties at Leisure City Bowling Club, Jinnah Park, built around a game the group can share. Ask on WhatsApp what the club can arrange.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/gallery",
    title: "Gallery",
    description:
      "Original photographs from Leisure City Bowling Club in Jinnah Park. Browse lanes, kids, families and celebrations, then open any image in the lightbox.",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/offers",
    title: "Offers",
    description:
      "Offers at Leisure City Bowling Club will be published after the club confirms prices and inclusions. Ask what is available on WhatsApp.",
    changeFrequency: "weekly",
    priority: 0.6,
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Contact Leisure City Bowling Club in Jinnah Park, Rawalpindi. Send an enquiry on WhatsApp, open the map, or follow the club on Facebook.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/book-now",
    title: "Book a Lane on WhatsApp",
    description:
      "Prepare a bowling enquiry for Leisure City Bowling Club. Your details open in WhatsApp for the club to confirm. This page does not reserve a lane.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/experience/kids-bowling",
    title: "Kids Bowling Session Guide",
    description:
      "A practical guide to arranging kids bowling at Leisure City Bowling Club, including what to tell the club and what is confirmed only in the reply.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/experience/family-bowling",
    title: "Family Visit Guide",
    description:
      "Plan a family bowling visit at Leisure City Bowling Club in Jinnah Park. See which details to send on WhatsApp.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/birthday-parties/packages",
    title: "Birthday Packages",
    description:
      "Birthday package frames for Leisure City Bowling Club. Names, prices and inclusions stay blank until the club confirms them.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/birthday-parties/book",
    title: "Birthday Party Enquiry",
    description:
      "Send a birthday party enquiry to Leisure City Bowling Club on WhatsApp. The celebration is confirmed only when the club replies.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions",
    description:
      "Questions about booking, kids bowling, family visits, birthdays, location and timing at Leisure City Bowling Club, Jinnah Park.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description:
      "Draft privacy notice for the Leisure City Bowling Club website. Enquiry details are sent by you through WhatsApp and are not stored on this site.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms-and-conditions",
    title: "Terms and Conditions",
    description:
      "Draft terms for the Leisure City Bowling Club website. A WhatsApp enquiry is a request until the club confirms it.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export function getPage(path: string) {
  const page = pages.find((item) => item.path === path);
  if (!page) {
    throw new Error(`Missing page metadata for ${path}`);
  }
  return page;
}
