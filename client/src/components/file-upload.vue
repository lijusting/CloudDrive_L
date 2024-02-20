<template>
  <!-- action="http://localhost:8081/file/add" -->

  <el-upload
    drag
    multiple
    action="http://localhost:8081/file/add"
    :data="userInfo"
    :on-success="dealSuccess"
    :on-error="dealError"
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>
<script>
import { EventBus } from "../utils/eventBus";
export default {
  data() {
    return {
      userInfo: {
        uid: sessionStorage.getItem("uid"),
      },
    };
  },
  methods: {
    dealSuccess() {
      EventBus.$emit("notify-other-component");
      this.$message.success("上传文件成功!");
    },
    dealError() {
      this.$message.error("上传文件失败,请重新上传!");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>