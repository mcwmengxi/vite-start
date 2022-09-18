const fs = require("fs");
const path = require("path");

// __dirname: 始终返回的是当前文件所在的目录
const res2 = fs.readFileSync(
  path.resolve(__dirname, "./src/style/variables.css")
);
// console.log("====> path.resolve: ", __dirname, res2.toString());

// 只能在当前目录运行
const res1 = fs.readFileSync("./src/style//variables.css");
// console.log("====> default: ", process.cwd(), res1.toString());

// commonjs规范的一个原理
// console.log("arguments", arguments);
// module.exports require() // es6 module import export for

// module

//exports = module.exports = {}

// 第5个成员 就是__dirname __filename

(function (exports, require, module, __filename, __dirname) {
  // require("");
  console.log("__dirname", __dirname);
})();
