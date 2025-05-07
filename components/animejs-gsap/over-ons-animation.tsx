'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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

    return (
        <>
            <div
                ref={container}
                className="flex justify-start items-center px-10"
            >
                <div
                    ref={square}
                    className="box h-24 bg-red-100"
                    style={{ width: '100px' }}
                ></div>
            </div>
        </>
    );
}
