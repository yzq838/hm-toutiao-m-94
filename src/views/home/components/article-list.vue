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
<van-cell title="标题" :value="`内容`+item" v-for="item in articles" :key="item"></van-cell>
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

<style>

</style>
