export type Experience = {
  slug: string;
  title: string;
  href: string;
  detailHref: string;
  image: string;
  imageAlt: string;
  summary: string;
  detail: string;
};

export const experiences: Experience[] = [
  {
    slug: "kids",
    title: "Kids Bowling",
    href: "/kids-bowling",
    detailHref: "/experience/kids-bowling",
    image: "/images/hd/kids.jpg",
    imageAlt: "A child bowling at Leisure City Bowling Club",
    summary: "A first game, an afternoon out, or a warm-up before a birthday — with children at the centre of the visit.",
    detail:
      "Tell Leisure City Bowling Club the ages in your group. Equipment and timing for children are confirmed in the WhatsApp reply.",
  },
  {
    slug: "play",
    title: "Kids play area",
    href: "/play-area",
    detailHref: "/play-area",
    image: "/images/hd/club/play-area/indoor-play.jpg",
    imageAlt: "Indoor kids play area with slides and a ball pit at Leisure City Bowling Club",
    summary: "An indoor play space at the club, with slides and a ball pit, for younger children visiting with their families.",
    detail: "How play fits a visit — on its own or with a game — is confirmed by Leisure City Bowling Club on WhatsApp.",
  },
  {
    slug: "family",
    title: "Family Bowling",
    href: "/family-bowling",
    detailHref: "/experience/family-bowling",
    image: "/images/hd/family.jpg",
    imageAlt: "Guests standing together in front of the lanes at Leisure City Bowling Club",
    summary: "Parents, children and relatives sharing one lane, one score and an easy plan for the day.",
    detail:
      "Share how many children and adults are coming. Group size is confirmed by the club, not assumed on this page.",
  },
  {
    slug: "birthday",
    title: "Birthday Parties",
    href: "/birthday-parties",
    detailHref: "/birthday-parties/packages",
    image: "/images/hd/birthday.jpg",
    imageAlt: "A Leisure City Bowling Club banner with party balloons in the venue",
    summary: "A celebration arranged around the game. Packages and prices are published only after the club confirms them.",
    detail: "Describe the birthday in your enquiry. Leisure City Bowling Club replies with what can actually be arranged.",
  },
];

export const reasons = [
  {
    title: "Made for families",
    text: "Leisure City Bowling Club in Jinnah Park is a place to play together. Children are part of the plan from the first message.",
  },
  {
    title: "Fun for children",
    text: "Kids bowling is one of the club’s core visits. There is also a play area on site for younger children. Ask in your enquiry how a kids visit is set up.",
  },
  {
    title: "Easy to celebrate",
    text: "Birthday groups and gatherings of friends are welcome. What each celebration includes is agreed with you, not copied from a generic package.",
  },
  {
    title: "A warm welcome",
    text: "Enquiries happen in a WhatsApp conversation with the club. A lane is yours only when Leisure City Bowling Club says yes.",
  },
];

export const visitSteps = [
  {
    title: "Tell us who is coming",
    text: "Share your name, a phone number, and how many children and adults will play.",
  },
  {
    title: "Offer a date and a time",
    text: "Choose a preferred date and time. The club will confirm whether that slot is free.",
  },
  {
    title: "Send the request on WhatsApp",
    text: "The form opens a chat with your details filled in. You send the message yourself.",
  },
  {
    title: "Wait for the club to confirm",
    text: "A lane, party or group is reserved only when Leisure City Bowling Club replies to confirm it.",
  },
];

export const questionsForTheClub = [
  "What is the best way to reach Jinnah Park, and is parking available?",
  "Which days and hours are you open?",
  "How many people can play together?",
  "Do you have bumper lanes, lighter balls or other help for children?",
  "How long is a typical game?",
  "What do birthday gatherings include, and what do they cost?",
  "What should guests wear, and do you provide bowling shoes?",
  "How should a change or cancellation be requested?",
];
