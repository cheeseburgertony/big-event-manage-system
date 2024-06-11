// 将pinia独立维护
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 对所有仓库模块进行统一导入导出
// export * from './modules/counter' 相当于先把counter中的命名导出的函数导入在index.js然后再讲这个函数命名导出，实现仓库的统一管理
export * from './modules/user' // 接收所有按需导出，并且从该处导出
export * from './modules/counter'
