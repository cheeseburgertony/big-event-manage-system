<script setup>
import { ref } from 'vue'
import { userUpdatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const formRef = ref(null)
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

const validateNewPwd = (rule, value, callback) => {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能和原密码相同'))
  } else {
    callback()
  }
}

const validateRePwd = (rule, value, callback) => {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('确认密码必须和新密码一致'))
  } else {
    callback()
  }
}

const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
    { validator: validateNewPwd, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
    { validator: validateRePwd, trigger: 'blur' }
  ]
}

const userStore = useUserStore()
const router = useRouter()
const submitForm = async () => {
  // 先进行表单预校验
  await formRef.value.validate()
  // 调用接口修改密码
  await userUpdatePasswordService(pwdForm.value)
  // 提示用户修改成功
  ElMessage.success('密码修改成功，请重新登录')
  // 清空本地token和用户信息
  userStore.setToken('')
  userStore.setUser({})
  // 跳转到登录页面
  router.push('/login')
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="修改密码">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input type="password" v-model="pwdForm.old_pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input type="password" v-model="pwdForm.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input type="password" v-model="pwdForm.re_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">修改密码</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
