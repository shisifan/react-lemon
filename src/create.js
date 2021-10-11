const chalk = require('chalk')
const fs = require('fs')
const npm = require('./install')

let fileCount = 0  // 文件数量 
let dirCount = 0   // 文件夹数量 
let flat = 0       // readier数量 
let isInstall = false  // 判断

module.exports = function(res){
    // 创建文件 
    console.log(chalk.green('------------- 开始构建 -------------'))
    // 选择模版
    let sourcePath;
    if(res.lemon === 'react + ts'){
        sourcePath = __dirname.slice(0,-3)+'react-ts-template';
    }else if(res.lemon === "react"){
        sourcePath = __dirname.slice(0,-3)+'react-template';
    }else if(res.lemon === "vue"){
        sourcePath = __dirname.slice(0,-3)+'vue-template';
    }
    revisePackageJson(res,sourcePath ).then(()=>{
        copy(sourcePath, process.cwd(), npm())
    })
}
function runProject(){
    try{
        const doing = npm([ 'start' ])
        doing()
    }catch(e){
       utils.red('自动启动失败，请手动npm start 启动项目')
    }
}
function copy (sourcePath,currentPath,cb){
    flat++;
    // 读取文件夹下面的文件 
    fs.readdir(sourcePath,(err,paths)=>{
        flat--;
        if(err){
            throw err;
        }
        paths.forEach(path=>{
            if(path !== '.git' && path !=='package.json' ){
                fileCount++;
            }
            const newSourcePath = sourcePath + '/' + path;
            const newCurrentPath = currentPath + '/' + path;
            // 判断文件信息 
            fs.stat(newSourcePath,(err,stat)=>{
                if(err){
                    throw err;
                }
                // 判断是文件，且不是 package.json  
                if(stat.isFile() && path !=='package.json' ){
                    // 创建读写流 
                    const readSteam = fs.createReadStream(newSourcePath)
                    const writeSteam = fs.createWriteStream(newCurrentPath)
                    readSteam.pipe(writeSteam)
                    chalk.green( '创建文件：'+ newCurrentPath  )
                    fileCount--
                    completeControl(cb)
                // 判断是文件夹，对文件夹单独进行 dirExist 操作     
                }else if(stat.isDirectory()){
                    if(path!=='.git' && path !=='package.json' ){
                        dirCount++
                        dirExist( newSourcePath , newCurrentPath ,copy,cb)
                    }
                }
            })
        })
    })
}
function dirExist(sourcePath,currentPath,copyCallback,cb){
    fs.exists(currentPath,(ext=>{
        if(ext){
            /* 递归调用copy函数 */
            copyCallback( sourcePath ,currentPath, cb)
        }else {
            fs.mkdir(currentPath,()=>{
                fileCount--;
                dirCount--;
                copyCallback( sourcePath , currentPath,cb)
                console.log(chalk.yellow('创建文件夹：'+ currentPath))
                completeControl(cb)
            })
        }
    }))
}
function completeControl(cb){
    /* 三变量均为0，异步I/O执行完毕。 */
    if(fileCount === 0 && dirCount ===0 && flat===0){
        console.log(chalk.green('------------- 构建完成 -------------'))
        if(cb && !isInstall ){
            isInstall = true
            console.log(chalk.blue('------------- 开始安装 -------------'))
            cb(()=>{
                console.log(chalk.blue('------------- 完成安装 -------------'))
                /* 判断是否存在webpack  */
                runProject()
            })
        }
    }
}

// 修改package.json文件
function revisePackageJson(res,sourcePath){
    return new Promise((resolve)=>{
      /* 读取文件 */
        fs.readFile(sourcePath+'/package.json',(err,data)=>{
            if(err) throw err
            const {author, name  } = res
            let json = data.toString()
            /* 替换模版 */
            json = json.replace(/demoName/g,name.trim())
            json = json.replace(/demoAuthor/g,author.trim())
            const path = process.cwd()+ '/package.json'
            /* 写入文件 */
            fs.writeFile(path, new Buffer(json) ,()=>{
                console.log(chalk.green( '创建文件：'+ path))
                resolve()
            })
        })
    })
}

