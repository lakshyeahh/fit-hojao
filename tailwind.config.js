
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.5)', opacity: '0.1' },
          '100%': { transform: 'scale(1)', opacity: '0.3' }
        }
      },
      animation: {
        pulse: 'pulse 2s infinite'
      }
    }
  },
  plugins: []
}
