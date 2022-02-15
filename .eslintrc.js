module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['svelte3'],
  ignorePatterns: ['node_modules/', 'public', 'build'],
  extends: 'eslint:recommended',
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    },
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'never'
    ]
  }
}