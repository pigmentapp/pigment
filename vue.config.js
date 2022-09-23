const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
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
  transpileDependencies: true,
});
