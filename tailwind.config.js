/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "sab-color-1": "#2d3a6e",
        "sab-color-1-dark": "#1b223d",
        "sab-color-2": "#55c6d0",
        "sab-color-3": "#fecd68",
        "sab-color-3-dark": "#c59532",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
