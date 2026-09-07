import { motion } from 'framer-motion'
import { RATES } from '../data'

/**
 * Bottom marquee — Kurs eRate. Infinite horizontal loop, pauses on hover.
 */
export default function RateTicker() {
  const doubled = [...RATES, ...RATES]

  return (
    <div className="border-t border-flow-border bg-flow-surface/80 backdrop-blur md:pr-44">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <span className="shrink-0 text-sm font-semibold text-flow-teal">
          Kurs eRate
        </span>
        <div className="group relative flex-1 overflow-hidden">
          <motion.div
            className="flex gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          >
            {doubled.map((r, i) => (
              <span key={i} className="flex items-center gap-2 text-sm">
                <span>{r.flag}</span>
                <span className="font-semibold text-flow-ink">{r.code}</span>
                <span className="text-flow-muted">Beli</span>
                <span className="text-flow-ink">{r.buy}</span>
                <span className="text-flow-muted">Jual</span>
                <span className="text-flow-ink">{r.sell}</span>
              </span>
            ))}
          </motion.div>
        </div>
        <span className="hidden shrink-0 text-xs text-flow-muted md:block">
          Kurs dapat berubah selama proses transaksi
        </span>
      </div>
    </div>
  )
}
