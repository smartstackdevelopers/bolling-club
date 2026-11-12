import { generalEnquiryMessage, whatsappHref } from "@/lib/whatsapp";
import { isWhatsAppReady } from "@/config/site";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function WhatsAppAnchor({
  children,
  className,
  message = generalEnquiryMessage,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  message?: string;
  ariaLabel?: string;
}) {
  const href = whatsappHref(message);
  const external = isWhatsAppReady();

  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <a className={cn(className)} href={href} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
