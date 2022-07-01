<script lang="ts" setup>
import { newContainerItemEmits, newsContainerItemProps } from './news-container-item'
import $utils from '@/common/utils'
const props = defineProps(newsContainerItemProps)
const emits = defineEmits(newContainerItemEmits)

const imgCount = ref(0)
const imgErrorList = ref<number[]>([])
const imgList = computed(() => {
  if (props.item.coverImgUrls && props.item.coverImgUrls.length > 3) {
    imgCount.value = 3
    const newData = filterNullImg(props.item.coverImgUrls.slice(0, 3))
    return newData
  }
  else if (props.item.coverImgUrls && props.item.coverImgUrls.length !== 0) {
    imgCount.value = props.item.coverImgUrls.length
    const newData = filterNullImg(props.item.coverImgUrls)
    return newData
  }
  else {
    imgCount.value = props.item.coverImgUrl ? 1 : 0
    return props.item.coverImgUrl ? [props.item.coverImgUrl] : []
  }
})

// 过滤无效图片
function filterNullImg(data: string[]) {
  const newData = data.map((v) => {
    if (v && v !== 'null')
      return v
    return undefined
  }).filter(v => !!v) as string[]
  return newData
}
function imgError(errorIndex: number) {
  imgErrorList.value.push(errorIndex)
  emits('imgError', errorIndex)
}
</script>

<template>
  <view class="news-item flex" :class="[`item-${item.id}`]">
    <view v-if="imgCount >= 3" class="news-item-right flex flex-col flex-jb flex-grow">
      <view class="news-item-right__title line-2 mb-24">
        {{
          item.title
        }}
      </view>
      <view class="mt-24 news-item-right__info flex flex-ae flex-jb">
        <view class="flex flex-ac">
          <view v-if="isShowTop && item.isTop" class="is-top">
            置顶
          </view>
        </view>
        <view class="news-item-right__info__ohter flex flex-ac">
          <view v-if="isAuthor && item.author" class="mr-32">
            <text>{{ item.author }}</text>
          </view>
          <view class="mr-32">
            <text>{{ item.commentCount }}</text><text>评论</text>
          </view>
          <view class>
            <text>{{ $utils.format.numForm(item.lookCount) }}</text><text>浏览</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 少于三张图片 -->
    <view v-else class="news-item-right flex flex-grow">
      <view class="flex flex-col flex-jb flex-grow">
        <view class="news-item-right__title line-2 mb-24">
          {{
            item.title
          }}
        </view>
        <view class="news-item-right__info flex flex-ae flex-jb">
          <view class="flex flex-ac">
            <view v-if="isShowTop && item.isTop" class="is-top">
              置顶
            </view>
          </view>
          <view class="news-item-right__info__ohter flex flex-ac">
            <view v-if="isAuthor && item.author" class="mr-32">
              <text>{{ item.author }}</text>
            </view>
            <view class="mr-32">
              <text>{{ item.commentCount }}</text>
              <text class="ml-5">
                评论
              </text>
            </view>
            <view class>
              <text>{{ $utils.format.numForm(item.lookCount) }}</text>
              <text class="ml-5">
                浏览
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.img-right {
  flex-shrink: 0;
  border-radius: 12rpx;
  width: 280rpx;
  height: 180rpx;
  margin-left: 24rpx;
  overflow: hidden;
}

.news {
  &-item {
    min-height: 160rpx;

    &-right {
      width: calc(100% - 241rpx);

      &__title {
        font-size: 32rpx;
        line-height: 48rpx;
        color: var(--pui-fc-333);
      }

      &__info {
        font-size: 26rpx;
        color: var(--pui-fc-tips);

        .is-top {
          font-size: 20rpx;
          color: var(--pui-fc-primary);
          letter-spacing: 2rpx;
          border-radius: 10rpx;
          padding: 2rpx 10rpx;
          border: 1px solid var(--pui-fc-primary);
          margin-right: 16rpx;
        }

        .iconG {
          -webkit-text-stroke-width: 0;
          font-size: 24rpx;
          margin-right: 5rpx;
        }
      }
    }

    .video {
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 10px;
      overflow: hidden;
      background-color: var(--pui-bg-0);

      .video-img {
        width: 100%;
        height: 100%;
        background-color: var(--pui-bg-0);
        position: relative;
      }
    }

    .play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 60rpx;
      color: var(--pui-fc-fff);
      text-align: center;
      opacity: 0.8;
    }

    .picture {
      border-radius: 10rpx;
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-top: 100%;
      position: relative;

      &.is-one {
        padding-top: 396rpx;
      }

      &__box {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .img {
      width: 224rpx;
      height: 149rpx;
      overflow: hidden;
      border-radius: 6rpx;
    }
  }
}
</style>
