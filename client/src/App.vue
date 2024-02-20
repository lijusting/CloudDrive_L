<template>
  <div id="app">
    <router-view class="routerview"></router-view>
  </div>
</template>

<script>
import Footer from "./layout/footer.vue";
export default {
  components: {
    Footer,
  },
};
</script>


<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  min-height: 100vh;
}
</style>>


