import { notFound } from "next/navigation";

// Vangt alle diepere onbekende paden (bv. /nl/foo/bar) op binnen de locale-layout,
// zodat de gestylde not-found.tsx rendert in plaats van de kale Next-404.
// Heet bewust `[...slug]`: een catch-all mag naast `[slug]` staan zolang de naam gelijk is.
export default function CatchAllNotFound() {
  notFound();
}
