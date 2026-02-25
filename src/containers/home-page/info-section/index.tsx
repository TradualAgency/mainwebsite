export default function InfoSection() {
    return (
        <section className="bg-white my-20 px-8">
            <div className="max-w-7xl mx-auto">
                <blockquote className="text-2xl md:text-4xl font-heading leading-tight">
                    "Luxury is not about features; it's about the feeling of effortless performance. We build the silent engines that power global desire"
                </blockquote>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <p className="text-base md:text-lg leading-relaxed text-body">
                        We've observed the limitations of monolithic
commerce. The friction. The slowdowns. For a
brand that values excellence, these aren't just
technical hurdles—they are barriers to the
brand's soul.                    </p>
                    <p className="text-base md:text-lg leading-relaxed text-body">
                        Our methodology revolves around 'Headless'—
a separation of concerns that allows your
brand's story to be told without compromise,
on any screen, at any speed.                    </p>
                </div>
            </div>
        </section>
    );
}
