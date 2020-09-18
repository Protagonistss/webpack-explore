// init setup
// import "./setup/native.js";
// import { getUser } from "./shaking/shaking";
import _ from "lodash";
import "./react";

console.log("lodash", _.join(["1", "2", "3"], "*"));
getUser("protagonisths");

// Js hmr
// import counter from "./hmr/counter";
// import number from "./hmr/number";
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
// import "@babel/polyfill";
// import "./es6/es6-test";
