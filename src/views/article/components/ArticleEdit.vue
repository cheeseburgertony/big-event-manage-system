<script setup>
import { ref, nextTick } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {
  artPublishService,
  artGetDetailService,
  artUpdateService
} from '@/api/article'
import {} from '@/api/article'
import { baseURL } from '@/utils/request'
import axios from 'axios'

const visibleDrawer = ref(false)
const emit = defineEmits(['success'])

// 准备数据
const defaultForm = {
  title: '', // 文章标题
  cate_id: '', // 文章分类id
  content: '', // 文章内容
  cover_img: '', // 文章封面
  state: '' //文章状态
}

// 选择图片后本地预览
const formModel = ref({ ...defaultForm })
const imgUrl = ref('')
// on-change这个钩子函数的第一个形参是选择的图片对象
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw) // 用来预览图片
  // 立刻将图片对象存入formModel.value.cover_img 将来用于提交
  formModel.value.cover_img = uploadFile.raw
  console.log(uploadFile.raw)
}

// 发布逻辑
const onPublish = async (state) => {
  formModel.value.state = state
  // 要求发布的时FormData对象 将数据存入fd对象中
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  // 根据不同的操作发不同的请求
  if (formModel.value.id) {
    // 有id是编辑
    console.log('编辑操作')
    await artUpdateService(fd)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success', 'update')
  } else {
    // 没有id是新增
    await artPublishService(fd)
    ElMessage.success('发布成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
}

// 组件对外暴露一个方法open，基于open传来的参数，区分添加还是编辑
// defineExpose 向外暴露，外面获取该组件实例调用实例的方法
// open({})  => 表单传来一个空对象，无需渲染，说明是添加
// open({id, ..., ...})  => 表单需要渲染，说明是编辑
// open 调用后，可以打开抽屉
const editorRef = ref()
const open = async (row) => {
  if (row.id) {
    // 如果有id则是编辑文章 进行文章回显
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    // 图片回显需要自己拼接基地址
    imgUrl.value = baseURL + res.data.data.cover_img

    // 注意：在这提交给后台需要的数据格式是file对象格式
    // 需要将网络地址图片转换成file对象存储起来 这里使用chatgpt进行辅助
    const fileObj = await urlToFile(imgUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = fileObj
  } else {
    // 没有则是发布文章,需要将数据重置
    console.log('发布')
    formModel.value = { ...defaultForm }

    // 这里图片和富文本编辑器要另外操作
    imgUrl.value = ''
    // 这里富文本编辑器由于是懒加载所以这里使用nextTick等待他加载完成了再进行操作
    nextTick(() => {
      editorRef.value.setHTML('')
    })
  }
  // console.log(row)
  visibleDrawer.value = true
}

// 使用chatgpt进行辅助将网络地址图片转换成file对象
async function urlToFile(url, filename) {
  try {
    // 使用axios下载图片
    const response = await axios({
      url: url,
      method: 'GET',
      responseType: 'blob'
    })

    // 创建Blob对象
    const blob = response.data

    // 获取图片的 MIME 类型
    const mimeType = blob.type

    // 将Blob对象转化为File对象
    const file = new File([blob], filename, { type: mimeType })

    return file
  } catch (error) {
    console.error('Error downloading the image:', error)
    throw error
  }
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
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 图片上传 -->
        <!-- 
            此处需要关闭element-plus 的自动上传，不需要配置action等参数
            只需要做前端的本地预览图片即可，无需在提交前上传图标
            语法：URL.createObjectURL(文件对象) 基于文件对象创建本地预览的地址，来预览
         -->
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            content-type="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
