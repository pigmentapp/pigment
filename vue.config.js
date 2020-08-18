module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: [
        'is-url-relative-without-domain',
      ],
      builderOptions: {
        publish: {
          provider: 'github',
          releaseType: 'release',
          vPrefixedTagName: false,
        },
      },
    },
  },
};
