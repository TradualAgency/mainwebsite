// scripts/migrate-projects.ts
// Script om bestaande projecten toe te voegen aan Sanity

import { client } from '@/sanity/lib/client';
import { projects as oldProjects } from '@/lib/projects';

const sanityProjects = [
  {
    _type: 'project',
    title: 'E-commerce Platform Redesign',
    slug: { current: 'e-commerce-platform-redesign' },
    description: 'Complete herontwerp van een e-commerce platform met focus op conversie en gebruikerservaring. Dit project omvatte een volledige UX/UI herziening, performance optimalisatie en implementatie van moderne e-commerce best practices.',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-placeholder-1', // Deze moet je vervangen met echte Sanity asset reference
        _type: 'reference'
      },
      alt: 'E-commerce platform dashboard'
    },
    tags: ['UX/UI', 'E-commerce', 'React', 'Conversion'],
    featured: true,
    client: 'TechStyle Fashion',
    projectUrl: 'https://example-ecommerce.com',
    completedAt: '2024-03-15',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Dit project richtte zich op het volledig herdenken van de gebruikerservaring voor een groeiende e-commerce platform. Het doel was om de conversie te verhogen en de bounce rate te verminderen door intuïtieve navigatie en een gestroomlijnde checkout proces.'
          }
        ],
        style: 'normal'
      }
    ]
  },
  {
    _type: 'project',
    title: 'SaaS Dashboard Interface',
    slug: { current: 'saas-dashboard-interface' },
    description: 'Intuïtieve dashboard interface voor een B2B SaaS applicatie met complexe data visualisatie en real-time analytics.',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-placeholder-2',
        _type: 'reference'
      },
      alt: 'SaaS dashboard met analytics'
    },
    tags: ['Dashboard', 'SaaS', 'Data Viz', 'B2B'],
    featured: true,
    client: 'DataFlow Solutions',
    projectUrl: 'https://dataflow-dashboard.com',
    completedAt: '2024-02-28',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Een krachtige dashboard interface die complexe bedrijfsdata omzet naar begrijpelijke visualisaties. Het project omvatte user research, wireframing, prototyping en implementatie van interactieve charts en real-time updates.'
          }
        ],
        style: 'normal'
      }
    ]
  },
  {
    _type: 'project',
    title: 'Mobile Banking App',
    slug: { current: 'mobile-banking-app' },
    description: 'Veilige en gebruiksvriendelijke mobile banking applicatie met moderne UX patronen en biometrische authenticatie.',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-placeholder-3',
        _type: 'reference'
      },
      alt: 'Mobile banking app interface'
    },
    tags: ['Mobile', 'Fintech', 'Security', 'UX'],
    featured: false,
    client: 'SecureBank',
    projectUrl: 'https://securebank-mobile.com',
    completedAt: '2024-01-20',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Een revolutionaire banking app die veiligheid combineert met gebruiksvriendelijkheid. Uitgevoerd met strikte financiële regelgeving compliance en geïntegreerd met moderne beveiligingsprotocollen.'
          }
        ],
        style: 'normal'
      }
    ]
  },
  {
    _type: 'project',
    title: 'Healthcare Portal',
    slug: { current: 'healthcare-portal' },
    description: 'Patiëntenportaal voor zorgverleners met focus op toegankelijkheid, privacy compliance en intuïtieve navigatie.',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-placeholder-4',
        _type: 'reference'
      },
      alt: 'Healthcare portal dashboard'
    },
    tags: ['Healthcare', 'Accessibility', 'Privacy', 'Portal'],
    featured: false,
    client: 'MedCare Group',
    completedAt: '2023-12-10',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Een toegankelijk portaal dat patiënten en zorgverleners verbindt. Gebouwd met WCAG 2.1 AA compliance en GDPR-conforme privacy features voor gevoelige medische data.'
          }
        ],
        style: 'normal'
      }
    ]
  },
  {
    _type: 'project',
    title: 'Educational Platform',
    slug: { current: 'educational-platform' },
    description: 'Online leerplatform met interactieve content, progress tracking en gamification elementen voor betere student engagement.',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-placeholder-5',
        _type: 'reference'
      },
      alt: 'Educational platform interface'
    },
    tags: ['Education', 'Interactive', 'Learning', 'Progress'],
    featured: true,
    client: 'EduTech Academy',
    projectUrl: 'https://edutech-learn.com',
    completedAt: '2023-11-25',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Een innovatief leerplatform dat traditioneel onderwijs combineert met moderne technologie. Features omvatten adaptieve leerpathe, peer-to-peer collaboration tools en uitgebreide voortgangsanalytics.'
          }
        ],
        style: 'normal'
      }
    ]
  },
  {
    _type: 'project',
    title: 'Real Estate Marketplace',
    slug: { current: 'real-estate-marketplace' },
    description: 'Moderne vastgoedmarktplaats met geavanceerde zoekfuncties, virtuele tours en AI-powered property matching.',
    mainImage: {
      _type: 'image',
      asset: {
        _ref: 'image-placeholder-6',
        _type: 'reference'
      },
      alt: 'Real estate marketplace'
    },
    tags: ['Real Estate', 'Search', 'Virtual Tours', 'Marketplace'],
    featured: false,
    client: 'PropertyHub',
    projectUrl: 'https://propertyhub-market.com',
    completedAt: '2023-10-15',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Een geavanceerde vastgoedplatform dat kopers en verkopers verbindt via intelligente matching algoritmes. Geïntegreerd met 360° virtual tours en real-time marktanalyses.'
          }
        ],
        style: 'normal'
      }
    ]
  }
];

export async function migrateProjects() {
  try {
    console.log('Starting project migration to Sanity...');
    
    for (const project of sanityProjects) {
      const result = await client.create(project);
      console.log(`Created project: ${project.title} (${result._id})`);
    }
    
    console.log('✅ Project migration completed successfully!');
  } catch (error) {
    console.error('❌ Error migrating projects:', error);
  }
}

// Run migration
if (require.main === module) {
  migrateProjects();
}