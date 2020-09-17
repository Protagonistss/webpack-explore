const commonConfig = require("./webpack.config.common");
const devConfig = require("./webpack.config.dev");
const prodConfig = require("./webpack.config.prod");
const merge = require("webpack-merge");

module.exports = (env) => {
  let config;
  switch (env.production) {
    case env.production === true:
      config = merge(commonConfig, prodConfig);
      break;
    default:
      config = merge(commonConfig, devConfig);
      break;
  }
  return config;
};
