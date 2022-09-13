import moduleB from "./b.module.css";

const nodeEle = document.createElement("div");
console.log("moduleB", moduleB);
nodeEle.className = moduleB.footer;
document.body.append(nodeEle);
