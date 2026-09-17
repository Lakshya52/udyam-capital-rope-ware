const stats = [
  { value: '15+', label: 'PSU banks' },
  { value: '50+', label: 'Lending Partners' },
  { value: '20', label: 'Working Days' },
]

export default function StatsBelt() {
  return (
    <section className="relative w-full overflow-hidden bg-[#123da0]">
      {/* Silky blue sheen to mimic the reference banner */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a75] via-[#1a52c4] to-[#0b2a75]" />
        <div className="absolute -left-24 top-[-60%] h-[220%] w-[45%] rotate-[18deg] bg-gradient-to-b from-white/15 via-white/5 to-transparent blur-2xl" />
        <div className="absolute left-[35%] top-[-60%] h-[220%] w-[30%] rotate-[18deg] bg-gradient-to-b from-transparent via-black/25 to-transparent blur-2xl" />
        <div className="absolute right-[-10%] top-[-60%] h-[220%] w-[40%] rotate-[18deg] bg-gradient-to-b from-white/10 via-transparent to-black/20 blur-2xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1166px] grid-cols-1 gap-8 px-5 py-12 text-center sm:grid-cols-3 md:px-8 md:py-14 xl:px-0">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-jakarta text-[38px] font-bold leading-none tracking-tight text-white md:text-[44px]">
              {stat.value}
            </p>
            <p className="mt-2 font-inter text-[15px] font-extralight text-white md:text-[17px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
