export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  url?: string
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform Redesign",
    description: "Complete redesign of an e-commerce platform focused on conversion and user experience.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.21.46.png",
    tags: ["UX/UI", "E-commerce", "React", "Conversion"],
  },
  {
    id: "2",
    title: "SaaS Dashboard Interface",
    description: "Intuitive dashboard interface for a B2B SaaS application with complex data visualization.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.22.32.png",
    tags: ["Dashboard", "SaaS", "Data Viz", "B2B"],
  },
  {
    id: "3",
    title: "Mobile Banking App",
    description: "Secure and user-friendly mobile banking application with modern UX patterns.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.23.34.png",
    tags: ["Mobile", "Fintech", "Security", "UX"],
  },
  {
    id: "4",
    title: "Healthcare Portal",
    description: "Patient portal for healthcare providers focused on accessibility and privacy.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.23.34.png",
    tags: ["Healthcare", "Accessibility", "Privacy", "Portal"],
  },
  {
    id: "5",
    title: "Educational Platform",
    description: "Online learning platform with interactive content and progress tracking for students.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.21.46.png",
    tags: ["Education", "Interactive", "Learning", "Progress"],
  },
  {
    id: "6",
    title: "Real Estate Marketplace",
    description: "Modern real estate marketplace with advanced search and virtual tours.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.22.32.png",
    tags: ["Real Estate", "Search", "Virtual Tours", "Marketplace"],
  },
  {
    id: "7",
    title: "Food Delivery App",
    description: "Fast and intuitive food delivery app with real-time tracking and personalization.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.22.32.png",
    tags: ["Food", "Delivery", "Real-time", "Mobile"],
  },
  {
    id: "8",
    title: "Corporate Website",
    description: "Professional corporate website focused on storytelling and lead generation.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.23.34.png",
    tags: ["Corporate", "Storytelling", "Lead Gen", "Professional"],
  },
  {
    id: "9",
    title: "Fitness Tracking App",
    description: "Comprehensive fitness app met workout tracking, nutrition logging en social features.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.21.46.png",
    tags: ["Fitness", "Tracking", "Social", "Health"],
  },
]
