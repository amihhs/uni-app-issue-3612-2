<script setup lang='ts'>
const props = withDefaults(defineProps<{
  d?: string // 神奇的d
  list?: any[]
  name?: string
  modelValue?: number
  isScroll?: boolean
}>(), {
  d: '',
  list: () => [],
  name: 'name',
  modelValue: 0,
  isScroll: false,
})
const emits = defineEmits({
  'update:modelValue': (index: number) => typeof index === 'number',
  'change': (index: number, item?: any) => typeof index === 'number',

})
// tab点击事件
function clickTab(index: number, item?: any) {
  emits('update:modelValue', index)
  emits('change', index, item)
}
</script>

<template>
  <view class="flex flex-ac w-100" :class="d">
    <slot name="before" />
    <view class="flex-grow min-w-0">
      <scroll-view
        :scroll-x="true" :scroll-y="false" class="scroll-view" scroll-with-animation
      >
        <view class="flex" :class="[props.isScroll ? 'flex-jb' : 'flex-row flex-ac flex-jc']">
          <view
            v-for="(item, index) in list" :id="`tab-item-${index}`" :key="index" class="tab-item line-1"
            :class="{ active: modelValue === index }" @click="clickTab(index, item)"
          >
            {{ item.name }}
          </view>
        </view>
      </scroll-view>
    </view>
    <slot name="after" />
  </view>
</template>

<style lang='scss' scoped>
.scroll-view {
  height: 80rpx;
  line-height: 80rpx;
  overflow: hidden;
  white-space: nowrap;
  padding-bottom: 0;
}

.tab-item {
  display: inline-block;
  margin-right: 32rpx;
  flex-shrink: 0;
  height: 80rpx;
  line-height: 80rpx;
  position: relative;

  &:last-child {
    margin-right: 0;
  }

  &.active::after {
    content: '';
    display: inline-block;
    width: 40rpx;
    height: 6rpx;
    border-radius: 3rpx;
    background-color: #488AFA;
    position: absolute;
    bottom: 6rpx;
    left: 50%;
    transform: translateX(-50%);
  }
}

.active {
  color: #488AFA;
  font-weight: bold;
}
</style>
