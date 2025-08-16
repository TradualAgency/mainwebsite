"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProjectsScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return

    const container = containerRef.current
    const cards = cardsRef.current
    const progressBar = progressRef.current

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
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          // Update progress bar
          if (progressBar) {
            gsap.set(progressBar, { scaleX: self.progress })
            // Hide progress bar when animation is near completion
            if (self.progress > 0.95) {
              gsap.to(progressBar, { opacity: 0, duration: 0.5 })
            }
          }
        },
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
    <section id="projects-scene" className="relative pt-0 pb-32 px-8">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div ref={progressRef} className="h-full bg-gray-900 origin-left scale-x-0" />
      </div>

      <div ref={containerRef} className="min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
