import type { PortableTextBlock } from "@sanity/types";

const WORDS_PER_MINUTE = 200;

// Telt woorden in alle tekst-spans van de body, ook die in geneste blokken
// (Titel + tekst) en de tekst van uitgelichte zinnen.
function collectText(node: unknown, out: string[]) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n) => collectText(n, out));
    return;
  }
  const obj = node as Record<string, unknown>;
  if (obj._type === "span" && typeof obj.text === "string") out.push(obj.text);
  if (obj._type === "callout" && typeof obj.text === "string") out.push(obj.text);
  if (obj._type === "textSection" && typeof obj.title === "string") out.push(obj.title);
  if (obj.children) collectText(obj.children, out);
  if (obj.body) collectText(obj.body, out);
}

export function readingTimeMinutes(body: PortableTextBlock[] | undefined): number {
  if (!body) return 1;
  const text: string[] = [];
  collectText(body, text);
  const words = text.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
