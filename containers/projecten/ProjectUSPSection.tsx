import React from "react";

export default function ProjectUSPSection() {
  return (
    <section className="w-full px-8 py-16 md:py-24">
      <div className="mx-auto max-w-7xl rounded-xl p-8 md:p-12 lg:p-16" style={{ backgroundColor: '#defff6' }}>
        <h2 className="text-3xl font-semibold text-secondary mb-20 md:text-4xl">
          Waarom kiezen voor Tradual projecten?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* USP 1 */}
          <div className="text-left">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              Lightning Fast Performance
            </h3>
            <p className="text-secondary/80 leading-relaxed">
              Onze projecten laden razendsnel en bieden een uitstekende gebruikerservaring die conversies verhoogt.
            </p>
          </div>

          {/* USP 2 */}
          <div className="text-left">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              Bewezen Resultaten
            </h3>
            <p className="text-secondary/80 leading-relaxed">
              Al onze projecten zijn geoptimaliseerd voor conversie en hebben bewezen hun waarde in de praktijk.
            </p>
          </div>

          {/* USP 3 */}
          <div className="text-left">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3">
              Perfecte UX/UI Design
            </h3>
            <p className="text-secondary/80 leading-relaxed">
              Elk project is zorgvuldig ontworpen met focus op gebruiksvriendelijkheid en visuele aantrekkingskracht.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}