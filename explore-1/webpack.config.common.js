const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules")],
    alias: {
      // 减少查找过程，起一个别名
      "@": path.resolve(__dirname, "./src/css"),
      react: "./node_modules/react/umd/react.production.min.js",
      "react-dom": "./node_modules/react-dom/umd/react-dom.production.min.js",
    },
  },

  plugins: [new CleanWebpackPlugin()],
};
