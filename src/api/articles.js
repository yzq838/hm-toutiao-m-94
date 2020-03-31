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
    url: '/suggestion', // 搜搜建议地址
    params // query参数放置在 params中
  })
}
// 搜索文章方法
export function searchArticle (params) {
  return request({
    url: '/search', //
    params // guanjia关键词及分页信息
  })
}
// 获取文章详情
export function getArticleInfo (artId) {
  return request({
    url: `/articles/${artId}` // 获取文章详情地址
  })
}
