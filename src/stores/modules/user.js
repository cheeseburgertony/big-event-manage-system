import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
// 用户模块token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 用户信息相关
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      token,
      user,
      setToken,
      removeToken,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
