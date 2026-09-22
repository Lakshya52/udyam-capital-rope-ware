import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, ArrowUpRight, ArrowRight, Phone } from 'lucide-react'
import { services, getSubServices } from '../data/services.js'

const navLinks = [
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Articles', to: '/articles' },
  { label: 'Services' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = services.map((s) => ({
  label: s.title,
  to: `/services/${s.id}`,
  desc: s.desc,
  children: getSubServices(s.id).map((c) => ({
    label: c.title,
    to: `/services/${c.id}`,
  })),
}))

const aboutLinks = [
  { label: 'Overview', hash: 'overview', desc: 'Who we are at a glance' },
  { label: 'Vision / Mission', hash: 'vision-mission', desc: 'What drives us' },
  { label: 'What Sets Us Apart', hash: 'what-sets-us-apart', desc: 'Why founders pick us' },
  { label: 'Why Us', hash: 'why-us', desc: 'Proof, not promises' },
  { label: 'Meet The Team', hash: 'meet-the-team', desc: 'The people behind it' },
]

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex shrink-0 items-center outline-none">
      <img
        src="/Logo.png"
        alt="Udyam Capital"
        className="h-11 w-auto object-contain "
      />
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null) // 'services' | 'about' | null
  const [mobileMain, setMobileMain] = useState(null) // expanded main-service id (mobile)
  const [dropOpen, setDropOpen] = useState(null) // 'services' | 'about' | null (desktop)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const closeTimer = useRef(null)

  const isActive = (to) => location.pathname === to
  const isServicesActive = location.pathname.startsWith('/services/')
  const isAboutActive = location.pathname === '/about'

  const pendingHash = useRef(null)

  // floating on scroll (works with Lenis — native scrollY still updates)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close menus on route change
  useEffect(() => {
    setOpen(false)
    setMobileSection(null)
    setMobileMain(null)
    setDropOpen(null)
  }, [location.pathname])

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

  useEffect(() => {
    if (location.pathname === '/about' && pendingHash.current) {
      const hash = pendingHash.current
      pendingHash.current = null
      const t = setTimeout(() => scrollToHash(hash), 200)
      return () => clearTimeout(t)
    }
  }, [location.pathname])

  const goAbout = (hash) => {
    setOpen(false)
    setMobileSection(null)
    setMobileMain(null)
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

  // lock body scroll + close on Escape while mobile takeover is open
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

  const openDrop = (name) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDropOpen(name)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setDropOpen(null), 120)
  }

  const pillLink = (active) =>
    `relative rounded-full px-4 py-2 text-[14px] font-heading transition-all duration-300 ${
      active
        ? 'bg-white text-[#0b4da2] ring-1 ring-black/5'
        : 'text-neutral-600 hover:bg-white/70 hover:text-neutral-950'
    }`

  return (
    <>
      {/* ── Desktop + mobile top floating bar ── */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-8 sm:pt-4">
        <nav
          className={`pointer-events-auto relative mx-auto w-full max-w-[1166px] overflow-visible rounded-full transition-all duration-500 ${
            scrolled || open || dropOpen
              ? 'bg-white/75 backdrop-blur-2xl ring-1 ring-white/60'
              : 'bg-white/65 ring-1 ring-white/60 backdrop-blur-2xl'
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-5 py-3 sm:px-7">
            <Logo onClick={() => { setOpen(false); setDropOpen(null) }} />

            {/* Center pill — desktop */}
            <div className="hidden items-center gap-1 rounded-full bg-[var(--color-primary)]/[0.05] p-1 pl-3 ring-1 ring-black/5 lg:flex">
              <Link to="/case-studies" className={pillLink(isActive('/case-studies'))}>
                Case Studies
              </Link>
              <Link to="/articles" className={pillLink(isActive('/articles'))}>
                Articles
              </Link>
              <div
                className="relative"
                onMouseEnter={() => openDrop('services')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => setDropOpen(dropOpen === 'services' ? null : 'services')}
                  aria-expanded={dropOpen === 'services'}
                  className={`${pillLink(isServicesActive || dropOpen === 'services')} flex cursor-pointer items-center gap-1.5`}
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform duration-300 ${dropOpen === 'services' ? 'rotate-180' : ''}`} />
                </button>
                {/* centered under the Services trigger, same style as About Us */}
                <div className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-300 ${
                  dropOpen === 'services' ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                }`}>
                  <div data-lenis-prevent className="max-h-[70vh] w-[330px] overflow-y-auto rounded-[20px] bg-white p-2 shadow-[0_32px_80px_rgba(12,31,51,0.22)] ring-1 ring-black/5">
                    {serviceLinks.map((s) => (
                      <div key={s.label}>
                        <Link
                          to={s.to}
                          onClick={() => setDropOpen(null)}
                          className="group block rounded-2xl px-4 py-2.5 transition-colors hover:bg-[#EAF1FC]"
                        >
                          <span className="block font-heading text-[14px] text-neutral-900 group-hover:text-[#0b4da2]">{s.label}</span>
                          {/* <span className="mt-0.5 block font-inter-reg text-[12px] leading-snug text-neutral-500">{s.desc}</span> */}
                        </Link>
                        {s.children.map((c) => (
                          <Link
                            key={c.label}
                            to={c.to}
                            onClick={() => setDropOpen(null)}
                            className={`flex items-center gap-2.5 rounded-xl py-2 pl-7 pr-4 font-inter-reg text-[13px] transition-colors hover:bg-[#EAF1FC] hover:text-[#0b4da2] ${
                              isActive(c.to) ? 'text-[#0b4da2]' : 'text-neutral-500'
                            }`}
                          >
                            <span className="h-1 w-1 shrink-0 rounded-full bg-current opacity-40" />
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="relative"
                onMouseEnter={() => openDrop('about')}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => setDropOpen(dropOpen === 'about' ? null : 'about')}
                  aria-expanded={dropOpen === 'about'}
                  className={`${pillLink(isAboutActive || dropOpen === 'about')} flex cursor-pointer items-center gap-1.5`}
                >
                  About Us
                  <ChevronDown size={14} className={`transition-transform duration-300 ${dropOpen === 'about' ? 'rotate-180' : ''}`} />
                </button>
                {/* centered under the About Us trigger */}
                <div className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 transition-all duration-300 ${
                  dropOpen === 'about' ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                }`}>
                  <div className="w-[300px] rounded-[20px] bg-white p-2 shadow-[0_32px_80px_rgba(12,31,51,0.22)] ring-1 ring-black/5">
                    {aboutLinks.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => goAbout(item.hash)}
                        className="group block w-full cursor-pointer rounded-2xl px-4 py-3 text-left transition-colors hover:bg-[#EAF1FC]"
                      >
                        <span className="block font-heading text-[14px] text-neutral-900 group-hover:text-[#0b4da2]">{item.label}</span>
                        <span className="mt-0.5 block font-inter-reg text-[12px] text-neutral-500">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+918287598661"
                className="hidden h-10 mr-2 w-10 place-items-center rounded-full ring-1 ring-black/10 text-neutral-800 transition-all hover:ring-(--color-primary) hover:text-(--color-primary) md:grid"
                aria-label="Call us"
              >
                <Phone size={16} />
              </a>
              <Link
                to="/contact"
                className="group hidden items-center gap-2 rounded-full bg-(--color-primary) py-2.5 pl-5 pr-2.5 font-heading text-[14px] text-white shadow-[0_16px_40px_rgba(8,83,160,0.35)] transition-all duration-300 hover:bg-[#0b4da2] hover:shadow-[0_16px_40px_rgba(8,83,160,0.5)] active:scale-[0.98] sm:inline-flex"
              >
                Contact Us
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowRight size={15} />
                </span>
              </Link>
              {/* Hamburger */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-300 active:scale-95 lg:hidden ${
                  open ? 'bg-(--color-primary) text-white' : 'bg-black/5 text-neutral-900 hover:bg-black/10'
                }`}
              >
                <span className="relative block h-[16px] w-[20px]" aria-hidden="true">
                  <span className={`absolute left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ${open ? 'top-[7px] rotate-45' : 'top-0'}`} />
                  <span className={`absolute left-0 top-[7px] h-[2px] w-full rounded-full bg-current transition-all duration-300 ${open ? '-translate-x-2 opacity-0' : 'translate-x-0 opacity-100'}`} />
                  <span className={`absolute left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300 ${open ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} />
                </span>
              </button>
            </div>
          </div>

        </nav>
      </header>

      {/* ── Mobile / tablet full takeover ── */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 lg:hidden transition-[visibility] duration-500 ${open ? 'visible' : 'invisible'}`}
      >
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[#0C1F33]/25 backdrop-blur-md transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`absolute inset-0 h-dvh w-dvw flex flex-col overflow-hidden bg-white/75 text-neutral-900 ring-1 ring-white/60 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? 'translate-y-0 scale-100 opacity-100' : '-translate-y-6 scale-[0.98] opacity-0'
          }`}
        >
          <div data-lenis-prevent className="relative flex-1 overflow-y-auto px-5 pb-5 pt-24 sm:px-7">
            <div className="mt-4 flex flex-col gap-1.5">
              {navLinks.map((link, i) => {
                const delay = open ? `${120 + i * 70}ms` : '0ms'
                const anim = open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                if (link.label === 'Services') {
                  const expanded = mobileSection === 'services'
                  return (
                    <div key="services" style={{ transitionDelay: delay }} className={`transition-all duration-500 ${anim}`}>
                      <button
                        type="button"
                        onClick={() => setMobileSection(expanded ? null : 'services')}
                        aria-expanded={expanded}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-heading text-[22px] transition-colors ${expanded || isServicesActive ? 'bg-[#0C1F33] text-white' : 'bg-black/[0.04] text-neutral-800'}`}
                      >
                        Services
                        <span className={`grid h-9 w-9 place-items-center rounded-full transition-all duration-300 ${expanded ? 'bg-white text-[#0C1F33]' : 'bg-black/5 text-neutral-500'}`}>
                          <ChevronDown size={17} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                        </span>
                      </button>
                      <div className={`grid transition-all duration-500 ${expanded ? 'mt-1.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="min-h-0 overflow-hidden">
                          <div className="grid grid-cols-1 gap-1 rounded-2xl bg-black/[0.03] p-2">
                            {serviceLinks.map((s) => {
                              const mainOpen = mobileMain === s.to
                              return (
                                <div key={s.label} className="rounded-xl bg-white/70 ring-1 ring-black/5">
                                  <div className="flex items-center gap-1 p-1">
                                    <Link
                                      to={s.to}
                                      onClick={() => setOpen(false)}
                                      className={`flex-1 rounded-lg px-3 py-2.5 font-heading text-[15px] transition-colors ${isActive(s.to) ? 'bg-(--color-primary) text-white' : 'text-neutral-700 hover:bg-black/5 hover:text-neutral-950'}`}
                                    >
                                      {s.label}
                                    </Link>
                                    {s.children.length > 0 && (
                                      <button
                                        type="button"
                                        onClick={() => setMobileMain(mainOpen ? null : s.to)}
                                        aria-expanded={mainOpen}
                                        aria-label={`Show ${s.label} sub-services`}
                                        className={`grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-lg transition-colors ${mainOpen ? 'bg-(--color-primary) text-white' : 'bg-black/5 text-neutral-500 hover:text-neutral-900'}`}
                                      >
                                        <ChevronDown size={15} className={`transition-transform duration-300 ${mainOpen ? 'rotate-180' : ''}`} />
                                      </button>
                                    )}
                                  </div>
                                  {s.children.length > 0 && (
                                    <div className={`grid transition-all duration-300 ${mainOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                      <div className="min-h-0 overflow-hidden">
                                        <div className="flex flex-col gap-0.5 px-1 pb-1.5">
                                          {s.children.map((c) => (
                                            <Link
                                              key={c.label}
                                              to={c.to}
                                              onClick={() => setOpen(false)}
                                              className={`rounded-lg px-3 py-2 pl-6 font-inter-reg text-[13.5px] transition-colors ${isActive(c.to) ? 'bg-[#EAF1FC] text-[#0b4da2]' : 'text-neutral-500 hover:bg-black/5 hover:text-neutral-900'}`}
                                            >
                                              {c.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                if (link.label === 'About Us') {
                  const expanded = mobileSection === 'about'
                  return (
                    <div key="about" style={{ transitionDelay: delay }} className={`transition-all duration-500 ${anim}`}>
                      <button
                        type="button"
                        onClick={() => setMobileSection(expanded ? null : 'about')}
                        aria-expanded={expanded}
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left font-heading text-[22px] transition-colors ${expanded || isAboutActive ? 'bg-[#0C1F33] text-white' : 'bg-black/[0.04] text-neutral-800'}`}
                      >
                        About Us
                        <span className={`grid h-9 w-9 place-items-center rounded-full transition-all duration-300 ${expanded ? 'bg-white text-[#0C1F33]' : 'bg-black/5 text-neutral-500'}`}>
                          <ChevronDown size={17} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                        </span>
                      </button>
                      <div className={`grid transition-all duration-500 ${expanded ? 'mt-1.5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="min-h-0 overflow-hidden">
                          <div className="flex flex-col gap-1 rounded-2xl bg-black/[0.03] p-2">
                            {aboutLinks.map((item) => (
                              <button
                                key={item.label}
                                type="button"
                                onClick={() => goAbout(item.hash)}
                                className="cursor-pointer rounded-xl px-4 py-3 text-left font-heading text-[15px] text-neutral-600 transition-colors hover:bg-black/5 hover:text-neutral-950"
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    style={{ transitionDelay: delay }}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-heading text-[22px] transition-all duration-500 ${anim} ${
                      isActive(link.to) ? 'bg-[#0C1F33] text-white' : 'bg-black/[0.04] text-neutral-800 hover:bg-black/[0.07]'
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight size={18} className="text-neutral-300" />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="relative border-t border-black/5 p-5 sm:p-6">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="group flex items-center justify-center gap-2 rounded-2xl bg-(--color-primary) px-5 py-4 font-heading text-[16px] text-white transition-all hover:bg-[#0b4da2] active:scale-[0.99]"
            >
              Contact Us
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
