// components/UspSection.tsx
'use client';
import { useState } from 'react';

const tabs = [
  {
    id: 'snelheid',
    title: 'Snelheid',
    text: 'Headless Next.js webshops laden tot 3x sneller, verbeteren je SEO en verhogen conversies.',
    image: '/images/ChatGPT Image 11 aug 2025, 20_41_21.png',
  },
  {
    id: 'conversie',
    title: 'Conversie',
    text: 'Conversiegericht design en geoptimaliseerde checkoutflows maken van bezoekers kopers.',
    image: '/images/ChatGPT Image 11 aug 2025, 20_45_38.png',
  },
  {
    id: 'schaalbaarheid',
    title: 'Schaalbaarheid',
    text: 'Groei zonder beperkingen: voeg eenvoudig nieuwe functies, integraties en kanalen toe.',
    image: '/images/ChatGPT Image 11 aug 2025, 20_49_35.png',
  },
  {
    id: 'automatisering',
    title: 'Automatisering',
    text: 'Koppelingen met fulfilment, marketing en betalingen besparen tijd en voorkomen fouten.',
    image: '/images/ChatGPT Image 11 aug 2025, 20_51_53.png',
  },
];

export default function UspSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Titel: links uitgelijnd, md:w-1/3, anders full */}
          <h2 className="text-4xl font-bold text-gray-900 md:w-2/3 w-full mb-12">
            Bekijk hoe onze e‑commerce agency strategie, creatie en groei verbindt
          </h2>

          {/* Tabs: mobiel = horizontale scroll/slider, desktop = normaal */}
          <div
              role="tablist"
              aria-label="USP tabs"
              className="
            -mx-6 px-6            /* edge-to-edge touch area op mobiel */
            flex gap-3 md:gap-4
            overflow-x-auto md:overflow-visible
            whitespace-nowrap md:whitespace-normal
            snap-x snap-mandatory md:snap-none
            pb-2 md:pb-0 no-scrollbar
          "
          >
            {tabs.map((tab) => {
              const isActive = activeTab.id === tab.id;
              return (
                  <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${tab.id}`}
                      id={`tab-${tab.id}`}
                      onClick={() => setActiveTab(tab)}
                      className={`
                  shrink-0 snap-start
                  px-4 py-2 rounded-full border transition
                  ${isActive
                          ? 'bg-secondary text-white border-secondary hover:border-secondary'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-900'}
                `}
                  >
                    {tab.title}
                  </button>
              );
            })}
          </div>

          {/* Actieve content */}
          <div
              id={`panel-${activeTab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab.id}`}
              className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <img
                  src={activeTab.image}
                  alt={activeTab.title}
                  className="w-full h-auto rounded-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-secondary">{activeTab.title}</h3>
              <p className="text-gray-600">{activeTab.text}</p>
            </div>
          </div>
        </div>
      </section>
  );
}
