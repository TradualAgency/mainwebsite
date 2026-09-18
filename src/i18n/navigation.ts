import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-bewuste wrappers om de Next.js-navigatie. Gebruik deze in plaats van
// `next/link` en `usePathname`/`useRouter`/`redirect` uit `next/navigation`:
// - `Link` voegt automatisch `/nl` toe waar nodig;
// - `usePathname` geeft het pad zónder locale-prefix terug.
export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
