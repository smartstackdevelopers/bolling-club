import { MessageCircle } from "lucide-react";
import { WhatsAppAnchor } from "@/components/ui/WhatsAppAnchor";

export function WhatsAppFloat() {
  return (
    <WhatsAppAnchor
      className="btn btn-whatsapp fixed right-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 h-12 w-12 rounded-full p-0 shadow-lg md:right-4 md:h-14 md:w-14"
      ariaLabel="Chat with Leisure City Bowling Club on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </WhatsAppAnchor>
  );
}
