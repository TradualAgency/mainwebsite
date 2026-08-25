'use client'

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import 'swiper/css';
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import type { Project } from "@/sanity/lib/getProjects";

interface ProjectSliderProps {
  projects: Project[];
}

// Full-bleed variant van de projectenlijst voor de homepage. De globale
// `.swiper { overflow-x: clip }` in globals.css laat de slides tot aan de schermrand
// doorlopen zonder dat de pagina horizontaal gaat scrollen. Geen navigation module:
// de globale .swiper-button-* regels zetten pijlen wit en op top: -20px, wat hier niet past.
export function ProjectSlider({ projects }: ProjectSliderProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <Swiper
        spaceBetween={24}
        slidesPerView={1.15}
        breakpoints={{
          640: { slidesPerView: 2.15 },
          1024: { slidesPerView: 3.25 },
        }}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setActiveIndex(instance.activeIndex)}
        // Dezelfde gutter als de kop erboven, zodat de eerste kaart uitlijnt.
        className="px-6 md:px-8 [&_.swiper-wrapper]:items-stretch"
      >
        {projects.map((project, index) => (
          // Swiper zet slides op height: 100%. Een expliciete hoogte sluit
          // align-items: stretch uit, waardoor elke kaart zijn eigen contenthoogte
          // houdt; met height: auto rekt elke slide mee tot de hoogste in de rij.
          <SwiperSlide key={project._id} className="!h-auto">
            <ProjectCard project={project} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      {projects.length > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project._id}
              type="button"
              onClick={() => swiper?.slideTo(index)}
              aria-label={`Go to ${project.title}`}
              aria-current={index === activeIndex}
              className={cn(
                "h-2 rounded-full transition-all",
                index === activeIndex ? "w-6 bg-accent" : "w-2 bg-primary/20 hover:bg-primary/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
