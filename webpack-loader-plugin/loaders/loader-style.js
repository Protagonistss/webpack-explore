module.exports = function (source, sourceMap, ast) {
  console.log("style loader", source);

  return `const ele = document.createElement("style")
    ele.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(ele)
      `;
};
