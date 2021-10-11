// 下载依赖
const which = require('which')

function runCmd(cmd, args, fn) {
  args = args || [];
  // child_process.spawn(command, args, options)
  // inherit：通过相应的 stdio 流传入/传出父进程。在前三的位置，这相当于 process.stdin，process.stdout和process.stderr分别。在任何其他位置，相当于'ignore'。
  var ls = require('child_process').spawn(cmd, args, {stdio: 'inherit'})
  ls.on('close', code => {
    if(fn) {
      fn(code)
    }
  })
}
findNpm();
function findNpm() {
  // process.platform属性是流程模块的内置应用程序编程接口，用于获取操作系统平台信息
  var npm = process.platform === 'win32' ? ['npm.cmd'] : ['npm'];
  for (var i = 0; i < npm.length; i++) {
    try {
      return npm[i]
    } catch (e) {}
  }
  throw new Error('please install npm')
}
module.exports = function (installArg = [ 'install' ]) {
  const npm = findNpm()
  return function (done){
    runCmd( which.sync(npm),installArg, function () {
      done && done()
     })
  }
}
