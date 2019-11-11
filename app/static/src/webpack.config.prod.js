const path = require("path");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MergeWatchedPlugin = require("./MergeWatchedFilesPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const base = require("./webpack.config.base");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  optimization: {
    minimizer: [new OptimizeCssPlugin(), new TerserPlugin()]
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
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css"
    })
    // new MergeWatchedPlugin(),
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
