const Koa = require("koa"); // 不能用es module 必须使用commonjs
const fs = require("fs");
const path = require("path");

const app = new Koa();

app.use(async (ctx) => {
  console.log("ctx", ctx.request, ctx.response);
  if (ctx.request.url === "/") {
    const context = await fs.promises.readFile(
      path.resolve(__dirname, "./index.html")
    );
    console.log(context.toString());
    ctx.response.body = context;
    ctx.response.set("Content-Type", "text/html");
  }
  if (ctx.request.url === "/main.js") {
    const mainContent = await fs.promises.readFile(
      path.resolve(__dirname, "./main.js")
    );
    console.log(mainContent.toString());
    ctx.response.body = mainContent;
    ctx.response.set("Content-Type", "text/javascript");
  }
  if (ctx.request.url === "/App.vue") {
    const VueContent = await fs.promises.readFile(
      path.resolve(__dirname, "./App.vue")
    );
    // ast语法分析 --> Vue.createElement() 构建原生dom
    console.log(VueContent.toString());
  }
});
app.listen(5173, () => {
  console.log("dev server listen on 5173");
});
