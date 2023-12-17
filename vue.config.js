const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  outputDir: "/docs",
  publicPath: "/who-is-yjh",
  configureWebpack: {
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "same-origin-allow-popups": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
});
