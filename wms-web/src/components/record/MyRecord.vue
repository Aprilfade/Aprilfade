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
// 1. 从 'vue' 中移除不再需要的 getCurrentInstance
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
// 2. 导入我们封装的 http 工具
import http from '@/utils/http';

// --- 响应式数据定义 (保持不变) ---
const user = JSON.parse(sessionStorage.getItem('CurUser'));
const goodname = ref('');
const storage = ref('');
const userno = ref('');
const tableData = ref([]);
const pageSize = ref(10);
const pageNum = ref(1);
const total = ref(0);
const goodsData = ref([]);
const storageData = ref([]);
const userData = ref([]);
const goodstypeData = ref([]);


// --- 方法 ---

// 3. 修改所有网络请求，将 proxy.$axios 替换为 http
const loadData = async () => {
  try {
    await Promise.all([
      http.get('/goods/list').then(res => { goodsData.value = res.data.data; }),
      http.get('/storage/list').then(res => { storageData.value = res.data.data; }),
      http.get('/user/list').then(res => { userData.value = res.data.data; }),
      http.get('/goodstype/list').then(res => { goodstypeData.value = res.data.data; })
    ]);
    await loadPost();
  } catch (error) {
    console.error("加载辅助数据失败:", error);
    ElMessage.error('加载下拉框数据失败');
  }
};

const loadPost = async () => {
  try {
    const res = await http.post('/record/listPage', { // 修改点
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


// --- 以下方法保持不变 ---
const formatGoods = (row) => goodsData.value.find(item => item.id === row.goods)?.name;
const formatStorage = (row) => storageData.value.find(item => item.id === row.storage)?.name;
const formatGoodstype = (row) => goodstypeData.value.find(item => item.id === row.goodstype)?.name;
const handleSizeChange = (val) => {
  pageSize.value = val;
  pageNum.value = 1;
  loadPost();
};
const handleCurrentChange = (val) => {
  pageNum.value = val;
  loadPost();
};
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