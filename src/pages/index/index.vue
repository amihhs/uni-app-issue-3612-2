<script setup lang='ts'>
// test baiduId 17767960
const currentTab = ref(0)
const columnList = reactive<any>([
  {
    name: 'tab-1',
    list: [
      {
        id: 29131,
        title: '森林人出现烧机油现象，售后表示不符合免费更换的条件？',
        showCreateTime: '2022-07-01 10:41:19',
        goodCount: 0,
        commentCount: 0,
        lookCount: 28,
        isTop: null,
        articleFormatCode: 0,
        coverImgUrls: [
          '/qcts/article/img/2022/07/01/8256292133d14337827d7798d3397381.jpg',
        ],
        good: false,
      },
    ],
  },
  {
    name: 'tab-2',
    list: [
      {
        id: 29124,
        title: '红榜 | 比亚迪  黑榜 | 一汽马自达',
        showCreateTime: '2022-06-30 17:52:57',
        goodCount: 0,
        commentCount: 0,
        lookCount: 377,
        isTop: null,
        articleFormatCode: 0,
        coverImgUrls: [],
        good: false,
      },

    ],
  },
  {
    name: 'tab-3',
    list: [

      {
        id: 29122,
        title: '“纯电版帕萨特”来袭，大众发布ID.AERO，将于明年国内上市',
        showCreateTime: '2022-06-29 22:03:59',
        goodCount: 0,
        commentCount: 0,
        lookCount: 600,
        isTop: null,
        articleFormatCode: 0,
        coverImgUrls: [
          '/qcts/article/img/2022/06/29/21a6ca5774234affa1f40d1792178a71.jpg',
        ],
        good: false,
      },
    ],
  },
  {
    name: 'tab-4',
    list: [
      {
        id: 29123,
        title: '定位小型纯电SUV，几何E上市，起售价仅需8.68万元',
        showCreateTime: '2022-06-30 16:44:20',
        goodCount: 0,
        commentCount: 0,
        lookCount: 425,
        isTop: null,
        articleFormatCode: 0,
        coverImgUrls: [
          '/qcts/article/img/2022/06/30/f566dfb291b64f69ba7a150161299b32.jpg',
        ],
        good: false,
      },
    ],
  },
])
// 当前tab数据
const currentTabColumn = computed(() => {
  return columnList[currentTab.value]
})
</script>

<template>
  <view class="">
    <view class="h-80">
      <tab v-model="currentTab" :is-scroll="true" :list="columnList" name="columnSimpleName" />
    </view>
    {{ currentTab }}
    <view v-if="columnList?.[currentTab]" class="weixin-news-container">
      <view v-if="currentTabColumn.list.length" class="mlr-30">
        {{ currentTabColumn }}
        <page-news-container :is-show-top="true" :list="currentTabColumn.list" />
      </view>
    </view>
  </view>
</template>

<style lang='scss' scoped>
</style>
