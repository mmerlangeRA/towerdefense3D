const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.dev");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
		  terserOptions: {
			mangle: {
			  properties: {
				regex: /^_m_/, // the same prefixes like for custom transformer
			  }
			}
		  },
		}
		)] 
	}
});
