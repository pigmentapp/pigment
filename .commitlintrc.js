module.exports = {
  extends: [
    '@commitlint/config-conventional',
  ],
  rules: {
    'scope-enum': [2, 'always', [
      'dimmer',
      'navigation',
      'notifications',
      'settings',
      'tabs',
      'titlebar',
      'webview',
      'window',
    ]],
  },
};
