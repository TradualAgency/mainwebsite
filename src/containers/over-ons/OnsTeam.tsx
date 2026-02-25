import EmployeesSwiper from "@/components/swiper-slider/EmployeesSwiper";
import { type SanityDocument } from "@sanity/client";

type OurTeamProps = {
  employees: SanityDocument[];
};

export default function OurTeam({ employees }: OurTeamProps) {
  return (
    <section className="bg-[#f9f9f9] my-20 py-20 px-8 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Chapter Three</p>
        <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-8">
          The People Behind the Craft
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <p className="text-body text-base md:text-lg leading-relaxed">
            Bij Tradual draait alles om de mensen achter het werk. Ons team combineert technische excellentie,
            creatieve visie en data-gedreven keuzes om ervaringen te bouwen die zowel elegant als commercieel
            sterk zijn. We werken als een verlengstuk van je merk, niet als leverancier op afstand.
          </p>

          <div className="lg:col-span-2">
            <EmployeesSwiper serializedEmployees={JSON.stringify(employees)} />
          </div>
        </div>
      </div>
    </section>
  );
}
