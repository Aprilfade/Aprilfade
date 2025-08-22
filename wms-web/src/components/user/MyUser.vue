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

      <el-button type="primary" style="margin-left: 5px;" @click="add">新增</el-button>
    </div>
    <el-table :data="tableData"
              :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
              border
    >
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="no" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="80">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="80">
        <template #default="scope">
          <el-tag
              :type="scope.row.sex === 1 ? 'primary' : 'success'"
              disable-transitions>{{scope.row.sex === 1 ? '男' : '女'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="角色" width="120">
        <template #default="scope">
          <el-tag
              :type="scope.row.roleId === 0 ? 'danger' : (scope.row.roleId === 1 ? 'primary' : 'success')"
              disable-transitions>{{scope.row.roleId === 0 ? '超级管理员' :
              (scope.row.roleId === 1 ? '管理员' : '用户')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template #default="scope">
          <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
          <el-popconfirm
              title="确定删除吗？"
              @confirm="del(scope.row.id)"
              style="margin-left: 5px;"
          >
            <template #reference>
              <el-button size="small" type="danger" >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20,30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

    <el-dialog
        title="提示"
        v-model="centerDialogVisible"
        width="30%"
        center>

      <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="no">
          <el-col :span="20">
            <el-input v-model="form.no"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="20">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
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
        <el-form-item label="电话" prop="phone">
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
import { ref, reactive, onMounted, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
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
const centerDialogVisible = ref(false);
const formRef = ref(null);
const form = reactive({
  id: '',
  no: '',
  name: '',
  password: '',
  age: '',
  phone: '',
  sex: '0',
  roleId: '2'
});

const checkAge = (rule, value, callback) => {
  if (value > 150) {
    callback(new Error('年龄输入过大'));
  } else {
    callback();
  }
};

const checkDuplicate = (rule, value, callback) => {
  if (form.id) {
    return callback();
  }
  axios.get(httpUrl + "/user/findByNo?no=" + form.no).then(res => {
    if (res.data.code !== 200) {
      callback();
    } else {
      callback(new Error('账号已经存在'));
    }
  });
};

const rules = reactive({
  no: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
    { validator: checkDuplicate, trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入名字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { min: 1, max: 3, message: '长度在 1 到 3 个位', trigger: 'blur' },
    { pattern: /^([1-9][0-9]*){1,3}$/, message: '年龄必须为正整数字', trigger: "blur" },
    { validator: checkAge, trigger: 'blur' }
  ],
  phone: [
    { required: true, message: "手机号不能为空", trigger: "blur" },
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }
  ]
});

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

const del = (id) => {
  axios.get(httpUrl + '/user/del?id=' + id).then(res => {
    if (res.data.code === 200) {
      ElMessage.success('操作成功！');
      loadPost();
    } else {
      ElMessage.error('操作失败！');
    }
  });
};

const mod = (row) => {
  centerDialogVisible.value = true;
  nextTick(() => {
    Object.assign(form, row);
    form.age = String(row.age);
    form.sex = String(row.sex);
    form.password = '';
  });
};

const add = () => {
  centerDialogVisible.value = true;
  nextTick(() => {
    resetForm();
    form.id = '';
  });
};

const doSave = () => {
  axios.post(httpUrl + '/user/save', form).then(res => {
    if (res.data.code === 200) {
      ElMessage.success('操作成功！');
      centerDialogVisible.value = false;
      loadPost();
      resetForm();
    } else {
      ElMessage.error('操作失败！');
    }
  });
};

const doMod = () => {
  axios.post(httpUrl + '/user/update', form).then(res => {
    if (res.data.code === 200) {
      ElMessage.success('操作成功！');
      centerDialogVisible.value = false;
      loadPost();
      resetForm();
    } else {
      ElMessage.error('操作失败！');
    }
  });
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
      console.log('error submit!!');
      return false;
    }
  });
};

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