import { useEffect, useRef } from 'react'

// White-point keying thresholds on min(R,G,B): >= T0 transparent, <= T1 opaque
const T0 = 242
const RANGE = T0 - 185
// Capped render width — soft waves upscale cleanly, halves the pixel work
const MAX_W = 1024

// Precomputed per-brightness alpha + unmix factors (avoids float math per pixel)
const LUT_A = new Uint8Array(256)
const LUT_INV = new Float32Array(256)
const LUT_RCP = new Float32Array(256)
for (let m = 0; m < 256; m++) {
  let a = (T0 - m) / RANGE
  a = a < 0 ? 0 : a > 1 ? 1 : a
  LUT_A[m] = Math.round(a * 255)
  LUT_INV[m] = 255 * (1 - a)
  LUT_RCP[m] = a > 0.004 ? 1 / a : 0
}

// Renders /UCHeroFinal.mp4 to a canvas with near-white pixels keyed out,
// so the blue ropes float over the page background with no white box.
// (MP4 cannot store an alpha channel, so the keying is done per-frame.)
export default function HeroVideo() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: true })
    if (!ctx) return

    let raf = 0
    let lastTime = -1
    let sized = false
    let visible = true
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const keyFrame = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const d = img.data
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i]
        const g = d[i + 1]
        const b = d[i + 2]
        const m = r < g ? (r < b ? r : b) : g < b ? g : b
        const ab = LUT_A[m]
        if (ab === 0) {
          d[i] = 0
          d[i + 1] = 0
          d[i + 2] = 0
          d[i + 3] = 0
        } else if (ab === 255) {
          d[i + 3] = 255
        } else {
          // unmix the white backdrop: C = fg*a + 255*(1-a)
          const inv = LUT_INV[m]
          const rcp = LUT_RCP[m]
          d[i] = (r - inv) * rcp
          d[i + 1] = (g - inv) * rcp
          d[i + 2] = (b - inv) * rcp
          d[i + 3] = ab
        }
      }
      ctx.putImageData(img, 0, 0)
    }

    const loop = () => {
      raf = 0
      if (!visible) return
      if (video.readyState >= 2 && video.videoWidth > 0) {
        if (!sized) {
          const scale = Math.min(1, MAX_W / video.videoWidth)
          canvas.width = Math.round(video.videoWidth * scale)
          canvas.height = Math.round(video.videoHeight * scale)
          sized = true
        }
        if (video.currentTime !== lastTime) {
          lastTime = video.currentTime
          keyFrame()
          if (reduced) {
            video.pause()
            return
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (!raf) {
        lastTime = -1
        raf = requestAnimationFrame(loop)
      }
      video.play().catch(() => {})
    }
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
      video.pause()
    }

    // Fully pause (rAF + decode) while the hero is off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      },
      { threshold: 0.02 }
    )
    io.observe(canvas)
    video.addEventListener('canplay', start)
    start()

    return () => {
      io.disconnect()
      video.removeEventListener('canplay', start)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        src="/UCHeroFinal.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="hidden"
      />
      <canvas ref={canvasRef} className="h-full w-full scale-[1.06] object-cover object-center" aria-hidden="true" />
    </>
  )
}
