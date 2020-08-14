module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: [
        'is-url-relative-without-domain',
      ],
      builderOptions: {
        publish: {
          releaseType: 'release',
          vPrefixedTagName: false,
        },
      },
    },
  },
};
