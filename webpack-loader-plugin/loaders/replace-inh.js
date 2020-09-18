module.exports = function (source, sourceMap, ast) {
  const cb = this.async();
  setTimeout(() => {
    const result = source.replace("protagonistss", this.query.name);
    cb(null, result, sourceMap, ast);
  }, 1000);
};
