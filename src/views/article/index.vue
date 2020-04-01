<template>
  <div class="container">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate | relTime }}</p>
        </div>
        <van-button
          :loading="followLoading"
          @click="follow"
          round
          size="small"
          type="info"
        >{{ article.is_followed ? '已关注' : '+ 关注' }}</van-button>
      </div>
      <div class="content" v-html="article.content">
        <!-- 文章内容 有标签 有属性 有样式 将标签设置到对应的元素中 v-html -->
      </div>
      <div class="zan">
        <!-- 需要genuine当前的态度 决定 谁拥有active -->
        <van-button
          round
          size="small"
          :class="{active: article.attitude === 1}"
          plain
          icon="like-o"
        >点赞</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          :class="{active: article.attitude === 0}"
          plain
          icon="delete"
        >不喜欢</van-button>
      </div>
      <!-- 放置comment组件 到 detail内部 因为有padding-->
   <Comments />
    </div>

    <!-- 放置遮罩层 -->
    <van-overlay :show="loading">
      <!-- 加载进度 -->
      <div class="loading-container">
      <van-loading type="spinner" color="#1989fa" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getArticleInfo } from '@/api/articles'
import { followUser, unfollowUser } from '@/api/user'
import Comments from './components/comment' // 引入评论组件
export default {
  components: {
    Comments
  },
  data () {
    return {
      article: {}, // 接收文章详情数据
      followLoading: false, // 是否正在点击关注
      loading: false // 遮罩层状态
    }
  },
  methods: {
    // 获取文章详情
    async getArticleInfo () {
      this.loading = true// 打开遮罩层
      const { artId } = this.$route.query // 结构查询id
      this.article = await getArticleInfo(artId) // 查询数据
      this.loading = false// 关闭遮罩层
    }, // 点击关注或者取消关注
    async follow () {
      this.followLoading = true
      // 调用关注或取消关注
      try {
        if (this.article.is_followed) {
          await unfollowUser(this.article.aut_id) // 取消关注传入作者id
          this.article.is_followed = !this.article.is_followed
          this.$gnotify({ type: 'success', message: '取消关注' })
        } else {
          await followUser({ target: this.article.aut_id }) // 点击关注传入作者id
          this.article.is_followed = !this.article.is_followed
          this.$gnotify({ type: 'success', message: '关注成功' && '取消关注' })
        }
      } catch (error) {
        // 失败
        this.$gnotify({ message: '操作失败' })
      } finally {
        this.followLoading = false
      }
    }
  },
  created () {
    // 获取文章向详情数据
    this.getArticleInfo()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-overlay {
  background: none;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 10px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position: sticky;
    background-color: #fff;
    top: 46px;
    z-index: 2;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
