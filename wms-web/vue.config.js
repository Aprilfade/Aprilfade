const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080, // 指定前端应用的端口
    proxy: {
      '/api': { // 匹配所有以 /api 开头的请求
        target: 'http://localhost:8090', // 代理的目标地址 (你的后端服务)
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 将请求中的 /api 前缀去掉
        }
      }
    }
  }
})