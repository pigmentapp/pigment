module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background/',
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
