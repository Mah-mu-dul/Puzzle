/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  safelist: [
    "bg-blue-100",
    "bg-red-100",
    "bg-emerald-100",
    "bg-indigo-100",
    "bg-purple-100",
    "bg-cyan-100",
    "bg-orange-100",
    "bg-blue-200",
    "bg-lime-100",
    "bg-fuchsia-100",
    "bg-amber-100",
    "bg-red-200",
    "bg-green-100",
    "bg-yellow-100",
    "bg-pink-100",
    "bg-emerald-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-cyan-200",
    {
      pattern:
        /bg-(blue|red|emerald|indigo|purple|cyan|orange|lime|fuchsia|amber|green|yellow|pink)-(100|200|300|400|500|600)/,
    },
  ],
  theme: {
    screens: {
      sm: "230px",
      // => @media (min-width: 640px) { ... }

      md: "700px",
      // => @media (min-width: 1024px) { ... }

      lg: "1000px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
};
