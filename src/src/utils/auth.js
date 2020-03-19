/****
 * auth.js 专门处理token 的读写和删除
 *    cread by yzq 2020.3.18
 * *****/
const USER_TOKEN = 'heima-toutiao-mobile-94'// 专门用来存储用户信息
// 设置用户token信息
export function setUser (user) {
// user 信息是一个对象
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 获取用户信息
export function getUser () {
  // 将字符串转化成对象
  return JSON.parse(window.localStorage.setItem(USER_TOKEN) || '{}')// 短路表达式（如果前面是ture 后面不执行）
}
// 删除用户信息
export function delUser () {
  localStorage.removeItem(USER_TOKEN)// 删除用户信息
}
