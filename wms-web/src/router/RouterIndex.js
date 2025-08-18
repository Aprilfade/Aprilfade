import VueRouter from 'vue-router';
import MyHome from '../components/MyHome.vue';

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../components/MyLogin.vue')
    },
    {
        path: '/home',
        // 注意：父级路由不设置 name，以避免 vue-router 的警告
        component: MyHome,
        children: [
            // 子路由将由 StoreIndex.js 动态添加
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export function resetRouter() {
    router.matcher = new VueRouter({
        mode: 'history',
        routes: []
    }).matcher;
}

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err);
};

export default router;