/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#0b0b0c',
        'darker-gray': '#141417',
        'darkish-gray': '#1d1d21',
        'light-gray': '#7a7a7d',
        'peach': '#ffdf93',
        'tangerine': '#ff9a3c',
        'scarlet': '#ff6160',
        'royal-blue': '#3375f0',
        'fresh-green': '#60ff83',
        'lavender': '#cea7ff',
        'white': '#ffffff',
        'soft-silver': '#d1d1d2'
      },
    },
  },
  plugins: [],
}

