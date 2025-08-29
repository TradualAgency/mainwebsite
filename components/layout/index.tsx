import {ReactNode} from "react";

interface CenterLayoutProps{
    children: ReactNode;
    className?: string;
}

export function CenterLayout({children, className}: CenterLayoutProps){
    return(
        <section className="info-section my-16 md:my-20 lg:my-24 px-4 sm:px-6 md:px-8">
            <div className={`max-w-7xl mx-auto ${className || ''}`}>
                {children}
            </div>
        </section>
    )
}

