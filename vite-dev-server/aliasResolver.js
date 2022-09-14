module.exports = function (conf, context) {
  const entires = Object.entries(conf);
  let lastContent = context;
  entires.forEach((entrie) => {
    const [key, value] = entrie;
    const index = value.indexOf("src");
    console.log("index ===>", index);
    const realPath = "./" + value.slice(index, value.length);
    lastContent = context.replace(key, realPath);
    console.log("context ===>", lastContent);
  });
  return lastContent;
};
