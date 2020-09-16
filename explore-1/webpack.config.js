const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  // entry: "./src/index.js",
  // entry: ["./src/index.js", "./src/user.js"],
  entry: {
    index: "./src/index.js",
    user: "./src/user.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[chunkhash:6].js",
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
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
        use: {
          loader: "file-loader",
          options: {
            name: "[name]-[hash:6].[ext]",
            outputPath: "images/",
          },
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "font",
          },
        },
      },
    ],
  },
};
