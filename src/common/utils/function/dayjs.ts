// https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
import type { ManipulateType } from 'dayjs'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/RelativeTime.js'
import 'dayjs/locale/zh-cn.js' // import locale

dayjs.extend(RelativeTime) // use plugin
dayjs.locale('zh-cn')

// 几天前
export function timeFrom(dateTime: number | string | null = null, format: string | false = 'YYYY-MM-DD') {
  if (!dateTime)
    return dayjs().format(format || 'YYYY-MM-DD')
  if (!dayjs(dateTime).isValid())
    return dateTime.toString()
  if (dayjs().valueOf() - 259200000 < dayjs(dateTime).valueOf() || format === false)
    return dayjs(dateTime).fromNow()

  else
    return timeFormat(dateTime, format as string)
}

export function timeFormat(dateTime: number | string | null = null, fmt = 'YYYY-MM-DD') {
  if (!dateTime)
    return dayjs().format(fmt)
  if (!dayjs(dateTime).isValid())
    return dateTime.toString()
  return dayjs(dateTime).format(fmt) // '25/01/2019'
}

// 获取时间戳
export function TimeStamp(dateTime: number | string, num = 0, type: 'add' | 'subtract' = 'add', unit: ManipulateType = 'day') {
  if (!dateTime)
    return dayjs().valueOf()

  if (!num)
    return dayjs(dateTime).valueOf()
  if (num && type === 'add')
    return dayjs(dateTime).add(num, unit).valueOf()
  if (num && type === 'subtract')
    return dayjs(dateTime).subtract(num, unit).valueOf()
}

export function getCurrentTime(fmt = 'YYYY-MM-DD') {
  return dayjs().format(fmt)
}

export default {
  getCurrentTime, // 获取当前时间
  TimeStamp, // 获取时间戳
  timeFrom, // 格式化成几天前
  timeFormat, // 格式化时间 'YYYY-MM-DD'
}
