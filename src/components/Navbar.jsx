import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Articles', to: '/articles' },
  { label: 'Services', },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Business Loans', to: '/services/business-loans' },
  { label: 'Debt Restructuring', to: '/services/debt-restructuring' },
  { label: 'Corporate Finance', to: '/services/corporate-finance' },
  { label: 'LAP', to: '/services/lap' },
  { label: 'Working Capital', to: '/services/working-capital' },
  { label: 'Fund Raising', to: '/services/fund-raising' },
  { label: 'Project Finance', to: '/services/project-finance' },
  { label: 'MSME Finance', to: '/services/msme-finance' },
  { label: 'Financial Advisory', to: '/services/financial-advisory' },
]

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center">
      <img src="/Logo.png" alt="Udyam Capital" className="h-13.75 w-30 object-contain" />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const location = useLocation()
  const isActive = (to) => location.pathname === to
  const isServicesActive =
    isActive('/services') || location.pathname.startsWith('/services/')
  const linkClass = (to, forceActive = false) =>
    `font-heading fs-body-sm transition-colors ${
      isActive(to) || forceActive
        ? 'text-[#0b4da2] underline underline-offset-8 decoration-2'
        : 'text-neutral-800 hover:text-[#0b4da2]'
    }`

  // slide the navbar away while the footer reveal is on screen
  useEffect(() => {
    const spacer = document.getElementById('footer-reveal-spacer')
    if (!spacer) return
    const io = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
      threshold: 0,
    })
    io.observe(spacer)
    return () => io.disconnect()
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 px-25 pt-10 pb-7.5 h-30 bg-(--blue-light)/5 backdrop-blur-md transition-transform duration-500 ${footerVisible ? '-translate-y-full' : 'translate-y-0'}`}>
      <nav className="mx-auto flex w-full max-w-[1166px] items-center justify-between px-5 md:px-8 xl:px-0">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            link.label === 'Services' ? (
              <div key={link.label} className="group relative">
                <Link
                  to={link.to}
                  style={{ fontWeight: "" }}
                  className={`${linkClass(link.to, isServicesActive)} flex items-center gap-1`}
                >
                  {link.label}
                  <ChevronDown
                    size={15}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                </Link>
                {/* centered dropdown — left-1/2 + -translate-x-1/2 keeps it dead-center under the link */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="grid w-[280px] grid-cols-1 gap-1 rounded-2xl bg-white p-3 shadow-[0_24px_60px_rgba(12,31,51,0.18)] ring-1 ring-black/5">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.label}
                        to={service.to}
                        className="rounded-xl px-4 py-3 font-inter-reg text-[14px] text-[#101828] transition-colors hover:bg-[#EAF1FC] hover:text-[#0b4da2]"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.to}
                style={{ fontWeight: "" }}
                className={linkClass(link.to)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        {/* <button
          className="grid h-10 w-10 place-items-center lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button> */}
      </nav>

      {/* Mobile menu */}
      {/* {open && (
        <div className="mx-auto w-full max-w-291.5 border-t border-neutral-100 bg-white px-5 pb-6 pt-2 md:px-8 lg:hidden xl:px-0">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-[15px] text-neutral-800"
                style={{ fontWeight: "normal" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )} */}
    </header>
  )
}
