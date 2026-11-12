/**
 * Single source of truth for Leisure City Bowling Club business details.
 * Only confirmed facts from the club belong here.
 */

export const WHATSAPP_NUMBER = "923235000081";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "Leisure City Bowling Club",
  shortName: "Leisure City",
  city: "Rawalpindi",
  area: "Jinnah Park",
  country: "Pakistan",
  countryCode: "PK",
  description:
    "Leisure City Bowling Club in Jinnah Park, Rawalpindi is a family bowling club for children, friends and birthday groups. Games are requested on WhatsApp and confirmed by the club.",
  tagline: "Play together. Cheer louder. Make the night yours.",
  publicUrl: configuredUrl ? configuredUrl.replace(/\/$/, "") : null,
  whatsappNumber: WHATSAPP_NUMBER,
  contact: {
    address: "Jinnah Park, Rawalpindi",
    email: "info@lcbc.pk",
    phoneDisplay: "+92 323 5000081",
    openingHours: null as string | null,
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Leisure+City+Bowling+Club+Jinnah+Park+Rawalpindi&hl=en&z=16&output=embed",
    mapsUrl: "https://share.google/f4KZjK3T4HsVb8rfk",
  },
  social: {
    instagram: "https://www.instagram.com/lcbc.jinhapark/",
    facebook: "https://www.facebook.com/leisurecitybowlingclubjinnahpark/",
    tiktok: null as string | null,
    youtube: null as string | null,
  },
  facilities: {
    laneCount: "12 international-standard lanes",
    bumperLanes: null as string | null,
    shoeRental: null as string | null,
    foodAndDrinks: null as string | null,
    partyRoom: null as string | null,
    parking: null as string | null,
    ageGuidance: null as string | null,
    sessionLength: null as string | null,
    whatToWear: null as string | null,
    paymentMethods: null as string | null,
    cancellation: null as string | null,
  },
} as const;

export const confirmedText = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export function isWhatsAppReady(number: string = siteConfig.whatsappNumber) {
  return /^[1-9][0-9]{7,14}$/.test(number);
}
