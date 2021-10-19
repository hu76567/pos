import SelectImage from './publish/select-image'

export default {
  install: function (Vue) {
    // 注册富文本编辑器
    // Vue.use(VueQuillEditor)
    Vue.component('select-image', SelectImage)
  }
}
