import { createRouter, createWebHashHistory, createWebHistory, type Router } from 'vue-router'

import NotFoundIndex from '@renderer/components/NotFound/index.vue'
import { layoutHome ,layoutMiniWin } from '../layout' //子路由布局容器
import middle from './middle'
const routesList = [
  {
    path: '/',
    component: layoutHome,
    meta: {
      requiresAuth: false, // 需要登录
      requiresBreadcrumb: true //需要面包屑
    },
    children: [
      {
        path: '/',
        component: () => import('@renderer/views/home/home.vue'),
        meta: {
          requiresAuth: false // 需要登录
        }
      }
    ]
  },

  {
    path: '/login',
    component: layoutMiniWin,
    meta: {
      requiresAuth: false // 需要登录
    },
    children: [
      {
        path: '/login',
        component: () => import('@renderer/views/login/login.vue'),
        meta: {
          requiresAuth: false // 需要登录
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', // 通配符路由，匹配所有未定义的路径
    component: NotFoundIndex
  }
]
const router: Router = createRouter({
  // history: createWebHistory(
  //   (() => {
  //     console.log('import.meta.env.BASE_URL', import.meta.env.BASE_URL)
  //     return import.meta.env.BASE_URL
  //   })()
  // ),
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  history:
    process.env.NODE_ENV !== 'production'
      ? createWebHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),

  routes: routesList
})
middle(router, routesList)
export default router
