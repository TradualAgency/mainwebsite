export function CenterLayout({children, className}){
    return(
        <section className="info-section my-20 px-8">
            <div className={`max-w-7xl mx-auto ${className} || ''`}>
                {children}
            </div>
        </section>
    )
}

