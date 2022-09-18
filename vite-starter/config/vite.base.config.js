import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";
// 自动扫描src下的目录生成别名
import { ViteAliases } from "vite-aliases";
import { viteMockServe } from "vite-plugin-mock";
import checker from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";
import importToCDN from "vite-plugin-cdn-import";
import MyVitePluginHtml from "../plugins/vitePluginHtml";
import MyViteAliases from "../plugins/viteAliases";
import MyVitePluginMock from "../plugins/vitePluginMock";

// ToDo 此处换成导出函数会配置出错，待修复
export default defineConfig({
  optimizeDeps: {
    exclude: [], // 指定不参与预构建的依赖
  },
  envPrefix: "YMY_",
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "../src"),
  //     "@assets": path.resolve(__dirname, "../src/assets"),
  //   },
  // },
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
    devSourcemap: true, // 开启css sourcemap，提供文件索引，方便调试
    postcss: {
      plugins: [postcssPresetEnv()],
    },
  },
  // 构建生产版本
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "../index.html"),
        product: path.resolve(__dirname, "../nested/main2.html"),
      },
      output: {
        // 静态资源文件名hash化
        assetFileNames: "[name].[hash].[ext]",
        manualChunks: (id) => {
          // console.log("id", id);
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    outDir: "static", // 配置输出目录
    assetsDir: "public", // 配置输出目录中的静态资源目录
    // base64处理限制
    assetsInlineLimit: 4096,
    emptyOutDir: true, // 清除输出目录中的所有文件
  },
  plugins: [
    // ViteAliases(),
    MyViteAliases(),
    MyVitePluginMock(),
    MyVitePluginHtml({
      inject: {
        data: {
          title: "ymy",
          // injectScript: `<script src="./inject.js"></script>`,
        },
      },
    }),
    // createHtmlPlugin({
    //     /**
    //      * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
    //      * @default src/main.ts
    //      */
    //     entry: "main.js",
    //     /**
    //      * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
    //      * @default index.html
    //      */
    //     template: "index.html",
    //     /**
    //      * 需要注入 index.html ejs 模版的数据
    //      */
    //     inject: {
    //       data: {
    //         title: "ymy"
    //       }
    //     }
    // }),
    // viteMockServe({
    //   mockPath: "/mock",
    //   localEnabled: true,
    // })
    checker({
      typescript: true,
    }),
    viteCompression(),
    importToCDN({
      modules: [
        {
          name: "lodash",
          var: "_",
          path: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
        },
      ],
    }),
  ],
});
