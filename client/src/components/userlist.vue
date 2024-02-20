<template>
  <div>
    <div class="right-header">
      <div class="pagename">用户管理</div>
      <img class="upload" @click="add()" src="../assets/icon/add.svg" alt="" />
    </div>
    <el-table :data="filteredUserlist">
      <el-table-column prop="uid" label="uid" width="100px"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="400px">
      </el-table-column>
      <el-table-column align="middle" label="对用户进行的操作;">
        <template slot-scope="scope">
          <el-button @click="getFileListDeleteAllAndDeleteUser(scope.row.uid)"
            >删除账号</el-button
          >
          <el-button @click="handleModify(scope.row.uid, scope.row.password)"
            >修改密码</el-button
          >
          <el-button @click="handleView(scope.row.uid, scope.row.username)"
            >用户文件</el-button
          >
        </template>
      </el-table-column>

      <el-dialog
        ref="dialog3"
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :append-to-body="true"
      >
        <Modify :oldPass="password" :userid="uid"></Modify>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        ref="dialog3"
        title="增加账号"
        :visible.sync="dialogVisible1"
        width="30%"
        :append-to-body="true"
      >
        <div class="login-wrapper">
          <el-form :model="form">
            <el-form-item>
              <el-input
                v-model="form.username"
                autocomplete="off"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.password"
                autocomplete="off"
                type="password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="wrapper-bottom">
            <el-button
              class="btn"
              @click="signUp"
              style="display: block; margin: 0 auto; width: 125px"
              >增加账号</el-button
            >
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-table>
  </div>
</template>

<script>
import Modify from "./modify.vue";

export default {
  components: {
    Modify,
  },
  computed: {
    filteredUserlist() {
      return this.userlist.filter((row) => row.username !== "root");
    },
  },

  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      userlist: [],
      dialogVisible: false,
      dialogVisible1: false,
      uid: null,
      password: null,
      tableData: null,
    };
  },
  methods: {
    add() {
      this.dialogVisible1 = true;
      console.log(this.filteredUserlist);
    },
    getUserlist() {
      this.$http
        .post("/user/getalluser")
        .then((res) => {
          if (res.data.code === 0) {
            this.$message.error(res.data.msg);
          } else {
            this.userlist = res.data;
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleModify(uid, ps) {
      this.dialogVisible = true;
      this.uid = uid;
      this.password = ps;
      console.log("传输的uid:" + this.uid);
      console.log(this.dialogVisible);
    },

    getFileListDeleteAllAndDeleteUser(id) {
      let uid = id;
      let params = {
        uid: uid,
      };

      this.$http
        .post("/file/list", params)
        .then((res) => {
          if (res.data.code === 0) {
            this.$message.error(res.data.msg);
          } else {
            this.tableData = res.data;
            console.log(res.data);

            // Delete all files
            let deletePromises = this.tableData.map((row) =>
              this.$http.delete(`/file/delete/${row.hash_name}/${row.id}`)
            );

            // Wait for all delete requests to complete, then delete the user
            Promise.all(deletePromises)
              .then(() => {
                this.$http
                  .delete(`/user/delete/${uid}`)
                  .then((res) => {
                    this.$message.success(res.data.msg);
                  })
                  .catch((err) => {
                    console.log("Error=>", err);
                  });
              })
              .catch((err) => {
                console.log("Error=>", err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => {
        this.getUserlist();
      }, 1000);
    },
    handleView(id, name) {
      this.$router.push({
        path: "filelist",
        query: {
          id: id,
          name: name,
        },
      });
    },
    signUp() {
      this.$http
        .post("/user/add", this.form)
        .then((res) => {
          if (res.data.flag === 0) {
            this.$message.error(res.data.msg);
          } else {
            this.$message.success(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(() => {
        this.getUserlist();
      }, 1000);
    },
  },
  mounted() {
    this.getUserlist();
  },
};
</script>

<style lang="scss" scoped>
.right-header {
  display: flex;
  justify-content: space-between;
  .pagename {
    display: inline-block;
    margin-left: 15px;
    width: 300px;
    height: 40px;
  }
  .upload {
    width: 32px;
    height: 32px;
    margin-right: 20px;
  }
}
</style>