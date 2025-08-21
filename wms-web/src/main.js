import { createApp } from 'vue'
import App from './App.vue'

// 1. 按需引入 Element Plus 组件库和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/global.css'
import axios from "axios"
import router from './router/RouterIndex'
import store from './store/StoreIndex'

// 2. 使用 createApp 创建应用实例
const app = createApp(App)

// 3. 全局配置 axios，注意 API 的变化
app.config.globalProperties.$axios = axios;
// 在Vue3中，你还可以为axios设置一个基础URL，这样在组件中调用时就不需要写完整的URL了
// axios.defaults.baseURL = 'http://localhost:8090'; // 你的后端地址

// 4. 通过 .use() 方法来安装插件
app.use(store)
app.use(router)
app.use(ElementPlus, { size: 'small' }) // 将 Element Plus 作为插件使用

// 5. 将应用挂载到 #app 元素上
app.mount('#app')