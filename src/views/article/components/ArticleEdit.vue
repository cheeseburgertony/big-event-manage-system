<script setup>
import { ref } from 'vue'
const visibleDrawer = ref(false)

// 组件对外暴露一个方法open，基于open传来的参数，区分添加还是编辑
// defineExpose 向外暴露，外面获取该组件实例调用实例的方法
// open({})  => 表单传来一个空对象，无需渲染，说明是添加
// open({id, ..., ...})  => 表单需要渲染，说明是编辑
// open 调用后，可以打开抽屉
const open = (row) => {
  console.log(row)
  visibleDrawer.value = true
}

defineExpose({
  open
})
</script>

<template>
  <!-- 抽屉 -->
  <el-drawer
    v-model="visibleDrawer"
    title="我是标题"
    direction="rtl"
    size="50%"
  >
    <span>我在这里</span>
  </el-drawer>
</template>
