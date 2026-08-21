import Link from "next/link";
import { cn } from "@/lib/utils";

export type CtaButtonVariant = "gold" | "dark" | "ghost-light" | "ghost-dark";

const variantClasses: Record<CtaButtonVariant, string> = {
  // Gouden primaire actie — werkt op licht en donker.
  gold: "bg-accent text-primary hover:opacity-90",
  // Donkere primaire actie voor gebruik op lichte/muted achtergrond.
  dark: "bg-primary text-surface hover:opacity-90",
  // Outline op een lichte achtergrond.
  "ghost-light": "bg-transparent border border-primary/30 text-primary hover:bg-primary/5",
  // Outline op een donkere (bg-primary) achtergrond.
  "ghost-dark": "bg-transparent border border-accent text-accent hover:bg-accent/10",
};

interface CtaButtonProps {
  href: string;
  variant?: CtaButtonVariant;
  className?: string;
  children: React.ReactNode;
}

// Altijd een echte link — geen <button> zonder href/onClick meer (de homepage had er drie).
export function CtaButton({ href, variant = "gold", className, children }: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center px-8 py-3 font-medium transition",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
