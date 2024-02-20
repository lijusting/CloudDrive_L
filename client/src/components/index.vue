<template>
  <div class="index">
    <div class="title">Cloud Driver</div>

    <div class="login-wrapper">
      <div class="header">登录</div>
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
        <button class="btn" @click="signIn">登录</button>
        <div class="msg">
          还没有账号？
          <a href="#" @click="signUp">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import "../assets/css/index.scss";
export default {
  name: "index",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    // 登录
    signIn() {
      this.dialogFormVisible = false;
      this.$http
        .post("/user/validate", this.form)
        .then((res) => {
          if (res.data.flag === 0) {
            this.$message.error(res.data.msg);
          } else {
            this.$message.success(res.data.msg);
            sessionStorage.setItem("uid", res.data.uid);
            sessionStorage.setItem("username", res.data.username);
            console.log("taozhuan");
            //  跳转到其他页面
            if (res.data.username !== "root") {
              this.$router.push({
                path: "/drive",
              });
            } else {
              this.$router.push({
                path: "/admin",
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //  注册
    signUp() {
      this.dialogFormVisible = false;
      this.$http
        .post("/user/add", this.form)
        .then((res) => {
          if (res.data.flag === 0) {
            this.$message.error(res.data.msg);
          } else {
            this.$message.success(res.data.msg);
            this.$router.push({
              path: "/drive",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style  lang="scss" scoped>
</style>