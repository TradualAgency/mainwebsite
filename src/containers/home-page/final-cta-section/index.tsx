export default function FinalCTA() {
  return (
    <section className="bg-primary mt-20 py-20 px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-heading !text-white text-[42px] leading-[1.05] md:text-[72px] mb-6">
          Your Next Chapter
          <br />
          Begins Here
        </h2>

        <p className="max-w-3xl mx-auto text-white/90 text-base md:text-lg leading-relaxed mb-10">
          Are you ready to transcend the ordinary? Let&apos;s discuss a bespoke digital roadmap for your
          brand.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="bg-accent text-primary px-8 py-3 font-medium hover:opacity-90 transition"
          >
            Book a Consultation
          </button>

          <button
            type="button"
            className="bg-transparent border border-accent text-accent px-8 py-3 font-medium hover:bg-accent/10 transition"
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
}
