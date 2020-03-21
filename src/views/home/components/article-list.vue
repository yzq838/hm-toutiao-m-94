<template>
<!-- 文章列表组件 -->
<div class="scrollwrapper">
    <!-- div形成滚动条 -->
<van-list finished-text="数据加载完毕" v-model="uploading" @load="onLoad" :finished = "finished">
    <!-- 上拉加载 -->
    <!-- 添加内容 -->
    <van-cell-group>
<van-cell title="标题" :value="`内容`+item" v-for="item in articles" :key="item"></van-cell>
    </van-cell-group>

</van-list>
</div>

</template>

<script>
export default {
  data () {
    return {
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
    }

  }
}
</script>

<style>

</style>
