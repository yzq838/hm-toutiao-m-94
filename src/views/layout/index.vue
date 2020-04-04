<template>
  <div class="container">
    <!-- 导航组件 给搜索加样式跳转到搜索页面 页面地址是user时隐藏导航-->

    <van-nav-bar @click-right="$router.push('/search')" fixed title="黑马头条" right-text="搜索" v-if="$route.path !== '/user'" ></van-nav-bar>
<!-- 一级路由容器 地址是user 更改样式（）-->
<div class="my-wrapper" :class="{noTop: $route.path === '/user'}">
 <!-- 直接缓存二级路由容器 使用keep-alive包裹容器 -->
 <keep-alive>
<router-view></router-view>
 </keep-alive>

</div>
<van-tabbar route>
  <!-- 点击导航标签跳转路由 -->
  <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="chat-o" to='/question'>问答</van-tabbar-item>
        <van-tabbar-item icon="tv-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" to="/user">我的</van-tabbar-item>
</van-tabbar>
<!-- 标签栏组件 -->
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
  // 控制二级路由容器的高宽
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
