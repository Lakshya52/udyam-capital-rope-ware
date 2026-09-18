import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import Articles from './pages/Articles.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Error from './pages/Error.jsx'
import Loader from './components/Loader.jsx'
import { markSiteReady } from './lib/siteReady.js'

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
      <Navbar />
      {/* content layer — opaque, scrolls over the pinned footer */}
      <div className="relative z-10 bg-white overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/articles" element={<Articles />} />
          {/* <Route path="/services" element={<Services />} /> */}
        <Route path="/services/:id" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
