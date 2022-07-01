<script setup lang='ts'>
const props = withDefaults(defineProps<{
  list: any[]
}>(), {

})
</script>

<template>
  <view>
    parent:{{ list }}
  </view>
  <Child :list="list" />
</template>

<style lang='scss' scoped>
</style>
