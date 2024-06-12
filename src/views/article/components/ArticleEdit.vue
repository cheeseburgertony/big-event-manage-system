<script setup>
import { ref } from 'vue'
const visibleDrawer = ref(false)
import ChannelSelect from './ChannelSelect.vue'

// 组件对外暴露一个方法open，基于open传来的参数，区分添加还是编辑
// defineExpose 向外暴露，外面获取该组件实例调用实例的方法
// open({})  => 表单传来一个空对象，无需渲染，说明是添加
// open({id, ..., ...})  => 表单需要渲染，说明是编辑
// open 调用后，可以打开抽屉

// 准备数据
const defaultForm = {
  title: '', // 文章标题
  cate_id: '', // 文章分类id
  content: '', // 文章内容
  cover_img: '', // 文章封面
  state: '' //文章状态
}
const formModel = ref({ ...defaultForm })
const open = (row) => {
  if (row.id) {
    // 如果有id则是编辑文章
    console.log('编辑')
  } else {
    // 没有则是发布文章,需要将数据重置
    console.log('发布')
    formModel.value = { ...defaultForm }
  }
  console.log(row)
  visibleDrawer.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          width="100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img"> 文件上传 </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
