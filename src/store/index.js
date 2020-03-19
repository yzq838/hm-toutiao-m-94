/**
 * 专门处理vuex中的模块
 * ****/

import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // fang置共享状态
    user: auth.getUser() // token信息对象 如果缓存有token读取缓存token
  },
  // 要修改token通过mutations
  mutations: {
    // 修改token
    updateUser (state, payload) {
      state.user = payload.user // 定义载荷中得数据
      auth.setUser(payload.user)// 相当于保持vuex和本地存储同步
    },
    // 删除token
    delUser (state) {
      state.user = {} // 将vuex中的token设置为空
      auth.delUser()// 删除本地缓存中的token
    }
  },
  actions: {
  },
  modules: {
  }
})
