// 专门负责提供小函数和vue中的过滤器及函数
import dayjs from 'dayjs'// 引入dayjs插件
import relativeTime from 'dayjs/plugin/relativeTime'// 引入相对时间插件
import 'dayjs/locale/zh-cn'// 引入语言包
dayjs.extend(relativeTime)// 相当于dayjs扩展相对时间的方法
export default {
  // 导出一个默认对象
  install (Vue) {
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
    Vue.prototype.$sleep = sleep
    // 过滤器
    Vue.filter('relTime', relTime)// 注册全局过滤器
  }
}
function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}
function relTime (date) {
  return dayjs().locale('zh-cn').from(date)// 当前时间距离传入时间有多久
}
