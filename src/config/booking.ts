export const bookingTypes = [
  { value: "kids-bowling", label: "Kids bowling" },
  { value: "family-bowling", label: "Family bowling" },
  { value: "birthday-party", label: "Birthday party" },
  { value: "general-visit", label: "General visit" },
  { value: "school-group", label: "School or class group" },
  { value: "friends-group", label: "Friends or group outing" },
] as const;

export const preferredTimes = [
  { value: "10:00", label: "Morning · 10:00" },
  { value: "12:00", label: "Midday · 12:00" },
  { value: "14:00", label: "Afternoon · 14:00" },
  { value: "16:00", label: "Late afternoon · 16:00" },
  { value: "18:00", label: "Evening · 18:00" },
  { value: "20:00", label: "Later evening · 20:00" },
] as const;

export type BookingType = (typeof bookingTypes)[number]["value"];
export type PreferredTime = (typeof preferredTimes)[number]["value"];

export function labelForBookingType(value: string) {
  return bookingTypes.find((item) => item.value === value)?.label ?? value;
}

export function labelForTime(value: string) {
  return preferredTimes.find((item) => item.value === value)?.label ?? value;
}

export function parseBookingType(value: string | null): BookingType | null {
  if (!value) return null;
  return bookingTypes.some((item) => item.value === value) ? (value as BookingType) : null;
}
