<template>
  <div class="footer">
    created by <a href="lijusting@qq.com">lijusting</a> @{{ date }}
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer {
  margin: 10px auto;
  text-align: center;
  font-size: 18px;
}
</style>
