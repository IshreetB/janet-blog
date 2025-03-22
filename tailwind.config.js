import { theme } from "./src/styles/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#f8f6ff",
          100: "#e9e4fc",
          200: "#d8cef9",
          300: "#c4b7f5",
          400: "#b29fee",
          500: "#9f88e8", // Main lavender color
          600: "#8a6ede",
          700: "#7454d3",
          800: "#5e3abe",
          900: "#48249e",
        },
        secondary: {
          50: "#fcf7ff",
          100: "#f6eeff",
          200: "#eddcff",
          300: "#e1c9ff",
          400: "#d0abff",
          500: "#bc8cff",
          600: "#a56aff",
          700: "#8d47ff",
          800: "#7428ff",
          900: "#5a00ff",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-in": "slideIn 0.5s ease-out",
        "slide-in-up": "slideInUp 0.7s ease-out",
        "slide-left": "slideInLeft 0.6s ease-out",
        "slide-right": "slideInRight 0.6s ease-out",
        "rotate-in": "rotateIn 0.5s ease-out",
        float: "float 4s ease-in-out infinite",
        shine: "shine 3s infinite",
        "scale-in": "scaleIn 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideIn: {
          from: { transform: "translateY(20px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        slideInUp: {
          from: { transform: "translateY(30px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
        slideInLeft: {
          from: { transform: "translateX(-30px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        slideInRight: {
          from: { transform: "translateX(30px)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        rotateIn: {
          from: { transform: "rotate(-10deg) scale(0.95)", opacity: 0 },
          to: { transform: "rotate(0) scale(1)", opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scaleIn: {
          from: { transform: "scale(0.9)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      boxShadow: {
        fancy: "0 0 15px rgba(116, 84, 211, 0.3)",
        card: "0 10px 25px rgba(116, 84, 211, 0.15)",
        highlight: "0 0 15px rgba(116, 84, 211, 0.5)",
        inner: "inset 0 2px 4px 0 rgba(116, 84, 211, 0.06)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(120deg, #7454d3, #9f88e8)",
        "gradient-secondary": "linear-gradient(120deg, #bc8cff, #a56aff)",
        "gradient-text": "linear-gradient(to right, #7454d3, #bc8cff)",
        "gradient-subtle": "linear-gradient(to right, #f8f6ff, #fcf7ff)",
      },
      transitionDuration: {
        400: "400ms",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.primary.600"),
              "&:hover": {
                color: theme("colors.primary.800"),
              },
            },
            h1: {
              fontFamily: theme("fontFamily.heading").join(", "),
              color: theme("colors.gray.900"),
            },
            h2: {
              fontFamily: theme("fontFamily.heading").join(", "),
              color: theme("colors.gray.900"),
            },
            h3: {
              fontFamily: theme("fontFamily.heading").join(", "),
              color: theme("colors.gray.900"),
            },
            h4: {
              fontFamily: theme("fontFamily.heading").join(", "),
              color: theme("colors.gray.900"),
            },
            blockquote: {
              borderLeftColor: theme("colors.primary.300"),
              backgroundColor: theme("colors.primary.50"),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
};
