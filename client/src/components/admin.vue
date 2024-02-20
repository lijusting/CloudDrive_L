<template>
  <div class="contain">
    <div class="sidebar">
      <div class="leftheader">
        <img class="logo" src="../assets/icon/dirve.svg" />
        <p class="title">Could Drive</p>
      </div>
      <div class="user" @click="dialogVisible = true">
        <img class="userImg" src="../assets/icon/people.svg" alt="" />
        <p class="username">root</p>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>

    <el-dialog
      ref="dialog3"
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <UserSet></UserSet>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UserSet from "@/components/user-set.vue";
export default {
  components: { UserSet },
  data() {
    return {
      userlist: [],
      name: "用户管理",
      dialogVisible: false,
    };
  },
  methods: {
    signOut() {
      sessionStorage.clear();
      this.$router.push("/");
      this.$message({
        message: "登出成功",
        type: "success",
      });
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
    handleDelete() {},
  },
  mounted() {
    this.getUserlist();
  },
};
</script>

<style lang="scss" scoped>
.el-dialog {
  width: 250px;
}
.contain {
  .sidebar {
    flex: 1;
    position: fixed;
    width: 300px;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #f5f5f5;

    padding: 0 30px;
    padding-top: 30px;
    .leftheader {
      display: flex;
      justify-content: center;
      .logo {
        padding-right: 10px;
        display: inline-block;
        vertical-align: bottom;
        transform: translateY(3px);
      }
      .title {
        height: 30px;
        line-height: 35px;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .user {
      display: flex;
      flex-direction: column; /* 添加此行以使子元素垂直排列 */
      justify-content: center; /* 添加此行以使子元素水平居中 */
      align-items: center; /* 添加此行以使子元素垂直居中 */

      margin: 30px;
      .userImg {
        display: inline-block;
      }
      .username {
        display: inline-block;
        margin-top: 5px;
        font-size: 16px;
      }
    }
  }
  .content {
    .right-header {
      display: flex;
      justify-content: space-between;
      .pagename {
        margin-left: 15px;
        width: 100px;
        height: 40px;
      }
      .upload {
        width: 32px;
        height: 32px;
        margin-right: 20px;
      }
    }
    margin-left: 300px;
    padding: 0 30px;
    margin-top: 60px;
    flex: 4;
  }
}
</style>
