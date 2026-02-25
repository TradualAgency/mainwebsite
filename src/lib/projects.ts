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
    description: "Complete herontwerp van een e-commerce platform met focus op conversie en gebruikerservaring.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.21.46.png",
    tags: ["UX/UI", "E-commerce", "React", "Conversion"],
  },
  {
    id: "2",
    title: "SaaS Dashboard Interface",
    description: "Intuïtieve dashboard interface voor een B2B SaaS applicatie met complexe data visualisatie.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.22.32.png",
    tags: ["Dashboard", "SaaS", "Data Viz", "B2B"],
  },
  {
    id: "3",
    title: "Mobile Banking App",
    description: "Veilige en gebruiksvriendelijke mobile banking applicatie met moderne UX patronen.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.23.34.png",
    tags: ["Mobile", "Fintech", "Security", "UX"],
  },
  {
    id: "4",
    title: "Healthcare Portal",
    description: "Patiëntenportaal voor zorgverleners met focus op toegankelijkheid en privacy.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.23.34.png",
    tags: ["Healthcare", "Accessibility", "Privacy", "Portal"],
  },
  {
    id: "5",
    title: "Educational Platform",
    description: "Online leerplatform met interactieve content en progress tracking voor studenten.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.21.46.png",
    tags: ["Education", "Interactive", "Learning", "Progress"],
  },
  {
    id: "6",
    title: "Real Estate Marketplace",
    description: "Moderne vastgoedmarktplaats met geavanceerde zoekfuncties en virtuele tours.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.22.32.png",
    tags: ["Real Estate", "Search", "Virtual Tours", "Marketplace"],
  },
  {
    id: "7",
    title: "Food Delivery App",
    description: "Snelle en intuïtieve food delivery app met real-time tracking en personalisatie.",
    image: "/images/Scherm­afbeelding 2025-08-16 om 11.22.32.png",
    tags: ["Food", "Delivery", "Real-time", "Mobile"],
  },
  {
    id: "8",
    title: "Corporate Website",
    description: "Professionele corporate website met focus op storytelling en lead generatie.",
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
