// 负责处理频道数据 将此方法改造成本地化频道
import store from '@/store'
import request from '@/utils/request'
const CACHE_CHANNEL_V = 'he-94-toutiao-v'// 登录用户的key
const CACHE_CHANNEL_T = 'he-94-toutiao-t'// youke游客
export function getMyChannels () {
  return new Promise(function (resolve, reject) {
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const str = localStorage.getItem(key)// 获取缓存用户数据
    if (str) {
      // 本地缓存数据
      resolve({ channels: JSON.parse(str) }) // 这里的结构 是和 请求体中的结构
    } else {
      // 没有需要线上拉去缓存数据
      request({
        url: '/user/channels'
      }).then(result => {
        // 获取请求结果
        localStorage.getItem(key, JSON.stringify(result.channels))
        resolve(result) // 这里表示直接 成功执行了 获取用户频道数据
      })
    }
  })
  // return request({
  //   url: '/user/channels'
  // })
}
// 获取全部的频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
// 删除频道api、@params 作为删除频道的依据
export function delChannels (id) {
  return new Promise(function (resolve, reject) {
    const key = store.state.user.token ? CACHE_CHANNEL_V : CACHE_CHANNEL_T
    const channels = JSON.parse(localStorage.getItem(key))
    // 第一种方法
    // channels = channels.filter(item => item.id !== id)
    // localStorage.setItem(key, JSON.stringify(channels)
    // 第二种方法
    const index = channels.findIndex(item => item.id === id)
    if (index > -1) {
      channels.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(channels))
      resolve()
    } else {
      reject(new Error('没有找到对应的频道...'))
    }
  })
}
