import Link from 'next/link'
import { site } from '@/content/site'

export default function ContactPageCTABlock() {
    return (
        <div className="bg-surface-muted border border-primary/10 p-6 md:p-8 lg:p-12">
            <div className="text-center">
                <p className="font-heading text-[10px] uppercase tracking-[0.18em] text-accent mb-4">Next step</p>
                <h2 className="font-heading text-primary text-[32px] leading-[1.05] md:text-[48px] mb-4 md:mb-6">
                    Prefer to know what it costs first?
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-body mb-6 md:mb-8 max-w-2xl mx-auto">
                    View the four services and price ranges, or email us directly if you'd rather speak in person.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href={`mailto:${site.email.general}`}
                        className="bg-primary text-surface px-6 py-3 font-medium hover:bg-primary/90 transition"
                    >
                        Email us directly
                    </Link>
                    <Link href="/services" className="text-primary font-medium underline decoration-accent underline-offset-4 hover:text-accent transition">
                        View services <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
