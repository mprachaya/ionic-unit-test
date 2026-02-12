const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8100,
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', require('path').resolve(__dirname, 'src'));
  },
});
