module.exports = {
	entry: "./app",
	output: {
		path: __dirname,
		filename: "bundle.js"
	},
	watch: true,
	module: {
		rules: [{
			test: /\.worker\.js$/,
			use: {
				loader: 'worker-loader'
			}
		}]
	}
}