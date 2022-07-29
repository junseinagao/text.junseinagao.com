const brandColors = {
  "outer-space": "#2d363a",
  "oxford-blue": "#2e3d4a",
  "slate-gray": "#718791",
  "green-white": "#e7ebdf",
  "chrome-white": "#ecf0d2",
  "golden-sand": "#f5e17e",
  "apricot-peach": "#f9babc",
  scooter: "#37b9d7",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,md,mdx}", "./public/**/*.{md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        "rampart-one": ["Rampart One", "sans-serif"],
        "zen-old-mincho": ["zen-old-mincho", "sans-serif"],
        "din-2014": ["din-2014", "sans-serif"],
        "source-han-sans-jp": ["source-han-sans-japanese", "sans-serif"],
      },
      colors: {
        brand: {
          text: {
            DEFAULT: brandColors["outer-space"],
            light: "#566064",
            dark: "#031014",
            "in-dark": {
              DEFAULT: "#e7ebdf",
            },
          },
          base: {
            DEFAULT: "#e7ebdf",
            dark: "#b5b9ad",
            accent: "#ecf0d2",
            "in-dark": "#2d363a",
          },
          yellow: {
            DEFAULT: "#f5e17e",
            light: "#ffffaf",
            dark: "#c0af4f",
          },
          red: {
            DEFAULT: "#f9babc",
            light: "#ffedee",
            dark: "#c58a8c",
          },
          blue: brandColors["scooter"],
          sub: brandColors["slate-gray"],
        },
      },
    },
  },
  plugins: [],
};
