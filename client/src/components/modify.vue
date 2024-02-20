<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="change-password"
    >
      <el-form-item label="新密码" prop="newPass">
        <el-input
          type="password"
          v-model="ruleForm.newPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    userid: Number,
    oldPass: String,
  },
  data() {
    //  验证新密码
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        newPass: "",
      },
      rules: {
        newPass: [{ validator: validateNewPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log("这是uid" + this.userid);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            uid: this.userid,
            oldPassword: this.oldPass,
            newPassword: this.ruleForm.newPass,
          };
          this.$http
            .put(`/user/update/${this.userid}`, params)
            .then((res) => {
              this.$message.success("修改密码成功!");
            })
            .catch((err) => {
              console.log("Error=>", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
