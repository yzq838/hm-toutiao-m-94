// 负责处理频道数据
import request from '@/utils/request'
export function getMyChannels () {
  return request({
    url: '/user/channels'
  })
}
// 获取全部的频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
