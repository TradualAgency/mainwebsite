export function Heading1({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <h1 className={`text-4xl font-geologica uppercase md:text-5xl lg:text-7xl ${className}`}>
            {children}
        </h1>
    )
}

export function Heading2({children, className}: {children: React.ReactNode, className?: string}) {
    return (
        <h2 className={`text-4xl md:text-5xl lg:text-7xl z-20 text-center font-geologica ${className}`}>
            {children}
        </h2>
    )
}

