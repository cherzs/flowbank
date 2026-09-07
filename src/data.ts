import {
  LogIn,
  LayoutGrid,
  Heart,
  ShoppingBag,
  PenLine,
  MessageCircleQuestion,
  Wallet,
  CreditCard,
  Home,
  PiggyBank,
  TrendingUp,
  Landmark,
  ArrowLeftRight,
  QrCode,
  Receipt,
  Smartphone,
  Globe,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import savingsImage from './img/product-savings.png'
import creditCardImage from './img/product-credit-card.png'
import homeImage from './img/product-home.png'
import depositImage from './img/product-deposit.png'
import investImage from './img/product-invest.png'
import loanImage from './img/product-loan.png'

export interface DockItem {
  label: string
  icon: LucideIcon
}

// Right vertical dock (BCA-style floating rail)
export const DOCK_ITEMS: DockItem[] = [
  { label: 'Login', icon: LogIn },
  { label: 'Produk', icon: LayoutGrid },
  { label: 'Layanan', icon: Heart },
  { label: 'Promo', icon: ShoppingBag },
  { label: 'Webform', icon: PenLine },
  { label: 'Chat', icon: MessageCircleQuestion },
]

export const NAV_LINKS = ['Individu', 'Bisnis', 'Tentang FlowBank', 'Karir']

export interface Slide {
  id: string
  title: string
  period: string
  url: string
  image?: string
}

export const SLIDES: Slide[] = [
  {
    id: 'expo',
    title: 'FlowBank Expo 2026',
    period: '21 Agt - 31 Okt',
    url: 'expo.flowbank.co.id',
    image: savingsImage,
  },
  {
    id: 'kpr',
    title: 'KPR Bunga 2,26%',
    period: 'Berlaku s/d Des 2026',
    url: 'kpr.flowbank.co.id',
    image: homeImage,
  },
  {
    id: 'travel',
    title: 'Travel Fair Cashback',
    period: '01 Sep - 30 Sep',
    url: 'travel.flowbank.co.id',
    image: creditCardImage,
  },
]

export interface QuickLogin {
  id: string
  brand: string
  sub: string
  desc: string
}

export const QUICK_LOGIN: QuickLogin[] = [
  {
    id: 'myflow',
    brand: 'myFlow',
    sub: '',
    desc: 'Akses myFlow versi web untuk mudahnya transaksi harian',
  },
  {
    id: 'myflow-bisnis',
    brand: 'myFlow',
    sub: 'Bisnis',
    desc: 'Kelola beragam transaksi finansial bisnis kini semakin mudah',
  },
  {
    id: 'klik',
    brand: 'KlikFlow',
    sub: '',
    desc: 'Internet banking untuk kebutuhan transaksi individu',
  },
  {
    id: 'klik-bisnis',
    brand: 'KlikFlow',
    sub: 'Bisnis',
    desc: 'Internet banking untuk kebutuhan transaksi bisnis',
  },
]

export interface Promo {
  id: string
  brand: string
  title: string
  period: string
  emoji: string
  image?: string
}

export const PROMO_LIST: Promo[] = [
  {
    id: 'butteria',
    brand: 'Butteria',
    title: 'Butteria - Diskon Rp50 Ribu',
    period: 'Periode 31 Des 2026',
    emoji: '🍜',
    image: loanImage,
  },
  {
    id: 'drspecs',
    brand: 'DR SPECS',
    title: 'DR SPECS - Diskon Frame 50%',
    period: 'Periode 31 Des 2026',
    emoji: '🕶️',
    image: creditCardImage,
  },
  {
    id: 'football',
    brand: 'eFootball',
    title: 'eFootball - Bonus Koin Top Up',
    period: 'Periode 30 Nov 2026',
    emoji: '⚽',
    image: investImage,
  },
  {
    id: 'traveloka',
    brand: 'Traveloka',
    title: 'Traveloka - Cashback Rp200 Ribu',
    period: 'Periode 15 Des 2026',
    emoji: '✈️',
    image: homeImage,
  },
  {
    id: 'tokopedia',
    brand: 'Tokopedia',
    title: 'Diskon Belanja s/d 30%',
    period: 'Periode 31 Des 2026',
    emoji: '🛍️',
    image: savingsImage,
  },
]

export interface Feature {
  icon: LucideIcon
  title: string
  desc: string
  image?: string
}

export const PRODUCTS: Feature[] = [
  { icon: Wallet, title: 'Tabungan Flow', desc: 'Bebas biaya admin, bunga harian, tarik tunai tanpa kartu.', image: savingsImage },
  { icon: CreditCard, title: 'Kartu Kredit', desc: 'Cashback s/d 5%, cicilan 0%, akses lounge bandara.', image: creditCardImage },
  { icon: Home, title: 'KPR FlowHome', desc: 'Bunga fixed 2,26%, tenor s/d 25 tahun, approval cepat.', image: homeImage },
  { icon: PiggyBank, title: 'Deposito', desc: 'Bunga kompetitif, tenor fleksibel, auto roll-over.', image: depositImage },
  { icon: TrendingUp, title: 'FlowInvest', desc: 'Reksadana & obligasi mulai Rp10 ribu, robo-advisor.', image: investImage },
  { icon: Landmark, title: 'Pinjaman', desc: 'KTA cair 1 hari, limit s/d Rp500 juta, tanpa agunan.', image: loanImage },
]

export const SERVICES: Feature[] = [
  { icon: ArrowLeftRight, title: 'Transfer', desc: 'BI-FAST, RTGS & antar bank real-time.', image: savingsImage },
  { icon: QrCode, title: 'QRIS', desc: 'Bayar apa saja lewat satu scan.', image: creditCardImage },
  { icon: Receipt, title: 'Bayar & Beli', desc: 'PLN, pulsa, BPJS, e-commerce.', image: loanImage },
  { icon: Smartphone, title: 'Cardless', desc: 'Tarik tunai di ATM tanpa kartu.', image: homeImage },
  { icon: Globe, title: 'Valas', desc: 'Kurs kompetitif 20+ mata uang.', image: investImage },
  { icon: ShieldCheck, title: 'Proteksi', desc: 'Asuransi & jaminan transaksi aman.', image: depositImage },
]

export interface Rate {
  code: string
  flag: string
  buy: string
  sell: string
}

export const RATES: Rate[] = [
  { code: 'AUD', flag: '🇦🇺', buy: '12.589,23', sell: '12.836,45' },
  { code: 'USD', flag: '🇺🇸', buy: '16.204,00', sell: '16.366,00' },
  { code: 'EUR', flag: '🇪🇺', buy: '17.480,55', sell: '17.688,20' },
  { code: 'SGD', flag: '🇸🇬', buy: '12.061,80', sell: '12.190,44' },
  { code: 'JPY', flag: '🇯🇵', buy: '108,42', sell: '109,73' },
  { code: 'GBP', flag: '🇬🇧', buy: '20.510,10', sell: '20.740,66' },
]
