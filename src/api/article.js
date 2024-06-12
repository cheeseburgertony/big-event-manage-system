import request from '@/utils/request'
// 获取文章分类列表
export const artGetChannelsService = () => request.get('/my/cate/list')
// 添加文章
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
// 编辑文章
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
