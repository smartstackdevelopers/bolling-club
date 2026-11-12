import { MessageCircle } from "lucide-react";
import { WhatsAppAnchor } from "@/components/ui/WhatsAppAnchor";

export function WhatsAppFloat() {
  return (
    <WhatsAppAnchor
      className="btn btn-whatsapp whatsapp-float"
      ariaLabel="Chat with Leisure City Bowling Club on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </WhatsAppAnchor>
  );
}
