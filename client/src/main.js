import Vue from 'vue'
import App from './App.vue'
import http from './utils/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/main'
import '../src/assets/css/remove-default.scss'
import VueCoreVideoPlayer from 'vue-core-video-player'
import './utils/rem'
//如果当前的窗体不是最外层窗体
if (window != top) {
  //那么就将最外层窗体的的地址赋给当前窗体
  top.location.href = window.location.href;
}
Vue.use(VueCoreVideoPlayer)
Vue.use(ElementUI)
Vue.prototype.$http = http;
Vue.config.productionTip = false
import ClickOutside from "v-click-outside";
Vue.use(ClickOutside);
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
import jQuery from 'jquery'
import $ from 'jquery'  //导入jquery
Vue.prototype.$ = $   //将$(jquery)挂在到vue.prototype身上，让所有的Vue共享这个方法
Vue.component('popper', Popper);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
