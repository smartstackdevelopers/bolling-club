import { isWhatsAppReady } from "@/config/site";

export function SetupBanner() {
  if (isWhatsAppReady()) return null;

  return (
    <div className="border-b border-gold/30 bg-[#241808] px-4 py-3 text-center text-sm text-[#fde68a]">
      The club WhatsApp number is not published yet. You can prepare an enquiry, and it will open in WhatsApp once the number is added in the site settings.
    </div>
  );
}
