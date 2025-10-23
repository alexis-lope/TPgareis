module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#fafafa",
        card: "#141414",
        "card-foreground": "#fafafa",
        primary: "#3b82f6",
        "primary-foreground": "#ffffff",
        secondary: "#1e293b",
        "secondary-foreground": "#f1f5f9",
        accent: "#10b981",
        "accent-foreground": "#ffffff",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        muted: "#27272a",
        "muted-foreground": "#a1a1aa",
        border: "#27272a",
        input: "#27272a",
        ring: "#3b82f6",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
