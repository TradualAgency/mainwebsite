'use client'

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Link2 } from "lucide-react";

interface ShareButtonsProps {
  url: string;
}

const buttonClass =
  "inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm text-primary transition hover:border-accent hover:text-accent";

export function ShareButtons({ url }: ShareButtonsProps) {
  const t = useTranslations("InsightDetail");
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard geblokkeerd (bv. geen https) — dan doet de knop niets.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-primary/60">{t("share")}</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        className={buttonClass}
      >
        LinkedIn
      </a>
      <button type="button" onClick={copy} className={buttonClass}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
        {copied ? t("copied") : t("copyLink")}
      </button>
    </div>
  );
}
