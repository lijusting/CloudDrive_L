<template>
  <div class="drive">
    <div class="sidebar">
      <div class="leftheader">
        <img class="logo" src="../assets/icon/dirve.svg" />
        <p class="title">Could Drive</p>
      </div>
      <div class="user" @click="dialog2 = true">
        <img class="userImg" src="../assets/icon/people.svg" alt="" />
        <p class="username">{{ username }}</p>
      </div>
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.id"
          @click="handleItemClick(item)"
          :class="{ active: item.isActive }"
        >
          <img src="../assets/icon/file.svg" alt="" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="right-header">
        <div class="pagename">{{ pagename }}</div>
        <img
          class="upload"
          @click="dialog1 = true"
          src="../assets/icon/add.svg"
          alt=""
        />
      </div>
      <router-view class="contentview"> </router-view>
    </div>

    <el-dialog
      ref="dialog1"
      title="提示"
      :visible.sync="dialog1"
      width="30%"
      :before-close="handleClose"
    >
      <FileUpload></FileUpload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="dialog1 = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      ref="dialog2"
      title="提示"
      :visible.sync="dialog2"
      width="30%"
      :before-close="handleClose"
    >
      <UserSet></UserSet>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="dialog2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "../assets/css/drive.scss";
import Sginout from "@/layout/sginout.vue";
import FileUpload from "@/components/file-upload.vue";
import UserSet from "@/components/user-set.vue";
export default {
  components: { Sginout, FileUpload, UserSet },
  data() {
    return {
      dialog1: false,
      dialog2: false,
      pagename: "文件",
      username: sessionStorage.getItem("username"),
      menuItems: [
        {
          id: 0,
          name: "文件",
          route: "allfile",
          isActive: true,
        },
        {
          id: 1,
          name: "视频",
          route: "videolist",
          isActive: false,
        },
        {
          id: 2,
          name: "音频",
          route: "radiolist",
          isActive: false,
        },
        {
          id: 3,
          name: "文档",
          route: "officelist",
          isActive: false,
        },
        {
          id: 4,
          name: "图像",
          route: "imglist",
        },
      ],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleItemClick(item) {
      // 重置菜单项的选中状态
      this.menuItems.forEach((menu) => {
        menu.isActive = false;
      });
      // 设置当前菜单项为选中状态
      item.isActive = true;
      this.$router.push(item.route);
      this.pagename = item.name;
    },
  },
};
</script>
<style  lang="scss" scoped>
</style>
