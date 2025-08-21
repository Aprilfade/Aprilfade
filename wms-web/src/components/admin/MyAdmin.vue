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
      <el-button type="primary" @click="add">新增</el-button>
    </div>

    <el-table :data="tableData"
              :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
              border
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
      <el-table-column prop="operate" label="操作">
        <template #default="scope">
          <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除吗？" @confirm="del(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger" style="margin-left: 5px;">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
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

    <el-dialog
        title="提示"
        v-model="centerDialogVisible"
        width="30%"
        center>
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-col :span="20">
            <el-input v-model="form.no"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名">
          <el-col :span="20">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码">
          <el-col :span="20">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄">
          <el-col :span="20">
            <el-input v-model="form.age"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话">
          <el-col :span="20">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const { proxy } = getCurrentInstance();

// 数据状态
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
const centerDialogVisible = ref(false);
const form = reactive({
  id: '',
  no: '',
  name: '',
  password: '',
  age: '',
  phone: '',
  sex: '0',
  roleId: '2' // 默认为管理员
});
const formRef = ref(null); // 表单引用

// 方法
const loadPost = async () => {
  try {
    const res = await proxy.$axios.post('/user/listPageC1', {
      pageSize: pageSize.value,
      pageNum: pageNum.value,
      param: {
        name: name.value,
        sex: sex.value,
        roleId: '2'
      }
    });
    if (res.data.code === 200) {
      tableData.value = res.data.data;
      total.value = res.data.total;
    } else {
      ElMessage.error('获取数据失败');
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('请求失败');
  }
};

const handleSizeChange = (val) => {
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

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  Object.assign(form, {
    id: '', no: '', name: '', password: '', age: '',
    phone: '', sex: '0', roleId: '2'
  });
};

const add = () => {
  centerDialogVisible.value = true;
  // 使用 nextTick 在 DOM 更新后重置表单
  proxy.$nextTick(() => {
    resetForm();
  });
};

const doSave = async () => {
  try {
    const res = await proxy.$axios.post('/user/save', form);
    if (res.data.code === 200) {
      ElMessage.success('操作成功！');
      centerDialogVisible.value = false;
      loadPost();
    } else {
      ElMessage.error('操作失败！');
    }
  } catch (error) {
    ElMessage.error('请求异常！');
  }
};

const doMod = async () => {
  try {
    const res = await proxy.$axios.post('/user/update', form);
    if (res.data.code === 200) {
      ElMessage.success('操作成功！');
      centerDialogVisible.value = false;
      loadPost();
    } else {
      ElMessage.error('操作失败！');
    }
  } catch (error) {
    ElMessage.error('请求异常！');
  }
};

const save = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (form.id) {
        doMod();
      } else {
        doSave();
      }
    } else {
      ElMessage.warning('请检查表单输入！');
      return false;
    }
  });
};

const mod = (row) => {
  centerDialogVisible.value = true;
  proxy.$nextTick(() => {
    Object.assign(form, {
      id: row.id,
      no: row.no,
      name: row.name,
      password: '',
      age: String(row.age),
      phone: row.phone,
      sex: String(row.sex),
      roleId: row.roleId
    });
  });
};

const del = async (id) => {
  try {
    const res = await proxy.$axios.get('/user/del?id=' + id);
    if (res.data.code === 200) {
      ElMessage.success('删除成功！');
      loadPost();
    } else {
      ElMessage.error('删除失败！');
    }
  } catch (error) {
    ElMessage.error('请求异常！');
  }
};

// 生命周期钩子
onMounted(() => {
  loadPost();
});
</script>