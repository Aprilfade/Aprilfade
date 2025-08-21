// 1. 从 'vue-router' 中导入新的创建函数
import { createRouter, createWebHistory } from 'vue-router';
import HomeIndex from '../components/HomeIndex.vue';
import MyLogin from '../components/MyLogin.vue';

// 路由配置数组基本保持不变
const routes = [
    {
        path: '/',
        name: 'HomeIndex',
        component: HomeIndex,
        // 动态路由的子路由将由 Vuex 添加
        children: []
    },
    {
        path: '/login',
        name: 'MyLogin',
        component: MyLogin
    }
];

// 2. 使用 createRouter 创建路由实例
const router = createRouter({
    // 3. 使用 createWebHistory() 来替代 'history' mode
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// 4. 导航守卫 (Navigation Guard) 的逻辑和 API 保持不变
router.beforeEach((to, from, next) => {
    // 如果目标是登录页，直接放行
    if (to.path === '/login') {
        return next();
    }

    // 检查 sessionStorage 中是否有用户信息
    let user = sessionStorage.getItem("CurUser");
    if (!user) {
        // 如果没有用户信息且访问的不是登录页，则重定向到登录页
        return next({ path: '/login' });
    } else {
        // 如果有用户信息，则放行
        return next();
    }
});

export default router;