const nativewind = require("nativewind/tailwind");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/{components,screens,routes}/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      g: ({ theme }) => theme("spacing"),
    },
  },
  presets: [nativewind],
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          g: (value) => ({
            gap: value,
          }),
        },
        { values: theme("g") }
      );
    }),
  ],
};
