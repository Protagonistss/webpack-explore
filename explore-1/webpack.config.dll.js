const path = require("path");
const { DllPlugin } = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    react: ["react", "react-dom"],
    lodash: ["lodash"],
  },
  output: {
    path: path.resolve(__dirname, "./dll"),
    filename: "[name].dll.js",
    library: "afterbuild",
  },
  plugins: [
    new DllPlugin({
      // manifest.json文件的输出位置
      path: path.join(__dirname, "./dll", "[name]-manifest.json"),
      // 定义打包的公共的vendor文件对外暴露的函数名
      name: "afterbuild",
    }),
  ],
};
