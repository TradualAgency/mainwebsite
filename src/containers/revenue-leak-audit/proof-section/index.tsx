import { StatBand } from "@/components/marketing/stat-band";
import { CaseQuote } from "@/components/our-work/case-quote";
import type { Locale } from "@/i18n/routing";
import { getProjectBySlug } from "@/sanity/lib/getProjects";

// Zelfde slug in beide talen.
const CASE_SLUG = "ciaobella-fashion";

interface AuditProofProps {
  locale: Locale;
  eyebrow: string;
  heading: string;
  intro: string;
}

// Bewijs uit één echte case. Cijfers en quote komen rechtstreeks uit Sanity (`results`
// en `quote` van de case), dus er staat hier geen enkel getal in de code en een wijziging
// in de Studio werkt overal door. Zonder gepubliceerde cijfers valt het blok weg: liever
// geen bewijs dan een lege of verzonnen tegel. De quote staat ín het cijferblok, zodat
// het bewijs als één geheel leest in plaats van als twee losse secties.
export async function AuditProof({ locale, eyebrow, heading, intro }: AuditProofProps) {
  const project = await getProjectBySlug(CASE_SLUG, locale);
  const stats = project?.results?.filter((r) => r.label && (r.value != null || r.display)) ?? [];
  if (stats.length === 0) return null;

  const quote = project?.quote;

  return (
    <StatBand eyebrow={eyebrow} heading={heading} intro={intro} stats={stats} tone="dark">
      {quote?.text && <CaseQuote text={quote.text} attribution={quote.attribution} embedded />}
    </StatBand>
  );
}
