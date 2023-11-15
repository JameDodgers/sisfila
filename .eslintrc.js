module.exports = {
  root: true,
  extends: ["prettier"],
  plugins: ["import"],
  parser: "@typescript-eslint/parser",
  rules: {
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling"],
        pathGroups: [
          {
            pattern: "react+(|-native)",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react+(|-native)"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/first": 2,
    "import/newline-after-import": 2,
    "import/no-duplicates": 2,
    "import/no-useless-path-segments": 2,
  },
};
