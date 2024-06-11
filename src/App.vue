<script setup>
// 在Vue3 CompositionAPI中
// 1.获取路由对象 router 要使用 useRouter 方法 这个方法从vue-router导入
// const router = useRouter()
// 2.获取路由参数 route 要使用 useRoute 方法 这个方法从vue-router导入
// const route = useRoute()
import { useRouter, useRoute } from 'vue-router'
import { useUserStore, useCounterStore } from '@/stores'
const router = useRouter()
const route = useRoute()
const goList = () => {
  console.log(router, route)
}

const userStore = useUserStore()
const counterStore = useCounterStore()
</script>

<template>
  <div>
    App
    <button @click="$router.push('/home')">跳首页</button>
    <button @click="goList">跳列表页</button>
    <TestCom> </TestCom>
    <el-button type="success" plain>Success</el-button>
    <el-button type="primary" plain>Primary</el-button>

    <div>
      <p>{{ userStore.token }}</p>
      <el-button @click="userStore.setToken('asasacacascsaa')">
        登录
      </el-button>
      <el-button @click="userStore.removeToken"> 退出 </el-button>
      <p>{{ counterStore.count }}</p>
      <button @click="counterStore.add(2)">点击+2</button>
    </div>
  </div>
</template>

<style scoped></style>
