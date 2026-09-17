function ArrowButton() {
  return (
    <>
      {/* White corner notch — NLB-style scoop */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-[55px] w-[55px] rounded-tl-[30px] bg-white">
        <div className="absolute bottom-0 left-[-40px] z-50 h-[40px] w-[40px] rounded-br-[16px] bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
        <div className="absolute right-0 top-[-40px] z-50 h-[40px] w-[40px] rounded-br-[16px] bg-transparent shadow-[10px_10px_0_0_#FFFFFF]" />
      </div>
      {/* Arrow overlapping the corner */}
      <span className="absolute bottom-[5px] right-[4px] z-20 grid h-10 w-10 place-items-center rounded-full bg-[#144fd7] text-white transition-transform duration-300 group-hover:rotate-45">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </span>
    </>
  )
}

function Card({ title, desc, variant = 'dark', image, className = '', tall = false }) {
  const styles = {
    dark: 'bg-[#0e1e33]',
    blue: 'bg-[#144fd7]',
    light: 'bg-[#d7e9ff]',
    mid: 'bg-[#9cc7ff]',
  }

  // Shown under the photo on hover (and as a graceful fallback until you add the photo files)
  const fallback = {
    dark: 'bg-gradient-to-br from-[#1b3255] via-[#0e1e33] to-[#050b16]',
    blue: 'bg-gradient-to-br from-[#3b78ff] via-[#144fd7] to-[#082a6e]',
    light: 'bg-gradient-to-br from-[#3f6ea6] via-[#1c3f6e] to-[#0e1e33]',
    mid: 'bg-gradient-to-br from-[#4f8fdd] via-[#1f4c8f] to-[#0e1e33]',
  }

  const titleColor = variant === 'dark' || variant === 'blue' ? 'text-white' : 'text-[#101828]'
  const descColor =
    variant === 'dark' || variant === 'blue' ? 'text-white/55' : 'text-[#101828]/55'

  return (
    <article
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px] ${styles[variant]} ${className}`}
    >
      {/* Hover image — fades in over the solid card color */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className={`absolute inset-0 ${fallback[variant]}`} />
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            className="absolute inset-0 h-full w-full scale-100 object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      </div>

      {/* Text — vertically centered by default; heading glides to the bottom on hover */}
      <div className="relative z-10 flex h-full flex-1 flex-col pb-[40px] pl-[14px] pr-16 pt-7">
        <div className="min-h-0 flex-1 transition-all duration-500" />
        <h3
          className={`font-jakarta text-[20px] font-bold leading-[1.25] tracking-tight transition-colors duration-500 ${titleColor} group-hover:text-white`}
        >
          {title}
        </h3>
        <div className="grid grid-rows-[1fr] transition-all duration-500 group-hover:grid-rows-[0fr]">
          <p
            className={`mt-2 min-h-0 overflow-hidden font-inter text-[14px] font-extralight leading-[1.55] transition-all duration-500 group-hover:mt-0 group-hover:opacity-0 ${descColor} ${tall ? 'lg:max-w-[90%]' : ''}`}
          >
            {desc}
          </p>
        </div>
        <div className="min-h-0 flex-1 transition-all duration-500 group-hover:grow-0" />
      </div>

      <ArrowButton />
    </article>
  )
}

const cards = [
  {
    title: 'Business Loans',
    desc: 'Funding structured around your business and growth plans.',
    variant: 'dark',
    span: 'lg:col-span-3',
    image: 'https://picsum.photos/seed/business-loans/800/600',
  },
  {
    title: 'Debt Restructuring',
    desc: 'Reshape your debt to improve flexibility and financial stability.',
    variant: 'blue',
    span: 'lg:col-span-3 lg:row-span-2',
    tall: true,
    image: 'https://picsum.photos/seed/debt-restructuring/800/600',
  },
  {
    title: 'Corporate Finance',
    desc: 'Advisory across debt, refinancing, and expansion.',
    variant: 'light',
    span: 'lg:col-span-3',
    image: 'https://picsum.photos/seed/corporate-finance/800/600',
  },
  {
    title: 'LAP',
    desc: 'Leverage eligible property for required business funding.',
    variant: 'mid',
    span: 'lg:col-span-3',
    image: 'https://picsum.photos/seed/lap-property/800/600',
  },
  {
    title: 'Working Capital',
    desc: 'Flexible funding for day-to-day operations and growth.',
    variant: 'light',
    span: 'lg:col-span-3',
    image: 'https://picsum.photos/seed/working-capital/800/600',
  },
  {
    title: 'Fund Raising',
    desc: 'Structure the right financing mix for your next stage of growth.',
    variant: 'dark',
    span: 'lg:col-span-6',
    image: 'https://picsum.photos/seed/fund-raising/800/600',
  },
  {
    title: 'Project Finance',
    desc: 'Finance for new projects, expansion, and capacity growth.',
    variant: 'mid',
    span: 'lg:col-span-4',
    image: 'https://picsum.photos/seed/project-finance/800/600',
  },
  {
    title: 'MSME Finance',
    desc: 'Funding solutions designed for the realities of growing businesses.',
    variant: 'dark',
    span: 'lg:col-span-4',
    image: 'https://picsum.photos/seed/msme-finance/800/600',
  },
  {
    title: 'Financial Advisory',
    desc: 'Financial guidance from capital planning to lender conversations.',
    variant: 'light',
    span: 'lg:col-span-4',
    image: 'https://picsum.photos/seed/financial-advisory/800/600',
  },
]

export default function ServicesGrid() {
  return (
    <section className="mx-auto mt-[72px] w-full max-w-[1166px] px-5 pb-12 md:px-8 xl:px-0">
      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[240px]">
        {cards.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            desc={card.desc}
            variant={card.variant}
            tall={card.tall}
            image={card.image}
            className={`${card.span} min-h-[210px] ${card.tall ? 'min-h-[420px]' : ''}`}
          />
        ))}
      </div>
    </section>
  )
}
