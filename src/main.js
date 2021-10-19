import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入权限模块
// 引入element-ui模块
import ElementUI from 'element-ui'
import axios from '@/utils/request' // 引入将axios封装后的request.js
import Components from '@/components'
// 引入css样式
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(Components)

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
