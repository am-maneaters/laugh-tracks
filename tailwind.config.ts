import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
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
        "blinking-green": "blinking-green 0.5s ease-in-out infinite",
      },
      keyframes: {
        // blinking red for fail
        "blinking-red": {
          "0%, 100%": { backgroundColor: "rgba(255, 0, 0, 0.2)" },
          "50%": { backgroundColor: "rgba(255, 0, 0, 1)" },
        },
        // blinking green for success
        "blinking-green": {
          "0%, 100%": { backgroundColor: "rgba(0, 255, 0, 0.2)" },
          "50%": { backgroundColor: "rgba(0, 255, 0, 1)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
