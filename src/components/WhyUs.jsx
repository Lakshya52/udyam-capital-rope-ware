import { useState, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLineReveal } from '../lib/reveal.js'

gsap.registerPlugin(ScrollTrigger)

const items = [
  {
    title: 'Commitment',
    body: 'Pursuing the highest quality standards in all our endeavours.',
  },
  {
    title: 'Reimagine the Possible',
    body: 'Seeking new and better ways to serve clients and open mind to the possibilities.',
  },
  {
    title: 'Collaborative Growth',
    body: 'Achieving shared success through teamwork and mutual support.',
  },
  {
    title: 'Respect',
    body: 'Valuing every individual with dignity and fairness.',
  },
  {
    title: 'Sustainable',
    body: 'Building a brighter tomorrow through integrity, purpose, and responsibility.',
  },
]

function AccordionItem({ item, open, onToggle }) {
  return (
    <div className="whyus-card overflow-hidden rounded-[10px] bg-(--color-primary)">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-heading fs-body text-[var(--color-white)]">
          {item.title}
        </span>
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center text-[22px] font-light leading-none text-[var(--color-white)] transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-6 pb-6 font-inter-reg fs-body-sm text-[var(--color-white)]">
            {item.body}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function WhyUs() {
  const [openIndex, setOpenIndex] = useState(null)
  const rootRef = useRef(null)
  useLineReveal(rootRef)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.whyus-card', {
        y: 48,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.whyus-list',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative mx-auto grid w-full max-w-[1166px] section h-[80dvh] items-start gap-10 px-5 pb-[72px] md:grid-cols-2 md:gap-14 md:px-8 xl:px-0">
      {/* backdrop graphics */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#5495D8]/40 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_70%_at_50%_30%,black,transparent)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(21,91,212,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(21,91,212,0.08) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        <div
          className="absolute right-[5%] top-8 h-32 w-56 [mask-image:radial-gradient(closest-side,black,transparent)]"
          style={{
            backgroundImage: 'radial-gradient(rgba(21,91,212,0.55) 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
          }}
        />
      </div>
      {/* Left copy */}
      <div className='relative z-10 flex flex-col' > 
        <h2 className="font-heading fs-heading text-[var(--color-black)]">
          <span className="block overflow-hidden pb-2">
            <span className="rv-line block">Where Business Ambition Meets the <span className='text-(--color-primary)' >Right Capital</span></span>
          </span>
        </h2>
        <p className="rv-fade font-inter-light fs-body mt-5">
          Helping businesses turn financial requirements into the right capital
          solutions for sustainable growth.
        </p>

        {/* shapes */}
        <div className="rv-fade w-fit pointer-events-none flex items-center justify-center mt-4" aria-hidden="true">
          <div className="h-14 w-14  bg-gray-200"></div>
          <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center">
            <div className="h-5 w-5 rounded-full bg-white"></div>
          </div>
          <div className="h-10 w-10 rotate-45 bg-gray-200 ml-2"></div>
        </div>
      </div>

      {/* Right accordion — one open at a time */}
      <div className="whyus-list relative z-10 space-y-2.5">
        {items.map((item, i) => (
          <AccordionItem
            key={item.title}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
