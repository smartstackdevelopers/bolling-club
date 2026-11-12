"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isWhatsAppReady } from "@/config/site";
import { buildContactMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { contactSchema, type ContactValues } from "@/lib/validations";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "opened" | "blocked" | "unconfigured">("idle");
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  function onSubmit(values: ContactValues) {
    const message = buildContactMessage(values);
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
      <p className="text-sm leading-6 text-muted">
        This opens WhatsApp with your question. It does not create a booking, and the club replies when they can.
      </p>
      <label className="field">
        <span>Your name</span>
        <input autoComplete="name" {...register("name")} />
        {errors.name ? <small className="field-error">{errors.name.message}</small> : null}
      </label>
      <label className="field">
        <span>Phone number</span>
        <input autoComplete="tel" inputMode="tel" {...register("phone")} />
        {errors.phone ? <small className="field-error">{errors.phone.message}</small> : null}
      </label>
      <label className="field">
        <span>Message</span>
        <textarea {...register("message")} />
        {errors.message ? <small className="field-error">{errors.message.message}</small> : null}
      </label>
      <button className="btn btn-primary contact-submit" type="submit">
        Continue on WhatsApp
      </button>
      {status === "opened" ? (
        <p role="status" className="text-sm text-muted">
          WhatsApp should be open. Send the message yourself to reach the club.
        </p>
      ) : null}
      {status === "blocked" ? (
        <p role="status" className="text-sm text-muted">
          The window was blocked. Open the link below and send the message from there.
        </p>
      ) : null}
      {status === "unconfigured" ? (
        <p role="status" className="text-sm text-[#fde68a]">
          The WhatsApp number is still a placeholder in the site settings, so the chat cannot open yet.
        </p>
      ) : null}
      {preview && status !== "idle" ? (
        <div className="grid gap-3">
          <textarea readOnly value={preview} className="min-h-40 rounded-2xl border border-white/10 bg-white/5 p-3" />
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
