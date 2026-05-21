import { useState, useEffect, useCallback } from 'react'

const slides = [
  { src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80' },
  { src: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=900&q=80' },
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=80' },
  { src: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=900&q=80' },
]

export default function Landing() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      if (animating) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setCurrent(index)
        setAnimating(false)
      }, 400)
    },
    [animating]
  )

  const prev = () => {
    const idx = (current - 1 + slides.length) % slides.length
    goTo(idx, 'left')
  }

  const next = useCallback(() => {
    const idx = (current + 1) % slides.length
    goTo(idx, 'right')
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: 'calc(100vh - 120px)', minHeight: '500px' }}
    >
      {/* ── SLIDE IMAGE (full bleed) ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === 'right' ? '-40px' : '40px'})`
            : 'translateX(0)',
          transition: animating ? 'opacity 0.4s ease, transform 0.4s ease' : 'none',
        }}
      >
        <img
          src={slides[current].src}
          alt={`Slide ${current + 1}`}
          className="block h-full w-full object-cover"
        />
      </div>

      {/* ── GRADIENT OVERLAY (left fade) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(20,25,100,0.85) 0%, rgba(20,25,100,0.6) 38%, rgba(20,25,100,0.0) 65%)',
        }}
      />

      {/* ── TEXT OVERLAY ── */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ padding: '60px 52px' }}
      >
        {/* Giant decorative letter */}
        <span
          className="pointer-events-none absolute select-none font-serif font-black leading-none"
          style={{
            top: '-30px',
            left: '-20px',
            fontSize: '320px',
            color: 'rgba(255,255,255,0.04)',
          }}
        >
          G
        </span>

        {/* Decorative cross */}
        <div className="absolute bottom-16 left-10 h-20 w-20 opacity-20">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white" />
          <div className="absolute bottom-0 left-1/2 top-0 w-px bg-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-sm">
          <div className="mb-8 h-1 w-12 rounded-full bg-[#7c9ef0]" />

          <h1 className="mb-6 font-serif text-5xl font-normal italic leading-snug tracking-tight text-white">
            Gender and
            <br />
            Development
          </h1>

          <div className="h-px w-9 bg-white/30" style={{ marginBottom: '28px' }} />

          <p className="mb-1.5 font-sans text-[11px] font-bold uppercase tracking-[3px] text-white/75">
            Clark International
          </p>
          <p className="font-sans text-[11px] font-bold uppercase tracking-[3px] text-white/75">
            Airport Corporation
          </p>
        </div>
      </div>

      {/* ── DOT INDICATORS ── */}
      <div className="absolute bottom-8 left-10 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 'right' : 'left')}
            className="h-2 cursor-pointer rounded-full border-none p-0 transition-all duration-300"
            style={{
              width: i === current ? '28px' : '8px',
              background: i === current ? 'white' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>

      {/* ── PREV / NEXT BUTTONS ── */}
      <div className="absolute bottom-6 right-8 z-10 flex gap-2.5">
        {(['prev', 'next'] as const).map((btn) => (
          <button
            key={btn}
            onClick={btn === 'prev' ? prev : next}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-2 border-white/50 bg-white/10 text-lg text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/25"
          >
            {btn === 'prev' ? '‹' : '›'}
          </button>
        ))}
      </div>
    </div>
  )
}