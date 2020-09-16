const path = require("path");

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
    filename: "[name].js",
  },
};
