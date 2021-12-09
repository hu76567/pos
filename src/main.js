import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
// 引入element-ui模块
import ElementUI from 'element-ui'
import store from '@/store'
import axios from '@/utils/request' // 引入将axios封装后的request.js
// 引入css样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import plugin from '@/utils/plugins'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(plugin)
Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
