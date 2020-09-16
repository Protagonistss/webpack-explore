const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  // entry: "./src/index.js,
  // entry: ["./src/index.js", "./src/user.js"],
  devtool: "source-map",
  entry: {
    index: "./src/index.js",
    user: "./src/user.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[chunkhash:6].js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    port: 8081,
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
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[chunkhash:8].css",
    }),
    new HtmlWebpackPlugin({
      title: "首页",
      // 选择html模版
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
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
