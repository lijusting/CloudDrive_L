<template>
  <div class="show">
    <base-header></base-header>
    <el-tabs>
      <el-tab-pane><FileList></FileList> </el-tab-pane>
    </el-tabs>
    <base-footer></base-footer>
  </div>
</template>
 
<script>
import BaseFooter from "../layout/footer";
import UploadFile from "./file-upload";
import FileList from "./file-list";
import userSet from "./user-set";
export default {
  name: "show",
  components: {
    BaseFooter,
    UploadFile,
    FileList,
    userSet,
    FileList,
  },
  data() {
    return {
      tabPosition: "left",
      tabActivedName: "second",
      componentList: [
        {
          tabName: "first",
          compoName: "upload-file",
          tabLabel: "上传文件",
        },
        {
          tabName: "second",
          compoName: "file-list",
          tabLabel: "文件列表",
        },
        {
          tabName: "third",
          compoName: "user-set",
          tabLabel: "用户设置",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
  min-height: 400px;
  padding: 20px 40px;
}
</style>