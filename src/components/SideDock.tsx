import { useState } from 'react'
import { motion } from 'framer-motion'
import { DOCK_ITEMS } from '../data'

/**
 * BCA-style right vertical rail. Collapsed = icon column.
 * Hover expands labels with spring width + staggered reveal.
 * `active` = currently open panel (persistent white highlight).
 */
export default function SideDock({
  active,
  onSelect,
}: {
  active: string | null
  onSelect: (label: string) => void
}) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <>
      <motion.aside
        initial={{ x: 80 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        aria-label="Menu cepat"
        className="fixed right-0 top-0 z-[70] hidden h-screen w-44 flex-col border-l border-white/10 bg-[#172238]/90 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:flex"
      >
        {DOCK_ITEMS.map((item, i) => {
        const Icon = item.icon
        const isActive = active === item.label
        const isHot = hovered === item.label
        return (
          <motion.button
            key={item.label}
            aria-label={item.label}
            aria-pressed={isActive}
            onClick={() => onSelect(item.label)}
            onHoverStart={() => setHovered(item.label)}
            onHoverEnd={() => setHovered(null)}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="group relative flex flex-1 flex-row-reverse items-center justify-between gap-3 border-b border-white/15 px-6 py-4"
          >
            {isActive ? (
              <motion.span
                layoutId="dock-active"
                className="absolute inset-2 -z-0 rounded-lg bg-emerald-400/15 ring-1 ring-inset ring-emerald-300/30"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            ) : (
              isHot && (
                <motion.span
                  layoutId="dock-hot"
                  className="absolute inset-2 -z-0 rounded-lg bg-white/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )
            )}
            <motion.span
              animate={{ scale: isHot || isActive ? 1.15 : 1, rotate: isHot ? -6 : 0 }}
              className={`relative z-10 shrink-0 ${
                isActive ? 'text-emerald-300' : 'text-white'
              }`}
            >
              <Icon size={22} strokeWidth={2} />
            </motion.span>
            <span
              className={`relative z-10 whitespace-nowrap text-sm font-medium ${
                isActive ? 'text-emerald-300' : 'text-white'
              }`}
            >
              {item.label}
            </span>
          </motion.button>
        )
        })}
      </motion.aside>

      <nav
        aria-label="Menu cepat"
        className="fixed inset-x-0 bottom-[49px] z-[70] flex h-16 items-stretch border-t border-white/10 bg-[#172238]/95 px-1 backdrop-blur-xl md:hidden"
      >
        {DOCK_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = active === item.label
          return (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              aria-pressed={isActive}
              onClick={() => onSelect(item.label)}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[9px] font-medium transition-colors ${
                isActive ? 'text-flow-teal' : 'text-white/75'
              }`}
            >
              <Icon size={19} strokeWidth={2} />
              <span className="max-w-full truncate">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
