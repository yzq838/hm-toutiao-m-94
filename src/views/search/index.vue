<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search @search = "onSearch" v-model.trim="q"  placeholder="请输入搜索关键词" shape="round" />
    <van-cell-group class="suggest-box" v-if="q" >
     <!-- 注册循环搜索建议 -->

      <van-cell @click="toResult(item)" icon="search" v-for="(item, index) in suggestList" :key="index">
        {{ item }}
      </van-cell>
    </van-cell-group>
    <div class="history-box" v-if="!q">
      <div class="head" v-if="historyList.length">
        <span>历史记录</span>
        <van-icon name="delete" @click="clear"></van-icon>
      </div>
      <van-cell-group>
        <van-cell @click="toResult(item)" v-for="(item, index) in historyList" :key="index">
          <a class="word_btn">{{ item }}</a>
          <van-icon @click.stop="delHistory" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/articles'// 引入搜索联想接口
const key = 'hm-94-toutiao-history'// 用来作为历史记录在本地缓存中的key
export default {
  name: 'search',
  data () {
    return {
      q: '', // 关键字
      // historyList: [],// 作为数据变量接收历史记录
      historyList: JSON.parse(localStorage.getItem(key) || '[]'),
      suggestList: []// 联想搜索建议
    }
  },
  // created () {
  //   // 钩子函数实例初始化之后
  //   this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  // }
  watch: {
    // 防抖写法
    // q () {
    //   clearTimeout(this.timer)// 清除定时器
    //   this.timer = setTimeout(async () => {
    //     // 请求联想搜索建议
    //     if (!this.q) {
    //       this.suggestList = []
    //       return
    //     }
    //     const data = await getSuggestion({ q: this.q })
    //     this.suggestList = data.options
    //   }, 300)
    // }
  // {节流写法}
    q () {
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          this.timer = null
          if (!this.q) {
            this.suggestList = []
            return
          }
          const data = await getSuggestion({ q: this.q })
          this.suggestList = data.options
        }, 300)
      }
    }
  },
  methods: {
    // 删除历史
    delHistory (index) {
      this.historyList.splice(index, 1)// 点击删除对应历史几录
      localStorage.setItem(key, JSON.stringify(this.historyList))// 同步
    },
    // toSearchResult (q) {
    // // toSearchResult (text) {
    //   // this.$router// 当前路由对象信息
    //   // this.$route// 当前路由页面对象信息 地址 参数
    //   // this.$router.push('/search/result?q=' + text)// params query传参（地址拼接传参）
    //   this.$router.push({ path: '/search/result', query: { q } })// query传参(对象形式)
    // },
    // 到结果页
    toResult (text) {
      // 放到历史记录
      this.historyList.push(text)
      // 去重
      this.historyList = Array.from(new Set(this.historyList))
      // 设置到本地缓存中
      localStorage.setItem(key, JSON.stringify(this.historyList))
      // 跳转到搜索结果
      this.$router.push({ path: '/search/result', query: { q: text } })
    },
    async clear () {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '您确定删除所有的历史记录吗？'
        })
        this.historyList = []
        localStorage.setItem(key, '[]')
      } catch (error) {

      }
    },
    onSearch (q) {
      if (!this.q) return
      this.historyList.push(this.q) // 将搜索内容加入到历史记录// 把搜索内容加入到历史记录中
      this.historyList = Array.from(new Set(this.historyList))// 去重
      this.$router.push({ path: '/search/result', query: { q: this.q } })// query传参(对象形式)
      localStorage.setItem(key, JSON.stringify(this.historyList))// 同步到本地缓存
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
