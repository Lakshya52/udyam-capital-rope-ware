import { Link } from 'react-router-dom'

const SHAPE = 'h-9 w-9 shrink-0 md:h-[52px] md:w-[52px]'
const SHAPE_BG = 'bg-[#cbd8f2]'

function Diamond() {
  return <div className={`${SHAPE} ${SHAPE_BG} rotate-45 rounded-[4px]`} />
}

function Donut() {
  return (
    <div className={`${SHAPE} ${SHAPE_BG} grid place-items-center rounded-full`}>
      <div className="h-[38%] w-[38%] rounded-full bg-white" />
    </div>
  )
}

function Square() {
  return <div className={`${SHAPE} ${SHAPE_BG} rounded-[8px]`} />
}

function Shape({ type }) {
  if (type === 'diamond') return <Diamond />
  if (type === 'donut') return <Donut />
  return <Square />
}

const CYCLE = ['diamond', 'donut', 'square']

function ShapeRow({ count = 12, offset = 0, visibleMobile = 6 }) {
  return (
    <div className="flex items-center justify-between">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={i >= visibleMobile ? 'hidden md:block' : ''}>
          <Shape type={CYCLE[(offset + i) % CYCLE.length]} />
        </div>
      ))}
    </div>
  )
}

function ShapeCol({ pattern }) {
  return (
    <div className="hidden flex-col justify-between self-stretch py-1 md:flex">
      {pattern.map((type, i) => (
        <Shape key={i} type={type} />
      ))}
    </div>
  )
}

export default function FooterCTA() {
  return (
    <section className="mx-auto w-full max-w-[1166px] px-5 pb-[72px] pt-[32px] md:px-8 xl:px-0">
      <ShapeRow offset={0} />

      <div className="mt-4 flex items-stretch gap-4 md:mt-6 md:gap-6">
        <ShapeCol pattern={['square', 'donut', 'diamond', 'square']} />

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[860px] rounded-[16px] bg-[#144fd7] px-6 py-12 text-center md:py-14">
            <h2 className="font-jakarta text-[26px] font-bold leading-[1.25] tracking-tight text-white md:text-[32px]">
              Ready To Start Your
              <br />
              Growth Journey With Us ?
            </h2>
            <p className="mx-auto mt-3 max-w-[430px] font-inter text-[12.5px] font-extralight leading-relaxed text-white/85 md:text-[13px]">
              Take the first step towards structured growth with the right
              financial strategy and expert guidance.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-block rounded-[8px] bg-white px-7 py-2.5 text-[13.5px] font-extralight text-[#144fd7] transition-colors hover:bg-blue-50"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>

        <ShapeCol pattern={['diamond', 'square', 'donut', 'diamond']} />
      </div>

      <div className="mt-4 md:mt-6">
        <ShapeRow offset={1} />
      </div>
    </section>
  )
}
