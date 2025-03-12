 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#003366",
        customGray1: "#3D3D3D",
        customDark: "#1E1E1E",
        customBrown: "#2D2828",
        customLight: "#F9F9F9",
        customGold: "#FFC300",
      }
    },
  },
  plugins: [],
}