export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        surface: "#1E1E1E",
        primary: {
          DEFAULT: "#FFD700",
          light: "#FFEB80",
          dark: "#CCAC00",
        },
        secondary: {
          DEFAULT: "#f2f2f2",
          dark: "#d9d9d9",
        },
        accent: {
          DEFAULT: "#00C2CB",
          light: "#67E8EF",
          dark: "#008287",
        },
        success: {
          DEFAULT: "#4CAF50",
          light: "#8BC34A",
          dark: "#2E7D32",
        },
        warning: {
          DEFAULT: "#FF9800",
          light: "#FFB74D",
          dark: "#E65100",
        },
        error: {
          DEFAULT: "#F44336",
          light: "#EF9A9A",
          dark: "#B71C1C",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      spacing: {
        8: "8px",
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        56: "56px",
        64: "64px",
      },
      fontSize: {
        display: ["4rem", { lineHeight: "1.2" }],
        h1: ["3.5rem", { lineHeight: "1.2" }],
        h2: ["2.5rem", { lineHeight: "1.2" }],
        h3: ["2rem", { lineHeight: "1.2" }],
        h4: ["1.5rem", { lineHeight: "1.2" }],
        body: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      boxShadow: {
        card: "0 8px 32px rgba(0, 0, 0, 0.08)",
        elevated: "0 16px 48px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
    },
  },
  plugins: [],
};
