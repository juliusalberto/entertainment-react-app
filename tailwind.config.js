/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-red': '#FC4747',       // primary red
        'very-dark-blue': '#10141E', // deep blue
        'semi-dark-blue': '#161D2F',      // dark blue
        'gray-blue': '#5A698F',      // grayish blue
        'white': '#FFFFFF',          // classic white
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'heading-l': '32px',  // large heading
        'heading-m': '24px',  // medium heading
        'heading-s': '24px',  // small heading
        'heading-xs': '18px', // extra small heading
        'body-m': '15px',     // medium body text
        'body-s': '13px',     // small body text
      },
    },
  },
  plugins: [],
}