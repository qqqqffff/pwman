/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#93c5fd',
        'primary-light': '#dbeafe',
        'primary-dark': '#3b82f6',
        secondary: '#52525b',
        'secondary-light': '#94a3b8',
        'secondary-dark': '#3f3f46',
      },
    },
  },
  plugins: [],
}

