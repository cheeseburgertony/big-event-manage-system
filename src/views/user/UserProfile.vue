<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'
const userStore = useUserStore()
// 只是使用仓库的值作为表单的初始值，后面是对表单操作，不对这些数据操作，使用可以直接解构
const { id, username, nickname, email } = userStore.user

const formRef = ref()
const form = ref({
  id,
  username,
  nickname,
  email
})

const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称为 2-10 的非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  // 进行表单预校验
  await formRef.value.validate()
  // 提交表单
  await userUpdateInfoService(form.value)
  // 通知user模块进行数据更新
  userStore.getUser()
  // 通知用户更新成功
  ElMessage.success('更新成功')
}
</script>

<template>
  <page-container title="基本资料">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="登录名称" prop="username">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
