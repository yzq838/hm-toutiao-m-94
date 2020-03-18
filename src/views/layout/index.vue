<template>
  <div class="container">
    <!-- 导航组件 给搜索加样式跳转到搜索页面 -->
    <van-nav-bar @click-right="$router.push('/search')" fixed title="黑马头条" right-text="搜索" ></van-nav-bar>
<!-- 一级路由容器 -->
<router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='less'>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
