const less = require("less");
module.exports = function (source, sourceMap, ast) {
  less.render(source, (e, outPut) => {
    this.callback(e, outPut.css, sourceMap, ast);
  });
};
