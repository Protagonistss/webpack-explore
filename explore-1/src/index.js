// init setup
// import "./native";

// Js hmr
// import counter from "./counter";
// import number from "./number";

// counter();
// number();

// // validation htr is setup?
// if (module.hot) {
//   module.hot.accept("./number.js", function () {
//     document.body.removeChild(document.getElementById("number"));
//     number();
//   });
// }

// es6 => es5
import "@babel/polyfill";
import "./es6-test";
