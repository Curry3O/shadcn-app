module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: {
    'block-opening-brace-space-before': 'always',
    // 禁止空第一行
    'no-empty-first-line': true,
    indentation: 2,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
  },
}
