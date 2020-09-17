const commonConfig = require("./webpack.config.common");
const devConfig = require("./webpack.config.dev");
const prodConfig = require("./webpack.config.prod");
const merge = require("webpack-merge");

module.exports = () => {
  let config;
  switch (process.env.NODE_ENV) {
    case "production":
      config = merge(commonConfig, prodConfig);
      break;
    case "development":
      config = merge(commonConfig, devConfig);
      break;
    default:
      config = merge(commonConfig, devConfig);
      break;
  }
  return config;
};
