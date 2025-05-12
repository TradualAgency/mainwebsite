'use client'
import {CenterLayout} from "@/components/layout";
import ContactForm from "@/components/contact-form";
import ContactSwiper from "@/components/swiper-slider/ContactSwiper";
import ContactPageCTABlock from "@/containers/contact-page/ContactPageCTABlock";

export default function Contact() {
    return(
        <>
            <CenterLayout>
                <h1 className="text-4xl font-geologica uppercase md:text-5xl lg:text-7xl mb-10">Neem contact met ons op</h1>
                <section className="grid grid-cols-2 gap-6 rounded-2xl p-10 bg-gradient-to-br from-zinc-900 via-zinc-900  to-teal-300">
                    <div>
                        <ContactForm />
                    </div>
                    <div>
                        <ContactSwiper />
                    </div>
                </section>
                <section className="my-10">
                    <ContactPageCTABlock />
                </section>

            </CenterLayout>
        </>
    )
}