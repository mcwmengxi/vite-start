## 了解构建工具

### 一、什么是构建工具

> :bulb:集成一系列的编译工具，让使用者只关注代码

- `typescript`：tsc将typescript代码转化为js代码
- `React/Vue`：react-compiler/vue-compiler编译器将jsx或vue文件转化成render函数
- `sass/less/postcss/component-style`: less-loader\sass-loader等编译工具
- 语法降级`babel`: es6语法转化，兼容老旧浏览器
- 体积优化`uglifyjs`: 将代码压缩成体积更小、性能更好的压缩文件



> :bulb:打包：构建工具将代码编译处理成能放到指定环境中运行(如浏览器)的代码的过程

构建工具承担的职责

1. 模块化开发支持：支持从node_modules中引入代码，多种模块化支持
2. 处理代码兼容性： babel语法降级，postcss,ts语法转换(**不是构建工具做的, 构建工具将这些语法对应的处理工具集成进来自动化处理**)
3. 项目性能优化
4. 优化开发体验: 构建工具自动监听文件变化，并调用对应的集成工具进行重新打包，再到浏览器中重新运行。其实就是常说的**热更新**Hot Replacement
5. 开发服务器：解决开发环境的跨域问题

集成工具+热更新，自由编写代码

主流的构建工具

- webpack
- vite
- esbuild
- parcel
- rollup
- grunt
- gulp

### 二、Vite相较于webpack的优势

> 构建大型项目项目，使用JavaScript代码构建工具启动速度慢，像webpack，热更新速度也会受到一些影响

官方文档: https://cn.vitejs.dev/guide/why.html#the-problems

webpack支持多种模块化: 你的工程可能不只是跑在浏览器端

```js
// index.js
// 这一段代码最终会到浏览器里去运行
const lodash = require("lodash"); // commonjs 规范
import Vue from "vue"; // es6 module

// webpack是允许我们这么写的
```

webpack的编译原理, AST 抽象语法分析的工具 分析出你写的这个js文件有哪些导入和导出操作
构建工具是运行在服务端的 

```js
// webpack的一个转换结果
const lodash = webpack_require("lodash");
const Vue = webpack_require("vue");
```

```js
(function(modules) {
    function webpack_require() {}
    // 入口是index.js
    // 通过webpack的配置文件得来的: webpack.config.js ./src/index.js
    modules[entry](webpack_require);

}, ({
    "./src/index.js": (webpack_require) => {
        const lodash = webpack_require("lodash");
        const Vue = webpack_require("vue");
    }
}))
```

webpack支持多种模块化,所以一开始必须要统一模块化代码, 也就意味着它需要将所有的依赖全部读一遍

而vite是基于es-modules的，webpack更侧重兼容性, 而vite更侧重浏览器端的开发体验

vite的上手难度低一些, webpack的配置是非常多的, loader, plugin

### 三、Vite脚手架

vite官网搭建vite项目文档教程: https://vitejs.dev/guide/#scaffolding-your-first-vite-project

:pencil:执行`yarn create vite`

1. 首先安装一个create-vite(vite脚手架)
2. 运行create-vite的bin目录下的一个执行预设配置
3. 类似与vue-cli与webpack的关系，内置webpack

脚手架会集成一个最佳实践的配置，已经配置好vite, vue, post-css, less, babel

等相关工具

### 四、vite启动项目初体验

开箱即用(out of box): 你不需要做任何额外的配置就可以使用vite来帮你处理构建工作 `"dev": "vite"`

在默认情况下, 我们的`es module`去导入资源的时候, 要么是绝对路径, 要么是相对路径

既然我们需要导入node_modules, 那为什么es官方在我们导入非绝对路径和非相对路径的资源的时候不默认帮我们 搜寻node_modules呢？

// es只能搜索./ / ../类型的路径，不能寻找node_modules，如果es支持node_modules，将会在浏览器中引入大量资源，降低性能
// 而common js规范支持在服务端引入
### 五、vite依赖预构建

**依赖预构建**

> vite找到对应依赖，然后用esbuild对js语法进行处理，将其它规范代码转化·成commonjs规范放入到当前目录node_modules/.vite/deps，同时对esmodule规范的各个模块进行统一集成

```js
import _ from "lodash"; // lodash可能也import了其他的东西

// 转换
import _ from "/node_modules/.vite/lodash"; 
import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=ebe57916";

```

开发每次通过依赖预构建的路径都能读取到

生产环境全部交给rollup去打包

```js
// esmodule规范处理
//a.js
export default function a() {}

export { default as a  } from "./a.js"
// import a from a.js
// export const a = a

// vite预构建,用函数代替了模块
funtion a{}
```



**依赖预构建作用**

- 解决不同库导出格式不一致
- 对路径的处理上可以直接使用.vite/deps, 方便路径重写
- 解决了网络多包传输的性能问题，这也是esmodules原生不支持node_modules导出的原因,依赖预构建·会将导出的包集成一个或几个模块

**不进行依赖预构建**

```json
// vite.config.js
// export default defineConfig({
//   optimizeDeps: {
//     exclude: ["lodash-es"], // lodash-es库不进行依赖预构建
//   },
// });
```

### 六、vite配置文件

**语法提示**

```js
// 1.viteConfig增加语法提示
// 2.type 类型标注

// import { defineConfig } from "vite";
// export default defineConfig({
//   optimizeDeps: {
//     exclude: ["lodash-es"], // lodash-es库不进行依赖预构建
//   },
// });

/** @type import ("vite").UserConfig */
// const defineConfig = {
//   optimizeDeps: {
//     exclude: [],
//   },
// };

// export default defineConfig;

```

**不同环境配置**

```js
import { defineConfig } from "vite";
import viteBaseConfig from "./config/vite.base.config";
import viteDevConfig from "./config/vite.dev.config";
import viteProdConfig from "./config/vite.prod.config";

// 策略模式
const envResolver = {
  serve: () => {
    console.log("开发环境");
    return { ...viteBaseConfig, ...viteDevConfig };
  },
  build: () => {
    console.log("生产环境");
    return { ...viteBaseConfig, ...viteProdConfig };
  },
};

export default defineConfig(({ command, mode }) => {
  console.log("command and mode", command, mode);
  return envResolver[command]();
});
```



### 七、vite环境变量

> 会根据当前代码环境产生值变化的变量

**环境**

1. 开发环境
2. 测试环境
3. 预发布环境
4. 灰度环境
5. 生产环境

百度地图sdk、小程序sdk在不同环境下会使用不同的app_key

vite的工作就是让环境变量切换更便捷

**vite环境变量处理**

> vite内置dotenv第三方库读取`.env`文件用来解析环境变量，dotenv会将环境变量注入到process对象下，但考虑vite与其他配置的冲突不会直接注入到process对象下

与之冲突的配置

- root
- envDir 配置当前环境变量的文件路径

**解决方法**

- 调用vite的loadEnv方法来手动确认env文件

process.cmd 获取当前node进程的工作目录

.env 所有环境共用的环境变量

.env.development vite默认的开发环境变量文件

.env.production vite默认的生产环境变量文件

dev指令会默认将mode设置为development环境



调用loadenv时:

1. 直接找到.env文件不解释 并解析其中的环境变量 并放进一个对象里

2. 会将传进来的mode这个变量的值进行拼接: ```.env.development```,  并根据我们提供的目录去取对应的配置文件并进行解析, 并放进一个对象

```js
const baseEnvConfig = 读取.env的配置
const modeEnvConfig = 读取env相关配置
const lastEnvConfig = { ...baseEnvConfig, ...modeEnvConfig }

```



客户端vite会自动将环境变量注入到import.meta.env，同时也启用了拦截，只有vite_前缀才能被注入，可以通过使用envPrefix配置更改这个前缀



ps: 为什么vite.config.js可以书写成esmodule的形式, 这是因为vite他在读取这个vite.config.js的时候会率先node去解析文件语法, 如果发现你是esmodule规范会直接将你的esmodule规范进行替换变成commonjs规范

### 八、vite如何支持浏览器识别vue文件

```bash
// 使用社区模板，vite搭建的服务器在浏览器支持vue文件引入
yarn create vite vite-vue-demo --template vue

```



```js
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

```



### 九、vite处理css相关文件

**vite中处理css**

> vite天生就支持对css文件的直接处理

1. vite在读取到main.js中引用到了index.css
2. 直接去使用fs模块去读取index.css中文件内容
3. 直接创建一个style标签, 将index.css中文件内容直接放进style标签里
4. 将style标签插入到index.html的head中
5. 将该css文件中的内容直接替换为js脚本(方便热更新或者css模块化), 同时设置Content-Type为js 从而让浏览器以JS脚本的形式来执行该css后缀的文件

**css模块化**

> 处理协同开发样式重复被覆盖的问题

1. module.css (module是一种约定, 表示需要开启css模块化)
2. 他会将你的所有类名进行一定规则的替换（将footer 替换成 _footer_i22st_1）
3. 同时创建一个映射对象{ footer: "_footer_i22st_1" }
4. 将替换过后的内容塞进style标签里然后放入到head标签中 (能够读到index.html的文件内容)
5. 将componentA.module.css内容进行全部抹除, 替换成JS脚本
5. 将创建的映射对象在脚本中进行默认导出

less(预处理器): less给我们提供了一些方便且非常实用的方法，vite也同样支持less等预处理器模块化

**vite.config.js中css配置modules**

- localConvention 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)

- scopeBehaviour: 配置当前的模块化行为是模块化还是全局化 (有hash就是开启了模块化的一个标志, 因为他可以保证产生不同的hash值来控制我们的样式类名不被覆盖)
- generateScopedName: 生成的类名的规则(可以配置为函数, 也可以配置成字符串规则: https://github.com/webpack/loader-utils#interpolatename)
- hashPrefix: 生成hash会根据你的类名 + 一些其他的字符串(文件名 + 他内部随机生成一个字符串)去进行生成, 如果你想要你生成hash更加的独特一点, 你可以配置hashPrefix, 你配置的这个字符串会参与到最终的hash生成, （hash: 只要你的字符串有一个字不一样, 那么生成的hash就完全不一样, 但是只要你的字符串完全一样, 生成的hash就会一样）
- globalModulePaths: 代表你不想参与到css模块化的路径

**vite配置文件中css配置preprocessorOptions**

> 处理预处理器的一些全局参数

```js
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: [], // 指定不参与预构建的依赖
  },
  envPrefix: "YMY_",
  css: {
    // modules配置最终会丢给postcss modules
    modules: {
      localsConvention: "camelCase", // 模块化样式的key：驼峰式或中划线
      scopeBehaviour: "local", // 当前的模块化行为是全局化还是模块化
      // generateScopedName: "[name]_[local]_[hash:5]", // https://github.com/webpack/loader-utils#interpolatename
      // generateScopedName: (name, filename, css) => {
      //     // name -> css文件中的类名
      //     // filename -> 当前css文件的绝对路径
      //     // css -> 当前样式
      //     console.log("name", name, "filename", filename, "css", css);
      //     // 配置成函数以后, 返回值就决定了他最终显示的类型
      //     return `${name}_${Math.random().toString(36).substr(3, 8) }`;
      // },
      hashPrefix: "hello", // 生成hash会根据你的类名 + 一些其他的字符串(文件名 + 他内部随机生成一个字符串)去进行生成, 如果你想要你生成hash更加的独特一点, 你可以配置hashPrefix, 你配置的这个字符串会参与到最终的hash生成, （hash: 只要你的字符串有一个字不一样, 那么生成的hash就完全不一样, 但是只要你的字符串完全一样, 生成的hash就会一样）
      globalModulePaths: ["./b.module.css"], // 不想参与到css模块化的路径
    },
    preprocessorOptions: {
      // webpack在less-loader中配置
      less: {
        math: "always",
        globalVars: {
          themeColor: "#568283",
        },
      },
    },
    devSourcemap: true,// 开启css sourcemap，提供文件索引，方便调试
  },
});

```

**postcss**

> 对一些css新提案进行语法降级，进行兼容处理
>
> 前缀不全，--webkit-flex,预处理器不能提供的功能 

**使用**

vite中postcss字段优先级高于postcss.config.js

`pnpm i postcss-cli postcss postcss-preset-env -D`

`npx postcss style/postcss.css -o style/result.css`

```js
// postcss.config.js
// 预处理postcss
const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [
    postcssPresetEnv({
      importFrom: path.resolve(__dirname, "./variables.css"),// 变量需要存储起来，不是按需解析
    }),
  ],
};

// vite配置postcss
import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
export default defineConfig({
  optimizeDeps: {
    exclude: [], // 指定不参与预构建的依赖
  },
  envPrefix: "YMY_",
  css: {
    // modules配置最终会丢给postcss modules
    modules: {
      localsConvention: "camelCase", // 模块化样式的key：驼峰式或中划线
      scopeBehaviour: "local", // 当前的模块化行为是全局化还是模块化
    },
    preprocessorOptions: {
      // webpack在less-loader中配置
      less: {
        math: "always",
        globalVars: {
          themeColor: "#568283",
        },
      },
    },
    devSourcemap: true, // 开启css sourcemap，提供文件索引，方便调试
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
});
```

### 十、vite处理静态资源

```js
import queshenPic from "@/assets/images/queshen.png";
// /queshen.png?raw 以原始的二进制读取
console.log("pic ==> ", queshenPic);
const imgEl = document.createElement("img");
imgEl.src = queshenPic;
document.body.append(imgEl);

import json, { prefix } from "@/assets/json/index.json";
// 按需引入，树摇优化
console.log("json ==> ", json, prefix, JSON.stringify(json));
```

**svg图片使用**

```js
import svgIcon from "./assets/images/queshen.svg?url";
import svgRaw from "./assets/images/queshen.svg?raw";

console.log("svgIcon", svgIcon, svgRaw);
// 第一种使用svg的方式
document.body.innerHTML = svgRaw;
const svgElement = document.getElementsByTagName("svg")[0];

svgElement.onmouseenter = function() {
    // 而是fill属性
    this.style.fill = "red";
}

// 第二种加载svg的方式
// const img = document.createElement("img");
// img.src = svgIcon;
// document.body.appendChild(img);

```



**构建生产环境**

> 利用好hash算法 ,可以更好的去控制浏览器的缓存机制

```js
  // 构建生产版本
  build: {
    rollupOptions: {
      output: {
        // 静态资源文件名hash化
        assetFileNames: "[hash].[name].[ext]",
      },
    },
    outDir: "static", // 配置输出目录
    assetsDir: "public", // 配置输出目录中的静态资源目录
    // base64处理限制
    assetsInlineLimit: 4096,
    emptyOutDir: true, // 清除输出目录中的所有文件
  },
```



**path.resolve 和模块化原理**

node端读取文件对于相对路径会用process.cwd()方法去拼接

### 十一、vite插件

> 借助vite插件在vite的各个生命周期生效并实现不同的功能

webpack ===>  清除输出目录,`clear-webpack-plugin`

**vite-alias**
// 自动扫描src下的目录生成别名
import { ViteAliases } from "vite-aliases";
plugins下使用

```js
// vite-aliases实现原理
const fs = require("fs")
const path = require("path")
function getResolveDir() {
    const ResolveRes = {
        files: [],
        dirs: []
    }
    const result = fs.readdirSync(path.resolve(__dirname, "../src"))
    let fileInfo = null;
    result.forEach (item => {
        fileInfo =fs.statSync(path.resolve(__dirname, "../src" + "/" + item))
        if (fileInfo.isDirectory()) {
            ResolveRes.dirs.push(item)
        } else {
            ResolveRes.files.push(item)
        }

    })
    const resolveAliases = handleDir(ResolveRes.dirs, '@')
    // console.log(resolveAliases);
 
    return resolveAliases
}
function handleDir(dirs, prefix) {
    const resolveAliasesObj = {
        [prefix]: path.resolve(__dirname, "../src")
    }
    dirs.forEach( dir => {
        const key = `${prefix}${dir}`
        const pathValue =path.resolve(__dirname, "../src" + "/" + dir)
        // console.log(__dirname, pathValue);
        resolveAliasesObj[key] = pathValue
    })
    return resolveAliasesObj
}
module.exports = () => {
    return {
        config (config, env){
            // console.log("config ==> ", config, env);
            const resolveDir = getResolveDir();
            return {
                resolve: {
                    alias: resolveDir
                }
            }
        }
    }
}
```
