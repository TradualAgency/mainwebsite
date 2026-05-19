export default function InfoSection() {
    return (
        <section className="bg-white my-20 px-8">
            <div className="max-w-7xl mx-auto">
                <blockquote className="text-2xl md:text-4xl font-heading leading-tight">
                    &ldquo;Luxe draait niet om features, maar om het gevoel van moeiteloze performance. Wij bouwen de stille motoren achter merken die wereldwijd verlangen oproepen.&rdquo;
                </blockquote>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <p className="text-base md:text-lg leading-relaxed text-body">
                        We kennen de beperkingen van monolithische
commerce. De frictie. De vertraging. Voor een
merk dat excellentie belangrijk vindt, zijn dit geen
technische details maar obstakels voor de
merkervaring.                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-body">
                        Onze methode draait om Headless:
een scheiding tussen frontend en backend waardoor je
merkverhaal zonder compromis verteld kan worden,
op elk scherm en met elke snelheid.                    </p>
                </div>
            </div>
        </section>
    );
}
