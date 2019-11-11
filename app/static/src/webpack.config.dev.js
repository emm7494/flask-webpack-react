const path = require("path");
const merge = require("webpack-merge");
const ExtraWatchPlugin = require("extra-watch-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const base = require("./webpack.config.base");
// const MergeWatchedPlugin = require("./MergeWatchedFilesPlugin");

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
      filename: "../../templates/_base.j2",
      template: "./templates/base.ejs",
      hash: true,
      inject: true,
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
      files: ["../../templates/**/*.html", "../../**/*.py"]
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
