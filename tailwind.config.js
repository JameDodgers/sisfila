const nativewind = require("nativewind/tailwind");
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/{components,screens,routes}/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  presets: [nativewind],
};
