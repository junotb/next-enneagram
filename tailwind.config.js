const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "var(--theme-primary)",
          secondary: "var(--theme-secondary)",
          background: "var(--theme-background)",
          surface: "var(--theme-surface)",
          text: "var(--theme-text)",
          "text-muted": "var(--theme-text-muted)",
        },
      },
      backgroundImage: {
        "theme-gradient": "var(--theme-gradient)",
      },
    },
  },
  plugins: [heroui()],
};
