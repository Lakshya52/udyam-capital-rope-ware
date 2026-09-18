import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.tsx'

declare global {
  interface Window {
    __lenis?: { stop: () => void; start: () => void }
    __siteReady?: boolean
  }
}

gsap.registerPlugin(ScrollTrigger)

// Re-measure scroll triggers once late assets (images, webfonts) settle,
// so below-the-fold triggers can't fire off-screen on shifted layout.
window.addEventListener('load', () => ScrollTrigger.refresh())
if (document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}

// Global Lenis smooth scroll — skipped for reduced-motion users.
// Driven by GSAP's ticker so pinned/scrubbed ScrollTriggers stay in sync.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({ lerp: 0.1 })
  window.__lenis = lenis
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
