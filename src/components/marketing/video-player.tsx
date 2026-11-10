'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  /** Pad of URL naar het MP4-bestand. */
  src: string;
  /** Stilstaand beeld dat getoond wordt tot er op afspelen is geklikt (bestand in /public). */
  poster: string;
  /** Korte omschrijving van de video, voor schermlezers. */
  title: string;
  /** Tekst bij de afspeelknop, bv. "Video afspelen". */
  playLabel: string;
  className?: string;
}

// Video met geluid en bediening (de HeroVideoLoop is alleen een stille achtergrond).
// Tot de klik staat er alleen een posterbeeld: het videobestand wordt pas daarna
// opgehaald, zodat een bezoeker die niet kijkt er geen megabytes voor laadt en de poster
// het snelst in beeld staat. Na de klik speelt de video direct af, mét geluid — dat mag
// van de browser omdat het op een klik volgt.
export function VideoPlayer({ src, poster, title, playLabel, className }: VideoPlayerProps) {
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  // De knop verdwijnt bij het starten; zet de focus op de video zodat toetsenbord-
  // gebruikers meteen bij de bediening zijn.
  useEffect(() => {
    if (started) video.current?.focus();
  }, [started]);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl border border-accent/30 bg-primary shadow-2xl shadow-black/30",
        className,
      )}
    >
      {started ? (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full bg-black"
          src={src}
          poster={poster}
          title={title}
          controls
          autoPlay
          playsInline
        />
      ) : (
        <button
          type="button"
          onClick={() => setStarted(true)}
          aria-label={`${playLabel}: ${title}`}
          className="group absolute inset-0 flex cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent"
        >
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
          <span aria-hidden className="absolute inset-0 bg-primary/35 transition-colors group-hover:bg-primary/20" />
          <span className="relative flex flex-col items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary shadow-lg shadow-black/30 transition-transform group-hover:scale-105 md:h-24 md:w-24">
              {/* Het driehoekje staat optisch links van het midden; een tikje naar rechts. */}
              <Play className="ml-1 h-7 w-7 md:h-10 md:w-10" fill="currentColor" strokeWidth={0} aria-hidden />
            </span>
            <span className="font-heading text-[10px] uppercase tracking-[0.18em] text-white md:text-xs">
              {playLabel}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
