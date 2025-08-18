import Vue from 'vue'
import Vuex from 'vuex'
import router, { resetRouter } from "../router/RouterIndex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

// 辅助函数：将后端菜单数据转换为前端路由对象
function menuToRoute(menu) {
    if (!menu.menucomponent) {
        return null;
    }
    let route = {
        name: menu.menuclick,
        path: menu.menuclick,
        meta: {
            title: menu.menuname
        },
        component: () => import('@/components/' + menu.menucomponent)
    };
    return route;
}

export default new Vuex.Store({
    state: {
        menuList: [],
        hasRoutes: false
    },
    mutations: {
        setMenu(state, menuList) {
            state.menuList = menuList;

            if (state.hasRoutes) {
                return;
            }

            const newRoutes = router.options.routes;
            const homeRoute = newRoutes.find(route => route.path === '/home');
            if (!homeRoute) return;

            homeRoute.children = [];

            homeRoute.children.push({
                path: '',
                name: 'homeIndex',
                meta: { title: '首页' },
                component: () => import('../components/HomeIndex.vue')
            });

            // **核心修正：直接遍历后端返回的扁平化 menuList 数组**
            menuList.forEach(menu => {
                // 不再需要检查 children
                const route = menuToRoute(menu);
                if (route) {
                    homeRoute.children.push(route);
                }
            });

            resetRouter();
            router.addRoutes(newRoutes);
            state.hasRoutes = true;
        },
        clearMenuAndRoutes(state) {
            state.menuList = [];
            state.hasRoutes = false;
        }
    },
    getters: {
        getMenuList(state) {
            return state.menuList;
        }
    },
    plugins: [createPersistedState({
        key: 'vuex-wms-state',
        paths: ['menuList', 'hasRoutes']
    })]
})