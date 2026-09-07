import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { SLIDES } from '../data'

export default function PromoCarousel() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0])
  const [paused, setPaused] = useState(false)

  const go = useCallback((d: number) => {
    setState(([i]) => [(i + d + SLIDES.length) % SLIDES.length, d])
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 4500)
    return () => clearInterval(t)
  }, [paused, go])

  const slide = SLIDES[index]

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative h-44 w-full overflow-hidden rounded-2xl border border-flow-border flow-glass"
    >
      <AnimatePresence custom={dir} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={dir}
          initial={{ x: dir >= 0 ? '100%' : '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: dir >= 0 ? '-100%' : '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="absolute inset-0 bg-[#0b1f2b] px-16 py-6"
        >
          {slide.image && (
            <>
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/50" />
            </>
          )}
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <span className="rounded-full bg-flow-bg/40 px-3 py-1 text-xs font-medium text-flow-teal">
                {slide.period}
              </span>
              <h3 className="mt-3 max-w-xs text-2xl font-bold text-flow-ink">
                {slide.title}
              </h3>
            </div>
            <a
              href={`https://${slide.url}`}
              className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-flow-ink"
            >
              {slide.url}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-3">
        <Arrow dir={-1} onClick={() => go(-1)} />
      </div>
      <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-3">
        <Arrow dir={1} onClick={() => go(1)} />
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setState([i, i > index ? 1 : -1])}
            className="h-1.5 rounded-full bg-flow-ink/30 transition-all"
            style={{ width: i === index ? 28 : 8 }}
          >
            {i === index && (
              <motion.span
                layoutId="promo-dot"
                className="block h-full w-full rounded-full bg-flow-teal"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function Arrow({ dir, onClick }: { dir: number; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      aria-label={dir < 0 ? 'Sebelumnya' : 'Berikutnya'}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full bg-flow-bg/50 text-flow-ink backdrop-blur"
    >
      {dir < 0 ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </motion.button>
  )
}
