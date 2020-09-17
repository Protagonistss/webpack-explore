const path = require("path");
const commonConfig = require("./webpack.config.common.js");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const devConfig = {
  mode: "development",
  devtool: "cheap-inline-source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[hash:6].js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    port: 8081,
    hot: true,
    hotOnly: true,
    // 第一种方式代理
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9098",
      },
    },
    // 第二种方式 mock server
    before(app, server) {
      app.get("/api/info", (req, res) => {
        res.json({ hello: "world" });
      });
    },
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
          "style-loader",
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "首页",
      // 选择html模版
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
