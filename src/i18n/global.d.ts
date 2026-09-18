import type { routing } from "./routing";
import type en from "../../messages/en";

// Maakt `useTranslations`/`getTranslations` type-safe op de keys uit messages/en.json
// en `useLocale()` op de geconfigureerde locales.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
  }
}
