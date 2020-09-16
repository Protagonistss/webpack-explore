import css from "./css/index.less";
import picture from "./images/download.jpeg";
import axios from "axios";

axios.get("/api/info").then((res) => {
  console.log("res", res);
});

function main() {
  console.log("hello world!!!!");
  console.log("css ele", css.ele);
}
main();

const ele = `<div class=${css.ele}>hello world</div>`;
document.write(ele);

const img = new Image();
img.src = picture;

const root = document.getElementById("root");
root.append(img);
