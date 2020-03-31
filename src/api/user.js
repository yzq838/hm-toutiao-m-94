// 专门处理用户相关请求
import request from '@/utils/request'// 引入请求模块

// 登录方法

export function login (data) {
  return request({
    url: '/authorizations', // 请求地址
    method: 'post',
    data// 接收传入的data
  })
}
// 关注用户
export function followUser (data) {
  return request({
    url: '/user/followings', // 关注用户请求地址
    method: 'post',
    data// 接收传入的data
  })
}
// 取消关注用户
export function unfollowUser (autid) {
  return request({
    url: `/user/followings/${autid}`, // 关注用户请求地址
    method: 'delete'

  })
}
