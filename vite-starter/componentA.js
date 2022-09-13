import moduleA from "./a.module.css";

const nodeEle = document.createElement("div");
console.log("moduleA", moduleA);
nodeEle.className = moduleA.footerContent;
document.body.append(nodeEle);
