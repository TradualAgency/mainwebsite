'use client'
import {CenterLayout} from "@/components/layout";
import ContactForm from "@/components/contact-form";
import ContactSwiper from "@/components/swiper-slider/ContactSwiper";
import ContactPageCTABlock from "@/containers/contact-page/ContactPageCTABlock";

export default function Contact() {
    return(
        <>
            <CenterLayout>
                <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Contact</p>
                <h1 className="font-heading text-primary text-[40px] leading-[1.05] md:text-[72px] max-w-4xl mb-8 md:mb-12">
                    Laten we uitzoeken waar je omzet lekt.
                </h1>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-primary/10 bg-primary p-6 md:p-8 lg:p-10">
                    <div>
                        <ContactForm />
                    </div>
                    <div>
                        <ContactSwiper />
                    </div>
                </section>
                <section className="my-16 md:my-20">
                    <ContactPageCTABlock />
                </section>
            </CenterLayout>
        </>
    )
}
