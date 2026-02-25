import Image from "next/image";

export default function UspSection() {
  return (
    <section className="bg-[#f9f9f9] py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="">
          <p className="font-heading text-[10px] tracking-[0.18em] uppercase text-accent mb-4">
            Chapter One
          </p>

          <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-8">
            Architecture
            <br />
            Without Limits
          </h2>

          <p className="max-w-xl text-body text-base md:text-lg leading-relaxed mb-8">
            By decoupling the storefront from the backend, we grant your brand total creative sovereignty.
            Lightning-fast response times meet limitless design possibilities.
          </p>
          <div className="border-l-2 border-accent pl-4">
            <span>0.8s</span> 
            <p>Average interaction latency</p>
          </div>
        </div>

        <div>
          <Image
            src="/images/arch-without-limits.png"
            alt="Architecture visual"
            width={900}
            height={700}
            className="w-full h-[400px] md:h-[700px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
