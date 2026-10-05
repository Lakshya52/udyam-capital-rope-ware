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

// Router basename that works both at a domain root and in a subfolder
// (e.g. XAMPP's /udyam): if the first URL segment isn't a known route,
// it's treated as the deploy subfolder.
function getBasename(): string {
  const routes = [
    'case-studies',
    'articles',
    'services',
    'about',
    'contact',
    'privacy-policy',
    'terms-of-use',
  ];
  const parts = window.location.pathname.split('/').filter(Boolean);
  if (parts.length === 0 || routes.includes(parts[0])) return '/';
  const rest = parts.slice(1);
  if (rest.length === 0 || routes.includes(rest[0])) return '/' + parts[0];
  return '/';
}

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
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
