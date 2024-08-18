/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Custom primary color
        secondary: '#9CA3AF', // Custom secondary color
        darkBg: '#1F2937', // Dark background color
        darkText: '#F3F4F6' // Dark text color
      },
    },
  },
  plugins: [],
};
