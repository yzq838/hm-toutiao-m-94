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
// 获取y用户自己个人信息

export function getUserInfo () {
  return request({
    url: '/user' // 关注用户个人信息地址

  })
}
// 获取用户的个人资料
export function getUserProfile () {
  return request({
    url: '/user/profile'
  })
}
// 修改用户头像信息
export function updatePhoto (data) {
  return request({
    url: '/user/photo',
    method: 'patch',
    data// body参数
  })
}
