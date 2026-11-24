/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#051F20',
          900: '#0B2B26',
          800: '#163832',
          700: '#235347',
        },
        sage: {
          400: '#8EB69B',
        },
        mint: {
          100: '#DAF1DE',
          200: '#C6E6CC',
          300: '#B3DBBB',
        },
        surface: {
          page: '#F5FAF6',
          card: '#FFFFFF',
          tint: '#EAF6ED',
        },
        line: {
          DEFAULT: '#D5E6D9',
        },
        ink: {
          DEFAULT: '#051F20',
          secondary: '#3F5A53',
          muted: '#5E766C',
        },
        success: {
          DEFAULT: '#237A4B',
          bg: '#E3F4E8',
        },
        warning: {
          DEFAULT: '#8A5A0B',
          bg: '#FFF3DC',
          fill: '#E0A030',
        },
        error: {
          DEFAULT: '#B3261E',
          bg: '#FDE8E6',
        },
        info: {
          DEFAULT: '#1F6F8B',
          bg: '#E3F1F6',
        },
        rating: {
          DEFAULT: '#F5B83D',
        },
      },
      borderRadius: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        xs: '0 1px 2px rgba(5,31,32,0.06)',
        sm: '0 4px 12px rgba(5,31,32,0.06)',
        md: '0 12px 32px rgba(5,31,32,0.08)',
        lg: '0 24px 64px rgba(5,31,32,0.12)',
        nav: '0 8px 24px rgba(5,31,32,0.18)',
        page: '0 32px 96px rgba(5,31,32,0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
