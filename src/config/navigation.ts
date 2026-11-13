export type NavChild = {
  label: string;
  href: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Experience",
    href: "/experience",
    children: [
      {
        label: "Our Experience",
        href: "/experience",
        description: "Kids, families and birthdays in one club",
      },
      {
        label: "Kids Bowling",
        href: "/kids-bowling",
        description: "A visit shaped around children",
      },
      {
        label: "Kids play area",
        href: "/play-area",
        description: "Indoor slides and a ball pit at the club",
      },
      {
        label: "Family Bowling",
        href: "/family-bowling",
        description: "Shared games for the whole group",
      },
      {
        label: "Kids session guide",
        href: "/experience/kids-bowling",
        description: "What to send with a kids enquiry",
      },
      {
        label: "Family visit guide",
        href: "/experience/family-bowling",
        description: "How to plan a family booking",
      },
    ],
  },
  { label: "Birthday Parties", href: "/birthday-parties" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "Contact", href: "/contact" },
];

export const footerExplore = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Offers", href: "/offers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Book Now", href: "/book-now" },
];

export const footerExperience = [
  { label: "Our Experience", href: "/experience" },
  { label: "Kids Bowling", href: "/kids-bowling" },
  { label: "Kids play area", href: "/play-area" },
  { label: "Family Bowling", href: "/family-bowling" },
  { label: "Birthday Parties", href: "/birthday-parties" },
  { label: "Birthday Packages", href: "/birthday-parties/packages" },
  { label: "Party Enquiry", href: "/birthday-parties/book" },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

export function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href === "/experience") {
    return (
      pathname === "/experience" ||
      pathname.startsWith("/experience/") ||
      pathname === "/kids-bowling" ||
      pathname === "/play-area" ||
      pathname === "/family-bowling"
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
