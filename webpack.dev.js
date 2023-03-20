const { merge } = require("webpack-merge");
const common = require("./webpack-common.config");

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: require.resolve('./src/index.ts'),
        exclude: /node_modules/
      }
    ]
  }
});

