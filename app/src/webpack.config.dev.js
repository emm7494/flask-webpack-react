const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.config.base");
const CopyPlugin = require("copy-webpack-plugin");
// const ExtraWatchPlugin = require("extra-watch-webpack-plugin");
// const MergeWatchedPlugin = require("./MergeWatchedFilesPlugin");

module.exports = merge(base, {
  mode: "development",
  devtool: "none",
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
    path: path.resolve(__dirname, "../static")
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeEmptyElements: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeTagWhitespace: true
      },
      filename: "../templates/_base.html",
      template: "./templates/_base.html",
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
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    }),
    new CopyPlugin([
      { from: "./templates/", to: "../templates" },
      {
        from: "./static/img",
        to: "../static/img",
        ignore: /^(js|scss)$/,
        force: true,
        copyUnmodified: true
      }
    ]),
    new CleanWebpackPlugin()
    // new MergeWatchedPlugin(),
    // new ExtraWatchPlugin({
    //   // dirs: ["../../templates/"],
    //   files: ["./templates/**/*.html", "../**/*.py"]
    // })
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|txt)$/,
        use: [
          // {
          //   loader: "url-loader",
          //   options: {
          //     limit: 8192
          //   }
          // },
          {
            loader: "file-loader",
            options: {
              name: "../[path][name].[ext]?[contentHash]"
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: "html-loader"
      }
    ]
  }
});
