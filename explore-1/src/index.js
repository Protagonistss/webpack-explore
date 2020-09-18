// init setup
import "./setup/native.js";
import { getUser } from "./shaking/shaking";
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

// import React, { Component } from "react";
// import ReactDom from "react-dom";
// import _ from "lodash";

// class App extends Component {
//   render() {
//     return <div>hello world</div>;
//   }
// }

// ReactDom.render(<App />, document.getElementById("root"));
