import Image from "next/image"

export default function USPSection(){
  return (
    <section className="usp-section my-20 px-8 mt-96">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-20 relative">
        <h2 className="font-geologica text-4xl md:text-8xl">Snelheid x schaalbaarheid = Groei</h2>
        <div className="absolute top-[-100px] ml-30 z-0 sm:top-[-200px] md:ml-50">
          <Image src="/images/test-ellipse.png" width={100} height={100} className="w-[400px] opacity-50 blur-md lg:w-[500px]" alt=""/>
        </div>
      </div>            
      <div className="w-3/4 lg:w-1/2 ml-auto mt-10 flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h2 className="font-geologica text-2xl font-bold"># Razendsnelle en SEO-geoptimaliseerde webshops</h2>
          <p>Wij ontwikkelen supersnelle e-commerce websites die direct klaar zijn voor groei. Dankzij geoptimaliseerde prestaties en een soepele gebruikerservaring laden pagina’s razendsnel, verbeteren ze je Google-ranking en verhogen ze de conversies. Meer snelheid, meer zichtbaarheid, meer omzet.</p>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-geologica text-2xl font-bold"># Schaalbare en flexibele oplossingen voor groei</h2>
          <p>Onze webshops zijn volledig aanpasbaar en schaalbaar, zodat ze kunnen meegroeien met jouw bedrijf. Of je nu net start of al duizenden producten verkoopt, we zorgen voor een robuuste en toekomstbestendige webshop met integraties, automatiseringen en maatwerkfunctionaliteiten die jouw workflow verbeteren.</p>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-geologica text-2xl font-bold"># Conversiegerichte UX en high-performance design</h2>
          <p>Wij combineren modern design met data-gedreven UX-principes om webshops te bouwen die niet alleen mooi zijn, maar ook maximaal converteren. Denk aan een gestroomlijnd checkout-proces, strategisch geplaatste call-to-actions en een gebruiksvriendelijke interface die klanten langer laat blijven en meer laat kopen.</p>
        </div>
      </div>
    </section>
  )
}