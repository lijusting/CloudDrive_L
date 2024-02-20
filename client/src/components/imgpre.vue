<template>
  <div>
    <div class="title">{{ name }}</div>

    <div class="image">
      <img width="100%" :src="url" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: null,
    };
  },
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
.image {
  max-width: 500px;
  margin: 10px auto;
}
</style>