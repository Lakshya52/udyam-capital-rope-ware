import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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

const aboutLinks = [
  { label: 'Overview', hash: 'overview' },
  { label: 'Vision / Mission', hash: 'vision-mission' },
  { label: 'What Sets Us Apart', hash: 'what-sets-us-apart' },
  { label: 'Why Us', hash: 'why-us' },
  { label: 'Meet The Team', hash: 'meet-the-team' },
]

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center">
      <img src="/Logo.png" alt="Udyam Capital" className="h-9 w-auto object-contain sm:h-11 lg:h-13.75 lg:w-30" />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(null) // 'services' | 'about' | null (desktop)
  const [footerVisible, setFooterVisible] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
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
    // hide the navbar only once the footer is substantially revealed —
    // threshold 0 fired ~500px too early (first spacer pixel, footer invisible)
    const io = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.intersectionRatio >= 0.4),
      { threshold: [0, 0.4, 1] }
    )
    io.observe(spacer)
    return () => io.disconnect()
  }, [])

  const pendingHash = useRef(null)

  // close menus on route change
  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
    setAboutOpen(false)
    setDropOpen(null)
  }, [location.pathname])

  // scroll to an About section through Lenis (it owns scrolling on this site)
  const scrollToHash = (hash) => {
    const el = document.getElementById(hash)
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = window.__lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(el, {
        offset: window.innerWidth >= 1024 ? -140 : -90,
        duration: reduced ? 0 : 1.2,
      })
    } else {
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }
  }

  // navigate to /about first (if needed), then scroll once it's rendered
  useEffect(() => {
    if (location.pathname === '/about' && pendingHash.current) {
      const hash = pendingHash.current
      pendingHash.current = null
      const t = setTimeout(() => scrollToHash(hash), 200)
      return () => clearTimeout(t)
    }
  }, [location.pathname])

  // go to an About section: scroll if already there, else navigate then scroll.
  // "overview" means the very top of the page.
  const goAbout = (hash) => {
    setOpen(false)
    setAboutOpen(false)
    setDropOpen(null)
    if (hash === 'overview') {
      if (location.pathname === '/about') {
        const lenis = window.__lenis
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(0, { immediate: false })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } else {
        navigate('/about')
      }
      return
    }
    if (location.pathname === '/about') {
      scrollToHash(hash)
    } else {
      pendingHash.current = hash
      navigate('/about')
    }
  }

  // lock body scroll + close on Escape while mobile menu is open
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <>
      {/* Full-screen backdrop — blurs ALL page content behind the open mobile menu.
          Sits above content (z-10) but below the header (z-50) so nav stays clickable.
          Clicking it closes the menu. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`mobile-nav-backdrop fixed inset-0 z-40 bg-[#0C1F33]/20 backdrop-blur-md lg:hidden ${
          open
            ? 'visible opacity-100 [transition:opacity_.5s_ease,visibility_0s]'
            : 'invisible pointer-events-none opacity-0 [transition:opacity_.5s_ease,visibility_0s_.5s]'
        }`}
      />
      <header className={`fixed top-0 inset-x-0 z-50 px-5 sm:px-8 lg:px-25 pt-4 sm:pt-6 lg:pt-10 pb-4 sm:pb-5 lg:pb-7.5 transition-all duration-500 ${footerVisible ? '-translate-y-full' : 'translate-y-0'} ${open ? 'bg-transparent [backdrop-filter:none]' : 'bg-(--blue-light)/5 backdrop-blur-md'}`}>
      <nav className="mx-auto flex w-full max-w-[1166px] items-center justify-between">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) =>
            link.label === 'Services' ? (
              <div
                key={link.label}
                className="group relative"
                onMouseEnter={() => setDropOpen('services')}
                onMouseLeave={() => setDropOpen(null)}
              >
                <Link
                  to={link.to}
                  style={{ fontWeight: "" }}
                  className={`${linkClass(link.to, isServicesActive)} flex items-center gap-1`}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${dropOpen === 'services' ? 'rotate-180' : ''}`}
                  />
                </Link>
                {/* centered dropdown — left-1/2 + -translate-x-1/2 keeps it dead-center under the link */}
                <div className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-all duration-300 ${dropOpen === 'services' ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'}`}>
                  <div className="grid w-[280px] grid-cols-1 gap-1 rounded-2xl bg-white p-3 shadow-[0_24px_60px_rgba(12,31,51,0.18)] ring-1 ring-black/5">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.label}
                        to={service.to}
                        onClick={() => setDropOpen(null)}
                        className="rounded-xl px-4 py-3 font-inter-reg text-[14px] text-[#101828] transition-colors hover:bg-[#EAF1FC] hover:text-[#0b4da2]"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : link.label === 'About Us' ? (
              <div
                key={link.label}
                className="group relative"
                onMouseEnter={() => setDropOpen('about')}
                onMouseLeave={() => setDropOpen(null)}
              >
                <Link
                  to={link.to}
                  style={{ fontWeight: "" }}
                  className={`${linkClass(link.to, isActive('/about'))} flex items-center gap-1`}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${dropOpen === 'about' ? 'rotate-180' : ''}`}
                  />
                </Link>
                {/* centered dropdown — left-1/2 + -translate-x-1/2 keeps it dead-center under the link */}
                <div className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 transition-all duration-300 ${dropOpen === 'about' ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'}`}>
                  <div className="grid w-[240px] grid-cols-1 gap-1 rounded-2xl bg-white p-3 shadow-[0_24px_60px_rgba(12,31,51,0.18)] ring-1 ring-black/5">
                    {aboutLinks.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => goAbout(item.hash)}
                        className="w-full cursor-pointer rounded-xl px-4 py-3 text-left font-inter-reg text-[14px] text-[#101828] transition-colors hover:bg-[#EAF1FC] hover:text-[#0b4da2]"
                      >
                        {item.label}
                      </button>
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
            ))}
            </div>

        {/* Mobile toggle — animated hamburger <-> X */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-neutral-900 transition-all duration-300 hover:bg-white/60 active:scale-95 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className="relative block h-[18px] w-[22px]" aria-hidden="true">
            <span
              className={`absolute left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-in-out ${open ? 'top-[8px] rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 top-[8px] h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-in-out ${open ? '-translate-x-2 opacity-0' : 'translate-x-0 opacity-100'}`}
            />
            <span
              className={`absolute left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ease-in-out ${open ? 'top-[8px] -rotate-45' : 'top-[16px]'}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu — always mounted so open AND close can animate */}
      <div
        className={`mx-auto w-full max-w-[1166px] lg:hidden grid transition-[grid-template-rows,opacity,margin,filter] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] drop-shadow-[0_24px_50px_rgba(12,31,51,0.18)] ${
          open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`max-h-[calc(100dvh-120px)] overflow-y-auto rounded-2xl bg-white p-3 border border-black/5 origin-top transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform ${
              open
                ? 'translate-y-0 scale-100 opacity-100'
                : 'pointer-events-none -translate-y-4 scale-[0.97] opacity-0'
            }`}
          >
            <div className="flex flex-col">
              {navLinks.map((link, i) =>
                link.label === 'Services' ? (
                  <div
                    key={link.label}
                    className={`border-b border-neutral-100 last:border-0 transition-all duration-500 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                    style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      tabIndex={open ? 0 : -1}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-heading text-[15px] transition-colors duration-300 ${isServicesActive ? 'text-[#0b4da2]' : 'text-neutral-900 hover:bg-neutral-50'}`}
                    >
                      Services
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${servicesOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${servicesOpen && open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="flex flex-col gap-1 px-2 pb-3 pt-1">
                          {serviceLinks.map((service, j) => (
                            <Link
                              key={service.label}
                              to={service.to}
                              onClick={() => setOpen(false)}
                              tabIndex={open && servicesOpen ? 0 : -1}
                              style={{ transitionDelay: servicesOpen && open ? `${60 + j * 35}ms` : '0ms' }}
                              className={`rounded-lg px-4 py-2.5 font-inter-reg text-[14px] transition-all duration-300 ease-out hover:bg-[#EAF1FC] hover:text-[#0b4da2] ${
                                servicesOpen && open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                              } ${isActive(service.to) ? 'bg-[#EAF1FC] text-[#0b4da2]' : 'text-neutral-700'}`}
                            >
                              {service.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : link.label === 'About Us' ? (
                  <div
                    key={link.label}
                    className={`border-b border-neutral-100 last:border-0 transition-all duration-500 ease-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
                    style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
                  >
                    <button
                      type="button"
                      onClick={() => setAboutOpen((v) => !v)}
                      aria-expanded={aboutOpen}
                      tabIndex={open ? 0 : -1}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-heading text-[15px] transition-colors duration-300 ${isActive('/about') ? 'text-[#0b4da2]' : 'text-neutral-900 hover:bg-neutral-50'}`}
                    >
                      About Us
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${aboutOpen ? 'rotate-180' : 'rotate-0'}`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${aboutOpen && open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="flex flex-col gap-1 px-2 pb-3 pt-1">
                          {aboutLinks.map((item, j) => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => goAbout(item.hash)}
                              tabIndex={open && aboutOpen ? 0 : -1}
                              style={{ transitionDelay: aboutOpen && open ? `${60 + j * 35}ms` : '0ms' }}
                              className={`cursor-pointer rounded-lg px-4 py-2.5 text-left font-inter-reg text-[14px] transition-all duration-300 ease-out hover:bg-[#EAF1FC] hover:text-[#0b4da2] ${
                                aboutOpen && open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                              } text-neutral-700`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
                    className={`rounded-xl border-b border-neutral-100 px-4 py-3 font-heading text-[15px] transition-all duration-500 ease-out last:border-0 hover:bg-neutral-50 ${
                      open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                    } ${isActive(link.to) ? 'text-[#0b4da2]' : 'text-neutral-900'}`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      </header>
    </>
  )
}
