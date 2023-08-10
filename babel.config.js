module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "nativewind/babel"],
    plugins: [
      "transform-inline-environment-variables",
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
