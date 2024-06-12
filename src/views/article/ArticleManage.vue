<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'
const dataList = ref([])
const total = ref(0)
const params = ref({
  pagenum: 1, // 当前页码数
  pagesize: 5, // 当前页需要的数据条数
  cate_id: '', // 文章分类id
  state: '' // 文章状态(可选值"已发布"或"草稿")
})

const getArticle = async () => {
  const res = await artGetListService(params.value)
  dataList.value = res.data.data
  total.value = res.data.total
}

getArticle()

const onEditArticle = (row) => {
  console.log(row)
}

const onDeleteArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary">添加文章</el-button>
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
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="dataList">
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
  </page-container>
</template>

<style lang="scss" scoped></style>
