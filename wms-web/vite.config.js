import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue' // 1. 关键改动：将 vue2 插件更换为 vue (Vue 3) 插件

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8081,
        // 你的后端代理设置，如果需要请取消注释并配置
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:8090', // 你的后端服务地址
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, '')
        //   }
        // }
    },
    plugins: [
        vue(), // 2. 关键改动：在这里使用 vue()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})