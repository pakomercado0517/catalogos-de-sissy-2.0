/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: "#242424",
        newGray: '#27374D'
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin"), require('tailwindcss-animated')],
};
