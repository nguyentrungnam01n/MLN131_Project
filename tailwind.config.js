import { defineConfig } from "@tailwindcss/vite";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          red: "#DA020E",
          gold: "#FFD700",
          "dark-red": "#B8001F",
          "light-gold": "#FFF8DC",
          "accent-yellow": "#FFEB3B",
        },
        neutral: {
          "dark-gray": "#2C2C2C",
          "medium-gray": "#666666",
          "light-gray": "#F5F5F5",
        },
      },
      fontFamily: {
        serif: ["Merriweather", "Times New Roman", "Georgia", "Times", "serif"],
        sans: [
          "Roboto",
          "Arial",
          "Tahoma",
          "Verdana",
          "Segoe UI",
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "fade-in-left": "fadeInLeft 0.8s ease-out",
        "fade-in-right": "fadeInRight 0.8s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      backgroundImage: {
        "hero-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpolygon points='30,10 20,50 40,50'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        "hero-gradient":
          "linear-gradient(135deg, rgba(218, 2, 14, 0.9) 0%, rgba(184, 0, 31, 0.9) 100%)",
        "card-gradient": "linear-gradient(145deg, #FFFFFF 0%, #FFF8DC 100%)",
        "accent-gradient": "linear-gradient(45deg, #FFD700, #FFEB3B)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0, 0, 0, 0.1)",
        "soft-hover": "0 20px 40px rgba(0, 0, 0, 0.15)",
        "inner-soft": "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
});
