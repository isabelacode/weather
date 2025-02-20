module.exports = {
   env: {
      browser: true,
      es2021: true,
      jest: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:prettier/recommended',
   ],
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
   },
   plugins: ['react'],
   settings: {
      react: {
         version: 'detect',
      },
   },
   rules: {
      'react/react-in-jsx-scope': 'off',
   },
};
