<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
// 组件对外暴露一个方法open，基于open传来的参数，区分添加还是编辑
// defineExpose 向外暴露，外面获取该组件实例调用实例的方法
// open({})  => 表单传来一个空对象，无需渲染，说明是添加
// open({id, cate_name, ...})  => 表单需要渲染，说明是编辑
// open 调用后，可以打开弹窗
const open = (row) => {
  console.log(row)
  dialogVisible.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="添加弹层" width="30%">
    <span>我是内容</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
