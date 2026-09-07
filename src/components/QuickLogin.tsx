import { motion } from 'framer-motion'
import { ChevronRight, ArrowUpRight, Smartphone, Globe } from 'lucide-react'
import { QUICK_LOGIN } from '../data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

// myFlow* = app (Smartphone), KlikFlow* = internet banking (Globe)
const iconFor = (id: string) => (id.startsWith('myflow') ? Smartphone : Globe)

export default function QuickLogin({
  onOpen,
}: {
  onOpen?: (tab: 'myFlow' | 'KlikFlow') => void
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-flow-ink">Login Cepat</h2>
        <button
          onClick={() => onOpen?.('myFlow')}
          className="group inline-flex items-center gap-1 text-sm text-emerald-300/90 transition-colors hover:text-emerald-200"
        >
          Info Lengkap
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {QUICK_LOGIN.map((q) => {
          const Icon = iconFor(q.id)
          return (
            <motion.button
              key={q.id}
              variants={item}
              onClick={() => onOpen?.(q.id.startsWith('myflow') ? 'myFlow' : 'KlikFlow')}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex min-h-40 flex-col items-center overflow-hidden rounded-xl border border-white/10 bg-black/45 p-4 text-center shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-black/55"
            >
              {/* header row: logo badge + arrow */}
              <div className="relative z-10 mb-2 flex w-full items-center justify-center">
                <span className="grid h-9 w-9 place-items-center text-emerald-300">
                  <Icon size={23} strokeWidth={1.7} />
                </span>
                <ArrowUpRight
                  size={17}
                  className="absolute right-0 top-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-200"
                />
              </div>

              {/* brand lockup */}
              <div className="relative z-10 mb-2 flex flex-wrap items-center justify-center gap-2">
                <span className="text-lg font-bold text-flow-ink">{q.brand}</span>
                {q.sub && (
                  <span className="text-[9px] font-medium uppercase tracking-wide text-emerald-300/80">
                    {q.sub}
                  </span>
                )}
              </div>

              <p className="relative z-10 max-w-[24ch] text-xs leading-relaxed text-white/60">
                {q.desc}
              </p>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
