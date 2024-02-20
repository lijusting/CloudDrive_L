<template>
  <div :class="{ hidden }">
    <div class="banner">
      <div class="container">
        <h1>
          <div>
            {{ name }}
          </div>
        </h1>
      </div>
    </div>
    <div class="container">
      <div v-show="loading" class="well loading">正在加载中，请耐心等待...</div>
      <div v-show="!loading" class="well" ref="output"></div>
    </div>
  </div>
</template>

<script>
import { getExtend, readBuffer, render } from "../utils/util";
import { parse } from "qs";

/**
 * 支持嵌入式显示，基于postMessage支持跨域
 * 示例代码：
 *
 */
export default {
  name: "pptxpre",
  props: {
    msg: String,
  },
  data() {
    return {
      url: null,
      name: null,
      // 加载状态跟踪
      loading: false,
      // 上个渲染实例
      last: null,
      // 隐藏头部，当基于消息机制渲染，将隐藏
      hidden: false,
    };
  },
  created() {
    this.url = this.$route.query.url;
    console.log(this.$route.query.url);
    this.name = this.$route.query.name;
    console.log(this.$route.query.name);
  },
  mounted() {
    this.down();
  },
  methods: {
    down() {
      fetch(this.url)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          // 处理 ArrayBuffer
          console.log(arrayBuffer);
          let f = { name: "校友邦系统-学生操作指南-2022.pptx" };
          this.last = this.displayResult(arrayBuffer, f);
          this.displayResult(arrayBuffer, f);
          console.log("我执行了");
        })
        .catch((error) => {
          // 处理错误
        });
    },
    displayResult(buffer, file) {
      // 取得文件名
      const { name } = file;
      console.log(name);
      // 取得扩展名
      const extend = "pptx";
      // 输出目的地
      const { output } = this.$refs;
      // 生成新的dom
      const node = document.createElement("div");
      // 添加孩子，防止vue实例替换dom元素
      if (this.last) {
        output.removeChild(this.last.$el);
        this.last.$destroy();
      }
      const child = output.appendChild(node);
      // 调用渲染方法进行渲染
      return new Promise((resolve, reject) =>
        render(buffer, extend, child).then(resolve).catch(reject)
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.contain {
  margin: 0 auto;
  overflow: hidden;
  height: 100%;
}
.banner {
  overflow: auto;
  text-align: center;
  /* background-color: #12b6ff; */
  color: #000;
}

.hidden .banner {
  display: none;
}

.hidden .well {
  height: calc(100vh - 12px);
}

.file-select {
  position: absolute;
  left: 5%;
  top: 17px;
  margin-left: 20px;
}

.banner div {
  color: #000;
}

.banner h1 {
  font-size: 20px;
  line-height: 2;
  margin: 0.5em 0;
}

.well {
  display: block;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  margin: 5px auto;

  width: calc(100% - 12px);
  max-width: 800px;
  height: 100%;
}

.loading {
  text-align: center;
  padding-top: 50px;
}

.pptx-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  ::deep section {
    border: 0;
  }
}

.messages .warning {
  color: #cc6600;
}
</style>

<style>
</style>
