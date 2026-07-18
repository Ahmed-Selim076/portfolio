/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#020409",
        surface: "#050B16",
        border: "#1B3054",
        primary: "#0A6CFF",
        "primary-bright": "#3DA9FF",
        electric: "#00D9FF",
        "primary-dim": "rgba(10, 108, 255, 0.18)",
        "primary-glow": "rgba(61, 169, 255, 0.6)",
        "text-primary": "#EEF4FC",
        "text-secondary": "#7C93B5",
        "text-code": "#3DA9FF",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
    },
  },
  plugins: [],
};
