// app/over-ons/page.jsx
import Link from 'next/link'
import {CenterLayout} from "@/components/layout";
import {getEmployees} from "@/sanity/lib/getEmployees";
import EmployeesSwiper from "@/components/swiper-slider/EmployeesSwiper";
import OverOnsAnimation from "@/components/animejs-gsap/over-ons-animation";

export const metadata = {
    title: 'Over Ons | Bedrijfsnaam',
    description: 'Leer meer over ons bedrijf, onze missie, visie en het team achter Bedrijfsnaam.',
};

export default async function OverOns() {
    const employees = await getEmployees();

    return (
        <main>
            {/* Hero Section */}
            <CenterLayout className="text-left">
                <h1 className="text-4xl font-geologica uppercase md:text-5xl lg:text-7xl mb-6">De Ingenieurs Achter Jouw Digitale Succes</h1>
                <p className="font-light text-xl w-full lg:w-4/5 mb-12">
                    Bij Tradual combineren we technische excellentie met commercieel inzicht. Onze focus ligt op het bouwen van razendsnel ladende en robuuste online winkels met Next.js en Shopify als onze beproefde tech stack. We gaan verder dan alleen mooi design - we creëren e-commerce ervaringen die niet alleen indrukwekkend zijn voor bezoekers, maar ook meetbare resultaten leveren voor jouw bedrijf. Snelheid, prestaties en gebruiksvriendelijkheid staan bij ons centraal.
                </p>
                <Link
                    href="/contact"
                    className="bg-white px-7 py-5 rounded-4xl text-black font-geologica text-lg"
                >
                    Contact ons
                </Link>
            </CenterLayout>

            {/*Animation animejs*/}
            <CenterLayout className="">
                <div>
                    <OverOnsAnimation />
                </div>
            </CenterLayout>

            {/*Our Team*/}
            <CenterLayout className="">
                <div>
                    <p className="text-teal-400 font-geologica text-xl mb-6">Ons Team</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-geologica">Een gepassioneerd team van technische experts en datagedreven professionals</h2>
                </div>
                <div className="mt-10 flex flex-col md:grid md:grid-cols-3">
                    <div className="col-span-1">
                        <h2 className="text-2xl">Tekst voor bij de werknemers</h2>
                    </div>
                    <div className="col-span-2">
                        <EmployeesSwiper serializedEmployees={JSON.stringify(employees)} />
                    </div>
                </div>
            </CenterLayout>

            
        </main>
    );
}