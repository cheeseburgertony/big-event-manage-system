<script setup>
import { artGetChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
const channelList = ref([])
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelList()

const onEditChannel = (row, $inedx) => {
  console.log(row, $inedx)
}

const onDelChannel = (row, $inedx) => {
  console.log(row, $inedx)
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <!-- 在 el-table-column 中用 prop 属性来对应对象中的键名即可填入数据 -->
    <!-- 通过 slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <!-- 设置 type 属性为 index 即可显示从 1 开始的索引号 -->
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150">
        <!-- 在作用域插槽中scope中有row column等数据 row就是channelList的每一项， $index是每一项的下标 -->
        <!-- 这里直接将scope结构 -->
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            plain
            circle
            :icon="Edit"
            @click="onEditChannel(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            plain
            circle
            :icon="Delete"
            @click="onDelChannel(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>
</template>

<style lang="scss" scoped></style>
