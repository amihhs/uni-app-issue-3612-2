import { contentAddHost, strRemoveTag, transferStr, transferTextarea } from './function/strFormat'
import { isNumber } from './check'
import $utils from './index'
import { BASE_HOST, File_Pre_Host } from '@/common/const'

export function getHost() {
  let host
  // #ifdef H5
  host = window.location.host
  // #endif
  // #ifdef MP
  host = BASE_HOST
  // #endif
  return host
}
/**
 * 设置图片大小 ： imgUrl_100x100
 * @param src 图片地址
 * @param sizeWidth 图片宽
 * @param sizeHeight 图片高
 * @returns
 */
export function imgSize(src: string, sizeWidth: number, sizeHeight: number): string {
  // console.log('src', src)
  const host = getHost()

  let size = '' // _widthxheight
  let sizeQuery = '?x-bce-process=image/resize,m_lfit,w_{width},h_{height}' // ?x-bce-process=image/resize,m_lfit,w_{width},h_{height}
  if (sizeWidth || sizeHeight) {
    sizeWidth = sizeWidth || sizeHeight
    sizeHeight = sizeHeight || sizeWidth
    size = `_${sizeWidth}x${sizeHeight}`
    sizeQuery = sizeQuery.replace('{width}', sizeWidth.toString()).replace('{height}', sizeHeight.toString())
  }
  if (src && typeof src == 'string' && !src.match(/http/)) { // /qcts-qcwp/qcts/....
    src = addHost(src) ?? ''
    return src + sizeQuery
  }
  else if (src && typeof src == 'string' && src.match(host) && !src.match(/\?x-bce-process=image\/resize/)) {
    return src + sizeQuery
  }
  else if (src && typeof src == 'string' && src.match(/(qcts-qcwp|qcts|qcwp).(gz|cdn).bcebos.com/) && !src.match(/\?x-bce-process=image\/resize/)) {
    return src + sizeQuery
  }
  else if (src && typeof src == 'string' && !src.match(/(qcts-qcwp|qcts|qcwp).(gz|cdn).bcebos.com/)) { // http://img2.qcwp.com/tswTemp/upfiles...
    if (/qcwp|qctsw/.test(src) && !src.match(/_([0-9].*)x([0-9].*)/))
      return src + size
    else return src || ''
  }
  return src || ''
}

/**
 * 给图片添加图片域名
 * @param src 图片地址
 * @returns 带文件域名的图片地址
 */
export function addHost(src: string): string {
  if ($utils.typeCheck.isString(src) && !src.match(/http/)) {
    src = File_Pre_Host + src
    return src
  }
  return src ?? ''
}
/**
 * 给图片添加服务域名
 * @param src 图片地址
 * @returns 带文件域名的图片地址
 */
export function addWebsiteHost(src: string) {
  const host = getHost()
  if ($utils.typeCheck.isString(src) && !src.match(/http/)) {
    src = host + src
    return src
  }
  return src || null
}
const enUnit = ['W+', 'W+']
const zhUnit = ['万+', '万+']
export function numForm(num: number, point = 1, formLen = 5, isE = false) {
  if (!num)
    return '0'
  // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
  const numStr = num.toString().split('.')[0]
  if (numStr.length < formLen) { // 判断数字有多长,如果小于6,,表示10万以内的数字,让其直接显示
    return numStr
  }
  else if (numStr.length >= formLen && numStr.length <= 6) { // 如果数字大于6位,小于8位,让其数字后面加单位万
    const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
    // 由千位,百位组成的一个数字
    return parseFloat(`${parseInt((num / 10000).toString())}.${decimal}`) + (isE ? enUnit[0] : zhUnit[0])
  }
  else if (numStr.length > 6 && numStr.length <= 8) { // 如果数字大于6位,小于8位,让其数字后面加单位万
    const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
    // console.log(decimal);
    // 由千位,百位组成的一个数字
    return parseFloat(`${parseInt((num / 10000).toString())}.${decimal}`) + (isE ? enUnit[1] : zhUnit[1])
  }
  else if (numStr.length > 8) { // 如果数字大于8位,让其数字后面加单位亿
    const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point)
    return `${parseFloat(`${parseInt((num / 100000000).toString())}.${decimal}`)}亿+`
  }
  return num.toString()
}
/**
 * 文本截取
 * @param str 需要截取的字符串
 * @param len 需要截取的长度
 * @returns 截取后的字符串
 */
export function strSlice(str: string, len: number) {
  if (str && typeof str == 'string' && str.length > len)
    str = `${str.slice(0, len)}...`
  return str
}

export function toChinesNum(num: number) {
  if (!isNumber(num))
    return num
  const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const unit = ['', '十', '百', '千', '万']
  const getWan = (temp: number) => {
    const strArr = temp.toString().split('').reverse()
    let newNum = ''
    for (let i = 0; i < strArr.length; i++) {
      const key = strArr[i]
      const ChinesNum = i === 0 && strArr[i] === '0'
        ? ''
        : (i > 0 && strArr[i] === '0' && strArr[i - 1] === '0'
            ? ''
            : changeNum[Number(key)] + (strArr[i] === '0' ? unit[0] : unit[i]))
      newNum = ChinesNum + newNum
    }
    return newNum
  }
  const overWan = Math.floor(num / 10000)
  let noWan: any = num % 10000
  if (noWan.toString().length < 4)
    noWan = `0${noWan}`
  return overWan ? `${getWan(overWan)}万${getWan(noWan)}` : getWan(num)
}

export default {
  getHost,
  imgSize,
  addHost,
  numForm,
  addWebsiteHost,
  strSlice, // 文本截取
  strRemoveTag,
  transferStr,
  transferTextarea,
  contentAddHost,
  toChinesNum,
}
