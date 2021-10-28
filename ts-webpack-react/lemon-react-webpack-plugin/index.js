const RunningWebpack = require('./lib/run')

// 创建一个运行程序，在webpack的不同环境下运行配置文件
const runner = new RunningWebpack()
process.on('message',message=>{
   const msg = JSON.parse( message )
   if(msg.type && msg.cwdPath ){
     runner.listen(msg).then(
          ()=>{
             process.send(JSON.stringify({ type:'end' }))
          },(error)=>{
             process.send(JSON.stringify({ type:'error' , error }))
          }
      )
   }
})

