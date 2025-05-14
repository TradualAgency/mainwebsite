import Link from "next/link"

export default function Diensten() {
    return (
        <section className="info-section relative mt-20 px-8 py-20 bg-[#2D3B37]">
            <div className=" relative max-w-7xl mx-auto z-10">
              <div>
                <h2 className="font-geologica text-5xl md:text-8xl pb-5">Diensten</h2>
              </div>
              <div className="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-8 mt-5">
                <div className="flex flex-col gap-5">
                  <img src="/images/ecommerce-img.png"
                  className="h-[400px] w-full object-cover"
                  alt="ecommerce" />
                  <h3 className="font-geologica text-4xl font-bold">eCommerce</h3>
                  <p>Wij zijn trots op onze samenwerking met Shopify en fungeren als complete productiepartner voor grote spelers binnen de e-commerce. We bouwen niet alleen uw webshop, maar zetten ook uw volledige digitale architectuur op.</p>
                  <Link href={'/ecommerce'}
                    className="underline"
                  >
                    Lees meer
                  </Link>
                </div>
                <div className="flex flex-col gap-5">
                  <img src="/images/Design-websites.png"
                    className="h-[400px] w-full object-cover"
                  alt="Design & websites" />
                  <h3 className="font-geologica text-4xl font-bold">Design & websites</h3>
                  <p>De beste in zijn klasse: geautomatiseerde bedrijfswebsites en platformen. Direct klaar om op te schalen en met mogelijkheden die ver boven de status quo uitstijgen.</p>
                  <Link href={'/design'}
                    className="underline"
                  >
                    Lees meer
                  </Link>
                </div>
                <div className="flex flex-col gap-5">
                  <img src="/images/marketing.png"
                    className="h-[400px] w-full object-cover"
                  alt="Marketing" />
                  <h3 className="font-geologica text-4xl font-bold">Marketing</h3>
                  <p>Breng je merk tot leven en domineer het digitale landschap met onze baanbrekende marketingdiensten. Van SEO tot social media, wij leveren resultaten die echt impact maken. Klaar om je online aanwezigheid naar een hoger niveau te tillen en je concurrentie te verbazen?</p>
                  <Link href={'/marketing'}
                    className="underline"
                  >
                    Lees meer
                  </Link>
                </div>
              </div>
            </div>
        </section>
    )
}