<script setup lang='ts'>
const props = withDefaults(defineProps<{
  list: any[]
}>(), {

})
</script>

<template>
  <view class="flex">
    child:{{ list }}
  </view>
</template>

<style lang='scss' scoped>
</style>
