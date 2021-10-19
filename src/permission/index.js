// 此文件用于处理路由权限问题
import router from '@/router'

// 引入进度条包和样式文件
import progress from 'nprogress'
import 'nprogress/nprogress.css'

// 注册全局前置守卫
router.beforeEach(function (to, from, next) {
  progress.start()
  if (to.path.startsWith('/home')) {
    var operatoId = localStorage.getItem('operatoId')
    if (operatoId) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

// 在后置守卫的位置关闭
router.afterEach(() => {
  // 关闭进度条
  progress.done()
})
