module.exports = function (source, sourceMap, ast) {
  const cb = this.async();
  setTimeout(() => {
    const result = source.replace("hello", this.query.name);
    cb(null, result);
  }, 1000);
};
