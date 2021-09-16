// 启动项目 
const child_process = require('child_process')
const chalk = require('chalk')
const fs = require('fs')
// 找到react-webpack-plugin的路径
const currentPath = process.cwd()+'/lemon-react-webpack-plugin';
module.exports = (type) => {
    return new Promise((resolve,reject)=>{
        //判断 lemon-react-webpack-plugin 是否存在 
        fs.exists(currentPath,(ext)=>{
            if(ext){ 
              // 存在 启动子进程 
              const children = child_process.fork(currentPath + '/index.js' )
              // 监听子进程信息 
              children.on('message',(message)=>{
                  const msg = JSON.parse( message )
                  if(msg.type ==='end'){
                      // 关闭子进程 
                      children.kill()
                      resolve()
                  }else if(msg.type === 'error'){
                       // 关闭子进程 
                      children.kill()
                      reject()
                  }
              })
              // 发送cwd路径 和 操作类型 start 还是 build  
              children.send(JSON.stringify({
                  cwdPath:process.cwd(),
                  type: type || 'build'
              }))
            }else{ 
               // 不存在，抛出警告，下载 
               console.log( chalk.red('lemon-react-webpack-plugin does not exist,please install lemon-react-webpack-plugin'))
            }
        })
    })
}
