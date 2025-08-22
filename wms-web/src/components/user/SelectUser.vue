<template>
  <div>
    <div style="margin-bottom: 5px;">
      <el-input v-model="name" placeholder="请输入名字" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter="loadPost"></el-input>
      <el-select v-model="sex" filterable placeholder="请选择性别" style="margin-left: 5px;">
        <el-option
            v-for="item in sexs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
              border
              highlight-current-row
              @current-change="selectCurrentChange"
    >
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="no" label="账号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80">
        <template #default="scope">
          <el-tag :type="scope.row.sex === 1 ? 'primary' : 'success'" disable-transitions>
            {{ scope.row.sex === 1 ? '男' : '女' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="角色" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.roleId === 0 ? 'danger' : (scope.row.roleId === 1 ? 'primary' : 'success')"
                  disable-transitions>{{ scope.row.roleId === 0 ? '超级管理员' : (scope.row.roleId === 1 ? '管理员' : '用户') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
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
import { ref, reactive, onMounted, defineEmits } from 'vue';
import axios from 'axios';

const httpUrl = 'http://localhost:8090';

const tableData = ref([]);
const pageSize = ref(10);
const pageNum = ref(1);
const total = ref(0);
const name = ref('');
const sex = ref('');
const sexs = reactive([
  { value: '1', label: '男' },
  { value: '0', label: '女' }
]);

const emit = defineEmits(['doSelectUser']);

const handleSizeChange = (val) => {
  pageNum.value = 1;
  pageSize.value = val;
  loadPost();
};

const handleCurrentChange = (val) => {
  pageNum.value = val;
  loadPost();
};

const resetParam = () => {
  name.value = '';
  sex.value = '';
  loadPost();
};

const selectCurrentChange = (val) => {
  emit("doSelectUser", val);
};

const loadPost = () => {
  axios.post(httpUrl + '/user/listPageC1', {
    pageSize: pageSize.value,
    pageNum: pageNum.value,
    param: {
      name: name.value,
      sex: sex.value,
      roleId: '2'
    }
  }).then(res => {
    if (res.data.code === 200) {
      tableData.value = res.data.data;
      total.value = res.data.total;
    } else {
      alert('获取数据失败');
    }
  });
};

onMounted(() => {
  loadPost();
});
</script>

<style scoped>
</style>