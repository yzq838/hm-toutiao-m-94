<template>
  <div class="container">
    <van-tabs v-model=" activeIndex">
      <!-- 放置子标签 -->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 生成多个单元格 -->
        <div class="scroll-wrapper">
          <!-- <van-cell-group>
          <van-cell v-for="item in 20" :key="item" title="标题" value="内容"></van-cell>

        </van-cell-group> -->
        <ArticleList  @showAction="openAction" :channel_id = "item.id"></ArticleList   >
        </div>
      </van-tab>

    </van-tabs>
    <span class="bar_btn" @click="showChannelEdit = true">
      <!-- 放置图标 -->
<van-icon name="wap-nav"></van-icon>
    </span>
    <!-- 放置一个弹出层 -->

    <van-popup v-model="showMoreAction" style="width: 80%">
     <MoreAction @dislike="dislikeOrReport('dislike')" @report="dislikeOrReport('report',$event)"/>
    </van-popup>
    <!-- 编辑频道 弹出面板 -->
    <van-action-sheet :round="false" v-model="showChannelEdit" title="编辑频道">
      <!-- 放置编辑组件 -->
      <ChannelEdit />
    </van-action-sheet>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleList from './components/article-list'
import { getMyChannels } from '@/api/channels'
import MoreAction from './components/more-action'
import { dislikeArticle, reportArticle } from '@/api/articles'
import eventbus from '@/utils/eventbus'// 公共事件处理器
import ChannelEdit from './components/channel-edit'
export default {
  name: 'Home',
  components: { ArticleList, MoreAction, ChannelEdit }, // 组件注册
  data () {
    return {
      channels: [], // 接收频道数据
      showMoreAction: false, // 是否显示弹层
      articleId: null,
      activeIndex: 0, // 当前默认激活的页签
      showChannelEdit: false// 是否显示频道编辑组件
    }
  },
  methods: {
    async getMyChannels () {
      const data = await getMyChannels()// 接受返回的数据结果
      this.channels = data.channels
    },
    openAction (artId) {
      this.showMoreAction = true
      // 存id
      this.articleId = artId
    }, // operateType操作类型
    async dislikeOrReport (operateType, type) {
      try {
        operateType === 'dislike' ? await dislikeArticle({
          target: this.articleId//
        }) : await reportArticle({ target: this.articleId, type })
        this.$gnotify({
          type: 'success',
          message: '操作成功'
        })

        eventbus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
        this.showMoreAction = false
      } catch (error) {
        // 默认是红色
        this.$gnotify({
          message: '操作失败'
        })
      }
    }
    // 举报文章
    // async reportArticle (type) {
    //   // 调用举报接口
    //   try {
    //     await reportArticle({ target: this.articleId, type })
    //     this.$gnotify({
    //       type: 'success',
    //       message: '操作成功'
    //     })
    //     eventbus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
    //     this.showMoreAction = false
    //   } catch (error) {
    //     this.$gnotify({
    //       message: '操作失败'
    //     })
    //   }
    // }
  },
  created () {
    this.getMyChannels()
  }

}
</script>
<style lang="less" scoped>
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/.van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
