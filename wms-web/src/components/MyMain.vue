<script>

export default {
  name: 'MyMain',
  data() {
    let checkAge=(rule, value, callback) => {
      if(value>150){
        callback(new Error('年龄不能大于150岁'));
      }else{
        callback();
      }
    };
    let checkDuplicate =(rule,value,callback)=>{
      if(this.form.id){
        return callback();
      }
      this.$axios.get(this.$httpUrl + "/user/findByNo?no="+this.form.no).then(res=>res.data).then(res=>{
        if(res.code!=200){
          callback()
        }else{
          callback(new Error('账号已经存在'));
        }
      })
    };
      return{
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        total: 0,
        name:'',
        sex:'',
        sexs: [
          {
            value: '1',
            label: '男'
          },
          {
            value: '0',
            label: '女'
          }
        ],
        centerDialogVisible: false,
        form: {
          id: '',
          name: '',
          password: '',
          phone: '',
          age: '',
          no: '',
          sex:'0',
          roleId:'1'
        },
        rules: {
          no: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
            {validator:checkDuplicate,trigger: 'blur'}
          ],
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },

          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          age:[
            {
              required:true,message:'请输入年龄',trigger: 'blur'},
            { min: 1, max: 3, message: '长度在 1到 3个字符', trigger: 'blur' },
            {pattern:/^([1-9][0-9]*){1,3}$/,message:'年龄必须为正整数字',trigger: 'blur'},
            {validator:checkAge,trigger: 'blur'}
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern:/^1[3456789][0-9]\d{8}$/,message:'手机号格式不正确',trigger: 'blur'}
          ]

        }



      };

  },
  methods: {
    resetForm(){
      this.$refs.form.resetFields();
    },
    doSave(){
      this.$axios.post(this.$httpUrl + '/user/save', {
        name: this.form.name,
        password: this.form.password,
        phone: this.form.phone,
        age: this.form.age,
        no: this.form.no,
        sex: this.form.sex,
        id: this.form.id,
      })
          .then(res => res.data)
          .then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.centerDialogVisible = false
              this.loadPost()
            }else{
              this.$message({
                message: '操作失败！！',
                type: 'error'
              });}
          })

    },
    doMod(){
      this.$axios.post(this.$httpUrl + '/user/update', {
        name: this.form.name,
        password: this.form.password,
        phone: this.form.phone,
        age: this.form.age,
        no: this.form.no,
        sex: this.form.sex,
        id: this.form.id,
        roleId: this.form.roleId
      })
          .then(res => res.data)
          .then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.centerDialogVisible = false
              this.loadPost()
            }else{
              this.$message({
                message: '操作失败！！',
                type: 'error'
              });}
          })
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(this.form.id){
            this.doMod();
          }else{
            this.doSave();
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      })

    },
    mod(row){
      console.log(row)
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.form.name = row.name
        this.form.password = row.password
        this.form.phone = row.phone
        this.form.age = row.age
        this.form.no = row.no
        this.form.sex = row.sex
        this.form.id = row.id
        this.roleId = row.roleId
      })
    },
    del(id){
        console.log(id)
      this.$axios.get(this.$httpUrl + '/user/del?id='+id,)
          .then(res => res.data)
          .then(res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.centerDialogVisible = false
              this.loadPost()
            }else{
              this.$message({
                message: '操作失败！！',
                type: 'error'
              });}
          })
    },
    add() {
      this.centerDialogVisible = true
      this.$nextTick(() => {
        this.resetForm()
      })

    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = 1;
      this.pageSize = val;
      this.loadPost()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.loadPost()
    },
    loadGet() {
      this.$axios.get(this.$httpUrl + '/user/list', {})
          .then(res => res.data)
          .then(res => {
            console.log(res)
            this.tableData = res.data;
          })

    }
    ,
    resetParam() {
      this.name = '';
      this.sex = '';
      this.loadPost();
    },
    loadPost() {
      this.$axios.post(this.$httpUrl + '/user/listPageC1', {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        param: {
          name:this.name
          ,sex:this.sex
        }
      })
          .then(res => res.data)
          .then(res => {
            console.log(res)
            if (res.code == 200) {
              this.tableData = res.data;
              this.total = res.total
            }else{
              alert('获取数据失败')
            }

          })

    }

  },
  beforeMount() {
   // this.loadGet();
    this.loadPost();
  }

}

</script>

<template>
  <div>
    <div style="margin-bottom: 5px">
      <el-input v-model="name" placeholder="请输入名字" suffix-icon="el-icon-search"  style="width: 200px"
                  @keyup.enter.native="loadPost"></el-input>
          <el-select v-model="sex" filterable placeholder="请选择性别" style="margin-left: 5px">
            <el-option
                v-for="item in sexs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
      </el-select>

      <el-button type="primary" style="margin-left: 5px" @click="loadPost">查询</el-button>
      <el-button type="success" @click="resetParam">重置</el-button>
      <el-button type="primary" style="margin-left: 5px" @click="add">新增</el-button>
    </div>

  <el-table :data="tableData"
    :header-cell-style="{background: '#f5f5f5', color: '#333'}"
      border>
    <el-table-column prop="id" label="ID" width="60">
    </el-table-column>
    <el-table-column prop="no" label="账号" width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
    </el-table-column>
    <el-table-column prop="age" label="年龄" width="120">
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="80">
      <template slot-scope="scope">
        <el-tag
            :type="scope.row.sex=== 1 ? 'primary' : 'success'"
            disable-transitions>{{scope.row.sex === 1 ? '男' : '女'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="roleId" label="角色" width="120">
      <template slot-scope="scope">
        <el-tag
            :type="scope.row.roleId=== 0 ? 'danger' : (scope.row.roleId=== 1 ? 'primary' : 'success')"
            disable-transitions>{{scope.row.roleId === 0? '超级管理员' :
            (scope.row.roleId=== 1 ? '管理员' : '普通用户')}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="电话" width="180">
    </el-table-column>
    <el-table-column prop="operate" label="操作">
      <template slot-scope="scope">
      <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
        <el-popconfirm
            title="确定删除吗？"
            @confirm="del(scope.row.id)"
            style="margin-left: 5px">

          <el-button slot="reference" size="small" type="danger" >删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="no" style="width: 80%">
          <el-input v-model="form.no"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 80%">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="name" style="width: 80%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" style="width: 80%">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="width: 80%">
          <el-radio-group v-model="form.resource">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone" style="width: 80%">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>