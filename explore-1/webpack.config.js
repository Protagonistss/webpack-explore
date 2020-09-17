const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  // entry: "./src/index.js,
  // entry: ["./src/index.js", "./src/user.js"],
  devtool: "source-map",
  entry: {
    index: "./src/index.js",
  },
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
  ],
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules")],
    alias: {
      // 减少查找过程，起一个别名
      "@": path.resolve(__dirname, "./src"),
      react: "./node_modules/react/umd/react.production.min.js",
      "react-dom": "./node_modules/react-dom/umd/react-dom.production.min.js",
    },
    extensions: ["js", ".json", ".jsx"],
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
