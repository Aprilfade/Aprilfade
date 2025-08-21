<template>
  <div>
    <div style="margin-bottom: 5px;">
      <el-input v-model="goodname" placeholder="请输入物品名" style="width: 200px;" @keyup.enter="loadPost" />
      <el-select v-model="storage" placeholder="请选择仓库" style="margin-left: 5px;">
        <el-option v-for="item in storageData" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select v-model="userno" placeholder="请选择申请人" style="margin-left: 5px;">
        <el-option v-for="item in userData" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>

      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>
    </div>

    <el-table :data="tableData" :header-cell-style="{ background: '#f2f5fc', color: '#555555' }" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="goods" label="物品名" width="180" :formatter="formatGoods" />
      <el-table-column prop="storage" label="仓库" width="180" :formatter="formatStorage" />
      <el-table-column prop="goodstype" label="分类" width="180" :formatter="formatGoodstype" />
      <el-table-column prop="count" label="数量" width="180" />
      <el-table-column prop="username" label="操作人" width="180" />
      <el-table-column prop="adminname" label="审批人" width="180" />
      <el-table-column prop="createtime" label="操作时间" width="180" />
      <el-table-column prop="remark" label="备注" />
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';

const { proxy } = getCurrentInstance();
const user = JSON.parse(sessionStorage.getItem('CurUser'));

// 搜索参数
const goodname = ref('');
const storage = ref('');
const userno = ref('');

// 表格和分页
const tableData = ref([]);
const pageSize = ref(10);
const pageNum = ref(1);
const total = ref(0);

// 用于格式化的辅助数据
const goodsData = ref([]);
const storageData = ref([]);
const userData = ref([]);
const goodstypeData = ref([]);

// 异步加载所有需要的数据
const loadData = async () => {
  // 使用 Promise.all 并行加载下拉框所需的数据
  await Promise.all([
    proxy.$axios.get('/goods/list').then(res => { goodsData.value = res.data.data; }),
    proxy.$axios.get('/storage/list').then(res => { storageData.value = res.data.data; }),
    proxy.$axios.get('/user/list').then(res => { userData.value = res.data.data; }),
    proxy.$axios.get('/goodstype/list').then(res => { goodstypeData.value = res.data.data; })
  ]);
  // 所有辅助数据加载完毕后，再加载主表格数据
  await loadPost();
};

// 加载主表格数据
const loadPost = async () => {
  try {
    const res = await proxy.$axios.post('/record/listPage', {
      pageSize: pageSize.value,
      pageNum: pageNum.value,
      param: {
        goodname: goodname.value,
        storage: storage.value,
        userno: userno.value,
        roleId: user.roleId,
        userId: user.id
      }
    });
    if (res.data.code === 200) {
      tableData.value = res.data.data;
      total.value = res.data.total;
    } else {
      ElMessage.error('获取记录失败');
    }
  } catch (e) {
    ElMessage.error('请求记录失败');
  }
};

// 表格列格式化函数
const formatGoods = (row) => goodsData.value.find(item => item.id === row.goods)?.name;
const formatStorage = (row) => storageData.value.find(item => item.id === row.storage)?.name;
const formatGoodstype = (row) => goodstypeData.value.find(item => item.id === row.goodstype)?.name;

// 分页控制
const handleSizeChange = (val) => {
  pageSize.value = val;
  pageNum.value = 1;
  loadPost();
};
const handleCurrentChange = (val) => {
  pageNum.value = val;
  loadPost();
};

// 重置搜索
const resetParam = () => {
  goodname.value = '';
  storage.value = '';
  userno.value = '';
  loadPost();
};

// 生命周期钩子
onMounted(loadData);
</script>

<style scoped>
</style>