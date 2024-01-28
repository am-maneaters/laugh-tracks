import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        segment: ["'7segment'", "sans-serif"],
        handwritten: ["'Permanent Marker'", "sans-serif"]
      },
      boxShadow: {
        // medium softshadow
        medium: "0 0 2px darkslategray",
        // hard shadow
        hard: "3px 6px",
        "hard-xl": "6px 12px",
      },
      // make it so when a button is clicked, it fills in the hard shadow space

      translate: {
        "fill-shadow-x": "3px",
        "fill-shadow-y": "6px",
      },
      animation: {
        // blinking red for fail
        "blinking-red": "blinking-red 0.5s ease-in-out infinite",
        // blinking green for success
        "blinking-green": "blinking-green 1.2s ease-in-out infinite",
      },
      keyframes: {
        // blinking red for fail
        "blinking-red": {
          "0%, 100%": { backgroundColor: "rgba(255, 0, 0, 0.2)" },
          "50%": { backgroundColor: "rgba(255, 0, 0, 1)" },
        },
        // blinking green for success
        "blinking-green": {
          "0%, 100%": { backgroundColor: "rgba(0, 255, 0, 0.3)" },
          "50%": { backgroundColor: "rgba(0, 255, 0, 0.6)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
