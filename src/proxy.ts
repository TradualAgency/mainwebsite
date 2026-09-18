import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Alles behalve: API-routes, de Sanity Studio, Next/Vercel-internals en bestanden
  // met een extensie (favicon.ico, afbeeldingen, …).
  matcher: "/((?!api|studio|_next|_vercel|.*\\..*).*)",
};
