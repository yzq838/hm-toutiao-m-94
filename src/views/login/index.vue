<template>
  <div class="container">
    <!-- 导航 显示返回箭头-->
    <!-- click-left点击左侧事件 -->
    <!-- $router.go(-1) $router.back() -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 登录布局 外层需要cell-group组件来包裹提供 边框-->
    <van-cell-group>
      <van-field
      @blur="checkMobile"
        :error-message="errorMessage.mobile"
        v-model.trim="loginForm.mobile"
        label="手机号"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
       @blur="checkCode"
        :error-message="errorMessage.code"
        v-model.trim="loginForm.code"
        label="验证码"
        placeholder="请输入验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-box">
      <van-button @click="login" round size="small" type="info" block>登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'// 辅助函数
// import resultVue from '../search/result.vue'
export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      errorMessage: {
        mobile: '', // 手机号提示消息
        code: ''// 验证码提示消息
      }

    }
  },
  methods: {
    ...mapMutations(['updateUser']),
    checkMobile () {
      if (!this.loginForm.mobile) {
        this.errorMessage.mobile = '手机号不能为空'
        return false
      }
      // 正则校验手机号格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errorMessage.mobile = '手机号格式不正确'
        return false
      }
      this.errorMessage.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      // 正则校验验证码
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码必须为6位数字'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    // 登录校验
    async login () {
      const validateMobile = this.checkMobile()
      const validateCode = this.checkCode()
      if (validateMobile && validateCode) {
        try {
          // 通过校验调用接口 对比用户名和密码是否正确
          const result = await login(this.loginForm)
          // 拿到token之后把它设置给vuex中得state
          this.updateUser({ user: result })
          const { redirectUrl } = this.$route.query// query查询参数2
          this.$router.push(redirectUrl || '/')//
        } catch (error) {
          // this.$notify({ message: '手机号或者验证码错误', durstion: 800 })
          this.$gnotify({ message: '用户名或者验证码错误' })
        }
      }
    }
  }

}
</script>

<style lang='less' scoped>
.login-box {
  padding: 20px;
}
</style>
