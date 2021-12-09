// const Timestamp = new Date().getTime()
module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://33y1h15106.qicp.vip/api',
        pathRewrite: {
          '^/api': '' // 重定向
        },
        changeOrigin: true, // 是否跨域
        secure: false /// /如果要代理 websockets，配置这个参数
      }
    }
  },
  // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
  configureWebpack: {
    output: {
      // filename: `static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      // chunkFilename: `static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
      filename: 'static/js/[name].[hash].js',
      chunkFilename: 'static/js/[name].[hash].js'
    }
  }
}
