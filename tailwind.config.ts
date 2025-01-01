export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,md,mdx,astro}"],
  theme: {
    extend: {
      fontFamily: {
        "rampart-one": ["Rampart One", "sans-serif"],
        "din-2014": ["din-2014", "sans-serif"],
        "toppan-bunkyu-gothic-pr6n": [
          "toppan-bunkyu-gothic-pr6n",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          text: {
            DEFAULT: "var(--color-outer-space)",
            light: "var(--color-brand-text-light)",
            dark: "var(--color-brand-text-dark)",
            "in-dark": {
              DEFAULT: "var(--color-brand-text-in-dark)",
            },
          },
          base: {
            DEFAULT: "var(--color-green-white)",
            dark: "var(--color-brand-base-dark)",
            accent: "var(--color-brand-base-accent)",
            "in-dark": "var(--color-brand-base-in-dark)",
          },
          yellow: {
            DEFAULT: "var(--color-golden-sand)",
            light: "var(--color-brand-yellow-light)",
            dark: "var(--color-brand-yellow-dark)",
          },
          red: {
            DEFAULT: "var(--color-apricot-peach)",
            light: "var(--color-brand-red-light)",
            dark: "var(--color-brand-red-dark)",
          },
          blue: "var(--color-scooter)",
          sub: "var(--color-slate-gray)",
        },
      },
    },
  },
  plugins: [],
};
