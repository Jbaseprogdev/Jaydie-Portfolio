/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8DB600',
        secondary: '#FF3333',
        'hero-bg': '#000000',
        'accent-green': '#9DC183',
        'accent-red': '#FF4444',
        'deep-red': '#CC0000',
        'card-bg': 'rgba(10, 10, 10, 0.8)',
        'neon-green': '#8DB600',
        'ai-yellow': '#FFD700'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('https://images.pexels.com/photos/3473569/pexels-photo-3473569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'cyber-grid': 'linear-gradient(rgba(141, 182, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(141, 182, 0, 0.1) 1px, transparent 1px)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shine': 'shine 3s infinite',
        'grid-move': 'gridMove 15s linear infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'cyber-glitch': 'glitch 2s infinite',
        'neon-text': 'neonTextPulse 1.5s ease-in-out infinite alternate',
        'hover-rotate': 'rotate 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(141, 182, 0, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(141, 182, 0, 0.8), 0 0 30px rgba(141, 182, 0, 0.6)' }
        },
        shine: {
          '0%': { transform: 'translateX(-100%) rotate(45deg)' },
          '100%': { transform: 'translateX(100%) rotate(45deg)' }
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' }
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        neonPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 15px rgba(141, 182, 0, 0.3), 0 0 30px rgba(141, 182, 0, 0.2), 0 0 45px rgba(141, 182, 0, 0.1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(141, 182, 0, 0.4), 0 0 40px rgba(141, 182, 0, 0.3), 0 0 60px rgba(141, 182, 0, 0.2)'
          }
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        }
      },
      backgroundSize: {
        'cyber': '50px 50px'
      }
    },
  },
  plugins: [],
}