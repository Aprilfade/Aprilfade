import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/StoreIndex';

// 初始路由规则
const routes = [
    {
        path: '/',
        name: 'MyHome',
        component: () => import('../components/MyHome.vue'),
        redirect: '/Home', // 默认重定向到首页
        children: [
            {
                path: 'Home', // 子路由路径不应以'/'开头
                name: 'Home',
                meta: {
                    title: '首页'
                },
                component: () => import('../components/HomeIndex.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'MyLogin',
        component: () => import('../components/MyLogin.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

// 标记是否已经添加了动态路由
let hasAddedRoutes = false;

// 路由前置守卫
router.beforeEach((to, from, next) => {
    const user = sessionStorage.getItem("CurUser");

    if (!user && to.path !== '/login') {
        hasAddedRoutes = false;
        return next('/login');
    }

    if (user && !hasAddedRoutes) {
        const menuDataString = sessionStorage.getItem("menu");

        if (menuDataString) {
            const menuData = JSON.parse(menuDataString);
            store.commit('setMenu', menuData);

            const modules = import.meta.glob('../components/**/*.vue');

            menuData.forEach(menu => {
                if (menu.menuclick && menu.menuComponent) {
                    const route = {
                        // 关键修正：子路由的 path 不应以 '/' 开头
                        path: menu.menuclick,
                        name: menu.menuclick,
                        component: modules[`../components/${menu.menuComponent}`]
                    };
                    router.addRoute('MyHome', route);
                }
            });
            hasAddedRoutes = true;

            return next({ ...to, replace: true });
        } else {
            hasAddedRoutes = false;
            return next('/login');
        }
    }

    next();
});

export default router;