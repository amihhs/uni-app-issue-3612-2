import $utils from '..'
import { isString } from '../check'
import { File_Pre_Host } from '@/common/const'
export const transferStr = (str: string) => {
  if (!str || !$utils.typeCheck.isString(str))
    return str
  const regexp = /&(.*?);/g
  const obj = {
    lt: '<',
    gt: '>',
    amp: '&',
    quot: '"',
    apos: '\'',
    semi: ';',
    nbsp: '\xA0',
    ensp: '\u2002',
    emsp: '\u2003',
    ndash: '–',
    mdash: '—',
    middot: '·',
    lsquo: '‘',
    rsquo: '’',
    ldquo: '“',
    rdquo: '”',
    bull: '•',
    hellip: '…',
  }
  const arr = Array.from(new Set(str.match(regexp)))
  arr.forEach((v) => {
    v.match(regexp)
    const i = RegExp.$1
    if (obj[i])
      str = str.replace(new RegExp(v, 'g'), obj[i])
  })
  str = str.replace(regexp, '')
  return str
}
/**
 * 移除字符串中的标签
 * @param str string
 * @returns string
 */
export const strRemoveTag = (str: string) => {
  if (!str || !$utils.typeCheck.isString(str))
    return ''
  str = transferStr(str)
  const reg_1 = /\s*|\t|\r|\n/g
  const reg_2 = /<[^>]+>/g
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的srcc
  return str.replace(reg_1, '').replace(reg_2, '').replace(srcReg, '')
}

/**
 * 对富文本内图片添加域名地址
 * @param str string
 * @returns
 */
export const contentAddHost = (str: string) => {
  if (!str || !$utils.typeCheck.isString(str))
    return str
  // str = str ? str : '<P><img src="http://bbs.cn.yimg.com/user_img/200701/31/jisuanji986_117025184198149.jpg"><img src="https://bbs.cn.yimg.com/user_img/200701/31/jisuanji986_117025184198149.jpg"><img src="/200701/31/jisuanji986_117025184198149.jpg"><img src="/jisuanji986_117025184198149.jpg"></P>';
  // a 为富文本的字符串内容，为了测试，只写了img标签
  const b = /<img [^>]*src=['"]([^'"]+)[^>]*>/g// img 标签取src里面内容的正则
  const s = str.match(b)// 取到所有img标签 放到数组 s里面
  if (!s)
    return str
  for (let i = 0; i < s.length; i++) {
    const srcImg = s[i].replace(b, '$1')// 取src面的内容
    if (srcImg.slice(0, 4) === 'http' || srcImg.slice(0, 5) === 'https' || srcImg.match(/^data:.*;base64.*/)) {
      // 若src前4位置或者前5位是http、https则不做任何修改,或者是base64
      // console.log('不做任何修改');
      continue
    }
    else {
      // 修改富文本字符串内容 img标签src 相对路径改为绝对路径
      str = str.replace(new RegExp(srcImg, 'g'), File_Pre_Host + srcImg) // 'http://www.dlzjzx.tj.cn'自己替换的内容
    }
  }
  return str
}

export const transferTextarea = (str: string) => {
  if (!str || !isString(str))
    return str
  let newStr = str
  try {
    newStr = str.replace(/\n/g, '<br />')
  }
  catch (error) {
    console.error('transferTextarea transferTextarea', error)
  }
  return newStr
}
