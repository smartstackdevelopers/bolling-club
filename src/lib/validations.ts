import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(1, "Enter a phone number.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  }, "Enter a phone number with 10 to 15 digits.");

export const bookingSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(80, "Please use a shorter name."),
    phone,
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date."),
    time: z.enum(["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"], {
      message: "Choose a preferred time.",
    }),
    children: z.coerce
      .number({ message: "Enter a number of children." })
      .int("Use a whole number.")
      .min(0, "Children cannot be negative.")
      .max(80, "For a group this large, add a note and the club will advise."),
    adults: z.coerce
      .number({ message: "Enter a number of adults." })
      .int("Use a whole number.")
      .min(0, "Adults cannot be negative.")
      .max(80, "For a group this large, add a note and the club will advise."),
    bookingType: z.enum(
      ["kids-bowling", "family-bowling", "birthday-party", "general-visit", "school-group", "friends-group"],
      {
        message: "Choose a booking type.",
      },
    ),
    message: z.string().trim().max(800, "Please keep the message under 800 characters."),
  })
  .refine((values) => values.children + values.adults >= 1, {
    message: "Add at least one child or one adult.",
    path: ["adults"],
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Please use a shorter name."),
  phone,
  message: z
    .string()
    .trim()
    .min(8, "Add a short message so the club knows how to help.")
    .max(800, "Please keep the message under 800 characters."),
});

export type BookingValues = z.infer<typeof bookingSchema>;
export type ContactValues = z.infer<typeof contactSchema>;
