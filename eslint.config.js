const { createConfig } = require('@creo-team/eslint-config')

module.exports = [
  { ignores: ['eslint.config.js'] },
  ...createConfig({
    ignores: ['dist/**', 'examples/**'],
  }),
  {
    files: ['src/**/*.{ts,tsx}', 'vitest.config.ts'],
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'jsdoc/require-param': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-description-complete-sentence': 'off',
      'complexity': 'off',
      '@stylistic/lines-around-comment': 'off',
    },
  },
]
