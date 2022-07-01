<script lang="ts" setup>
const props = withDefaults(defineProps<{
  list?: any[]
  currentPlayVideoId?: number
  isAuthor?: boolean
  isShowTop?: boolean
  isCard?: boolean
  cardColor?: string
}>(), {
  list: () => [],
  currentPlayVideoId: -1,
  isAuthor: false,
  isShowTop: false,
  isCard: false,
  cardColor: 'inherit',
})
// const emits = defineEmits({
//   viewItem: (data: any, index: number) => typeof data === 'object' && typeof index === 'number',
//   errorReload: () => true,
// })
const emits = defineEmits(['viewItem', 'errorReload'])

function itemClickHandle(data: any, index: number) {
  emits('viewItem', data, index)
}
function errorReload() {
  emits('errorReload')
}

const itemStyle = computed(() => {
  return (item: any) => {
    return `--card-color:${item.bgColor ? item.bgColor : props.cardColor}`
  }
})
</script>

<template>
  <view>
    <template v-if="list.length">
      {{ list }}
      <view
        v-for="(v, i) in list" :key="v.id" :class="[isCard ? 'news-card' : 'news-container']" :style="itemStyle"
        @click="itemClickHandle(v, i)"
      >
        <page-news-container-item
          :item="v" :is-current-play="currentPlayVideoId === v.id" :is-author="isAuthor"
          :is-show-top="isShowTop"
        />
      </view>
    </template>
  </view>
</template>

<style lang="scss" scoped>
.news {
  &-container {
    overflow: hidden;
    width: 100%;
    padding: 24rpx 0;
    border-bottom: 1rpx solid var(--pui-fc-tips-shallow);
  }

  &-card {
    --card-color: inherit;
    width: 100%;
    padding: 24rpx 30rpx;
    margin-bottom: 34rpx;
    border-radius: 6rpx;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: var(--card-color);
  }
}
</style>
