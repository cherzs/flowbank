import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, MapPin } from 'lucide-react'
import logoMark from '../img/flowbank-logo-mark.png'

const NAV: { label: string; href: string }[] = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Produk', href: '#produk' },
  { label: 'Layanan', href: '#layanan' },
  { label: 'Tentang', href: '#tentang' },
]

export default function TopNav({
  onOpenPanel,
}: {
  onOpenPanel: (label: string) => void
}) {
  const [active, setActive] = useState('#beranda')
  const [lang, setLang] = useState<'ID' | 'EN'>('ID')
  const [search, setSearch] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const syncActiveSection = () => {
      const marker = window.scrollY + 180
      const current = [...NAV]
        .reverse()
        .find(({ href }) => document.querySelector<HTMLElement>(href)?.offsetTop! <= marker)
      if (current) setActive(current.href)
    }

    syncActiveSection()
    window.addEventListener('scroll', syncActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', syncActiveSection)
  }, [])

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    const serviceTerms = /transfer|qris|bayar|valas|cardless|proteksi|layanan/i
    onOpenPanel(serviceTerms.test(query) ? 'Layanan' : 'Produk')
    setSearch(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[60] bg-flow-bg/40 backdrop-blur-md md:right-44"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <a href="#beranda" className="flex shrink-0 items-center gap-2.5">
          <motion.span
            whileHover={{ rotate: -12, scale: 1.1 }}
            className="grid h-10 w-10 place-items-center"
          >
            <img src={logoMark} alt="" className="h-10 w-10 object-contain" />
          </motion.span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-xl font-bold tracking-tight text-flow-ink">
              Flow<span className="text-flow-teal">Bank</span>
            </span>
            <span className="mt-0.5 text-[10px] font-medium tracking-wide text-flow-muted">
              Senantiasa Mengalir Bersama Anda
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setActive(link.href)}
                className="relative py-1 text-[15px] font-medium text-flow-ink/80 transition-colors hover:text-flow-ink"
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-flow-teal"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2.5">
          {/* expanding search */}
          <form onSubmit={submitSearch} className="flex items-center">
            <AnimatePresence>
              {search && (
                <motion.input
                  autoFocus
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  placeholder="Cari…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Cari produk atau layanan"
                  className="mr-2 rounded-full border border-flow-border bg-flow-card px-4 py-2 text-sm text-flow-ink outline-none placeholder:text-flow-muted focus:border-flow-teal"
                />
              )}
            </AnimatePresence>
            <IconBtn label={search ? 'Tutup pencarian' : 'Cari'} onClick={() => setSearch((s) => !s)}>
              <Search size={18} />
            </IconBtn>
          </form>
          <IconBtn label="Lokasi dan layanan" onClick={() => onOpenPanel('Layanan')}>
            <MapPin size={18} />
          </IconBtn>

          <div className="flex overflow-hidden rounded-full border border-flow-border text-xs font-semibold">
            {(['ID', 'EN'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`relative px-3 py-1.5 transition-colors ${
                  lang === l ? 'text-flow-bg' : 'text-flow-muted hover:text-flow-ink'
                }`}
              >
                {lang === l && (
                  <motion.span layoutId="lang-pill" className="absolute inset-0 -z-0 bg-flow-teal" />
                )}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <motion.button
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.12, backgroundColor: 'rgba(45,212,191,0.15)' }}
      whileTap={{ scale: 0.92 }}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-flow-border text-flow-ink/80"
    >
      {children}
    </motion.button>
  )
}
