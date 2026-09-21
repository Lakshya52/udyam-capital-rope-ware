import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import Articles from './pages/Articles.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfUse from './pages/TermsOfUse.jsx'
import Error from './pages/Error.jsx'
import Loader from './components/Loader.jsx'
import { markSiteReady } from './lib/siteReady.js'

// reset scroll through Lenis on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = (window as any).__lenis
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])
  return null
}

const App = () => {
  const [showLoader, setShowLoader] = useState(true)
  const footerRef = useRef<HTMLDivElement>(null)
  const [footerH, setFooterH] = useState(0)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const update = () => setFooterH(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-white font-sans antialiased">
      <ScrollToTop />
      <Navbar />
      {/* content layer — opaque, scrolls over the pinned footer.
          overflow-clip (not hidden) so position:sticky children keep working. */}
      <div className="relative z-10 bg-white overflow-clip">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/services/:id" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>

      {/* spacer — the window through which the footer is revealed */}
      <div id="footer-reveal-spacer" aria-hidden="true" style={{ height: footerH }} />

      {/* pinned footer — stays in place behind the content, on every route */}
      <div ref={footerRef} className="fixed inset-x-0 bottom-0 z-0">
        <Footer />
      </div>

      {showLoader && (
        <Loader onExitStart={markSiteReady} onExited={() => setShowLoader(false)} />
      )}
    </div>
  )
}

export default App
