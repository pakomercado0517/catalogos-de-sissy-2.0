const WHATSAPP_NUMBER = "527831362077";

export function buildWhatsAppQuoteUrl(catalogName, companyName = "") {
  const parts = ["Hola, me interesa cotizar"];
  if (catalogName) {
    parts.push(` del catálogo "${catalogName}"`);
  }
  if (companyName) {
    parts.push(` de ${companyName}`);
  }
  parts.push(".");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(""))}`;
}

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
