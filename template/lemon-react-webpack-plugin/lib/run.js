const EventEmitter = require('events').EventEmitter
const Server = require('webpack-dev-server/lib/Server')
const processOptions = require('webpack-dev-server/lib/utils/processOptions')
const yargs = require('yargs')
const merge = require('./merge')
const webpack = require('webpack')
const runMergeGetConfig = require('../config/webpack.base')

// 运行不同环境下的webpack
class RunningWebpack extends EventEmitter{
    // 绑定 running 方法
    constructor(options){
       super()
       this._options = options
       this.path = null
       this.config = null
       this.on('running',(type,...arg)=>{
           this[type] && this[ type ](...arg)
       })
    }
    // 接受不同状态下的webpack命令
    // type是主线程的传递过来的webpack命令，分为start和build
    // cwdPath是输入终端命令行的绝对路径
    listen({ type,cwdPath }){
       this.path = cwdPath
       this.type = type
       this.config = merge.call(this,runMergeGetConfig( cwdPath )(type))
       return new Promise((resolve,reject)=>{
           this.emit('running',type)
           this.once('error',reject)
           this.once('end',resolve)
       })
    }

    // 运行生产环境webpack
    build(){
        try{
            webpack(this.config,(err)=>{
               if(err){
                  this.emit('error')
               }else{
                  this.emit('end')
               }
            })
        }catch(e){
            this.emit('error')
        }

    }

    // 运行开发环境webpack
    start(){
        const that = this
        processOptions(this.config,yargs.argv,(config,options)=>{
            // 得到webpack  compiler
            const compiler = webpack(config);
            // 创建dev-server服务
            const server = new Server(compiler , options )
            // port 是在webpack.dev.js下的开发环境配置项中 设置的监听端口
            server.listen(options.port, options.host, (err) => {
              if (err) {
                that.emit('error')
                throw err;
              }
            })
        })
    }

}

module.exports = RunningWebpack