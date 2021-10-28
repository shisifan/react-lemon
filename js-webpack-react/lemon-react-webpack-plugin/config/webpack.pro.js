const TerserPlugin = require("terser-webpack-plugin");
const proConfig = {
  // devtool: 'cheap-module-source-map',
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 支持多进程
      }),
    ],
  },
};
module.exports = proConfig;
