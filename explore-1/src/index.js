import { getUser } from "./user";
import css from "./css/index.less";

function main() {
  console.log("hello world!!!!");
  console.log("css ele", css.ele);
}

const ele = `<div class=${css.ele}>hello world</div>`;
document.write(ele);
main();
console.log(getUser());
