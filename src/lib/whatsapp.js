import { SITE } from "../data/site.js";

export function waLink(text) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function generalMessage() {
  return `Hello ${SITE.name} 👋 I'd like to order.`;
}

// lines: [{ name, qty }]
export function orderMessage(lines, { name = "", note = "" } = {}) {
  const items = lines.map((l) => `• ${l.qty} × ${l.name}`).join("\n");
  let msg = `Hello ${SITE.name} 👋\nI'd like to order:\n\n${items}\n`;
  if (name.trim()) msg += `\nName: ${name.trim()}`;
  if (note.trim()) msg += `\nNote: ${note.trim()}`;
  msg += `\n\nPlease confirm the total and pickup time. Thank you!`;
  return msg;
}

export function formatPrice(price) {
  return price == null ? null : `₺${price}`;
}
