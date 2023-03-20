const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
	entry: path.join(__dirname, "/src/index.ts"),
	mode: "development",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist")
	},
    plugins: [
        new CopyPlugin({
			patterns: [
				{ from: "models", to: "models" },
                {
                from: path.resolve(__dirname, 'style.css')
                },
				{
					from: path.resolve(__dirname, 'index.html')
				}
            ]
        })
    ],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			// Handle our workers
			{
				test: /\.worker\.js$/,
				use: { loader: "worker-loader" },
			  },
		],
	},
	resolve: {
		alias: {
			three: path.resolve('./node_modules/three'),
			"@": path.resolve(__dirname, "src"),
			"@models": path.resolve(__dirname, "models"),
		},
		extensions: [".tsx", ".ts", ".js"],
		fallback: {
			fs: false,
			path: false,
			crypto: false,
		},
	},

	devServer: {
		host: "0.0.0.0",
		port: "8080",
		https: true,
		contentBase: path.join(__dirname, "dist"),
	}
};