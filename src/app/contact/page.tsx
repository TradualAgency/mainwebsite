'use client'
import {CenterLayout} from "@/components/layout";
import ContactForm from "@/components/contact-form";
import ContactSwiper from "@/components/swiper-slider/ContactSwiper";
import ContactPageCTABlock from "@/containers/contact-page/ContactPageCTABlock";

export default function Contact() {
    return(
        <>
            <CenterLayout>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-geologica text-secondary mb-8 md:mb-12">Neem contact met ons op</h1>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl p-6 md:p-8 lg:p-10 bg-secondary">
                    <div>
                        <ContactForm />
                    </div>
                    <div>
                        <ContactSwiper />
                    </div>
                </section>
                <section className="my-16 md:my-20 lg:my-24 grid grid-cols-1 grid-rows-1 sm:grid-cols-3 gap-6">
                    <div className="col-span-2">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-geologica text-secondary">Contactgegevens</h2>
                    </div>
                    <div className="text-lg md:text-xl lg:text-2xl leading-relaxed col-span-1 text-secondary">
                        <p>Eekhoornbos 4</p>
                        <p>Zeewolde</p>
                        <p>06 - 123 123 123</p>
                        <p>info@tradual.com</p>
                    </div>
                </section>
                <section className="my-16 md:my-20">
                    <ContactPageCTABlock />
                </section>
            </CenterLayout>
        </>
    )
}