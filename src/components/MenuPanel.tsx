import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Send, Bot, Clock } from 'lucide-react'
import { PROMO_LIST, PRODUCTS, SERVICES, type Feature } from '../data'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
}
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

const TITLES: Record<string, string> = {
  Login: 'Masuk',
  Produk: 'Produk',
  Layanan: 'Layanan',
  Promo: 'Promo',
  Webform: 'Webform',
  Chat: 'FlowChat',
}

export default function MenuPanel({
  active,
  loginTab,
  onClose,
}: {
  active: string | null
  loginTab: 'myFlow' | 'KlikFlow'
  onClose: () => void
}) {
  const open = active !== null

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[75] bg-flow-bg/70 backdrop-blur-sm md:z-40"
          />
          <motion.section
            key={active}
            role="dialog"
            aria-modal="true"
            aria-label={active ?? undefined}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col border-l border-flow-border bg-flow-surface md:right-44 md:z-40"
          >
            <header className="flex items-center justify-between px-7 pb-4 pt-24">
              <h2 className="text-3xl font-bold text-flow-ink">
                {TITLES[active!]?.split('Flow')[0] || active}
                {active === 'Promo' && <span className="text-flow-teal"> FlowBank</span>}
                {active === 'Chat' && <span className="text-flow-teal">Flow</span>}
              </h2>
              <motion.button
                aria-label="Tutup"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-flow-border text-flow-muted"
              >
                <X size={18} />
              </motion.button>
            </header>

            <div className="flow-scrollbar flex-1 overflow-y-auto px-7 pb-10 pt-2">
              {active === 'Login' && <LoginForm initialTab={loginTab} />}
              {active === 'Promo' && <PromoContent />}
              {active === 'Produk' && <FeatureContent data={PRODUCTS} sectionId="produk" onNavigate={onClose} />}
              {active === 'Layanan' && <FeatureContent data={SERVICES} sectionId="layanan" onNavigate={onClose} />}
              {active === 'Webform' && <WebForm />}
              {active === 'Chat' && <ChatMock />}
            </div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  )
}

function Note() {
  return (
    <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200">
      Demo frontend — aksi yang butuh backend (login, kirim form) belum aktif.
    </p>
  )
}

function LoginForm({ initialTab }: { initialTab: 'myFlow' | 'KlikFlow' }) {
  const [tab, setTab] = useState<'myFlow' | 'KlikFlow'>(initialTab)
  return (
    <div>
      <div className="mb-6 flex gap-2 rounded-full bg-flow-card p-1">
        {(['myFlow', 'KlikFlow'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative flex-1 rounded-full py-2 text-sm font-semibold ${
              tab === t ? 'text-flow-bg' : 'text-flow-muted'
            }`}
          >
            {tab === t && (
              <motion.span
                layoutId="login-tab"
                className="absolute inset-0 rounded-full bg-flow-teal"
              />
            )}
            <span className="relative z-10">{t}</span>
          </button>
        ))}
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <Field label="User ID" placeholder="Masukkan User ID" />
        <Field label="Password" type="password" placeholder="Masukkan Password" />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full rounded-full bg-emerald-400 py-3 font-semibold text-flow-bg"
        >
          Masuk ke {tab}
        </motion.button>
      </form>
      <Note />
    </div>
  )
}

function Field({
  label,
  type = 'text',
  placeholder,
}: {
  label: string
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-flow-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-flow-border bg-flow-card px-4 py-3 text-sm text-flow-ink outline-none transition-colors placeholder:text-flow-muted focus:border-flow-teal"
      />
    </label>
  )
}

function FeatureContent({
  data,
  sectionId,
  onNavigate,
}: {
  data: Feature[]
  sectionId: string
  onNavigate: () => void
}) {
  const usesImages = data.some((feature) => feature.image)
  return (
    <motion.div
      variants={list}
      initial="hidden"
      animate="show"
      className={usesImages ? 'grid grid-cols-2 gap-4' : 'space-y-3'}
    >
      {data.map((f) => {
        const Icon = f.icon
        if (f.image) {
          return (
            <motion.a
              key={f.title}
              href={`#${sectionId}`}
              onClick={onNavigate}
              variants={item}
              whileHover={{ y: -4 }}
              className="group relative h-52 overflow-hidden rounded-xl bg-flow-card"
            >
              <img
                src={f.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35" />
              <h3
                className="absolute left-4 top-4 max-w-[80%] text-lg font-medium leading-tight text-white"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.75)' }}
              >
                {f.title}
              </h3>
            </motion.a>
          )
        }
        return (
          <motion.a
            key={f.title}
            href={`#${sectionId}`}
            onClick={onNavigate}
            variants={item}
            whileHover={{ x: 6 }}
            className="flex items-start gap-4 rounded-2xl border border-flow-border bg-flow-card p-4 transition-colors hover:border-flow-teal/50"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-flow-teal/15 text-flow-teal">
              <Icon size={22} />
            </span>
            <div>
              <h3 className="font-semibold text-flow-ink">{f.title}</h3>
              <p className="mt-0.5 text-sm text-flow-muted">{f.desc}</p>
            </div>
          </motion.a>
        )
      })}
    </motion.div>
  )
}

function PromoContent() {
  return (
    <motion.div variants={list} initial="hidden" animate="show" className="space-y-6">
      {PROMO_LIST.map((p) => (
        <motion.article key={p.id} variants={item} whileHover={{ y: -4 }} className="group block">
          <div className="relative grid h-44 place-items-center overflow-hidden rounded-2xl bg-flow-card">
            {p.image ? (
              <img
                src={p.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                {p.emoji}
              </span>
            )}
            <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
          </div>
          <h3 className="mt-3 text-lg font-semibold text-flow-ink group-hover:text-flow-teal">
            {p.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-flow-muted">
            <Clock size={14} /> {p.period}
          </p>
        </motion.article>
      ))}
    </motion.div>
  )
}

function WebForm() {
  const [sent, setSent] = useState(false)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
      className="space-y-4"
    >
      <Field label="Nama Lengkap" placeholder="Nama Anda" />
      <Field label="Email" type="email" placeholder="email@contoh.com" />
      <Field label="Keperluan" placeholder="Contoh: Buka Rekening" />
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-flow-ink">Pesan</span>
        <textarea
          rows={4}
          placeholder="Tulis pesan Anda"
          className="w-full resize-none rounded-xl border border-flow-border bg-flow-card px-4 py-3 text-sm text-flow-ink outline-none placeholder:text-flow-muted focus:border-flow-teal"
        />
      </label>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full rounded-full bg-emerald-400 py-3 font-semibold text-flow-bg"
      >
        {sent ? 'Terkirim ✓ (demo)' : 'Kirim'}
      </motion.button>
      <Note />
    </form>
  )
}

function ChatMock() {
  const [msgs, setMsgs] = useState([
    { me: false, t: 'Halo! Saya FlowBot. Ada yang bisa dibantu?' },
  ])
  const [val, setVal] = useState('')
  const send = () => {
    if (!val.trim()) return
    setMsgs((m) => [...m, { me: true, t: val }])
    setVal('')
    setTimeout(
      () =>
        setMsgs((m) => [
          ...m,
          { me: false, t: 'Terima kasih! Ini demo — CS asli butuh backend.' },
        ]),
      600,
    )
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-3">
        {msgs.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-end gap-2 ${m.me ? 'justify-end' : 'justify-start'}`}
          >
            {!m.me && (
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-flow-teal/15 text-flow-teal">
                <Bot size={15} />
              </span>
            )}
            <span
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                m.me
                  ? 'bg-flow-teal text-flow-bg'
                  : 'border border-flow-border bg-flow-card text-flow-ink'
              }`}
            >
              {m.t}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-flow-border bg-flow-card p-1.5">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ketik pesan…"
          className="flex-1 bg-transparent px-3 text-sm text-flow-ink outline-none placeholder:text-flow-muted"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={send}
          aria-label="Kirim"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-flow-teal text-flow-bg"
        >
          <Send size={16} />
        </motion.button>
      </div>
    </div>
  )
}
