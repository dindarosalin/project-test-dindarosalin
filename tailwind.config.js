/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screen: {
      ssm:'375px',
      sm:'640px',
      md:'768px',
      lg:'1024px',
      
    },
    extend: {
      colors: {
        orange: '#EF6C34'
      }
    },
  },
  plugins: [],
}

