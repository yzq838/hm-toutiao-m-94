<template>
   <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell @click="showName = true" is-link title="名称" :value="user.name" />
      <van-cell @click="showGender = true" is-link title="性别" :value="user.gender === 0 ? '男' : '女'"/>
      <van-cell @click="showDate" is-link title="生日" :value="user.birthday" />
    </van-cell-group>
    <!-- 弹层组件 (头像弹层)-->
    <van-popup v-model="showPhoto" style="width:80%">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
       <van-cell is-link title="本地相册选择图片"></van-cell>
       <van-cell is-link title="拍照"></van-cell>
    </van-popup>
     <!-- 弹昵称 -->
    <van-popup v-model="showName" style="width:80%" :close-on-click-overlay="false">
       <!-- 编辑用户昵称  双向绑定用户的昵称-->
       <van-field :error-message ="nameMsg" v-model.trim = "user.name" type='textarea'  rows="4"></van-field>
       <van-button block type="info" size='normal' @click="btnName">确定</van-button>
    </van-popup>
    <!-- 性别弹层 注册性别弹层点击事件 -->
    <van-action-sheet @select="selectItem" :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>
<!-- sheng生日弹层 -->
<van-popup v-model="showBirthDay" position="bottom">
      <!-- 选择出生日期  出生日期应该小于现在时间-->
      <!-- type表示 当前的日期类型 年月日 -->
      <van-datetime-picker
           v-model="currentDate"
           type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showBirthDay = false "
           @confirm="confirmDate"
         />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      showPhoto: false, // 显示头像弹层
      showName: false, // 显示昵称弹层
      showGender: false, // 显示性别弹层
      showBirthDay: false, // 控制时间弹层
      actions: [{ name: '男' }, { name: '女' }], // 性别数据
      minDate: new Date(1900, 1, 1), // 最小时间
      maxDate: new Date(), // 生日最大时间当前时间
      currentDate: new Date(), // 当前时间（弹出层弹出时显示的时间）
      nameMsg: '', // 错误信息
      user: {
        // 放置个人资料信息
        name: '', // 用户昵称
        gender: 1, // 性别默认值
        birthday: '', // 生日默认值
        photo: '' // 用户头像
      }
    }
  },
  methods: {
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        // 此时格式不正确
        this.nameMsg = '用户昵称的长度为1-7个字符'
        return
      }
      // 清空错误信息
      this.nameMsg = ''
      // 关闭弹层
      this.showName = false
    },
    selectItem (item, index) {
      this.user.gender = index// 直接把index赋值给性别
      // 关闭弹层
      this.showGender = false
    }, // 显示生日弹层
    showDate () {
      this.showBirthDay = true // 控制时间弹层
      // 将当前的生日设置到选择日期的当前时间，将生日字符串绑定到日期组件上
      this.currentDate = new Date(this.user.birthday)
    },
    // 确定生日
    confirmDate () {
      // 当前选择的生日其实就是currentDate
      // 拿到选择的日期  设置给生日  => date  => 字符串
      this.user.birthday = dayjs(this.currentDate).format('YYYY-MM-DD')// 将date类型转化成字符串
      // 关闭弹层
      this.showBirthDay = false // 关闭弹层
    }
  }

}
</script>

<style>

</style>
