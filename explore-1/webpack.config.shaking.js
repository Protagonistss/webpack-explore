const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
const { DllReferencePlugin } = require("webpack");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const HappyPack = require("happypack");

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
    concatenateModules: true,
    // splitChunks: {
    //   // 同步: initial, 异步: async, 所有模块: all
    //   chunks: "all",
    //   // 最小尺寸, 当模块大于30kb
    //   minSize: 30000,
    //   // 对模块进行二次分割时使用
    //   maxSize: 0,
    //   // 打包生成的chunk文件最少有几个chunks引用了这个模块
    //   minChunks: 1,
    //   //最大异步请求数,默认5
    //   maxAsyncRequests: 5,
    //   // 最大初始化请求数, 入口文件同步请求, 默认3
    //   maxInitialRequests: 3,
    //   // 打包分割符
    //   automaticNameDelimiter: "-",
    //   // 打包后的名称,处了bool值,还可以接受一个函数
    //   name: true,
    //   // 缓存
    //   cacheGroups: {
    //     lodash: {
    //       test: /lodash/,
    //       name: "lodash",
    //     },
    //     react: {
    //       test: /react|react-dom/,
    //       name: "react",
    //     },
    //   },
    // },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/react-manifest.json"),
    }),
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/lodash-manifest.json"),
    }),
    new HappyPack({
      id: "css",
      loaders: ["style-loader", "css-loader"],
      threads: 2,
    }),
    new HardSourceWebpackPlugin(),
    new SpeedMeasurePlugin(),
    // new BundleAnalyzerPlugin(),
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
        use: ["happypack/loader?id=css"],
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
