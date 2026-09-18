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

const COLS = 15
const ROWS = 8
const TYPES = ['diamond', 'donut', 'square']

// deterministic pseudo-random fill so the grid looks random but is stable across renders.
// Rule: side neighbours NEVER match; diagonal matches are minimized (zero is
// mathematically impossible with 3 shapes, so the best of many attempts wins).
function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildCells(attempts = 60) {
  let best = null
  let bestScore = Infinity
  for (let a = 0; a < attempts; a++) {
    const rand = mulberry32(20260918 + a * 1013904223)
    const grid = new Array(COLS * ROWS)
    let score = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const left = c > 0 ? grid[r * COLS + c - 1] : null
        const top = r > 0 ? grid[(r - 1) * COLS + c] : null
        const topLeft = r > 0 && c > 0 ? grid[(r - 1) * COLS + c - 1] : null
        const topRight = r > 0 && c < COLS - 1 ? grid[(r - 1) * COLS + c + 1] : null
        // side neighbours must differ — always satisfiable with 3 shapes
        const options = TYPES.filter((t) => t !== left && t !== top)
        // prefer the option that also avoids diagonal matches (random tiebreak)
        const order = [...options].sort(() => rand() - 0.5)
        let pick = order[0]
        let pickScore = Infinity
        for (const t of order) {
          const s = (t === topLeft ? 1 : 0) + (t === topRight ? 1 : 0)
          if (s < pickScore) {
            pickScore = s
            pick = t
          }
        }
        grid[r * COLS + c] = pick
        score += pickScore
      }
    }
    if (score < bestScore) {
      bestScore = score
      best = grid
    }
    if (bestScore === 0) break
  }
  return best
}

const CELLS = buildCells()

export default function FooterCTA() {
  const rootRef = useRef(null)
  useLineReveal(rootRef)

  return (
    <section ref={rootRef} className=" section mx-auto w-full max-w-[1166px] px-5 md:px-8 xl:px-0">
      <div className="relative">
        {/* backdrop graphics — halo + light streaks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(21,91,212,0.28),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[8%] top-[-40px] h-[130%] w-px rotate-[16deg] bg-gradient-to-b from-transparent via-[#155bd4]/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[10%] top-[-40px] h-[130%] w-px rotate-[16deg] bg-gradient-to-b from-transparent via-[#5495D8]/30 to-transparent"
        />
        {/* z-1 : 15 x 8 grid of random shapes */}
        <div
          aria-hidden="true"
          className="grid aspect-[15/8] grid-cols-[repeat(15,minmax(0,1fr))] grid-rows-[repeat(8,minmax(0,1fr))] z-[1] opacity-50"
        >
          {CELLS.map((type, i) => (
            <div key={i} className="min-h-0 min-w-0">
              <Shape type={type} />
            </div>
          ))}
        </div>

        {/* z-2 : content box centered, leaving exactly one grid box visible on every outer edge */}
        <div className="absolute inset-0 z-[2] p-[6.6667%]">
          <div className="flex h-full w-full items-center justify-center rounded-[16px] bg-(--color-primary) px-6 py-8 text-center">
            <div className="w-full max-w-[720px] flex flex-col gap-4">
              <h2 className=" text-white font-heading fs-heading">
                <span className="block overflow-hidden pb-1">
                  <span className="rv-line block">Ready To Start Your</span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span className="rv-line block">Growth Journey With Us ?</span>
                </span>
              </h2>
              <p className="rv-fade font-inter-reg fs-body text-white ">
                Take the first step towards structured growth with the right
                financial strategy and expert guidance.
              </p>
              <Link
                to="/contact"
                className="rv-fade mt-6 inline-block rounded-lg w-fit mx-auto bg-white px-7 py-2.5 text-[13.5px] font-inter-reg fs-body transition-colors hover:bg-blue-50"
              >
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
