/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        0.25: "0.0625rem",
      },
      borderRadius: {
        15: "15px",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        yellow: {
          light: "#FED219",
          DEFAULT: "#FECB2E",
        },
        green: {
          light: "#2CA000",
          DEFAULT: "#2CA000",
        },
        orange: {
          DEFAULT: "#FF8D1E",
          dark: "#F9762E",
        },
        purple: "#8486D7",
        bayoux: "#3B6277",
        black: {
          primary: "#28273F",
          secondary: "#242438",
          tertiary: "#20202D",
        },
        // #72747D
        gray: {
          primary: "#72747D",
          secondary: "#A0A3B1",
          tertiary: "#D1D2D9",
        },
      },

      keyframes: {
        dl5pip: {
          "0%": {
            transform: "translate(0px, -1em) rotate(-45deg)",
          },
          "5%": {
            transform: "translate(0px, -1em) rotate(-50deg)",
          },
          "20%": {
            transform: "translate(1em, -2em) rotate(47deg)",
          },
          "25%": {
            transform: "translate(1em, -2em) rotate(45deg)",
          },
          "30%": {
            transform: "translate(1em, -2em) rotate(40deg)",
          },
          "45%": {
            transform: "translate(2em, -3em) rotate(137deg)",
          },
          "50%": {
            transform: "translate(2em, -3em) rotate(135deg)",
          },
          "55%": {
            transform: "translate(2em, -3em) rotate(130deg)",
          },
          "70%": {
            transform: "translate(3em, -4em) rotate(217deg)",
          },
          "75%": {
            transform: "translate(3em, -4em) rotate(220deg)",
          },
          "100%": {
            transform: "translate(0px, -1em) rotate(-225deg)",
          },
        },
      },
    },
  },

  // add daisyUI plugin
  plugins: [require("daisyui")],

  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
