/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include all your React components
  ],
  darkMode: 'class', // Enable dark mode with 'class' strategy
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Tailwind blue-600 custom
        secondary: '#60a5fa', // Tailwind blue-400 custom
        accent: '#facc15', // yellow-400 custom
        danger: '#dc2626', // red-600
        success: '#16a34a', // green-600
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'md-dark': '0 4px 6px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),       // Better styled forms
    require('@tailwindcss/typography'),  // Nice typography for docs & content
    require('@tailwindcss/aspect-ratio'), // Maintain aspect ratios
  ],
};
