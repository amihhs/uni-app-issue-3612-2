// post类型对象参数转为get类型url参数
import queryParams, { splitQuery } from './function/queryParams'
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import color from './function/colorGradient'

import { dataCheck, platformCheck, typeCheck } from './check'
import time from './function/dayjs'
import format from './format'
import getRect from './getRect'

// 生成全局唯一guid字符串
import guid from './function/guid'
// 打乱数组的顺序
import randomArray from './function/randomArray'
// 对象和数组的深度克隆
import deepClone from './function/deepClone'
// 对象深度合并
import deepMerge from './function/deepMerge'
// 添加单位
import addUnit from './function/addUnit'

// 随机数
import random from './function/random'
// 去除空格
import trim from './function/trim'
import sleep from './function/sleep'

// 获取父组件参数
import getParent from './function/getParent'
// 获取整个父组件
import $parent from './function/$parent'
// 防抖方法
import { debounce, easyDebounce } from './function/debounce'
// 节流方法
import throttle from './function/throttle'
// 提示
import { errorShowModal, showModel, toast } from './function/toast'
// storage
import { getStorageSync, setStorageSync } from './function/storage'
const config = {
  v: '1.0.0',
  version: '1.0.0',
  // 主题名称
  type: [
    'primary',
    'success',
    'info',
    'error',
    'warning',
  ],
}

const $utils = {
  config,

  // 校验
  dataCheck, // 数据格式校验
  platformCheck, // 平台校验
  typeCheck, // 类型校验

  time, // 时间格式化
  format, // 数据格式化
  getRect, // 获取节点信息

  queryParams,
  splitQuery,
  color,
  guid,
  randomArray,
  random,
  deepClone,
  deepMerge,
  getParent,
  $parent,
  addUnit,
  trim,
  debounce,
  easyDebounce,
  throttle,
  // 提示
  errorShowModal,
  showModel,
  toast,

  sleep,
  getStorageSync,
  setStorageSync,
}

export default $utils

// $u挂载到uni对象上
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
uni.$utils = $utils
