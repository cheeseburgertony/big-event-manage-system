import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例
// 配置history模式
// 1.history模式  createWebHistory      地址栏不带 #
// 2.hash模式     createWebHashHistory  地址栏带   #
// vite 中的环境变量 import.meta.env.BASE_URL  可以在vite.config.js 中的base进行配置
// 这个mport.meta.env.BASE_URL是在浏览器中显示的基地址路径，默认是'/',如果需要可以自定义配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
