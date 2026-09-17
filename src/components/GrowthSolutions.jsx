import { Link } from 'react-router-dom'

function WheelIcon({ children }) {
  return (
    <div className="grid place-items-center">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </div>
  )
}

function RupeeWheel() {
  return (
    <div className="relative h-[190px] w-[190px] shrink-0">
      {/* segments */}
      <div className="absolute inset-0 rounded-full bg-[#123da3]" />
      {/* outer ring */}
      <div className="absolute inset-0 rounded-full border-[3px] border-[#9cc7ff]/80" />
      {/* dividers */}
      <div className="absolute left-[6%] right-[6%] top-1/2 h-[3px] -translate-y-1/2 bg-[#9cc7ff]/80" />
      <div className="absolute bottom-[6%] top-[6%] left-1/2 w-[3px] -translate-x-1/2 bg-[#9cc7ff]/80" />
      {/* quadrant icons */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 place-items-center p-5">
        <WheelIcon>
          <path d="M4 20h16" />
          <path d="M7 20v-6M12 20V8M17 20v-9" />
        </WheelIcon>
        <WheelIcon>
          <rect x="2.5" y="8" width="3.5" height="6" rx="1" />
          <rect x="18" y="8" width="3.5" height="6" rx="1" />
          <path d="M6 10.5 10.5 15l3-3 4.5 4.5-2 2" />
          <path d="M10.5 15 9 16.5M13.5 12 12 13.5" />
        </WheelIcon>
        <WheelIcon>
          <path d="M3 9.5 12 4l9 5.5" />
          <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
          <path d="M3.5 20.5h17" />
        </WheelIcon>
        <WheelIcon>
          <circle cx="8" cy="8" r="2.2" />
          <circle cx="16" cy="16" r="2.2" />
          <path d="M18.5 5.5 5.5 18.5" />
        </WheelIcon>
      </div>
      {/* center rupee */}
      <div className="absolute left-1/2 top-1/2 grid h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-[#cfe3fd] bg-[#144fd7]">
        <span className="text-[26px] font-bold leading-none text-white">₹</span>
      </div>
    </div>
  )
}

const pills = [
  { label: 'Trading sectors', className: 'left-[56%] top-[24%]' },
  { label: 'Agricultural sector', className: 'left-[64%] top-[33%]' },
  { label: 'Logistics, Trade & Export', className: 'left-[5%] top-[68%]' },
  { label: 'IT Hubs', className: 'left-[30%] top-[83%]' },
  { label: 'Infrastructure', className: 'left-[74%] top-[72%]' },
  { label: 'Manufacturing & Production', className: 'left-[55%] top-[87%]' },
]

function IndiaMap() {
  return (
    <svg viewBox="30 0 340 400" className="h-[94%] w-auto" role="img" aria-label="India sector map">
      {/* mainland */}
      <path
        d="M150 18 L172 10 L192 20 L186 42 L202 58 L198 82 L212 94 L228 108 L262 116 L268 128 L284 134 L279 150 L270 160 L282 172 L296 166 L316 157 L338 154 L356 162 L350 184 L330 196 L314 212 L304 230 L294 212 L286 196 L274 192 L268 204 L264 226 L256 244 L247 268 L238 298 L228 328 L214 358 L198 384 L182 394 L172 372 L163 342 L153 312 L143 287 L132 267 L112 250 L122 238 L88 228 L64 222 L58 208 L78 198 L88 176 L100 152 L118 132 L128 108 L138 82 L132 56 Z"
        fill="#144fd7"
        stroke="#144fd7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* highlighted states */}
      <g fill="#e4edfd" stroke="#9cc7ff" strokeWidth="1">
        <path d="M100 152 L140 140 L155 165 L145 205 L105 210 L88 176 Z" />
        <path d="M170 128 L250 122 L258 155 L240 175 L180 172 L165 150 Z" />
        <path d="M64 222 L100 215 L112 235 L95 258 L70 252 Z" />
        <path d="M150 300 L195 295 L205 330 L180 360 L158 340 Z" />
        <path d="M168 108 L185 105 L188 125 L170 128 Z" />
      </g>
      {/* faint internal boundaries */}
      <g fill="none" stroke="#eaf2fe" strokeWidth="1.2" opacity="0.8">
        <path d="M95 215 C140 210 200 210 262 208" />
        <path d="M140 287 C170 292 200 300 228 312" />
        <path d="M168 120 C166 150 164 185 162 220" />
        <path d="M150 160 C190 156 230 156 262 158" />
        <path d="M300 170 C310 185 315 200 312 215" />
      </g>
    </svg>
  )
}

export default function GrowthSolutions() {
  return (
    <section className="mx-auto w-full max-w-[1166px] px-5 pb-[72px] md:px-8 xl:px-0">
      <h2 className="mb-8 text-center font-jakarta text-[32px] font-bold leading-[1.2] tracking-tight text-[#101828] md:mb-10 md:text-[42px]">
        End-to-End
        <br />
        Financial Growth Solutions
      </h2>

      <div className="grid gap-[18px] lg:grid-cols-12">
        {/* Left info card */}
        <div className="relative flex min-h-[440px] flex-col overflow-hidden rounded-[16px] bg-[#144fd7] p-8 lg:col-span-3">
          <p className="font-inter text-[16px] font-extralight leading-relaxed text-white/90 md:text-[17px]">
            Whether you're securing seed capital or expanding operations, we connect
            you with the right financial tools, partners, and strategies — at every
            stage of your journey.
          </p>
          <Link
            to="/services"
            className="mt-5 inline-block text-[16px] font-extralight text-white underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            View All Services
          </Link>

          {/* wheel graphic cropped at bottom-left */}
          <div className="relative mt-auto min-h-[290px]">
            <div className="absolute -bottom-[130px] -left-[130px] h-[340px] w-[340px] rounded-full bg-[#cfe3fd]" />
            <div className="absolute bottom-[36px] left-[30px]">
              <RupeeWheel />
            </div>
          </div>
        </div>

        {/* Right map card */}
        <div className="relative min-h-[480px] overflow-hidden rounded-[16px] bg-[#9cc7ff] lg:col-span-9 lg:min-h-[560px]">
          {/* radar rings */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-[58%] top-[42%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/40" />
            <div className="absolute left-[58%] top-[42%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/40" />
            <div className="absolute left-[58%] top-[42%] h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/40" />
            <div className="absolute left-[58%] top-[42%] h-[590px] w-[590px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/40" />
          </div>

          {/* map */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <IndiaMap />
          </div>

          {/* sector pills */}
          {pills.map((pill) => (
            <span
              key={pill.label}
              className={`absolute ${pill.className} whitespace-nowrap rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-extralight text-[#144fd7] shadow-md md:text-[12px]`}
            >
              {pill.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
