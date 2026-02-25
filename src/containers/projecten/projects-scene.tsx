"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ProjectCard } from "@/components/project-card"
import { type Project } from "@/sanity/lib/getProjects"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectsSceneProps {
  projects: Project[]
}

export function ProjectsScene({ projects }: ProjectsSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return

    const container = containerRef.current
    const cards = cardsRef.current

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      cards.style.transform = "none"
      cards.style.filter = "none"
      return
    }

    // Initial state: flat lay perspective
    gsap.set(cards, {
      rotationX: 75,
      rotationY: -15,
      z: -200,
      filter: "blur(2px)",
      transformOrigin: "center center",
      transformStyle: "preserve-3d",
    })

    // Create the main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",  // Start earlier but not too aggressive
        end: "top 50%",   // Give more time for the animation
        scrub: 1.5,       // Slower, smoother scrub
      },
    })

    // Animate from flat lay to upright
    tl.to(cards, {
      rotationX: 0,
      rotationY: 0,
      z: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power2.out",
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="projects-scene" className="relative py-20 px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto mb-10">
        <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">Chapter Two</p>
        <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-6">
          Selected Work
        </h2>
        <p className="max-w-3xl text-body text-base md:text-lg leading-relaxed">
          Een overzicht van projecten waarin strategie, performance en esthetiek samenkomen in een digitale
          ervaring die verkoopt.
        </p>
      </div>

      <div ref={containerRef} className="min-h-[60vh] md:min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
