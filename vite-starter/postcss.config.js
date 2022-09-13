const path = require("path");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [
    postcssPresetEnv({
      importFrom: path.resolve(__dirname, "./variables.css"),
    }),
  ],
};
