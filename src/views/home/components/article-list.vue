<template>
<!-- 文章列表组件 -->
<div class="scrollwrapper">
    <!-- div形成滚动条 -->
    <!-- 下拉刷新包裹列表组件 -->
<van-pull-refresh v-model="downLoadin" @refresh="onRefresh" :success-text= "successText">
    <van-list finished-text="数据加载完毕" v-model="uploading" @load="onLoad" :finished = "finished">
    <!-- 上拉加载 -->
    <!-- 添加内容 -->
    <van-cell-group>
<van-cell  v-for="item in articles" :key="item.art_id.toString()">
    <!-- 文章列表的循环项 -->
    <div class="article_item">
  <h3 class="van-ellipsis">{{ item.title }}</h3>
  <div class="img_box" v-if="item.cover.type === 3">
     <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]"/>
     <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]"/>
     <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]"/>
  </div>
  <div class="img_box"  v-if="item.cover.type === 1">
      <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]"/>
  </div>
  <div class="info_box">
     <span>{{ item.aut_name}}</span>
     <span>{{ item.comm_count }}</span>
     <span>{{ item.pubdate | relTime}}</span>

     <!-- <span class="close" v-if="$store.state.user.token">最原始的方式 -->
     <!-- 辅助函数的形式 -->
     <span @click="$emit('showAction')" class="close" v-if="user.token">
       <van-icon name="cross">
         </van-icon></span>
  </div>
</div>

</van-cell>
    </van-cell-group>

</van-list>
</van-pull-refresh>
</div>

</template>

<script>
import { getArticles } from '@/api/articles'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['user'])// 将user 对象映射到计算属性中
  },
  data () {
    return {
      successText: '', // 刷新成功文本
      downLoadin: false,
      uploading: false, // 表示是否开启了上拉加载 默认值false
      finished: false, // 是否已经完成说有数据加载
      articles: [], // 文章列表
      timestamp: null// 时间戳存储历史时间按戳
    }
  },
  props: {
    channel_id: {
      required: true, // true含义必须传
      type: Number, // 传入类型
      default: null// 默认值，没有就使用
    }
  },
  methods: {

    async onLoad () {
      //   setTimeout(() => { this.finished = true }, 1000)// 等待一秒关闭加载状态
      //   if (this.articles.length > 30) {
      //     this.finished = true// 关闭加载
      //   } else {
      //     const arr = Array.from(Array(10), (value, index) => index + 1)
      //     this.articles.push(...arr)
      //     this.uploading = false
      //   }
      await this.$sleep()
      const data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      this.articles.push(...data.results)
      this.uploading = false
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    }, // 下拉刷新
    async onRefresh () {
      await this.$sleep()
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now()
      })
      this.downLoadin = false
      if (data.results.length) {
        this.articles = data.results
        if (data.pre_timestamp) {
          this.finished = false
          this.timestamp = data.pre_timestamp
        }
        this.successText = `当前更新了${data.results.length}条数据`
      } else {
        this.successText = '当前已经是最新数据了'
      }
    //   setTimeout(() => {
    //     const arr = Array.from(Array(3), (value, index) => '追加' + (index + 1))
    //     this.articles.unshift(...arr)
    //     this.downLoadin = false
    //     this.successText = `更新了${arr.length}条数据`
    //   }, 1000)
    }

  }
}
</script>

<style lang= 'less' scoped>
.article_item{
  h3{
    font-weight: normal;
    line-height: 2;
  }
  .img_box{
    display: flex;
    justify-content: space-between;
    .w33{
      width: 33%;
      height: 90px;
    }
    .w100{
      width: 100%;
      height: 180px;
    }
  }
  .info_box{
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span{
      padding-right: 10px;
      &.close{
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
