export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Text block — capped at 1166px, centered */}
      <div className="relative z-10 mx-auto w-full max-w-[1166px] px-5 pt-[130px] md:px-8 md:pt-[150px] xl:px-0">
        {/* faint decorative shapes on the right, like the reference */}
        <div className="pointer-events-none absolute -top-4 right-0 hidden select-none md:block" aria-hidden="true">
          <svg width="260" height="140" viewBox="0 0 260 140" fill="none">
            <rect x="30" y="30" width="70" height="70" transform="rotate(45 65 65)" fill="#0b4da2" fillOpacity="0.1" />
            <circle cx="165" cy="65" r="42" fill="#0b4da2" fillOpacity="0.1" />
            <circle cx="165" cy="65" r="14" fill="white" />
            <rect x="220" y="25" width="70" height="80" fill="#0b4da2" fillOpacity="0.1" />
          </svg>
        </div>

        <h1 className="max-w-[900px] font-jakarta text-[32px] font-bold leading-[1.15] tracking-tight text-[#101828] md:text-[48px] lg:text-[54px]">
          Strategic Partner in your
          <span className="block text-[#155bd4]">Successful Business Journey</span>
        </h1>

        <p className="mt-4 max-w-[760px] font-inter text-[15px] font-extralight leading-relaxed text-neutral-500 md:text-[19px]">
          We are focused on solving Business Challenges with our Expertise,
          Groundbreaking Solutions and a Collaborative Mindset
        </p>
      </div>

      {/* Video — full-bleed, NOT capped at 1166px */}
      <div className="relative mt-8 h-[32vh] w-full overflow-hidden md:h-[44vh] lg:h-[48vh]">
        <video
          src="/UCHeroFinal.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
        />
      </div>
    </section>
  )
}
