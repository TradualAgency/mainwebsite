'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// import BlackHoleAnimation from "@/components/animejs-gsap/blackhole-threejs";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPScrollAnimation() {
    const container = useRef(null);
    const square = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            square.current,
            {
                width: '10px',
            },
            {
                width: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: container.current,
                    start: 'top center',         // start wanneer bovenkant van container in het midden van viewport is
                    end: 'bottom center',        // einde wanneer onderkant van container in het midden is
                    scrub: true,                 // synct animatie met scroll
                },
            }
        );
    }, { scope: container });

    const containerAnimation = useRef(null);
    const circle = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            circle.current,
            {
                width: '40px',
            },
            {
                width: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerAnimation.current,
                    start: '-100% center',
                    end: '200% center',
                    scrub: true,
                }
            }
        )
        gsap.fromTo(
            circle.current,
            {
                height: '100px',
            },
            {
                height: '400px',
                ease: "none",
                scrollTrigger: {
                    trigger: containerAnimation.current,
                    start: '-50% center',
                    end: '200% center',
                    scrub: true,
                }
            }
        )
        gsap.to(
            circleSecond.current,
            {
                y: 100,
                delay: 6,
            }
        )
    }, {scope: containerAnimation})

    const containerAnimationSecond = useRef(null);
    const circleSecond = useRef(null);

    useGSAP(() => {
        gsap.to(
            circleSecond.current,
            {
                x: 100,
                delay: 5,
            }
        )
    }, {scope : containerAnimationSecond})



    return (
        <>
            <div ref={containerAnimationSecond} className="flex justify-start">
                <h2 ref={circleSecond}>Tradual</h2>
            </div>
            <div ref={containerAnimation} className="flex justify-start">
                <img
                    ref={circle}
                    src="/images/over-ons-img.png"
                    alt=""
                    className="w-10 h-10 object-cover rounded-2xl"
                />
                <p className="">Sta buiten in het veld. Jouw e-commerce merk verdient meer dan een kant-en-klare template.</p>
            </div>
        </>
    );
}
