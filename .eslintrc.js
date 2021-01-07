module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': ['error', { allow: ['_vm'] }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ],
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    __static: 'readonly',
  },
  settings: {
    'import/core-modules': [
      'electron',
      'vue-cli-plugin-electron-builder',
      'vue-cli-plugin-electron-builder/lib',
    ],
  },
};
