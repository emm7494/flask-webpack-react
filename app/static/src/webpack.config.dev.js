const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const base = require("./webpack.config.base");

module.exports = merge(base, {
  mode: "development",
  devServer: {
    open: false,
    writeToDisk: true,
    liveReload: true,
    inline: true,
    port: 8080,
    host: "0.0.0.0",
    proxy: {
      "/": "http://localhost:5000"
    },
    publicPath: "/",
    overlay: {
      warnings: true,
      errors: true
    },
    stats: "minimal"
  },
  output: {
    filename: "[name].bundle.js",
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
