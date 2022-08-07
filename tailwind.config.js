module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comforter: ["Comforter", "cursive"],
        mochiy: ["Mochiy Pop One", "cursive"],
      },
      dropShadow: {
        'white': '0 35px 35px rgba(255, 255, 255, 1)',
      }
    },
    screens: {
      'vlg' : {'min' : '1250px'},
      'lg': {'max': '1170px'},
      'md': {'max': '900px'},
      'sm': {'max': '770px'},
      'vs': {'max': '550px'},
      'short': {'max': '400px'},
    },
    keyframes: {
      blink: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.3)' },
      }
    },
    animation: {
      blink: 'blink 1.5s ease-in-out infinite',
    },
  },
  plugins: [],
}
