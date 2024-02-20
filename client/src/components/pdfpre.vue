<template>
  <div>
    <div class="title">{{ name }}</div>
    <pdf v-for="i in numPages" :key="i" :src="url" :page="i"></pdf>
  </div>
</template>

<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf,
  },
  data() {
    return {
      url: "",
      numPages: 1,
    };
  },
  mounted: function () {
    this.getNumPages(this.url);
  },
  created() {
    this.url = this.$route.query.url;
    console.log(this.$route.query.url);
    this.name = this.$route.query.name;
    console.log(this.$route.query.name);
  },
  methods: {
    getNumPages(url) {
      const loadingTask = pdf.createLoadingTask(url);
      loadingTask.promise
        .then((pdf) => {
          this.url = url;
          this.numPages = pdf.numPages;
        })
        .catch((err) => {
          console.error("pdf加载失败");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  margin: 10px auto;
  max-width: 800px;
}
span {
  margin: auto;
  max-width: 800px;
}
</style>