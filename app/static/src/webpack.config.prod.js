const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const base = require("./webpack.config.base");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "bundle.[contentHash].js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "../../templates/_main.bundle.js.html",
      template: "./templates/main.bundle.js.html"
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.html$/,
        use: "html-loader"
      }
    ]
  }
});
