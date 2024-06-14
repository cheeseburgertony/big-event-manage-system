import request from '@/utils/request'

// 用户注册
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', {
    username,
    password,
    repassword
  })

// 用户登录
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

// 获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')

// 更新用户信息
export const userUpdateInfoService = (data) => request.put('/my/userinfo', data)

// 更新用户头像
export const userUpdateAvatarService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })

// 更新用户密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd
  })
