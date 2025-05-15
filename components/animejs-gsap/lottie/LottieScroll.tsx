'use client'

import { useEffect } from 'react'
import lottie from 'lottie-web'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LottieScroll() {
    useEffect(() => {
        if (typeof window === 'undefined') return

        const container = document.getElementById('lottie-animation')
        if (!container) return

        const animation = lottie.loadAnimation({
            container,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: '/images/Scene.json',
        })

        animation.addEventListener('DOMLoaded', () => {
            const totalFrames = animation.getDuration(true)

            ScrollTrigger.create({
                trigger: container,
                start: 'top top',
                end: '+=1000', // lengte van scroll
                scrub: true,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const frame = self.progress * totalFrames
                    animation.goToAndStop(frame, true)
                },
            })

            ScrollTrigger.refresh()
        })

        return () => {
            animation.destroy()
        }
    }, [])

    return (
        <>
            <div id="lottie-animation" style={{ height: '100vh' }} />
        </>
    )
}
