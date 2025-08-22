// wms-web/src/router/RouterIndex.js

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
        // 修改1：使用命名路由进行重定向，更可靠
        redirect: { name: 'MyMain' },
        children: [
            {
                // 修改2：将所有子路由的 path 改为相对路径
                path: 'MyMain',
                name: 'MyMain',
                meta: {
                    title: '首页'
                },
                component: () => import('../components/MyMain.vue')
            },
            {
                path: 'admin/MyAdmin',
                name: 'admin_myadmin',
                meta: {
                    title: '管理员管理'
                },
                component: () => import('../components/admin/MyAdmin.vue')
            },
            {
                path: 'user/MyUser',
                name: 'user_myuser',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../components/user/MyUser.vue')
            },
            // ... 你其他的路由也需要放在这里，并确保 path 是相对的
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router