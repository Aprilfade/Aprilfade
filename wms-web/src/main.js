import { createApp } from 'vue'
import App from './App.vue'
import router from './router/RouterIndex'
import store from './store/StoreIndex' // Vuex 仍然可以和 Vue 3 兼容
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/global.css'

const app = createApp(App)

// 全局注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus)

// 挂载应用
app.mount('#app')

// 注意：这里我们不再需要 axios 的全局挂载，因为 Vue 3 推荐在需要的地方单独导入
// 如果你的其他组件依赖全局的 $axios, 你可能需要调整它们