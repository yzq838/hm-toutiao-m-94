/***
 * request.js 请求管理工具
 *
 *create by y 2020.03.19
*/
import axios from 'axios'
import JSONBig from 'json-bigint'// 引入大数字插件
import store from '@/store'// 引入vuex实例对象
// axios defaults 对原有默认值进行修改
// axios.create()相当于new一个新的实例
const instance = axios.create({
  // 构造函数和default一样
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 基础请求地址
  transformResponse: [function (data) {
    return data ? JSONBig.parse(data) : {}
  }]// 此函数是后台响应回来 但还没进入到axios的响应拦截器时执行 数组里可以写多个的处理函数

})// 创建一个新的实例
// 请求之前进行token的注入 instance是axios的 新实例
instance.interceptors.request.use(function (config) {
  // 成功的时候读取配置信息，给配置信息中注入token
//   if (store.state.user.token) {
//     config.headers.Authorization = `Bearer ${store.state.user.token}`// token 注入headers
//   }
  config.headers.Authorization && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config// 返回配置
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器处理返回结果的数据 将多嵌套的结构解构出来
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data//  如果成功返回 如果两层可以解开返回两层反之一层
  } catch (error) {
    return response.data
  }
}, function (error) {
  return Promise.reject(error)
})

export default instance
