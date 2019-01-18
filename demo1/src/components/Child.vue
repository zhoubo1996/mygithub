<template>
  <div class="hello">
    <br>
 
    <div>
      <el-input v-model="username" style="width:20%;"></el-input>
      <el-button style="margin-left:20px;" type="primary" size="small" @click="queryUser">查询</el-button>
         <el-button style="margin-left:20px;" type="primary" size="small" @click="isadd">注册新用户</el-button>
    </div>
    <BR></BR>
    <el-table :data="dataInfo"   style="width: 70%; margin:0 auto; border:1px solid red;">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tag>
            <i @click="deleteUser(scope.row)">删除</i>
          </el-tag>
        </template>
      </el-table-column>
        <el-table-column  label="编辑">
       <template slot-scope="scope">
          <el-tag>
            <i @click="upUser(scope.row)">更新</i>
          </el-tag>
        </template>
        </el-table-column>
    </el-table>
     <el-dialog title="编辑信息" :visible.sync="upduser" width="40%">
            <el-form :model="form" :label-width="formLabelWidth">
              <el-form-item label="用户名:">
                <el-input v-model="form.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密  码:">
                <el-input v-model="form.password" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="page-dialog-footer">
              <el-button @click="upduser = false">取 消</el-button>
              <el-button type="primary" @click="updateUser">确 定</el-button>
            </div>
          </el-dialog>
           <el-dialog title="添加新用户" :visible.sync="add" width="40%">
            <el-form :model="formadd" :label-width="formLabelWidth">
              <el-form-item label="用户名:">
                <el-input v-model="formadd.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密  码:">
                <el-input v-model="formadd.password" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="page-dialog-footer">
              <el-button @click="add = false">取 消</el-button>
              <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
          </el-dialog>
  </div>
</template>


<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      add:false,
      formLabelWidth: "90px",
      upduser:false,
      dataInfo: [],
      username: "",
      password: "",
      form: {
        username: "",
        password: "",
        id:""
      },
      formadd: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    isadd(){
      this.add = true;
      this.formadd.username='',
      this.formadd.password='';
    },
    upUser(val){
         this.upduser = true;
          this.form.username = val.username;
          this.form.password = val.password;
          this.form.id = val.id;
    },
    updateUser(){
        let vm = this;
        let info = {
           username: this.form.username,
           password:this.form.password,
           id:this.form.id
        }
        this.$http.post("/api/user/updateUser",info).then(res=>{
         if(res){
            vm.upduser = false;
            vm.$message("修改成功!");
            vm.getAlluser();
         }
        })
    },
    queryUser() {
      let vm = this;
      let info = {
        username: vm.username
      };
      if (info.username !== "") {
        this.$http.post("/api/user/queryUser", info).then(res => {
          if (res.data) {
            console.log(res.data);
            vm.dataInfo = [];
            for (let i = 0; i < res.data.length; i++) {
              vm.dataInfo.push(res.data[i]);
            }
          } else {
            vm.$message("查无此人!");
            vm.dataInfo = [];
          }
        });
      } else {
        vm.getAlluser();
      }
    },
    deleteUser(val) {
      let vm = this;
      let info = {
        username: val.username,
        password: val.password,
        id:val.id
      };
      this.$http.post("/api/user/deleteUser", info).then(res=>{
        if(res){
            vm.$message("操作成功");
            vm.getAlluser();
        }
      })
    },
    addUser() {
      let vm = this;
      let username = this.formadd.username;
      let password = this.formadd.password;
      this.$http
        .post(
          "/api/user/addUser",
          {
            username: username,
            password: password
          },
          { emulateJSON: true }
        )
        .then(res => {
          if (res) {
            vm.$message("添加用户成功");
              this.add = false;
            vm.getAlluser();
          }
        })
        .catch(err => {
          console.log("服务器异常", err);
        });
    },
    getAlluser() {
      let vm = this;
      this.$http.get("/api/user/getUserAll").then(res => {
        console.log(res.data);
        vm.dataInfo = res.data;
      });
    }
  },
  created() {
    this.getAlluser();
  }
};
</script>
<style scoped>

</style>
