/***
 * request.js 请求管理工具
 *
 *create by y 2020.03.19
*/
import axios from 'axios'
import JSONBig from 'json-bigint'// 引入大数字插件
// axios defaults 对原有默认值进行修改
// axios.create()相当于new一个新的实例
const instance = axios.create({
  // 构造函数和default一样
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0', // 基础请求地址
  transformResponse: [function (data) {
    return data ? JSONBig.parse(data) : {}
  }]// 此函数是后台响应回来 但还没进入到axios的响应拦截器时执行 数组里可以写多个的处理函数

})// 创建一个新的实例
export default instance
