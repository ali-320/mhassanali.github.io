/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stoneBlack: '#0B0C0E',
        carvedRock: '#2C2E33',
        rockHighlight: '#3A3D42',
        stoneWhite: '#D4CFC7',
        accentGold: '#B8860B',
        steelBlue: '#8A9CA6',
        danger: '#9C2A2A',
        textLight: '#E8E6E1',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        hud: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
