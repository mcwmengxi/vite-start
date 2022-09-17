import { count } from "./counter.js";
import "./index.css";
import "./componentA";
import "./componentB";
import componentLess from "./index.module.less";
import "./variables.css";
console.log("componentLess", componentLess);
// es只能搜索./ / ../类型的路径，不能寻找node_modules，如果es支持node_modules，将会在浏览器中引入大量资源，降低性能
// 而common js规范支持在服务端引入
import _ from "lodash";
import lodashES from "lodash-es";
console.log("count", _);
console.log("import.meta.env_", import.meta.env);
console.log("lodash_es", lodashES);

import "@/resourceLoader.js";
import "@/svgLoader.js";

fetch("/api/user", {
  method: "post",
  data: {
    id: 13,
    name: "ymy",
  },
})
  .then((data) => {
    // console.log("data", data);
  })
  .catch((error) => {
    console.log("error", error);
  });
fetch("/api/get?id=12", {
  method: "get",
}).then((data) => {
  // console.log(data);
});
