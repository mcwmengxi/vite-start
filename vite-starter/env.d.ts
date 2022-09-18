// 三斜线指令 相当于 import vite/client
/// <reference types="vite/client" />

// import.meta.env提供环境变量语法提示
interface ImportMetaEnv {
  readonly YMY_APP_KEY: string;
}
