module.exports = {
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended", // for js files
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "plugin:import/errors", // for catching immediately-executed imports like "import ./foo"
    "plugin:import/warnings",
    "plugin:import/typescript", // disable rules that overlap with typescript
  ],
  env: {
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
};
