"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { bookingTypes, parseBookingType, preferredTimes, type BookingType } from "@/config/booking";
import { isWhatsAppReady } from "@/config/site";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { bookingSchema, type BookingValues } from "@/lib/validations";

export function BookingForm({ lockedType }: { lockedType?: BookingType }) {
  const params = useSearchParams();
  const queried = parseBookingType(params.get("type"));
  const initialType = lockedType ?? queried ?? "general-visit";
  const dateRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<"idle" | "opened" | "blocked" | "unconfigured">("idle");
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: "",
      time: "16:00",
      children: 0,
      adults: 0,
      bookingType: initialType,
      message: "",
    },
  });
  const dateField = register("date");

  useEffect(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    if (dateRef.current) dateRef.current.min = `${now.getFullYear()}-${month}-${day}`;
  }, []);

  function onSubmit(values: BookingValues) {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const today = `${now.getFullYear()}-${month}-${day}`;
    if (values.date < today) {
      setError("date", { message: "Choose today or a future date." });
      return;
    }

    const message = buildBookingMessage(values);
    setPreview(message);

    if (!isWhatsAppReady()) {
      setStatus("unconfigured");
      return;
    }

    const opened = window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setStatus(opened ? "opened" : "blocked");
  }

  return (
    <form className="glass-card grid gap-5 p-5 md:p-8" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div id="whatsapp-setup" className="rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm leading-6 text-[#fde68a]">
        This sends a request to the club on WhatsApp. It does not confirm a lane, a party or a price. Please wait for the club to reply.
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field">
          <span>Your name</span>
          <input autoComplete="name" {...register("name")} />
          {errors.name ? <small className="field-error">{errors.name.message}</small> : null}
        </label>
        <label className="field">
          <span>Phone number</span>
          <input autoComplete="tel" inputMode="tel" placeholder="03xx or +92" {...register("phone")} />
          {errors.phone ? <small className="field-error">{errors.phone.message}</small> : null}
        </label>
        <label className="field">
          <span>Preferred date</span>
          <input
            type="date"
            name={dateField.name}
            onBlur={dateField.onBlur}
            onChange={dateField.onChange}
            ref={(node) => {
              dateField.ref(node);
              dateRef.current = node;
            }}
          />
          {errors.date ? <small className="field-error">{errors.date.message}</small> : null}
        </label>
        <label className="field">
          <span>Preferred time</span>
          <select {...register("time")}>
            {preferredTimes.map((time) => (
              <option key={time.value} value={time.value}>
                {time.label}
              </option>
            ))}
          </select>
          <small className="text-xs text-muted">This is a preference. Leisure City Bowling Club will confirm the time.</small>
          {errors.time ? <small className="field-error">{errors.time.message}</small> : null}
        </label>
        <label className="field">
          <span>Children</span>
          <input type="number" min={0} max={80} inputMode="numeric" {...register("children", { valueAsNumber: true })} />
          {errors.children ? <small className="field-error">{errors.children.message}</small> : null}
        </label>
        <label className="field">
          <span>Adults</span>
          <input type="number" min={0} max={80} inputMode="numeric" {...register("adults", { valueAsNumber: true })} />
          {errors.adults ? <small className="field-error">{errors.adults.message}</small> : null}
        </label>
      </div>
      <label className="field">
        <span>Booking type</span>
        <select {...register("bookingType")} disabled={Boolean(lockedType)}>
          {bookingTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.bookingType ? <small className="field-error">{errors.bookingType.message}</small> : null}
      </label>
      <label className="field">
        <span>Additional message</span>
        <textarea
          {...register("message")}
          placeholder="Ages, a birthday name, or anything the club should know. Optional."
        />
        {errors.message ? <small className="field-error">{errors.message.message}</small> : null}
      </label>
      <button className="btn btn-primary contact-submit" type="submit">
        Send enquiry on WhatsApp
      </button>
      {status === "opened" ? (
        <p role="status" className="text-sm leading-6 text-muted">
          WhatsApp should be open with your enquiry. Send the message there. The visit is confirmed only when the club replies.
        </p>
      ) : null}
      {status === "blocked" ? (
        <p role="status" className="text-sm leading-6 text-muted">
          The chat window was blocked. Use the link below, then send the message yourself. This is still not a confirmed booking.
        </p>
      ) : null}
      {status === "unconfigured" ? (
        <p role="status" className="text-sm leading-6 text-[#fde68a]">
          The club number in the site settings is still a placeholder, so WhatsApp cannot open yet. Your message is ready below for when the number is added.
        </p>
      ) : null}
      {preview && status !== "idle" ? (
        <div className="grid gap-3">
          <label className="field">
            <span>Message ready to send</span>
            <textarea readOnly value={preview} />
          </label>
          {isWhatsAppReady() ? (
            <a className="btn btn-whatsapp contact-submit" href={buildWhatsAppUrl(preview)} target="_blank" rel="noopener noreferrer">
              Open WhatsApp again
            </a>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
