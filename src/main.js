import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'// 引入vant组件
import 'vant/lib/index.css'// 引入vant样式
Vue.use(Vant)// 全局注册调用vant导出对象install方法注册组件（任意位置使用）
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
