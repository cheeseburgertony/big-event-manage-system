<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
const isRegister = ref(true)
// 用于提交的form表单数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 整个表单的校验
// 1.非空校验 require: true    message消息提示，trigger触发校验的时机 blur change
// 2.长度校验 min: xx max: xx
// 3.正则校验 pattern: 正则规则
// 4.自定义校验 => 自己写逻辑校验 (校验函数)
//      validator: (rule, value, callback)
//      (1)rule   当前校验规则相关的信息
//      (2)value  所校验的表单元素目前的表单值
//      (3)callback 无论成功还是失败，都需要callback回调
//        - callback()  校验成功
//        - callback(new Error(错误信息))  校验失败
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是 5-10 位的字符', trigger: 'blur' }
  ],
  password: [
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为 6-15 位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为 6-15 位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 进行自定义校验  如果第二次密码值和第一次的不一样 则校验是失败callback一个错误信息
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <!-- 
   1.结构相关
    el-row表示一行 一行分为24份
    el-col表示列
    (1) :span="12" 表示这一列占这一行的12份  (50%)
    (2) :span="6" 表示这一列占这一行的6份  (25%)
    (3) :offset="3" 表示这一列在这一行中左侧的margin份数

    el-form 表示整个表单组件
    el-form-item 表单的一行 (一个表单域)
    el-input 表单元素 (输入框)

  2.校验相关
    (1)el-form => :model="ruleForm"      绑定的整个form对象 { xxx, xxx, xxx }
    (2)el-form => :rules="rules"         绑定的整个rules规则对象 { xxx, xxx, xxx } 要和form对象一一对应
    (3)表单元素 => v-model="ruleForm.xxx" 给表单元素，绑定form的子属性
    (4)el-form-item => prop配置生效的是那个校验规则(和rules中的字段要对应)
  -->
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>
            登录
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
