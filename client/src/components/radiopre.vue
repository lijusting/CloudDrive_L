<template>
  <div>
    <div class="paly">
      <div class="player">
        <div class="name">{{ name }}</div>
        <div class="image">
          <div class="wc">
            <div class="inc">
              <img
                src="../assets/image/3.png"
                :class="isplay ? 'dh3' : 'dh4'"
                alt=""
              />
            </div>
            <img
              class="bopian"
              src="../assets/image/play-bar-support.png"
              alt=""
            />
            <img
              class="zheng"
              :class="isplay ? 'dh1' : 'dh2'"
              src="../assets/image/play-bar.png"
              alt=""
            />
          </div>
          <div class="controls">
            <div class="time">
              <span> {{ nowtime }}/{{ endtime }}</span>
            </div>

            <el-slider
              v-model="value2"
              :show-tooltip="false"
              @change="changeCurrentTime()"
            ></el-slider>

            <audio
              :src="url"
              ref="audio"
              @timeupdate="onTimeupdata()"
              @loadedmetadata="onLoadedmetadata()"
            ></audio>

            <div class="music_button">
              <button class="bt">
                <img src="../assets/icon/previous.svg" alt="" />
              </button>
              <button
                class="bt"
                v-show="!isplay"
                @click="
                  change();
                  toPlay();
                "
              >
                <img src="../assets/icon/play.svg" alt="" />
              </button>

              <button
                class="bt"
                v-show="isplay"
                @click="
                  change();
                  toPause();
                "
              >
                <img src="../assets/icon/pause.svg" alt="" />
              </button>
              <button class="bt">
                <img src="../assets/icon/next.svg" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatSeconds } from "../utils/formattime.js";
export default {
  components: {},
  data() {
    return {
      font: "20px",
      value2: 0,
      isplay: false,
      endtime: "00:00",
      nowtime: "00:00",
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
    change() {
      return (this.isplay = !this.isplay);
    },
    toPlay() {
      let that = this;
      that.$nextTick(function () {
        that.$refs.audio.play();
      });
    },
    toPause() {
      let that = this;
      that.$nextTick(function () {
        that.$refs.audio.pause();
      });
    },
    onTimeupdata() {
      this.nowtime = formatSeconds(this.$refs.audio.currentTime);

      this.value2 = parseInt(
        (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
      );
    },
    // 当加载数据完成后，会触发该事件的回调函数
    onLoadedmetadata() {
      console.log("loadedmetadata");
      this.endtime = formatSeconds(this.$refs.audio.duration);
      this.toPlay();
      this.change();
      // this.endtime = parseInt(res.duration)
    },
    changeCurrentTime() {
      this.$refs.audio.currentTime = parseInt(
        (this.value2 / 100) * this.$refs.audio.duration
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes xuanzhuang {
  0% {
    -webkit-transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

.paly {
  display: flex;
  margin-top: 50px;
  .sidebar {
    width: 350px;
  }

  .player {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    justify-content: space-between;
    .name {
      width: 200px;
    }
    .title {
      .h2 {
        display: block;
      }
    }

    .image {
      padding: 50px 50px 0 0;
      width: 350px;
      height: 600px;
      margin: 50px;
      overflow: hidden;

      .wc {
        position: relative;
        margin: 0 auto;
        display: flex;
        width: 300px;
        height: 300px;
        background: #000;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
        .inc {
          width: 300px;
          height: 300px;
          img {
            width: 300px;
            height: px;
            border-radius: 50%;
            animation: xuanzhuang 6s linear infinite;
          }

          .dh3 {
            animation-play-state: running;
          }

          .dh4 {
            animation-play-state: paused;
          }
        }

        .bopian {
          position: absolute;
          top: -65px;
          left: 200px;
          width: 30px;
          z-index: 2;
        }

        .zheng {
          position: absolute;
          top: -55px;
          left: 210px;
          width: 100px;
          transform-origin: left top;
          transition: all 0.5s;
        }

        .dh1 {
          transform: rotate(14deg);
        }

        .dh2 {
          transform: rotate(-14deg);
        }
      }
      .time {
        margin-top: 140px;
        display: flex;
        width: 300px;
        margin: 0 auto;
        span {
          display: block;
          margin-top: 35px;
          margin-left: auto;
        }
      }
      .el-slider {
        margin: 0 auto;
        width: 290px;
        ::v-deep .el-slider__runway {
          height: 4px;
          .el-slider__bar {
            height: 4px;
            background-color: #d33a31;
          }
          .el-slider__button-wrapper .el-tooltip {
            width: 10px;
            height: 10px;
            border: 0;
            background-color: #d33a31;
          }
        }
      }
      .music_button {
        display: flex;
        margin: 35px auto;
        padding: 20px;
        justify-content: space-between;
        .bt {
          display: inline-block;
          width: 40px;
          height: 40px;
          background-color: #d33a31;
          border-radius: 50%;
          text-align: center;

          line-height: 45px;
          border: 0;
          img {
            display: block;
            align-content: center;
            vertical-align: middle;
            transform: translateY(2px);
          }
        }
      }
    }
    .lyc {
      height: 600px;
      .lyricUL {
        margin: 100px 50px;
        width: 500px;
        height: 300px;
        text-align: center;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
          color: transparent;
        }
        li {
          display: block;
          margin: 8px;
          height: 20px;
        }

        .active1 {
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
