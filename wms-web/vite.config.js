import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// import legacy from '@vitejs/plugin-legacy'  // <--- 第 1 处：注释掉这一行
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8081
    },
    plugins: [
        vue2(),
        // legacy({                              // <--- 第 2 处：注释掉这三行
        //   targets: ['ie >= 11'],pnpm install
        //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
        // })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})