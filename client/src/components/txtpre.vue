<template>
  <div class="txt-preview">
    <div v-if="loading">加载中...</div>
    <pre v-else>{{ content }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      name: "",
      content: "",
      loading: true,
    };
  },
  methods: {
    async fetchContent() {
      try {
        const response = await fetch(this.url);
        this.content = await response.text();
      } catch (error) {
        console.error("Error fetching txt content:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.url = this.$route.query.url;
    console.log(this.$route.query.url);
    this.name = this.$route.query.name;
    console.log(this.$route.query.name);
  },
  mounted() {
    this.fetchContent();
  },
};
</script>

<style lang="scss" scoped>
.txt-preview {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  max-width: 800px;
  margin: 0 auto;
  overflow: auto;

  pre {
    white-space: pre-wrap;
    font-family: "Courier New", Courier, monospace;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    word-wrap: break-word;
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
