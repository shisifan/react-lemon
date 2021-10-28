const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack");
const merge = require("webpack-merge");
const devConfig = require("./webpack.dev");
const proConfig = require("./webpack.pro");

function Config(path) {
  return {
    entry: {
      main: "./src/index.js",
    },
    output: {
      path: path + "/dist",
      filename: "[name].js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        "@": path + "/src", // @ 表示根目录src路径
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              esModule: false,
              name: "[name]_[hash].[ext]",
              outputPath: "imgs/",
              // limit: 2048
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
          },
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path + "/src",
          use: ["happypack/loader?id=babel"],
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        filename: "index.html",
        template: "./index.html",
      }),
      new CleanWebpackPlugin(), // 自动删除webpack里的dist目录
      new MiniCssExtractPlugin({
        // 将css单独打包成一个文件的插件
        filename: "[name].css",
      }),
      // 多线程编译
      new HappyPack({
        id: "babel",
        loaders: ["babel-loader?cacheDirectory"],
        verbose: false,
      }),
    ],
  };
}

module.exports = function (path) {
  return (type) => {
    if (type === "start") {
      return merge(Config(path), devConfig(path));
    } else {
      return merge(Config(path), proConfig);
    }
  };
};
