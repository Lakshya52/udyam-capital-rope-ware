import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { target: 15, suffix: '+', label: 'PSU banks' },
  { target: 50, suffix: '+', label: 'Lending Partners' },
  { target: 20, suffix: '', label: 'Working Days' },
]

function CountUp({ target, suffix }) {
  const numRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        numRef.current.textContent = `${target}${suffix}`
        return
      }
      const counter = { v: 0 }
      gsap.to(counter, {
        v: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: numRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          numRef.current.textContent = `${Math.round(counter.v)}${suffix}`
        },
      })
    }, numRef)
    return () => ctx.revert()
  }, [target, suffix])

  return <span ref={numRef}>0{suffix}</span>
}

export default function StatsBelt() {
  return (
    <section className="relative w-full overflow-hidden bg-[url('/NumberBg.png')] bg-cover bg-center bg-no-repeat my-[10dvh]">
      {/* backdrop graphics — depth wash + strong glows + rings */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C1F33]/70 via-transparent to-[#0C1F33]/70" />
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#5495D8]/50 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#155bd4]/50 blur-[100px]" />
        <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full border-[2px] border-white/15" />
        <div className="absolute -right-24 -top-24 h-[260px] w-[260px] rounded-full border-[2px] border-white/15" />
        <div className="absolute -left-40 -bottom-40 h-[420px] w-[420px] rounded-full border-[2px] border-white/15" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1166px] grid-cols-1 gap-8 px-5 py-12 text-center sm:grid-cols-3 md:px-8 md:py-14 xl:px-0">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-heading fs-heading text-(--color-white)">
              <CountUp target={stat.target} suffix={stat.suffix} />
            </p>
            <p className="font-inter-reg fs-body text-(--color-white)">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
