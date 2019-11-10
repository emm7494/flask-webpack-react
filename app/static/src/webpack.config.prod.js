const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MergeWatchedPlugin = require("./MergeWatchedFilesPlugin");
const ExtraWatchPlugin = require("extra-watch-webpack-plugin");
const base = require("./webpack.config.base");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "../../templates/_main.bundle.j2",
      template: "./templates/main.bundle.ejs",
      hash: true,
      inject: false,
      templateParameters: (compilation, assets, options) => {
        return {
          title: "Document title",
          files: assets,
          options: options,
          webpackConfig: compilation.options,
          webpack: compilation.getStats().toJson(),
          hash: compilation.getStats().hash
        };
      }
    }),
    new CleanWebpackPlugin(),
    // new MergeWatchedPlugin(),
    new ExtraWatchPlugin({
      // dirs: ["../../templates/"],
      files: ["../../templates/**/*.html"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|txt)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]?[contentHash]"
            }
          }
        ]
      }
      // {
      //   test: /\.html$/,
      //   use: "html-loader"
      // }
    ]
  }
});
