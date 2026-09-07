import { motion } from 'framer-motion'
import logoMark from '../img/flowbank-logo-mark.png'

export default function Hero() {
  return (
    <div className="relative">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-flow-teal"
      >
        Digital Banking
      </motion.p>

      <motion.img
        src={logoMark}
        alt="FlowBank"
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="h-32 w-32 object-contain md:h-40 md:w-40"
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="mt-5 h-px origin-left bg-emerald-300/80"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-5 max-w-md text-lg text-flow-muted"
      >
        Satu aplikasi untuk semua transaksi harianmu. Cepat, aman, mengalir tanpa
        hambatan.
      </motion.p>
    </div>
  )
}
