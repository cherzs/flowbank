/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'Inter', 'sans-serif'],
        display: ['IBM Plex Sans', 'sans-serif'],
      },
      colors: {
        flow: {
          bg: '#020617',
          surface: '#0B1120',
          card: '#0E1629',
          border: '#1E293B',
          primary: '#10B981',
          'primary-600': '#059669',
          teal: '#2DD4BF',
          ink: '#F8FAFC',
          muted: '#94A3B8',
        },
      },
      keyframes: {
        'flow-float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'flow-float': 'flow-float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
