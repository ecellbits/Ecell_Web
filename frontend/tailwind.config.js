/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // ⚡ Startup Minimal
        'startup-header': ['Outfit', 'sans-serif'],
        'startup-box': ['Plus Jakarta Sans', 'sans-serif'],
        'startup-body': ['Syne', 'sans-serif'],

        // 💼 Professional Tech
        'tech-header': ['Lexend', 'sans-serif'],
        'tech-box': ['Urbanist', 'sans-serif'],
        'tech-body': ['Inter', 'sans-serif'],

        // 🚀 Futuristic / LaunchPad
        'futuristic-header': ['Syne', 'sans-serif'],
        'futuristic-box': ['Satoshi', 'sans-serif'],
        'futuristic-body': ['Work Sans', 'sans-serif'],

        // 🧠 University + Modern
        'university-header': ['Syne', 'sans-serif'],
        'university-box': ['DM Sans', 'sans-serif'],
        'university-body': ['Inter', 'sans-serif'],

        // 🌐 Elegant + Premium
        'elegant-header': ['Clash Display', 'sans-serif'],
        'elegant-box': ['Satoshi', 'sans-serif'],
        'elegant-body': ['Manrope', 'sans-serif'],

        // ✨ Brand Typography from zip (apps/marketing)
        'sans': ['Manrope', 'Inter', 'sans-serif'],
        'copy': ['Manrope', 'sans-serif'],
        'display': ['"Inter Tight"', 'Inter', 'sans-serif'],
        'syne': ['Syne', 'sans-serif'],
        'header': ['Outfit', 'sans-serif'],
        'outfit': ['Outfit', 'Manrope', 'sans-serif'],
        'hypebuzz': ['Hypebuzz', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      letterSpacing: {
        'startup-header': '0.02em',
        'startup-box': '0.01em',
        'tech-header': '0.01em',
        'tech-box': '0.01em',
        'futuristic-header': '0.02em',
        'futuristic-box': '0.05em',
        'university-header': '0.01em',
        'university-box': '0.01em',
        'elegant-header': '0.02em',
        'elegant-box': '0.05em',
      },
      colors: {
        'ecell-bg': '#FEF8E6', // Brand Cream
        'ecell-bg-light': '#ffffff', // Clean white
        'ecell-primary': '#0F1754', // Brand Navy
        'ecell-secondary': '#510609', // Brand Maroon
        'ecell-text': '#000000', // Black Ink
        'ecell-text-muted': '#66665e', // Muted text for editorial & brand pages
        'ecell-dark': '#000000', // Deep Black
        // Brand palette (logo guidelines)
        'brand-cream': '#FEF8E6',
        'brand-navy': '#0F1754',
        'brand-maroon': '#510609',
        'brand-ink': '#000000',
        'hairline': 'rgba(0, 0, 0, 0.12)',
        'hairline-strong': 'rgba(0, 0, 0, 0.24)',
        'page': '#FEF8E6',
        'surface': '#ffffff',
        'raised': '#f8f2e1',
        'ink': '#000000',
        'card': '#ffffff',
        'card-foreground': '#000000',
        'muted': '#f8f2e1',
        'muted-foreground': '#66665e',
      },
      animation: {
        'gradient-x': 'gradient-x 6s ease infinite',
        'fade-in': 'fade-in 2s ease-out',
        'pulse-glow': 'pulse-glow 2s infinite',
        'spin-slow': 'spin-slow 10s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 255, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 255, 0, 0.8)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
