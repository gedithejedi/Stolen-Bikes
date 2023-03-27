/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        padding: "20px",
        center: true,
        screens: {
          sm: "600px",
          md: "950px",
          lg: "950px",
          xl: "950px",
          "2xl": "950px",
        },
      },
      colors: {
        bgGray: "#f5f8fa",
        btnColour: "#2574A6",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

module.exports = config;
