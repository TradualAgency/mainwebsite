import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

// Codificeert het eyebrow + H2 + lede-recept dat nu in 15+ bestanden met de hand
// wordt gekopieerd. `tone` bepaalt de kopkleur expliciet (geen !-overrides nodig —
// elke utility-klasse wint sowieso van de globale h1-h5 regel in globals.css,
// omdat die in @layer base zit en utilities altijd na base komen).
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const headingColor = tone === "dark" ? "text-surface" : "text-primary";
  const introColor = tone === "dark" ? "text-surface/80" : "text-body";

  return (
    <div className={cn(isCenter && "text-center mx-auto max-w-3xl", className)}>
      {eyebrow && (
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
          {eyebrow}
        </p>
      )}
      <Tag className={cn("font-heading text-[38px] leading-[1.05] md:text-[60px] mb-6", headingColor)}>
        {title}
      </Tag>
      {intro && (
        <p className={cn("max-w-2xl text-base md:text-lg leading-relaxed", introColor, isCenter && "mx-auto")}>
          {intro}
        </p>
      )}
    </div>
  );
}
