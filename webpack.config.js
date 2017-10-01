const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const extractCSS = new ExtractTextPlugin("assets/[name].bundle.dev.css");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: ["./main.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
    filename: "assets/[name].bundle.dev.js"
  },
  module: {
    rules: [
      // HTML files or templates
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      // CSS files or stylesheets
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ["css-hot-loader"].concat(
          extractCSS.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1
                }
              },
            ]
          })
        )
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          "file-loader"
        ]
      },
      // Music
      {
        test: /\.(mp3|ogg|aac|flac)$/,
        use: [
          "file-loader"
        ]
      }
    ]
  },
  plugins: [
    extractCSS,
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: true
    })
  ],
  resolve: {
    extensions: [".js"]
  },
  devtool: "eval-source-map",
  devServer: {
    host: "0.0.0.0",
  }
}
