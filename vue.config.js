module.exports = {
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/background/',
      nodeIntegration: true,
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
