import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/MyHome.vue'
import Login from '../components/MyLogin.vue'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/Home',
        name: 'home',
        component: Home,
        redirect: '/Home/MyMain',
        children: [
            {
                path: '/Home/MyMain',
                name: 'MyMain',
                meta: {
                    title: '首页'
                },
                component: () => import('../components/MyMain.vue')
            },
            {
                path: '/admin/MyAdmin',
                name: 'admin_myadmin',
                meta: {
                    title: '管理员管理'
                },
                component: () => import('../components/admin/MyAdmin.vue')
            },
            {
                path: '/user/MyUser',
                name: 'user_myuser',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../components/user/MyUser.vue')
            },
            // ... 你其他的路由也需要放在这里
        ]
    }
]

const router = createRouter({
    history: createWebHistory(), // process.env.BASE_URL 在 Vite 中不常用，通常直接用 createWebHistory()
    routes
})

export default router