const inquirer = require("inquirer");
const promptList = [
  {
    name: "conf",
    type: "confirm",
    message: "是否创建新的项目？",
  },
  {
    name: "name",
    message: "请输入项目名称？",
    when: (res) => Boolean(res.conf),
  },
  {
    name: "author",
    message: "请输入作者？",
    when: (res) => Boolean(res.conf),
  },
  {
    type: "list",
    name: "language",
    message: "请选择所需要的语言？",
    choices: ["js", "ts"],
    filter: function (val) {
      return val.toLowerCase();
    },
    when: (res) => Boolean(res.conf),
  },
  {
    name: "pack",
    type: "confirm",
    message: "是否需要打包？",
    when: (res) => Boolean(res.conf),
  },
  {
    name: "choosePack",
    type: "list",
    message: "请选择打包工具",
    choices: ["webpack", "vite"],
    filter: function (val) {
      return val.toLowerCase();
    },
    when: (res) => res.pack,
  },
  {
    type: "list",
    message: "请选择框架？",
    name: "lemon",
    choices: ["react", "vue"],
    filter: function (val) {
      return val.toLowerCase();
    },
    when: (res) => Boolean(res.conf),
  },
];
function create() {
  return new Promise((resolve) => {
    inquirer.prompt(promptList).then((res) => {
      resolve(res);
      console.log(res);
    });
  });
}
// create()
module.exports = { create };
