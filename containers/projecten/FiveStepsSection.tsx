import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FiveStepsSection() {
  return (
    <section className="w-full bg-secondary px-8 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-left text-3xl font-semibold text-white mb-12 md:text-4xl">
          Jouw ecom site in 5 stappen
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Card */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl">
              <Image
                src="/images/ChatGPT Image 16 aug 2025, 11_37_31.png"
                alt="Contact opnemen"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3 group-hover:text-secondary/80 transition-colors">
              Contact opnemen
            </h3>
            <p className="text-secondary/80 mb-6 leading-relaxed">
              Klaar om jouw ecommerce droom werkelijkheid te maken? Neem contact op en ontdek hoe wij jouw online winkel naar een hoger niveau tillen.
            </p>
            <Button asChild size="lg" className="w-full bg-secondary text-white hover:opacity-90 transition">
              <Link href="/contact">Contact opnemen</Link>
            </Button>
          </div>

          {/* About Us Card */}
          <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl">
              <Image
                src="/images/ChatGPT Image 16 aug 2025, 11_37_31.png"
                alt="Meer weten over ons"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <h3 className="text-xl font-semibold text-secondary mb-3 group-hover:text-secondary/80 transition-colors">
              Meer weten over ons
            </h3>
            <p className="text-secondary/80 mb-6 leading-relaxed">
              Ontdek hoe Tradual werkt, wat onze visie is en waarom wij de perfecte partner zijn voor jouw ecommerce project.
            </p>
            <Button asChild size="lg" className="w-full bg-secondary text-white hover:opacity-90 transition">
              <Link href="/over-ons">Meer over ons</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}