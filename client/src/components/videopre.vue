<template>
  <div>
    <div class="title">{{ name }}</div>
    <div class="player-container">
      <vue-core-video-player :src="url" :title="name" autoplay />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
      name: "",
    };
  },
  mounted() {},
  created() {
    this.url = this.$route.query.url;
    console.log(this.$route.query.url);
    this.name = this.$route.query.name;
    console.log(this.$route.query.name);
  },
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  line-height: 50px;
}
::v-deep .player-container {
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>