<template>
  <div>
    <div style="margin-bottom: 5px;">
      <el-input v-model="name" placeholder="请输入分类名" suffix-icon="el-icon-search" style="width: 200px;"
                @keyup.enter="loadPost"></el-input>
      <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>
      <el-button type="primary" @click="add">新增</el-button>
    </div>

    <el-table :data="tableData"
              :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
              border
              style="width: 100%">
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="name" label="分类名" width="180"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
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
        :title="form.id ? '编辑分类' : '新增分类'"
        v-model="centerDialogVisible"
        width="30%"
        center>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-col :span="20">
            <el-input type="textarea" v-model="form.remark"></el-input>
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
import { ElMessage } from 'element-plus';

const { proxy } = getCurrentInstance();

// 搜索参数
const name = ref('');

// 表格和分页数据
const tableData = ref([]);
const pageSize = ref(10);
const pageNum = ref(1);
const total = ref(0);

// 弹窗和表单数据
const centerDialogVisible = ref(false);
const formRef = ref(null);
const form = reactive({
  id: '',
  name: '',
  remark: ''
});
const rules = reactive({
  name: [{ required: true, message: '请输入分类名', trigger: 'blur' }]
});

// 加载数据
const loadPost = async () => {
  try {
    const res = await proxy.$axios.post('/goodstype/listPage', {
      pageSize: pageSize.value,
      pageNum: pageNum.value,
      param: { name: name.value }
    });
    if (res.data.code === 200) {
      tableData.value = res.data.data;
      total.value = res.data.total;
    } else {
      ElMessage.error('获取数据失败');
    }
  } catch (e) {
    ElMessage.error('请求失败');
  }
};

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

// 重置
const resetParam = () => {
  name.value = '';
  loadPost();
};
const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  Object.assign(form, { id: '', name: '', remark: '' });
};

// 新增
const add = () => {
  centerDialogVisible.value = true;
  proxy.$nextTick(resetForm);
};

// 修改
const mod = (row) => {
  centerDialogVisible.value = true;
  proxy.$nextTick(() => {
    Object.assign(form, row);
  });
};

// 保存 (新增/修改)
const save = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const url = form.id ? '/goodstype/update' : '/goodstype/save';
      try {
        const res = await proxy.$axios.post(url, form);
        if (res.data.code === 200) {
          ElMessage.success('操作成功');
          centerDialogVisible.value = false;
          loadPost();
        } else {
          ElMessage.error('操作失败');
        }
      } catch (e) {
        ElMessage.error('请求异常');
      }
    } else {
      ElMessage.warning('请检查表单输入');
    }
  });
};

// 删除
const del = async (id) => {
  try {
    const res = await proxy.$axios.get('/goodstype/del?id=' + id);
    if (res.data.code === 200) {
      ElMessage.success('删除成功');
      loadPost();
    } else {
      ElMessage.error('删除失败');
    }
  } catch (e) {
    ElMessage.error('请求异常');
  }
};

// 生命周期钩子
onMounted(loadPost);
</script>

<style scoped>
</style>