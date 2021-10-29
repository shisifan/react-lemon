const fs = require("fs");
const merge = require("webpack-merge");

//  合并配置
function configMerge(Conf, config) {
  const {
    dev = Object.create(null),
    pro = Object.create(null),
    base = Object.create(null),
  } = Conf;
  if (this.type === "start") {
    return merge(config, base, dev);
  } else {
    return merge(config, base, pro);
  }
}

// config 经过 runMergeGetConfig 得到的脚手架基础配置
function mergeConfig(config) {
  const targetPath = this.path + "/lemon.config.js";
  const isExi = fs.existsSync(targetPath);
  if (isExi) {
    // 获取开发者自定义配置
    const personify = require(targetPath);
    const mergeConfigResult = configMerge.call(this, personify, config);
    return mergeConfigResult;
  }
  // 返回最终打包的webpack配置项
  return config;
}

module.exports = mergeConfig;
