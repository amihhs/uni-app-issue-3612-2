<!--
  /**
 * @property {String} vid 视频id
 * @property {Boolean} isHandleScroll  是否监听滚动
 * @property {Boolean} isCurrentPlay  是否当前播放
 * @property {String} video  视频地址
 * @property {String} img  视频封面图
 *
 * @event {Function()} play 视频播放时触发，回传视频id,当前视频节点信息和context
 */
-->
<script lang="ts" setup>
import type { VideoPosition } from './video'
import { componentVideoEmits, componentVideoProps } from './video'
import { useIsAudit } from '@/store/isAudit'
import $utils from '@/common/utils'
const props = defineProps(componentVideoProps)
const emits = defineEmits(componentVideoEmits)
const { MOBILE_IS_SHOW_VIDEO } = storeToRefs(useIsAudit())
const instance = getCurrentInstance()
const isPause = ref(!props.autoplay)
const imgError = ref(false)

function play(vid: number) {
  // 防止调用play()方法是重复触发
  if (!$utils.format.addHost(props.video))
    error(new Error('视频地址为空'))
  if (!isPause.value)
    return
  isPause.value = false
  let videoContext: UniApp.VideoContext
  nextTick(async () => {
    videoContext = uni.createVideoContext(`video-${vid}`, instance)
    let videoPosition: VideoPosition = {
      itemTop: 0,
      itemHeight: 0,
      containerTop: 0,
    }
    // 获取当前播放视频 元素距离顶部的高度
    const container = $utils.getRect.getPageRect('#pui-page', false)
    const item = $utils.getRect.getComponentRect(`#video-container-${vid}`, false, instance)
    Promise.all([item, container])
      .then((res) => {
        const { top: itemTop = 0, height: itemHeight = 0 } = res[0]
        const { top: containerTop = 0 } = res[1]
        videoPosition = {
          ...videoPosition,
          itemTop,
          itemHeight,
          containerTop,
        }
      }).catch((err) => {
        console.error('video play error:', err)
      })
      .finally(() => {
        setTimeout(() => {
          videoContext.play()
        }, 0)
        emits('play', {
          playId: vid,
          videoPosition: { ...videoPosition },
          videoContext,
        })
      })
  })
}
function pause(vid: number) {
  if (!instance)
    return
  const videoContext = uni.createVideoContext(`video-${vid}`, instance)
  videoContext.pause()
  isPause.value = true
}
function error(err: unknown) {
  // eslint-disable-next-line no-console
  console.error('video play err', err)
  if (!props.isCurrentPlay)
    return
  uni.showModal({
    title: '提示',
    content: `视频错误无法播放,error:${props.vid}`,
    showCancel: true,
    cancelText: '反馈问题',
    success(res) {
      if (res.cancel) {
        uni.navigateTo({
          url: '/subpages/pages/setting/opinion_feedback',
        })
      }
    },
  })
}
</script>

<template>
  <view v-if="MOBILE_IS_SHOW_VIDEO">
    <view v-if="canPlay" :id="`video-container-${vid}`" class="video" @click.stop>
      <view v-if="isCurrentPlay || !img || imgError" class="video-img">
        <video
          :id="`video-${vid}`" :src="$utils.format.addHost(video)" :show-center-play-btn="false"
          :controls=" isCurrentPlay" :autoplay="autoplay" @play="play(vid)" @pause="pause(vid)"
          @error="error"
        />
        <view v-if="isPause" class="play-container" @click.stop="play(vid)">
          <view class="i-bi-play-fill play" />
        </view>
      </view>
      <view v-else class="video-img">
        <u-image width="100%" height="100%" :src="img" @error="imgError = true" />
        <view class="play-container" @click.stop="play(vid)">
          <view class="i-bi-play-fill play" />
        </view>
      </view>
    </view>
    <view v-else :id="`video-container-${vid}`" class="video noPlay">
      <view v-if="isCurrentPlay || !img || imgError" class="video-img">
        <video
          :id="`video-${vid}`" :src="$utils.format.addHost(video)" :show-center-play-btn="false" :controls="false"
          :autoplay="false"
        />
        <view class="play-container">
          <view class="i-bi-play-fill play" />
        </view>
      </view>
      <view v-else class="video-img">
        <u-image width="100%" height="100%" :src="img" @error="imgError = true" />
        <view class="i-bi-play-fill play" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
::v-deep {

  uni-video,
  video {
    width: 100%;
    height: 380rpx;
  }
}

.video {
  width: 100%;
  height: 380rpx;
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--pui-bg-0);

  .video-img {
    width: 100%;
    height: 380rpx;
    background-color: var(--pui-bg-0);
    position: relative;

    .play-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
    }

    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 80rpx;
      color: var(--pui-fc-fff);
      text-align: center;
      opacity: 0.8;
    }
  }
}
</style>
