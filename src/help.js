const program = require("commander");
const chalk = require("chalk");

const helpOptions = () => {
  // 增加自己的options
  program.option("-l --lemon", "a lemon test");
  program.option("-d --destination <destination>", "a destination folder");
  program.option("-f --framework <framework>", "your framework");

  // 增加其他的options
  program.on("--help", function () {
    console.log("");
    console.log("Other:");
    console.log("  other options");
    console.log(
      `\r\nRun ${chalk.cyan(
        `llemon <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });
};
module.exports = helpOptions;
