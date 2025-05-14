'use client'

import { useEffect, useState } from 'react'

export default function LottieScroll() {
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        // Importeer de modules alleen op de client
        const loadLottie = async () => {
            if (typeof window !== 'undefined') {
                const lottie = (await import('lottie-web')).default;
                const gsap = (await import('gsap')).gsap;
                const ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger;
                
                gsap.registerPlugin(ScrollTrigger);
                
                const container = document.getElementById('lottie-animation');
                if (!container) return;
                
                const animation = lottie.loadAnimation({
                    container,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    path: '/images/Scene.json',
                });
                
                animation.addEventListener('DOMLoaded', () => {
                    const totalFrames = animation.getDuration(true);
                    
                    ScrollTrigger.create({
                        trigger: container,
                        start: 'top top',
                        end: '+=1000',
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const frame = self.progress * totalFrames;
                            animation.goToAndStop(frame, true);
                        },
                    });
                    
                    ScrollTrigger.refresh();
                });
                
                setHasLoaded(true);
                
                return () => {
                    animation.destroy();
                };
            }
        };
        
        loadLottie();
    }, []);
    
    return (
        <>
            <div id="lottie-animation" style={{ height: '100vh' }} />
        </>
    );
}