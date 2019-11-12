const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MergeWatchedPlugin = require("./MergeWatchedFilesPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.config.base");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../static")
  },
  optimization: {
    minimizer: [new OptimizeCssPlugin(), new TerserPlugin()]
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
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
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
      }
      // {
      //   test: /\.html$/,
      //   use: "html-loader"
      // }
    ]
  }
});
