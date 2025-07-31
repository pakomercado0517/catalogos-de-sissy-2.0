/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#1A1A1A", // Fondo principal más suave que el negro puro
          800: "#2B2B2B", // Para elementos elevados
          700: "#333333", // Para bordes y divisores
          600: "#404040", // Para elementos interactivos
        },
        accent: {
          DEFAULT: "#9F7AEA", // Un violeta elegante
          light: "#B794F4",
          dark: "#805AD5",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin"), require("tailwindcss-animated")],
};
