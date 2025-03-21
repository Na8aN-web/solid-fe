/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003366",
        customGray1: "#3D3D3D"
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      }
    },
    extend: {
      colors: {
        primary: "#003366",
        customGray1: "#3D3D3D",
        customGray2: "#9A9A9A",
        customGray3: "#827E7E",
        shadeGray: "#5E5E5E",
        customDark: "#1E1E1E",
        customBrown: "#2D2828",
        customLight: "#F9F9F9",
        customGold: "#FFC300",
      }
    },
  },
  plugins: [],
};
