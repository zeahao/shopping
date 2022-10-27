import {createRouter, createWebHashHistory} from "vue-router";
import {getToken} from "@/utils/token";
import store from "@/store";

const routes = [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: {
            show: true
        },
        children: [
            {
                name:'rankOne',
                path: 'rankOne',
                component:()=>import('@/pages/Home/Rank/rankOne'),
            },
            {
                name:'rankTwo',
                path: 'rankTwo',
                component:()=>import('@/pages/Home/Rank/rankTwo'),
            },
            {
                name:'rankThree',
                path: 'rankThree',
                component:()=>import('@/pages/Home/Rank/rankThree'),
            },
            {
                path: '/home',
                redirect: '/home/rankOne'
            }

        ]
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import("@/pages/Search"),
        meta: {
            show: true
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import("@/pages/Login"),
        meta: {
            show: false
        }
    },
    {
        name: 'register',
        path: '/register',
        component: () => import("@/pages/Register"),
        meta: {
            show: false
        }
    },
    {
        name: 'detail',
        path: '/detail',
        component: () => import("@/pages/Detail"),
        meta: {
            show: true
        }
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: () => import("@/pages/AddCartSuccess"),
        meta: {
            show: true
        }
    },
    {
        name: 'shopCart',
        path: '/shopCart',
        component: () => import("@/pages/ShopCart"),
        meta: {
            show: true
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import("@/pages/Trade"),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.name === 'shopCart') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import("@/pages/Pay"),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.name === 'trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: 'paySuccess',
        path: '/paySuccess',
        component: () => import("@/pages/PaySuccess"),
        meta: {
            show: true
        },
        beforeEnter: (to, from, next) => {
            if (from.name === 'pay') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: 'center',
        path: '/center',
        component: () => import("@/pages/Center"),
        meta: {
            show: true
        },
        // 二级路由
        children: [
            {
                name: 'myOrder',
                path: 'myOrder',
                component: () => import("@/pages/Center/myOrder")
            },
            {
                name: 'groupOrder',
                path: 'groupOrder',
                component: () => import("@/pages/Center/groupOrder")
            },
            {
                path: '/center',
                redirect: '/center/myOrder'
            }
        ]
    },
    {
        // 重定向路由
        path: '/',
        redirect: '/home'
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory(),
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        if (to.name === 'rankOne' || to.name === 'rankTwo' || to.name === 'rankThree'){
            return ;
        }
        return {top: 0}
    },
})

// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach(async (to, from, next) => {
    // 判断有没有登录
    if (getToken()) {
        if (to.name === 'login' || to.name === 'register') {
            next('/home');
        } else {
            // 判断是否存在token
            if (store.state.user.userInfo.name) {
                next();
            } else {
                try {
                    // 获取用户信息
                    await store.dispatch('user/getUserInfo');
                    next();
                } catch (e) {
                    next('/login')
                    alert(e.message);
                }
            }
        }
    } else {
        if (to.name === 'login' || to.name === 'home' || to.name === 'register') {
            next();
        } else {
            next('/login');
        }
    }
});