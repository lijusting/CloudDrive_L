<template>
  <div class="contain">
    <div class="title">{{ name }}</div>
    <vue-office-docx :src="url" @rendered="rendered" />
  </div>
</template>

<script>
//引入VueOfficeDocx组件
import VueOfficeDocx from "@vue-office/docx";
//引入相关样式
import "@vue-office/docx/lib/index.css";

export default {
  components: {
    VueOfficeDocx,
  },
  data() {
    return {
      url: null,
      name: null,
    };
  },
  created() {
    this.url = this.$route.query.url;
    console.log(this.$route.query.url);
    this.name = this.$route.query.name;
    console.log(this.$route.query.name);
  },
  methods: {
    rendered() {
      console.log("渲染完成");
    },
  },
};
</script>
<style lang="scss" scoped>
.contain {
  .title {
    text-align: center;
    margin: 10px auto;
    max-width: 800px;
  }
  .vue-office-docx {
    margin: 0 auto;
    max-width: 800px;
    overflow: hidden;

    ::v-deep .docx-wrapper {
      padding: 0 !important;
      background-color: transparent;
      .docx {
        box-shadow: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style>