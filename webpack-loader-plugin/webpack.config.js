const path = require("path");
module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  // 解决loader路径的问题
  resolveLoader: { modules: ["node_modules", "./loaders"] },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "replace-inh.js",
      //       options: {
      //         name: "hello everyone",
      //       },
      //     },
      //     {
      //       loader: "replace.js",
      //       options: {
      //         name: "protagonistss",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.less$/,
        use: ["loader-style", "loader-less"],
      },
    ],
  },
};
