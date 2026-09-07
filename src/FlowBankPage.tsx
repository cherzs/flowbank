import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import FlowBackground from './components/FlowBackground'
import TopNav from './components/TopNav'
import SideDock from './components/SideDock'
import Hero from './components/Hero'
import PromoCarousel from './components/PromoCarousel'
import QuickLogin from './components/QuickLogin'
import RateTicker from './components/RateTicker'
import MenuPanel from './components/MenuPanel'
import { PRODUCTS, SERVICES, type Feature } from './data'
import heroImage from './img/hero.png'

export default function FlowBankPage() {
  const [panel, setPanel] = useState<string | null>(null)
  const [loginTab, setLoginTab] = useState<'myFlow' | 'KlikFlow'>('myFlow')
  const toggle = (label: string) => setPanel((p) => (p === label ? null : label))

  const openLogin = (tab: 'myFlow' | 'KlikFlow' = 'myFlow') => {
    setLoginTab(tab)
    setPanel('Login')
  }

  return (
    <div id="top" className="relative w-full bg-flow-bg font-sans">
      <FlowBackground />
      <TopNav onOpenPanel={setPanel} />
      <SideDock active={panel} onSelect={toggle} />
      <MenuPanel active={panel} loginTab={loginTab} onClose={() => setPanel(null)} />

      {/* ===== HERO ===== */}
      <section id="beranda" className="relative z-10 flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden">
        {/* generated FlowBank hero backdrop */}
        <img
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.9] saturate-[0.88]"
          src={heroImage}
          alt=""
          aria-hidden="true"
        />
        {/* readability overlays: dark + emerald tint */}
        <div className="absolute inset-0 bg-slate-950/45" />

        <div className="relative z-10 w-full md:pr-44">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 pb-20 pt-24 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Hero />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="lg:col-span-5 lg:col-start-1"
            >
              <PromoCarousel />
            </motion.div>

            <div className="w-full lg:col-span-10 lg:col-start-1">
              <QuickLogin onOpen={openLogin} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUK ===== */}
      <FeatureSection
        id="produk"
        eyebrow="Produk"
        title="Semua kebutuhan finansial, satu bank."
        data={PRODUCTS}
        onOpen={() => setPanel('Produk')}
      />

      {/* ===== LAYANAN ===== */}
      <FeatureSection
        id="layanan"
        eyebrow="Layanan"
        title="Transaksi mengalir tanpa hambatan."
        data={SERVICES}
        onOpen={() => setPanel('Layanan')}
      />

      {/* ===== CTA ===== */}
      <section id="tentang" className="relative z-10 pb-40 pt-10 md:pr-44">
        <div className="mx-auto w-full max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="overflow-hidden rounded-3xl border border-flow-border bg-flow-card p-10 md:p-16"
          >
            <h2 className="max-w-2xl text-3xl font-bold text-flow-ink md:text-5xl">
              Buka rekening FlowBank dalam 5 menit.
            </h2>
            <p className="mt-4 max-w-xl text-flow-muted">
              Tanpa antre, tanpa materai, langsung dari HP. Aktif seketika.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openLogin()}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-8 py-3.5 font-semibold text-flow-bg"
            >
              Mulai Sekarang
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          <footer className="mt-16 border-t border-flow-border pt-8 text-sm text-flow-muted">
            © {new Date().getFullYear()} FlowBank. Demo UI — bukan bank sungguhan.
          </footer>
        </div>
      </section>

      {/* ===== RATE TICKER (pinned) ===== */}
      <div className="fixed inset-x-0 bottom-0 z-30">
        <RateTicker />
      </div>
    </div>
  )
}

function FeatureSection({
  id,
  eyebrow,
  title,
  data,
  onOpen,
}: {
  id: string
  eyebrow: string
  title: string
  data: Feature[]
  onOpen: () => void
}) {
  return (
    <section id={id} className="relative z-10 scroll-mt-24 py-20 md:pr-44">
      <div className="mx-auto w-full max-w-7xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className="mb-10 flex items-end justify-between gap-4"
      >
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-flow-teal">
            {eyebrow}
          </p>
          <h2 className="max-w-xl text-3xl font-bold text-flow-ink md:text-4xl">{title}</h2>
        </div>
        <button
          onClick={onOpen}
          className="hidden shrink-0 items-center gap-1 text-sm text-flow-teal hover:underline md:inline-flex"
        >
          Lihat semua <ArrowRight size={16} />
        </button>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data.map((f) => {
          const Icon = f.icon
          if (f.image) {
            return (
              <motion.button
                key={f.title}
                onClick={onOpen}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ y: -6 }}
                className="group relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-flow-card text-left"
              >
                <img
                  src={f.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
                <h3
                  className="absolute left-6 top-5 max-w-[75%] text-2xl font-medium text-white"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}
                >
                  {f.title}
                </h3>
                <p className="absolute inset-x-0 bottom-0 bg-black/55 px-6 py-4 text-sm leading-relaxed text-white/80 backdrop-blur-sm">
                  {f.desc}
                </p>
              </motion.button>
            )
          }
          return (
            <motion.button
              key={f.title}
              onClick={onOpen}
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-flow-border bg-flow-card/70 p-6 text-left transition-colors hover:border-flow-teal/50"
            >
              <span className="relative z-10 mb-4 grid h-12 w-12 place-items-center rounded-xl bg-flow-teal/15 text-flow-teal">
                <Icon size={24} />
              </span>
              <h3 className="relative z-10 text-lg font-semibold text-flow-ink">{f.title}</h3>
              <p className="relative z-10 mt-1 text-sm text-flow-muted">{f.desc}</p>
            </motion.button>
          )
        })}
      </motion.div>
      </div>
    </section>
  )
}
