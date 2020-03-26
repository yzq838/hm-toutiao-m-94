// 处理文章模块请求数据
import request from '@/utils/request'
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
// 不感兴趣文章接口
export function dislikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
// 举报文章接口
export function reportArticle (data) {
  return request({
    url: '/article/reports',
    method: 'post',
    data
  })
}
// 获取联想搜索接口
export function getSuggestion (params) {
  return request({
    url: '/suggestion', // 搜索地址

    params
  })
}
