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
      className="h-fit w-auto object-contain"
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
        <div className="absolute left-[6%] top-[120px] h-[300px] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-[#155bd4]/25 to-transparent" />
      </div> */}
      <h2 className="relative z-10 mb-8 text-center font-heading fs-heading">
        <span className="block overflow-hidden pb-1">
          <span className="rv-line block">End-to-End</span>
        </span>
        <span className="block overflow-hidden pb-2">
          <span className="rv-line block text-(--color-primary)">Financial Growth Solutions</span>
        </span>
      </h2>

      <div className="relative z-10 flex gap-[18px] w-full h-[90dvh]">
        {/* Left info card */}
        <div className="relative w-1/3 flex min-h-[540px] flex-col overflow-hidden rounded-[16px] bg-(--color-primary) p-8 lg:col-span-3">
          {/* card backdrop graphics */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-[80px]" />
            <div className="absolute -bottom-32 -right-32 h-[380px] w-[380px] rounded-full border-[2px] border-white/20" />
            <div className="absolute -bottom-20 -right-20 h-[240px] w-[240px] rounded-full border-[2px] border-white/20" />
          </div>
          <p className="relative font-inter-reg fs-body text-white/90">
            Whether you're securing seed capital or expanding operations, we connect
            you with the right financial tools, partners, and strategies — at every
            stage of your journey.
          </p>
          <Link
            to="/services"
            className="font-inter-reg fs-body text-white/90 hover:underline mt-4 flex gap-2 items-center group"
          > 
            View All Services <ArrowRight size={20} className="mt-1 group-hover:-rotate-45 transition-transform duration-300" />
          </Link>

              {/* <RupeeWheel /> */}
              <img src="/RupeesWheel.svg" alt="" className="absolute -bottom-[60px] -left-[60px] h-[340px] w-[340px] object-contain" />

        </div>

        {/* Right map card */}
        <div className="relative w-2/3 min-h-[480px] overflow-hidden rounded-bl-[205px] rounded-[15px] bg-[#9cc7ff] lg:col-span-9 lg:min-h-[560px]">
          {/* card backdrop graphics */}
          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/40 blur-[80px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          {/* map */}
          <div className=" flex items-end justify-end h-full">
            <IndiaMap />
          </div>
        </div>
      </div>
    </section>
  )
}
