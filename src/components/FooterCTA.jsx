import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { useLineReveal } from '../lib/reveal.js'

// shapes
function Diamond() {
  return (
    <svg viewBox="0 0 100 100" className="h-auto w-full" aria-hidden="true">
      <polygon points="50,0 100,50 50,100 0,50" fill="#e5e7eb" />
    </svg>
  )
}

function Donut() {
  return (
    <div className="aspect-square w-full rounded-full bg-gray-200 flex items-center justify-center">
      <div className="h-[36%] w-[36%] rounded-full bg-white"></div>
    </div>
  )
}

function Square() {
  return <div className="aspect-square w-full  bg-gray-200"></div>
}

function Shape({ type }) {
  if (type === 'diamond') return <Diamond />
  if (type === 'donut') return <Donut />
  return <Square />
}

// Continuous shape border — full-bleed mosaic strips (no gaps), sized by grid.
const BORDER = ['diamond', 'donut', 'square']

function BorderStrip({ className = "" }) {
  const cell = "min-h-0 min-w-0 aspect-square opacity-40"
  return (
    <div aria-hidden="true" className={className}>
      {/* mobile: 8 across */}
      <div className="grid grid-cols-8 gap-0 lg:hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={cell}>
            <Shape type={BORDER[i % BORDER.length]} />
          </div>
        ))}
      </div>
      {/* desktop: 16 across */}
      <div className="hidden grid-cols-16 gap-0 lg:grid">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={cell}>
            <Shape type={BORDER[i % BORDER.length]} />
          </div>
        ))}
      </div>
    </div>
  )
}

function BorderRail({ length = 12, className = "" }) {
  return (
    <div aria-hidden="true" className={`hidden w-16 shrink-0 items-center overflow-hidden lg:flex ${className}`}>
      <div className="grid w-full grid-cols-1 gap-0">
        {Array.from({ length }).map((_, i) => (
          <div key={i} className="aspect-square w-full opacity-40">
            <Shape type={BORDER[(i + 1) % BORDER.length]} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FooterCTA() {
  const rootRef = useRef(null)
  useLineReveal(rootRef)

  return (
    <section ref={rootRef} className=" section mx-auto w-full max-w-[1166px] px-5 md:px-8 xl:px-0">
      <div className="relative">
        {/* shape border — top strip */}
        <BorderStrip  />
        <div className="flex items-stretch">
          {/* left rail (desktop) */}
          <BorderRail length={6}/>
          {/* content card */}
          <div className="relative flex w-full h-full items-center justify-center overflow-hidden rounded-[16px] bg-white px-4 py-6 text-center my-auto sm:px-6 sm:py-8">
              {/* soft sheen for depth */}
              {/* <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 -top-32 h-72 w-72 rounded-full bg-white/15 blur-[80px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 rounded-full bg-[#5495D8]/30 blur-[80px]"
              /> */}
              <div className="relative z-10 w-full max-w-[720px] flex flex-col gap-3 sm:gap-4">
              <h2 className=" font-heading text-[2rem] leading-[1.12] sm:text-[2.6rem] lg:text-[3.5rem] lg:leading-[114%]">
                <span className="block overflow-hidden pb-1">
                  <span className="rv-line block">Ready To Start Your</span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span className="rv-line block text-(--color-primary)">Growth Journey With Us ?</span>
                </span>
              </h2>
              <p className="rv-fade font-inter-reg text-[1rem] leading-relaxed text-(--color-dark-blue) sm:text-[1.125rem] lg:text-[1.25rem]">
                Take the first step towards structured growth with the right
                financial strategy and expert guidance.
              </p>
              <Link
                to="/contact"
                className="rv-fade mt-4 sm:mt-6 inline-block rounded-lg w-fit text-white mx-auto bg-(--color-primary) px-7 py-2.5 fs-body-sm font-inter-reg transition-colors hover:bg-[#0b4da2]"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
          {/* right rail (desktop) */}
          <BorderRail length={6}/>
        </div>
        {/* shape border — bottom strip */}
        <BorderStrip  />
      </div>
    </section>
  )
}
