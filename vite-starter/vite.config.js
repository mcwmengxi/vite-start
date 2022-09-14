import { defineConfig, loadEnv } from "vite";
import viteBaseConfig from "./config/vite.base.config";
import viteDevConfig from "./config/vite.dev.config";
import viteProdConfig from "./config/vite.prod.config";

import "./path";
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
  // console.log("process", process.env);
  console.log("current_content", process.cwd());
  const env = loadEnv(mode, process.cwd(), "");
  // console.log("env_: ", env);
  return envResolver[command]();
});
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
