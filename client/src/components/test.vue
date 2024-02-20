<template>
  <div><button @click="getAlluser()"></button></div>
</template>

<script>
export default {
  methods: {
    getAlluser() {
      this.$http
        .post("/user/getalluser")
        .then((res) => {
          if (res.data.code === 0) {
            this.$message.error(res.data.msg);
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>