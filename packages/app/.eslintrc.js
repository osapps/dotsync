module.exports = {
  rules: {
    'consistent-return': 'off',
    'max-len': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state',
          'acc',
          'e',
        ],
      },
    ],
    'unicorn/filename-case': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  plugins: [
    'unicorn',
  ],
  extends: [
    'plugin:unicorn/recommended',
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  root: true,
  env: {
    node: true,
    mocha: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
