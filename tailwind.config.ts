import { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      md: "640px",
      lg: "1024px",
      xl: "1500px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "var(--color-pure-white)",
      black: "var(--color-pure-black)",
      link: "var(--color-link-blue)",

      gray: {
        100: "var(--color-gray-100)",
        200: "var(--color-gray-200)",
        300: "var(--color-gray-300)",
        400: "var(--color-gray-400)",
        500: "var(--color-gray-500)",
        600: "var(--color-gray-600)",
        700: "var(--color-gray-700)",
        800: "var(--color-gray-800)",
        900: "var(--color-gray-900)",
      },
      state: {
        progress: "var(--color-state-progress)",
        "progress-bg": "var(--color-state-progress-bg)",
        done: "var(--color-state-done)",
        "done-bg": "var(--color-state-done-bg)",
        todo: "var(--color-state-todo)",
        "todo-bg": "var(--color-state-todo-bg)",
        danger: "var(--color-state-danger)",
        close: "var(--color-state-close)",
      },
    },
    extend: {
      fontSize: {
        xl: "1.375rem", // 22px
        "2xl": "1.5625rem", // 25px
        "3xl": "1.875rem", // 30px
        "4xl": "2.5rem", // 40px
        "5xl": "3.125rem", // 50px
        "6xl": "3.75rem", // 60px
        "7xl": "4.375rem", // 70px
      },
      fontFamily: {
        sans: ["times-new-roman"],
        serif: ["system-ui, Avenir, Helvetica, Arial, sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
