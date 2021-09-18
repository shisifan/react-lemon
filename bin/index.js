#!/usr/bin/env node
'use strict';
// console.log('hello,world')
const program = require("commander");
const chalk = require('chalk');
const inquirer = require("../src/inquirer");
const create = require('../src/create')
const start = require('../src/start');
const helpOptions = require("../src/help");

// 查看版本号  
program.version(require('../package.json').version);

// 调用帮助和可选信息
helpOptions();
program
    .command('create')
    .description('create a new project')
    .option('-f --force', 'overwrite target directory if it exist')
    .action(() => {
        console.log(chalk.green('欢迎使用llemon,轻松构建react 项目')); 
        inquirer.create().then(res=>{
            if(res.conf){
                create(res)
                // console.log(res.lemon);
            }
        })
    })
program
    .command('start')
    .description('start a react project')
    .action(()=>{
        console.log(chalk.green('1运行项目 ------------')); 
        start('start').then(() => {
            console.log(chalk.green('------------- 运行完成 ------------'));
        })
    })
program
    .command('build')
    .description('build a .js or react file in production mode with zero config')
    // .action(createProjectAction)
    .action(()=>{
        console.log(chalk.green('------------- 构建项目 -------------'));
        start('build').then(() => {
            console.log(chalk.green('------------- 构建完成 ------------'));
        })
    })
program.parse(process.argv)
