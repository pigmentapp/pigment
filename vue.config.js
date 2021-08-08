module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background/',
      nodeIntegration: true,
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
