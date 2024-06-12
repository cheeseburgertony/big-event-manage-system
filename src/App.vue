<script setup>
// 在Vue3 CompositionAPI中
// 1.获取路由对象 router 要使用 useRouter 方法 这个方法从vue-router导入
// const router = useRouter()
// 2.获取路由参数 route 要使用 useRoute 方法 这个方法从vue-router导入
// const route = useRoute()
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
