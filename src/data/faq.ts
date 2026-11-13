export type FaqTopic = "Booking" | "Kids bowling" | "Family visits" | "Birthday enquiries" | "Location" | "Timing";

export type FaqItem = {
  id: string;
  topic: FaqTopic;
  question: string;
  answer: string;
};

export const faqTopics: Array<"All" | FaqTopic> = [
  "All",
  "Booking",
  "Kids bowling",
  "Family visits",
  "Birthday enquiries",
  "Location",
  "Timing",
];

export const faqs: FaqItem[] = [
  {
    id: "booking-how",
    topic: "Booking",
    question: "How do I book a game?",
    answer:
      "Use the Book Now page and send the prepared message on WhatsApp. Leisure City Bowling Club confirms availability in the chat. Submitting the form does not reserve a lane by itself.",
  },
  {
    id: "booking-confirm",
    topic: "Booking",
    question: "When is a booking confirmed?",
    answer:
      "Only when Leisure City Bowling Club replies on WhatsApp and agrees the date, time and group. Until that reply, treat the visit as a request.",
  },
  {
    id: "booking-change",
    topic: "Booking",
    question: "Can I change a request after sending it?",
    answer:
      "Send a follow-up WhatsApp message with the change. Ask the club to confirm what is possible.",
  },
  {
    id: "kids-ages",
    topic: "Kids bowling",
    question: "What ages can play?",
    answer:
      "Kids bowling is for children visiting with their families. Include the ages in your message so the team can advise. A published age guide is not listed here.",
  },
  {
    id: "kids-play-area",
    topic: "Kids bowling",
    question: "Is there a play area as well as bowling?",
    answer:
      "Yes. Leisure City Bowling Club has an indoor kids play area with slides and a ball pit. Ages, timing and how play fits a bowling visit are confirmed on WhatsApp.",
  },
  {
    id: "kids-equipment",
    topic: "Kids bowling",
    question: "Do you have equipment for children?",
    answer:
      "There is a kids play area at the club. Bumper lanes, lighter balls and shoe hire are confirmed in the WhatsApp reply, not assumed on this website.",
  },
  {
    id: "family-size",
    topic: "Family visits",
    question: "Can our whole family play together?",
    answer:
      "Family visits are welcome. Add the number of children and adults in the form. Any limit on group size is confirmed by the club on WhatsApp.",
  },
  {
    id: "family-mixed",
    topic: "Family visits",
    question: "Can adults and children share a booking?",
    answer:
      "Yes. The enquiry asks for both counts so the club can see the mix of the group. How the game is set up for mixed ages is explained when they reply.",
  },
  {
    id: "birthday-packages",
    topic: "Birthday enquiries",
    question: "What is included in a birthday party?",
    answer:
      "Package names, prices and inclusions are not published yet. Describe the birthday in an enquiry and Leisure City Bowling Club will say what it can offer.",
  },
  {
    id: "birthday-cake",
    topic: "Birthday enquiries",
    question: "Can we bring a cake or decorations?",
    answer:
      "Mention it in the party enquiry so the club can tell you what is welcome in the venue.",
  },
  {
    id: "location-where",
    topic: "Location",
    question: "Where is Leisure City Bowling Club?",
    answer:
      "Leisure City Bowling Club is in Jinnah Park, Rawalpindi, Pakistan. Open the map on the contact page, or ask for the easiest way to arrive in your WhatsApp message.",
  },
  {
    id: "timing-hours",
    topic: "Timing",
    question: "What are the opening hours?",
    answer:
      "Opening days and hours are confirmed by the club. Choose a preferred time on the form, and they will say whether that time is possible.",
  },
  {
    id: "timing-length",
    topic: "Timing",
    question: "How long does a game last?",
    answer:
      "A typical session length has not been published. Ask when you enquire, especially if you are planning a birthday around the game.",
  },
];
