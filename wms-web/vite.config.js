import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 确保你安装了 @types/node 来获得类型提示

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(), // 引入 Vue 插件，让 Vite 支持 .vue 文件
    ],

    // 配置解析选项
    resolve: {
        // 设置文件路径别名
        alias: {
            // '@' 别名指向 'src' 目录
            '@': path.resolve(__dirname, './src'),
        },
    },

    // 配置开发服务器
    server: {
        // host: '0.0.0.0', // 允许通过 IP 地址访问
        port: 8080, // 设置服务启动端口号，如果端口被占用，Vite 会自动尝试下一个可用端口
        open: true, // 设置服务启动时是否自动打开浏览器
        cors: true, // 允许跨域

        // 设置代理，用于解决开发环境下的跨域问题
        proxy: {
            // 字符串简写写法
            // '/foo': 'http://localhost:4567',

            // 选项写法
            '/api': {
                target: 'http://your-backend-api-server.com', // 目标后端服务地址
                changeOrigin: true, // 是否改变源地址
                rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径，去掉 '/api'
            },
        },
    },

    // 构建选项
    build: {
        outDir: 'dist', // 指定打包文件的输出目录
        assetsDir: 'assets', // 指定生成静态资源的存放路径
        sourcemap: false, // 构建后是否生成 source map 文件
    }
})