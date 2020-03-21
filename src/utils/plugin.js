// 专门负责提供小函数和vue中的过滤器及函数
export default {
  // 导出一个默认对象
  install (Vue) {
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notif({ duration: 800, ...params })
    Vue.prototype.$sleep = sleep
  }
}
function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}
