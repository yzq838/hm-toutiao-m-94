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
<van-cell  v-for="item in articles" :key="item">
    <!-- 文章列表的循环项 -->
    <div class="article_item">
  <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
  <div class="img_box">
     <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
     <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
     <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
  </div>
  <!-- <div class="img_box">
      <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg"/>
  </div> -->
  <div class="info_box">
     <span>你像一阵风</span>
     <span>8评论</span>
     <span>10分钟前</span>
     <span class="close"><van-icon name="cross"></van-icon></span>
  </div>
</div>

</van-cell>
    </van-cell-group>

</van-list>
</van-pull-refresh>
</div>

</template>

<script>
export default {
  data () {
    return {
      successText: '', // 刷新成功文本
      downLoadin: false,
      uploading: false, // 表示是否开启了上拉加载 默认值false
      finished: false, // 是否已经完成说有数据加载
      articles: []// 文章列表
    }
  },
  methods: {

    onLoad () {
    //   setTimeout(() => { this.finished = true }, 1000)// 等待一秒关闭加载状态
      if (this.articles.length > 30) {
        this.finished = true// 关闭加载
      } else {
        const arr = Array.from(Array(10), (value, index) => index + 1)
        this.articles.push(...arr)
        this.uploading = false
      }
    }, // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        const arr = Array.from(Array(3), (value, index) => '追加' + (index + 1))
        this.articles.unshift(...arr)
        this.downLoadin = false
        this.successText = `更新了${arr.length}条数据`
      }, 1000)
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
