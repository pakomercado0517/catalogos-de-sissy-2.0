import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "../../utils/whatsapp";

export default function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-8 right-8 z-[100] flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-white shadow-[0_10px_30px_rgba(37,211,102,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(37,211,102,0.4)] active:scale-95"
      aria-label="Cotizar por WhatsApp"
    >
      <span className="font-label-sm max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out group-hover:max-w-xs">
        Cotizar por WhatsApp
      </span>
      <FaWhatsapp className="text-2xl shrink-0" aria-hidden />
    </a>
  );
}
