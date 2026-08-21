import { cn } from "@/lib/utils";

export type SectionTone = "light" | "muted" | "dark";

const toneClasses: Record<SectionTone, string> = {
  light: "bg-surface",
  muted: "bg-surface-muted",
  dark: "bg-primary",
};

const spacingClasses = {
  sm: "py-12",
  md: "py-20",
  lg: "py-28",
} as const;

interface SectionProps {
  tone?: SectionTone;
  spacing?: keyof typeof spacingClasses;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

// Gedeelde sectie-wrapper. Padding-only (nooit margin) zodat twee volle-breedte secties
// nooit een wit gat tussen zich krijgen door margin-collapse — zie eerdere secties zoals
// OnsTeam/ProjectUSPSection die "my-20" en "py-20" mengden.
export function Section({
  tone = "light",
  spacing = "md",
  id,
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn(toneClasses[tone], spacingClasses[spacing], "px-6 md:px-8", className)}>
      <div className={cn("max-w-7xl mx-auto", innerClassName)}>{children}</div>
    </section>
  );
}
