<template>
  <div>
    <el-table :data="filteredTableData" @row-contextmenu="handleContextMenu">
      <el-table-column
        :class="iconClass"
        width="100px"
        align="center"
        header-align="middle"
      >
        <template slot-scope="scope">
          <img
            :src="
              require(`../assets/icon/${suffixFn(scope.row.file_name)}.svg`)
            "
          />
          <p>{{ suffixFn(scope.row.file_name) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="file_name" label="名称" :class-name="nameClass">
      </el-table-column>
      <el-table-column
        prop="size"
        label="大小"
        :formatter="dealSize"
        :class-name="sizeClass"
        width="100px"
      >
      </el-table-column>
      <el-table-column
        prop="upload_time"
        label="上传时间"
        :formatter="dealTime"
        :class-name="timeClass"
        width="200px"
      >
      </el-table-column>
      <!-- Add Popover Component -->
      <el-popover
        ref="popover"
        placement="bottom"
        :popper-class="'custom-popper'"
        width="200"
        trigger="manual"
        v-click-outside="handleClickOutside"
      >
        <div
          class="btn"
          @click="handlePreview(contextIndex, contextRow)"
          v-if="showPreviewButton"
        >
          <img src="../assets/icon/preview.svg" />预览
        </div>
        <a :href="fileUrl">
          <div class="btn" @click="handleDownload(contextIndex, contextRow)">
            <img src="../assets/icon/download.svg" />下载
          </div>
        </a>
        <div class="btn" @click="handleDelete(contextIndex, contextRow)">
          <img src="../assets/icon/delete.svg" />删除
        </div>
        <i slot="reference" class="el-icon-more" ref="contentRef"></i>
      </el-popover>
    </el-table>
  </div>
</template>
 
<script>
import { matchFileSuffixType } from "../utils/getImgType";
import { EventBus } from "../utils/eventBus";
import "../assets/css/file-list.scss";
export default {
  data() {
    return {
      tableData: [],

      contextRow: null,
      contextIndex: null,
      fileUrl: null,
      filename: null,
      showPreviewButton: false,
    };
  },
  computed: {
    iconClass() {
      return "iconclass";
    },
    nameClass() {
      return "nameclass";
    },
    sizeClass() {
      return "sizeclass";
    },
    timeClass() {
      return "timeclass";
    },
    filteredTableData() {
      return this.tableData.filter(
        (row) => this.offcieIsShow(this.suffixFn(row.file_name)) === true
      );
    },
  },
  methods: {
    handleContextMenu(row, column, event) {
      event.preventDefault();
      this.contextRow = row;
      this.contextIndex = this.tableData.indexOf(row);
      this.fileUrl = this.getFile(this.contextRow);
      this.filename = row.file_Name;
      // Get popover instance and manually show it
      const popover = this.$refs.popover;
      popover.doShow();
      console.log(this.contextRow.file_name);
      this.showPreviewButton = this.isInvisible(
        this.suffixFn(this.contextRow.file_name)
      );

      console.log(this.showPreviewButton);
      // Set the position of the popover
      const popoverEl = popover.$el;
      popoverEl.style.position = "fixed";
      popoverEl.style.top = `${event.clientY}px`;
      popoverEl.style.left = `${event.clientX}px`;
    },
    suffixFn(fileName) {
      let suffix = matchFileSuffixType(fileName); //fileName 文件名
      return suffix;
    },

    handleClickOutside() {
      const popover = this.$refs.popover;
      popover.doClose();
    },

    handlePreview(index, row) {
      console.log("this.handlePreview is running");
      console.log("this is 后缀 " + this.suffixFn(row.file_name));

      // console.log(row);
      this.filename = row.file_name;
      // console.log(this.getFile(row));
      if (this.suffixFn(row.file_name) === "office") {
        console.log("welcome officepre");
        console.log("this name" + row.file_Name);
        this.$router.push({
          path: "/officepre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      } else if (this.suffixFn(row.file_name) === "txt") {
        console.log("welcome txtpre");
        this.$router.push({
          path: "/txtpre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      } else if (this.suffixFn(row.file_name) === "image") {
        console.log("welcome imgpre");
        console.log("this name" + row.file_name);
        this.$router.push({
          path: "/imgpre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      } else if (this.suffixFn(row.file_name) === "radio") {
        console.log("welcome radiopre");
        console.log("this name" + this.filename);
        this.$router.push({
          path: "/radiopre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      } else if (this.suffixFn(row.file_name) === "video") {
        console.log("welcome vediopre");
        this.$router.push({
          path: "/videopre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      } else if (this.suffixFn(row.file_name) === "docx") {
        console.log("welcome docxpre");
        this.$router.push({
          path: "/docxpre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      } else if (this.suffixFn(row.file_name) === "xlsx") {
        console.log("welcome xlsxpre");
        this.$router.push({
          path: "/xlsxpre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      } else if (this.suffixFn(row.file_name) === "pptx") {
        console.log("welcome pptxpre");
        this.$router.push({
          path: "/pptxpre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      } else if (this.suffixFn(row.file_name) === "pdf") {
        console.log("welcome pdfpre");
        this.$router.push({
          path: "/pdfpre",
          query: {
            url: this.getFile(row),
            name: this.filename,
          },
        });
      }
    },
    offcieIsShow(p) {
      let strArr = ["video"];
      let targetStr = p;
      if (strArr.includes(targetStr)) {
        return true;
      } else {
        return false;
      }
    },

    isInvisible(param) {
      let strArr = [
        "txt",
        "image",
        "radio",
        "video",
        "docx",
        "xlsx",
        "pptx",
        "pdf",
      ];
      let targetStr = param;
      if (strArr.includes(targetStr)) {
        return true;
      } else {
        return false;
      }
    },
    handleDelete(index, row) {
      this.$http
        .delete(`/file/delete/${row.hash_name}/${row.id}`)
        .then((res) => {
          this.$message.success(res.data.msg);
          this.refreshFileList();
        })
        .catch((err) => {
          console.log("Error=>", err);
        });
    },
    handleDownload() {
      setTimeout(() => {
        this.refreshFileList();
      }, 1000);
    },
    refreshFileList() {
      this.getFileList();
    },
    getFileList() {
      let params = {
        uid: sessionStorage.getItem("uid"),
      };
      this.$http
        .post("/file/list", params)
        .then((res) => {
          if (res.data.code === 0) {
            this.$message.error(res.data.msg);
          } else {
            this.tableData = res.data;
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFile(data) {
      let url = `http://localhost:8081/file/download/${data.hash_name}/${data.id}`;
      console.log(url);
      return url;
    },
    dealSize(row, column) {
      let fileSize = row.size / 1024; // Convert to KB
      if (fileSize < 1024) {
        // Less than 1 MB
        return `${fileSize.toFixed(2)}KB`;
      }

      fileSize = fileSize / 1024; // Convert to MB
      if (fileSize < 1024) {
        // Less than 1 GB
        return `${fileSize.toFixed(2)}MB`;
      }

      fileSize = fileSize / 1024; // Convert to GB
      return `${fileSize.toFixed(2)}GB`;
    },

    dealTime(row, column) {
      return this.formatTime(row.upload_time);
    },
    formatTime(value) {
      var date = new Date(value);
      var Y = date.getFullYear();
      var M =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      var D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      var h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      var m =
        date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      var s =
        date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
      return `${Y}-${M}-${D} ${h}:${m}`;
    },

    componentBFunction() {
      this.getFileList();
    },
  },
  mounted() {
    this.getFileList();
  },
  created() {
    EventBus.$on("notify-other-component", this.componentBFunction);
  },
  beforeDestroy() {
    // 在组件销毁前移除事件监听，防止内存泄漏
    EventBus.$off("notify-other-component", this.componentBFunction);
  },
};
</script>

