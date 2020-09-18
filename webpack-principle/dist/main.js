(function(graph){
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
      require('./src/index.js')
      
    })({"./src/index.js":{"dependencies":{"./user.js":"./src/user.js","./age.js":"./src/age.js"},"code":"\"use strict\";\n\nvar _user = _interopRequireDefault(require(\"./user.js\"));\n\nvar _age = _interopRequireDefault(require(\"./age.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nconsole.log(\"Hello world!\");"},"./src/user.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = \"get user\";\nexports[\"default\"] = _default;"},"./src/age.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = 18;\nexports[\"default\"] = _default;"}})