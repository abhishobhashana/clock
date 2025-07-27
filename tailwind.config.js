/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      default: "rgba(0, 0, 0, 1)",
      primary: "rgba(26, 26, 26, 1)",
      secondary: "rgb(38, 38, 38)",
      white: "rgba(255, 255, 255, 1)",
      "light-white": "rgb(247, 247, 245)",
      "light-white-second": "rgb(227, 227, 227)",
      "light-bg": "rgb(242, 242, 247)",
      "dark-bg": "rgb(28, 28, 30)",
      "light-menu": "rgb(229 229 234)",

      border: "rgba(17, 17, 17, 0.25)",
      grey: "rgba(60, 60, 67, 0.36)",
      "light-grey": "rgb(67, 67, 69)",
      "light-grey-second": "rgb(168, 168, 174)",
      "light-grey-third": "rgb(108, 108, 108)",
      "light-grey-forth": "rgb(43, 43, 45)",

      blue: "rgba(10, 132, 255, 1)",
      seperator: "rgb(91, 118, 137)",
      "dark-seperator": "rgba(84, 84, 88, 0.65)",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      animation: {
        fade: "fade 1s linear infinite",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    variants: {},
  },
  plugins: [],
};
