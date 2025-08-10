'use client'

import dynamic from 'next/dynamic'

// Dynamically import LottieScroll with SSR disabled
const LottieScroll = dynamic(
    () => import('@/components/animejs-gsap/lottie/LottieScroll'),
    { ssr: false }  // This ensures it only loads on the client side
)

export default function LottieSection() {
    return (
        <section>
            <LottieScroll />
            <p>Kijken of de upload nog werkt</p>
        </section>
    )
}