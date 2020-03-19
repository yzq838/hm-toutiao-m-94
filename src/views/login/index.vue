<template>
<div class='container'>
    <!-- 导航 显示返回箭头-->
    <!-- click-left点击左侧事件 -->
    <!-- $router.go(-1) $router.back() -->
    <van-nav-bar title='登录'  left-arrow @click-left="$router.back()"></van-nav-bar>
  <!-- 登录布局 外层需要cell-group组件来包裹提供 边框-->
<van-cell-group>
  <van-field label="手机号" placeholder="请输入手机号"></van-field>
  <van-field label="验证码" placeholder="请输入验证码" >
    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
  </van-field>
</van-cell-group>
<div class="login-box">
  <van-button round size="small" type="info" block>登录</van-button>
</div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.login-box {
  padding: 20px ;
}
</style>
