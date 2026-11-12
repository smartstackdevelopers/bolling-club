import { labelForBookingType, labelForTime } from "@/config/booking";
import { isWhatsAppReady, siteConfig } from "@/config/site";
import type { BookingValues, ContactValues } from "@/lib/validations";

export const generalEnquiryMessage = [
  "Hello Leisure City Bowling Club,",
  "",
  "I would like to enquire about a visit.",
  "Please let me know what is available.",
  "",
  "I understand this message is a request and not a confirmed booking.",
].join("\n");

export function buildWhatsAppUrl(message: string) {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function whatsappHref(message: string) {
  if (!isWhatsAppReady()) return "/book-now#whatsapp-setup";
  return buildWhatsAppUrl(message);
}

export function buildBookingMessage(values: BookingValues) {
  return [
    "Hello Leisure City Bowling Club,",
    "",
    "I would like to enquire about a visit. This is a request, not a confirmed booking.",
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Preferred date: ${values.date}`,
    `Preferred time: ${labelForTime(values.time)}`,
    `Children: ${values.children}`,
    `Adults: ${values.adults}`,
    `Booking type: ${labelForBookingType(values.bookingType)}`,
    `Message: ${values.message.trim() || "—"}`,
    "",
    "Please confirm whether this can be arranged.",
  ].join("\n");
}

export function buildContactMessage(values: ContactValues) {
  return [
    "Hello Leisure City Bowling Club,",
    "",
    "I have a question. This is not a confirmed booking.",
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Message: ${values.message.trim()}`,
    "",
    "Please reply when you can.",
  ].join("\n");
}
