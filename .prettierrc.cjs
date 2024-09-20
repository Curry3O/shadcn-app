// docs: https://prettier.io/docs/en/options.html
module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  importOrder: [
    '^react(.*)',
    '<THIRD_PARTY_MODULES>',
    '^@/interfaces(.*)$',
    '^@/constants(.*)$',
    '^@/utils(.*)$',
    '^@/hooks(.*)$',
    '^@/stores(.*)$',
    '^@/router(.*)$',
    '^@/api(.*)$',
    '^@/layouts(.*)$',
    '^@/components(.*)$',
    '^@/pages(.*)$',
    '^@/styles(.*)$',
    '^@/assets(.*)$',
    '(.*).scss$',
    '^[./]'
  ],
  importOrderSeparation: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss']
};
