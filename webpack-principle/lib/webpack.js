const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const path = require("path");
const { transformFromAst } = require("@babel/core");

module.exports = class webpack {
  constructor(options) {
    const { entry, output, mode } = options;
    this.entry = entry;
    this.output = output;
    this.mode = mode;
    this.moduleLink = [];
  }
  parse(entryAttr) {
    const content = fs.readFileSync(entryAttr, "utf-8");
    const ast = parser.parse(content, { sourceType: "module" });
    const dependencies = {};
    traverse(ast, {
      ImportDeclaration({ node }) {
        const joinPathName =
          "./" + path.join(path.dirname(entryAttr), node.source.value);
        dependencies[node.source.value] = joinPathName;
      },
    });
    const { code } = transformFromAst(ast, null, {
      presets: ["@babel/preset-env"],
    });
    return {
      entryAttr,
      dependencies,
      code,
    };
  }
  file(source) {
    // create self deal func and deal require、export、etc
    const filePath = path.join(this.output.path, this.output.filename);
    console.log(filePath);
    const sourceString = JSON.stringify(source);
    const bundle = `(function(graph){
      function require(module){
        function reRequire(relativePath){
          return require(graph[module].dependencies[relativePath])
        }
        var exports = {};
        (function(require, exports, code){
          eval(code)
        })(reRequire, exports, graph[module].code)
        return exports
      }
      require('${this.entry}')
      
    })(${sourceString})`;
    // genearte main.js to dist dir
    fs.writeFileSync(filePath, bundle, "utf-8");
  }
  run() {
    //1、 analyize entry file content
    const info = this.parse(this.entry);
    this.moduleLink.push(info);
    //2、analyize other module content
    for (let i = 0; i < this.moduleLink.length; i++) {
      const item = this.moduleLink[i];
      const { dependencies } = item;
      if (dependencies) {
        for (let key in dependencies) {
          const everyModuleInfo = this.parse(dependencies[key]);
          this.moduleLink.push(everyModuleInfo);
        }
      }
    }
    const obj = {};
    this.moduleLink.forEach((item) => {
      obj[item.entryAttr] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    this.file(obj);
  }
};
