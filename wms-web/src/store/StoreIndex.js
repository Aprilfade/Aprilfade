// 1. 从 'vuex' 中导入新的创建函数
import { createStore } from 'vuex';
import router from '../router/RouterIndex';
import createPersistedState from 'vuex-persistedstate';

// 2. 使用 createStore 创建 store 实例
const store = createStore({
    // state, mutations, getters 的内部逻辑保持不变
    state: {
        menu: []
    },
    mutations: {
        setMenu(state, menuList) {
            state.menu = menuList;
        },
        SET_ROUTES(state) {
            const newRoutes = router.options.routes;

            state.menu.forEach(menu => {
                if (menu.children) {
                    menu.children.forEach(m => {
                        // 动态添加路由
                        const route = convert(m);
                        newRoutes[0].children.push(route);
                    });
                }
            });

            // 动态添加路由到路由表中
            router.addRoute(newRoutes[0]);
        }
    },
    getters: {
        getMenu(state) {
            return state.menu;
        }
    },
    plugins: [
        // vuex-persistedstate 插件的用法保持不变
        createPersistedState({
            storage: window.sessionStorage, // 指定使用 sessionStorage
            key: 'vuex', // 存储在 sessionStorage 中的 key
            reducer(val) {
                // 只持久化 menu 模块
                return {
                    menu: val.menu
                };
            }
        })
    ]
});

// 动态导入组件的辅助函数 (我们之前已经优化过)
const modules = import.meta.glob('@/components/**/*.vue');
function convert(menu) {
    let route = {
        path: menu.menuclick,
        name: menu.menuname,
        meta: {
            title: menu.menuname
        },
        component: modules[`/src/components/${menu.menucomponent}.vue`]
    };
    return route;
}

export default store;