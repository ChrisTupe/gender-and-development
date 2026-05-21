import { useState, useEffect, useRef } from 'react'

const brochures = [
  {
    id: 1,
    bg: 'bg-[#282974]',
    title: 'REPUBLIC ACT NO. 11596',
    subtitle: 'An Act Prohibiting the Practice of Child Marriage',
    tag: 'Republic Act No. 11596',
  },
  {
    id: 2,
    bg: 'bg-[#1e2260]',
    title: 'BATAS REPUBLIKA 7877',
    subtitle: 'Batas Laban sa Sexual Harassment (1995)',
    tag: 'Batas Republika 7877',
  },
  {
    id: 3,
    bg: 'bg-[#3a3d9e]',
    title: 'REPUBLIC ACT NO. 11210',
    subtitle: 'The 105-Day Expanded Maternity Leave Law',
    tag: 'Maternity Leave',
  },
  {
    id: 4,
    bg: 'bg-[#282974]',
    title: 'REPUBLIC ACT 7877: UNDERSTANDING THE ANTI-SEXUAL HARASSMENT ACT OF 1995',
    subtitle: 'Creating a Gender-Responsive, Supportive and Productive Environment',
    tag: 'Republic Act 7877',
  },
  {
    id: 5,
    bg: 'bg-[#1a5c8a]',
    title: 'REPUBLIC ACT 8353',
    subtitle: 'The Anti-Rape Law of 1997 (as amended by RA 11648)',
    tag: 'Republic Act 8353',
  },
  {
    id: 6,
    bg: 'bg-[#2e2e7a]',
    title: 'REPUBLIC ACT 9262',
    subtitle: 'Anti-Violence Against Women and Their Children Act of 2004',
    tag: 'Republic Act 9262',
  },
  {
    id: 7,
    bg: 'bg-[#1e4d7a]',
    title: 'REPUBLIC ACT 10354',
    subtitle: 'The Responsible Parenthood and Reproductive Health Act of 2012',
    tag: 'Republic Act 10354',
  },
]

const VISIBLE = 4
const CARD_GAP = 20
const SLIDE_DURATION = 500

export default function Brochures() {
  const [startIndex, setStartIndex] = useState(0)
  const [offset, setOffset] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const total = trackRef.current.offsetWidth
        setCardWidth((total - CARD_GAP * (VISIBLE - 1)) / VISIBLE)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const slide = (dir: 'left' | 'right') => {
    if (isAnimating || cardWidth === 0) return
    setIsAnimating(true)
    const step = cardWidth + CARD_GAP
    setOffset(dir === 'right' ? -step : step)
    setTimeout(() => {
      setStartIndex(prev =>
        dir === 'right'
          ? (prev + 1) % brochures.length
          : (prev - 1 + brochures.length) % brochures.length
      )
      setOffset(0)
      setIsAnimating(false)
    }, SLIDE_DURATION)
  }

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => slide('right'), 4000)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [cardWidth, isAnimating])

  const handlePrev = () => { slide('left'); resetTimer() }
  const handleNext = () => { slide('right'); resetTimer() }

  const visible = Array.from({ length: VISIBLE + 1 }, (_, i) =>
    brochures[(startIndex + i) % brochures.length]
  )

  return (
    <section
      className="relative w-full bg-white"
      style={{ padding: '60px 80px 80px 80px' }}
    >
      {/* Nav buttons — absolute top right */}
      <div
        className="absolute flex gap-3"
        style={{ top: '60px', right: '80px' }}
      >
        {(['prev', 'next'] as const).map(btn => (
          <button
            key={btn}
            onClick={btn === 'prev' ? handlePrev : handleNext}
            className="flex items-center justify-center rounded-full border-2 border-[#282974] bg-white text-xl text-[#282974] transition-all duration-200 cursor-pointer hover:bg-[#282974] hover:text-white"
            style={{ width: '44px', height: '44px' }}
          >
            {btn === 'prev' ? '‹' : '›'}
          </button>
        ))}
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
        <div className="h-px w-10 bg-[#282974]" />
        <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#282974]">
          CIAC Gender and Development
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-extrabold text-black" style={{ marginBottom: '40px' }}>
        Brochures
      </h2>

      {/* Sliding track */}
      <div ref={trackRef} className="overflow-hidden">
        <div
          className="flex"
          style={{
            gap: `${CARD_GAP}px`,
            transform: `translateX(${offset}px)`,
            transition: isAnimating
              ? `transform ${SLIDE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : 'none',
          }}
        >
          {visible.map((b, i) => (
            <div
              key={`${b.id}-${i}`}
              className="group relative flex shrink-0 cursor-pointer flex-col overflow-hidden rounded-lg shadow-md min-h-[420px]"
              style={{
                width: cardWidth || `calc((100% - ${CARD_GAP * (VISIBLE - 1)}px) / ${VISIBLE})`,
              }}
            >
              {/* Card body */}
              <div
                className={`flex flex-1 flex-col items-center justify-center text-center ${b.bg}`}
                style={{ padding: '40px 24px' }}
              >
                <h3
                  className="font-extrabold uppercase leading-tight text-white text-[18px]"
                  style={{ marginBottom: '12px' }}
                >
                  {b.title}
                </h3>
                <p className="text-[13px] leading-snug text-white/75">
                  {b.subtitle}
                </p>

                {/* Illustration placeholder */}
                <div
                  className="flex items-center justify-center rounded-full bg-white/15"
                  style={{ marginTop: '32px', width: '96px', height: '96px' }}
                >
                  <svg
                    viewBox="0 0 48 48"
                    className="w-14 h-14"
                    fill="rgba(255,255,255,0.5)"
                  >
                    <circle cx="24" cy="16" r="8" />
                    <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16H8z" />
                  </svg>
                </div>
              </div>

              {/* Footer tag — slides up on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 bg-[#1a1c5e] transition-transform duration-300 ease-in-out group-hover:-translate-y-2"
                style={{ padding: '16px 20px' }}
              >
                <p className="text-[14px] font-extrabold text-white">
                  {b.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2" style={{ marginTop: '40px' }}>
        {brochures.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isAnimating) return
              slide(i > startIndex ? 'right' : 'left')
              resetTimer()
            }}
            className="rounded-full border-none p-0 transition-all duration-300 cursor-pointer h-2"
            style={{
              width: i === startIndex ? '28px' : '8px',
              backgroundColor: i === startIndex ? '#282974' : 'rgba(40,41,116,0.3)',
            }}
          />
        ))}
      </div>
    </section>
  )
}