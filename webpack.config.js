const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const plugins = [new HtmlWebpackPlugin({
    filename: "index.html",
    template: "src/index.html",
})]

if (process.env.NODE_ENV === "production") plugins.push(new UglifyJSPlugin())

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins,
}