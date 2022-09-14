import queshenPic from "@/assets/images/queshen.png";
// /queshen.png?raw 以原始的二进制读取
console.log("pic ==> ", queshenPic);
const imgEl = document.createElement("img");
imgEl.src = queshenPic;
document.body.append(imgEl);

import json, { prefix } from "@/assets/json/index.json";
// 按需引入，树摇优化
console.log("json ==> ", json, prefix, JSON.stringify(json));
