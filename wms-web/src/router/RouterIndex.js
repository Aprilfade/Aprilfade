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
                path: '/Home/MyMain',
                name: 'MyMain',
                meta: {
                    title: '首页'
                },
                component: () => import('../components/HomeIndex.vue') // 修改到这里
            },
            // 系统管理
            {
                path: '/Home/admin/MyAdmin',
                name: 'MyAdmin',
                meta: {
                    title: '管理员管理'
                },
                component: () => import('../components/admin/MyAdmin.vue')
            },
            {
                path: '/Home/user/MyUser',
                name: 'MyUser',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../components/user/MyUser.vue')
            },
            // 基础数据
            {
                path: '/Home/storage/MyStorage',
                name: 'MyStorage',
                meta: {
                    title: '仓库管理'
                },
                component: () => import('../components/storage/MyStorage.vue')
            },
            {
                path: '/Home/goodstype/MyGoodstype',
                name: 'MyGoodstype',
                meta: {
                    title: '分类管理'
                },
                component: () => import('../components/goodstype/MyGoodstype.vue')
            },
            {
                path: '/Home/goods/MyGoods',
                name: 'MyGoods',
                meta: {
                    title: '货品管理'
                },
                component: () => import('../components/goods/MyGoods.vue')
            },
            // 出入库管理
            {
                path: '/Home/record/MyRecord',
                name: 'MyRecord',
                meta: {
                    title: '出入库管理'
                },
                component: () => import('../components/record/MyRecord.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router