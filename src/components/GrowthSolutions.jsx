import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLineReveal } from '../lib/reveal.js'

function IndiaMap() {
  return (
    <img
      src="/IndiaMap.svg"
      alt="India sector map"
      className="block h-auto max-h-[320px] w-auto max-w-[88%] object-contain object-right-bottom sm:max-h-[440px] sm:max-w-full lg:h-fit lg:max-h-full lg:max-w-none"
      loading="lazy"
      onLoad={() => ScrollTrigger.refresh()}
    />
  )
}

export default function GrowthSolutions() {
  const rootRef = useRef(null)
  useLineReveal(rootRef)

  return (
    <section ref={rootRef} className="section relative mx-auto w-full max-w-[1166px] px-5 md:px-8 xl:px-0 h-fit flex flex-col items-center justify-center ">
      {/* backdrop graphics */}
      {/* <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-[100%] bg-[#9cc7ff]/40 blur-[110px]" />
        <div
          className="absolute inset-x-0 top-0 h-[420px] opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(21,91,212,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(21,91,212,0.08) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div className="absolute left-[6%] top-[120px] h-[300px] w-px rotate-[18deg] bg-linear-to-b from-transparent via-[#155bd4]/25 to-transparent" />
      </div> */}
      <h2 className="relative z-10 mb-8 text-center font-heading text-[1.9rem] leading-[1.15] sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
        <span className="block overflow-hidden pb-1">
          <span className="rv-line block">End-to-End</span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span className="rv-line block text-(--color-primary)">Financial Growth Solutions</span>
        </span>
      </h2>

      {/* Mobile: stacked (wheel card → map card). Desktop: side-by-side */}
      <div className="relative z-10 flex w-full flex-col gap-[18px] lg:h-[90dvh] lg:flex-row">
        {/* Left info card */}
        <div className="relative flex min-h-[420px] w-full flex-col overflow-hidden rounded-[16px] bg-(--color-primary) p-6 sm:min-h-[480px] sm:p-8 lg:w-1/3 lg:min-h-[540px] lg:col-span-3">
          {/* card backdrop graphics */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-[80px]" />
            <div className="absolute -bottom-32 -right-32 h-[380px] w-[380px] rounded-full border-[2px] border-white/20" />
            <div className="absolute -bottom-20 -right-20 h-[240px] w-[240px] rounded-full border-[2px] border-white/20" />
          </div>
          <p className="relative font-inter-reg text-[1rem] leading-relaxed text-white/90 sm:text-[1.125rem] lg:text-[1.25rem]">
            Whether you're securing seed capital or expanding operations, we connect
            you with the right financial tools, partners, and strategies — at every
            stage of your journey.
          </p>
          <Link
            to="/services"
            className="font-inter-reg mt-4 flex items-center gap-2 text-[1rem] text-white/90 hover:underline sm:text-[1.125rem] lg:text-[1.25rem] group"
          > 
            View All Services <ArrowRight size={16} className="mt-1 group-hover:-rotate-45 transition-transform duration-300" />
          </Link>

              {/* <RupeeWheel /> */}
              <img src="/RupeesWheel.svg" alt="" className="absolute -bottom-[40px] -left-[40px] h-[220px] w-[220px] object-contain sm:-bottom-[50px] sm:-left-[50px] sm:h-[280px] sm:w-[280px] lg:-bottom-[60px] lg:-left-[60px] lg:h-[340px] lg:w-[340px]" />

        </div>

        {/* Right map card — custom roundness preserved */}
        <div className="relative min-h-[380px] w-full overflow-hidden rounded-[15px] rounded-bl-[60px] bg-[#9cc7ff] sm:min-h-[440px] sm:rounded-bl-[100px] lg:col-span-9 lg:w-2/3 lg:min-h-[560px] lg:rounded-bl-[205px]">
          {/* card backdrop graphics */}
          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-[80px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
          </div>
          {/* map — absolute so it always hugs the card's bottom-right */}
          <div className="absolute inset-0 flex items-end justify-end">
            <IndiaMap />
          </div>
        </div>
      </div>
    </section>
  )
}
