const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash:6].js",
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      title: "首页",
      // 选择html模版
      template: "./src/index.html",
      filename: "index.html",
    }),
    new PurifyCSS({
      paths: glob.sync([
        path.resolve(__dirname, "./src/*.html"),
        path.resolve(__dirname, "./src/*.js"),
      ]),
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules")],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "./src"),
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          // 开启css模块化
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "postcss-loader",
          },
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "url-loader",
          options: {
            name: "[name]-[hash:6].[ext]",
            outputPath: "images/",
            // url-loader 有limit, file-loader没有limit
            limit: 5 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "file-loader",
          options: {
            outputPath: "font/",
          },
        },
      },
    ],
  },
};
