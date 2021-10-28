const devConfig =(path)=>{
  return  {
    // devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    devServer: {
      contentBase: path + '/dist',
      open: true,        // 自动打开浏览器 
      // hot: true,
      historyApiFallback: true,
      publicPath: '/',
      port: 8000,       // 服务器端口 
      inline: true
    }
  }
}

module.exports = devConfig