<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService, artDelArticleService } from '@/api/article'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
const dataList = ref([])
const total = ref(0) // 总条数
const loading = ref(false) // loading状态
const params = ref({
  pagenum: 1, // 当前页码数
  pagesize: 5, // 当前页需要的数据条数
  cate_id: '', // 文章分类id
  state: '' // 文章状态(可选值"已发布"或"草稿")
})

const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  dataList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

// 改变当前条数
const onSizeChange = (size) => {
  // 有可能改了当前条数后，原来的的当前页发生变化
  // 所以在更改当前条数的提示将当前页初始化为1
  params.value.pageSize = size
  params.value.pagenum = 1
  getArticleList()
}
// 改变当前的页码
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 根据当前表单中最新的数据进行重新渲染，页码应该重新回到1
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 将表单中的所有数据重置，然后再次发起请求
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

// 添加文章成功操作
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是新增操作，会将信息添加在最后一条，所以需要将页数同事跳转到最后一页再发送请求
    // 因为是在重新发送请求前添加上的数据，所以总数量应该先加1
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  // 默认的话不用任何操作直接发送请求在本页面显示
  getArticleList()
}

const articleEditRef = ref()
// 添加文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 修改文章
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

// 删除文章
const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确定要删除该文章吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '删除',
    cancelButtonText: '取消'
  })

  // 判断当前要删除的文章是不是该页码中的最后一条数据，如果是的话需要进行往前一页跳转
  const lastPage = Math.ceil(total.value / params.value.pagesize)
  // 判断当前页是不是最后一页 并且如果总条数/分页数 余1的话说明是最后一条
  // 则将当前页数往前-1
  if (
    params.value.pagenum === lastPage &&
    total.value % params.value.pagesize === 1
  ) {
    params.value.pagenum -= 1
  }
  // 再发送请求进行删除
  await artDelArticleService(row.id)
  ElMessage.success('删除成功')
  // 删除后再请求
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <!-- 这里后台标记发布状态，就是通过中文标记色，已发布 / 草稿 所以value直接写这两个 -->
        <el-select v-model="params.state" style="width: 210px">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="dataList" v-loading="loading">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <!-- 利用作用域插槽row可以获取当前行的数据 这里的row 相当于 v-for遍历中的item -->
        <template #default="{ row }">
          <el-button
            type="primary"
            circle
            :icon="Edit"
            plain
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            type="danger"
            circle
            :icon="Delete"
            plain
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页条区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
