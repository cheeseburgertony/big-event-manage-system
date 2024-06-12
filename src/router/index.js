import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例
// 配置history模式
// 1.history模式  createWebHistory      地址栏不带 #
// 2.hash模式     createWebHashHistory  地址栏带   #
// vite 中的环境变量 import.meta.env.BASE_URL  可以在vite.config.js 中的base进行配置
// 这个mport.meta.env.BASE_URL是在浏览器中显示的基地址路径，默认是'/',如果需要可以自定义配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页面
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvater.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

/**
 * 登录访问拦截 => 默认是直接放行
 * 根据返回值绝对放行还是拦截
 * 返回值：
 *   1.undefine / true 直接放行  返回true或者没有返回 直接放行
 *   2.false 拦会from的地址页面
 *   3.具体路径 或 路径对象 拦截到对应的地址
 *   '/login'   {name: '/login'}
 */

router.beforeEach((to) => {
  // 如果没有token并且访问的是非登录页，拦截到登录页，其他情况正常放行
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }
})

export default router
