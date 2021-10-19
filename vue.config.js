module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.1.105:8031/api/',
        pathRewrite: {
          '^/api': '' // 重定向
        },
        changeOrigin: true, // 是否跨域
        secure: false /// /如果要代理 websockets，配置这个参数
      }
    }
  }
}
