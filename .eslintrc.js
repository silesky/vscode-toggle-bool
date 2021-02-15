module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    createDefaultProgram: true,
    project: './tsconfig.json',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended', // for js files
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    es2021: true,
  },
};
