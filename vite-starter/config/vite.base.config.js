import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import path from "path";

export default defineConfig({
  optimizeDeps: {
    exclude: [], // 指定不参与预构建的依赖
  },
  envPrefix: "YMY_",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@assets": path.resolve(__dirname, "../src/assets"),
    },
  },
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
});
