const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const { join } = require("path");

module.exports = class webpack {
  constructor(options) {
    const { entry, output, mode } = options;
    this.entry = entry;
    this.output = output;
    this.mode = mode;
  }
  parse(entryAttr) {
    const content = fs.readFileSync(entryAttr, "utf-8");
    const ast = parser.parse(content, { sourceType: "module" });
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const joinPathName =
          "./" + path.join(path.dirname(entryAttr), node.source.value);
        console.log(joinPathName);
        dependencies[node.source.value] = joinPathName;
      },
    });
    console.log(dependencies);
  }
  run() {
    this.parse(this.entry);
  }
};
