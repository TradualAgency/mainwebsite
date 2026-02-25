import Image from "next/image";
import Link from "next/link";

export default function FiveStepsSection() {
  return (
    <section className="py-20 px-8 bg-surface">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Chapter Three</p>
        <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-12">
          Hoe we samenwerken
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="bg-[#f9f9f9] p-8">
            <div className="relative w-full h-[260px] mb-6 overflow-hidden">
              <Image
                src="/images/ChatGPT Image 16 aug 2025, 11_37_31.png"
                alt="Intake en strategie"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="font-heading text-primary text-[32px] leading-tight mb-3">01. Intake en Strategie</h3>
            <p className="text-body leading-relaxed mb-6">
              We starten met een scherpe analyse van je merk, doelgroep en commerciële doelen. Zo bouwen we
              gericht aan een roadmap die design en performance direct koppelt aan groei.
            </p>
            <Link href="/contact" className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:opacity-80 transition">
              Plan een gesprek
            </Link>
          </article>

          <article className="bg-[#f9f9f9] p-8">
            <div className="relative w-full h-[260px] mb-6 overflow-hidden">
              <Image
                src="/images/Scherm­afbeelding 2025-08-16 om 11.22.32.png"
                alt="Design en uitvoering"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <h3 className="font-heading text-primary text-[32px] leading-tight mb-3">02. Design en Uitvoering</h3>
            <p className="text-body leading-relaxed mb-6">
              Daarna vertalen we de strategie naar een premium digitale ervaring met duidelijke user flows,
              snelle performance en continue optimalisatie op conversie.
            </p>
            <Link href="/over-ons" className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:opacity-80 transition">
              Lees meer over onze aanpak
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
