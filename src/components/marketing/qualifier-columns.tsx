import { Check, X } from "lucide-react";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";

interface QualifierColumnsProps {
  eyebrow?: string;
  title: React.ReactNode;
  forWho: string[];
  notForWho?: string[];
  tone?: "light" | "muted";
}

// Toont voor wie een dienst wel/niet is. Een expliciete "niet voor jou"-lijst
// kwalificeert net zo hard als de "wel voor jou"-lijst.
export function QualifierColumns({ eyebrow = "Voor wie", title, forWho, notForWho, tone = "muted" }: QualifierColumnsProps) {
  return (
    <Section tone={tone}>
      <SectionHeading eyebrow={eyebrow} title={title} className="mb-10" />
      <div className={`grid grid-cols-1 ${notForWho?.length ? "md:grid-cols-2" : ""} gap-8`}>
        <ul className="space-y-3">
          {forWho.map((item) => (
            <li key={item} className="flex items-start gap-3 text-body text-base leading-relaxed">
              <Check className="text-accent shrink-0 mt-1" size={18} strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
        {notForWho && notForWho.length > 0 && (
          <ul className="space-y-3">
            {notForWho.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body/70 text-base leading-relaxed">
                <X className="text-body/40 shrink-0 mt-1" size={18} strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
