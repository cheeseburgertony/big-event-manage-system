import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 基地址配置
const baseURL = 'http://big-event-vue-api-t.itheima.net'
// 实例配置
const instance = axios.create({
  // 1.基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 2.携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (res) {
    // 3.处理业务失败
    // 4.摘取核心响应数据
    // 如果请求数据成功
    if (res.data.code === 0) {
      return res
    }
    // 如果请求不成功,添加提示,抛出异常
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  function (error) {
    // 5.处理401错误
    // 错误的特殊情况 => 401 权限不够或token过期错误，拦截到登录页面
    if (error.response?.status === 401) {
      router.push('/login')
    }

    // 默认错误 => 直接提示并抛出异常
    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
