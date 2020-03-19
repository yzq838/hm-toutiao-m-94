/*
做导航守卫
*/
import router from '@/router'// 引入路由实例
import store from '@/store'// 引入store对象
// 前置守卫
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 拦截请求区登录
    next({
      path: '/login',
      query: {
        redirrectUrl: to.fullPath
      }
    })
  } else {
    // 直接放行
    next()
  }
})
