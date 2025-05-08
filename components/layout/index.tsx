import {ReactNode} from "react";

interface CenterLayoutProps{
    children: ReactNode;
    className?: string;
}

export function CenterLayout({children, className}: CenterLayoutProps){
    return(
        <section className="info-section my-20 px-8">
            <div className={`max-w-7xl mx-auto ${className} || ''`}>
                {children}
            </div>
        </section>
    )
}

