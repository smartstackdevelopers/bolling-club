export type SampleReview = {
  id: string;
  quote: string;
  name: string;
  detail: string;
};

/** Layout samples only. Do not present these as guest reviews. */
export const sampleReviews: SampleReview[] = [
  {
    id: "sample-1",
    quote:
      "This is sample layout text so the carousel can be reviewed. Replace it with a real guest comment, and only after you have permission to publish it.",
    name: "Sample guest",
    detail: "Placeholder · not a real review",
  },
  {
    id: "sample-2",
    quote:
      "A second sample sits here to show how a longer comment wraps. It is not from a visitor to Leisure City Bowling Club and must not go live as a testimonial.",
    name: "Sample guest",
    detail: "Placeholder · not a real review",
  },
  {
    id: "sample-3",
    quote:
      "A third sample keeps the controls working. Swap the whole set for genuine reviews, or remove this section until you have them.",
    name: "Sample guest",
    detail: "Placeholder · not a real review",
  },
];
