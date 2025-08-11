// components/TradualSection.tsx
'use client';
import { useState } from 'react';

export default function TradualSection() {
  const [activeSide, setActiveSide] = useState<'left' | 'right'>('left');

  return (
      <section className="bg-[#defff6] rounded-2xl px-6 py-20 my-20 mx-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Titel */}
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Waarom kiezen voor Tradual
          </h2>

          {/* Twee kolommen */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 transition-all duration-500">
            {/* Linker kolom */}
            <div
                onMouseEnter={() => setActiveSide('left')}
                className={`bg-secondary text-[#defff6] flex flex-col justify-between items-start transition-all duration-500 overflow-hidden cursor-pointer rounded-2xl ${
                    activeSide === 'left' ? 'md:w-2/3' : 'md:w-1/3'
                }`}
            >
              <div className="flex flex-col md:flex-row md:gap-6">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Sneller Schalen</h3>
                  <p className="mb-6">
                    Bied je klanten en bezoekers altijd een snelle, foutloze en gebruiksvriendelijke ervaring, ook wanneer je webshop groeit. Zo blijft elke nieuwe bezoeker even soepel geholpen als je eerste klant, terwijl jij moeiteloos uitbreidt naar nieuwe markten en doelgroepen.
                  </p>
                  <button className="bg-[#defff6] text-secondary font-semibold px-4 py-2 rounded-lg">
                    Lees meer
                  </button>
                </div>
                {activeSide === 'left' && (
                    <img
                        src="/images/Scherm­afbeelding 2025-08-11 om 21.09.51.png"
                        alt="Afbeelding links"
                        className="w-100 h-100 object-cover mt-30 md:ml-6 self-end"
                    />
                )}
              </div>
            </div>

            {/* Rechter kolom */}
            <div
                onMouseEnter={() => setActiveSide('right')}
                className={`bg-secondary text-[#defff6] flex flex-col justify-between items-start transition-all duration-500 overflow-hidden cursor-pointer rounded-2xl ${
                    activeSide === 'right' ? 'md:w-2/3' : 'md:w-1/3'
                }`}
            >
              <div className="flex flex-col md:flex-row md:gap-6">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">Automatiseren</h3>
                  <p className="mb-6">
                    Laat repetitieve taken achter je en zorg dat bestellingen, voorraad en communicatie automatisch verlopen. Zo ervaren jouw klanten altijd snelle levering en duidelijke updates, terwijl jij tijd overhoudt om te focussen op groei en service.
                  </p>
                  <button className="bg-[#defff6] text-secondary font-semibold px-4 py-2 rounded-lg">
                    Ontdek meer
                  </button>
                </div>
                {activeSide === 'right' && (
                    <img
                        src="/images/ChatGPT Image 11 aug 2025, 21_22_57.png"
                        alt="Afbeelding rechts"
                        className="w-100 h-100 object-cover mt-30 md:ml-6 self-end"
                    />
                )}
              </div>
            </div>
          </div>

          {/* Onderste blok */}
          <div className="md:w-1/3 md:ml-auto text-right">
            <h3 className="text-2xl font-semibold mb-4 text-secondary">
              Tradual maakt het verschil
            </h3>
            <p className="mb-6 text-secondary">
              Wij combineren snelheid, conversie en slimme automatisering in op maat gemaakte e-commerce oplossingen, zodat jouw webshop niet alleen groeit, maar ook blijft presteren voor elke klant.
            </p>
            <button className="bg-secondary text-[#defff6] font-semibold px-4 py-2 rounded-lg">
              Meer weten
            </button>
          </div>
        </div>
      </section>
  );
}
