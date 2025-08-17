import VueRouter from 'vue-router';



const routes =[
    {
        path:'/',
        name:'login',
        component:()=>import('../components/MyLogin.vue')
    },
    {
        path:'/HomeIndex',
        name:'HomeIndex',
        component:()=>import('../components/HomeIndex.vue'),
        children:[
            {
                path:'/MyHome',
                name:'MyHome',
                component:()=>import('../components/MyHome.vue')
            },
           /* {
                path:'/MyAdmin',
                name:'Myadmin',
                meta:{
                    title:'管理员管理'
                },
                component:()=>import('../components/admin/MyAdmin.vue')
            },
            {
                path:'/MyUser',
                name:'Myuser',
                meta:{
                    title:'用户管理'
                },
                component:()=>import('../components/user/MyUser.vue')
            },*/
        ]
    }
]
const router = new VueRouter({
    mode:'history',
    routes
})
export function resetRouter(){
    router.matcher =new VueRouter({
        mode:'history',
        routes:[]
    }).matcher
}
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default router;