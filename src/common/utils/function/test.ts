/**
 * 判断是否是微信浏览器
 */
export const isWechat = () => {
  return (
    String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i))
    === 'micromessenger'
  )
}
export const isMobile = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}
/**
 * 校验是否是手机号
 * @param phone
 * @returns
 */
export const checkMobile = (phone: string) => {
  if (phone)
    phone = phone.toString()
  return /^1[3-9]\d{9}$/.test(phone)
}
/**
 * 校验邮箱是否正确
 * @param phone
 * @returns
 */
export const checkEmail = (email: unknown) => {
  return typeof email === 'string' && !!email.match(/^\S+?@\S+?\.\S+?$/) && email.length < 255
}
export const checkQQ = (qq: unknown) => {
  return typeof qq === 'string' && !!qq.match(/[1-9][0-9]{4,}/) && qq.length < 20
}

/**
 * 验证电子邮箱格式
 */
function email(value: unknown) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 */
function mobile(value: unknown) {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 验证URL格式
 */
function url(value: unknown) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
}

/**
 * 验证日期格式
 */
function date(value: unknown) {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value: unknown) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证十进制数字
 */
function number(value: unknown) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}

/**
 * 验证整数
 */
function digits(value: unknown) {
  return /^\d+$/.test(value)
}

/**
 * 验证身份证号码
 */
function idCard(value: unknown) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    value)
}

/**
 * 是否车牌号
 */
function carNo(value: unknown) {
  // 新能源车牌
  const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  // 旧车牌
  const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
  if (value.length === 7)
    return creg.test(value)

  else if (value.length === 8)
    return xreg.test(value)

  else
    return false
}

/**
 * 金额,只允许2位小数
 */
function amount(value: unknown) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 中文
 */
function chinese(value: unknown) {
  const reg = /^[\u4E00-\u9FA5]+$/gi
  return reg.test(value)
}

/**
 * 只能输入字母
 */
function letter(value: unknown) {
  return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value: unknown) {
  // 英文或者数字
  const reg = /^[0-9a-zA-Z]*$/g
  return reg.test(value)
}

/**
 * 验证是否包含某个值
 */
function contains(value: unknown, param: unknown) {
  return value.includes(param)
}

/**
 * 验证一个值范围[min, max]
 */
function range(value: unknown, param: unknown) {
  return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value: unknown, param: unknown) {
  return value.length >= param[0] && value.length <= param[1]
}

/**
 * 是否固定电话
 */
function landline(value: unknown) {
  const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/
  return reg.test(value)
}

/**
 * 判断是否为空
 */
function empty(value: unknown) {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length === 0)
        return true
      break
    case 'boolean':
      if (!value)
        return true
      break
    case 'number':
      if (value === 0 || isNaN(value))
        return true
      break
    case 'object':
      if (value === null || value.length === 0)
        return true
      else
        return false
  }
  return false
}

/**
 * 是否json字符串
 */
function jsonString(value: unknown) {
  if (typeof value == 'string') {
    try {
      const obj = JSON.parse(value)
      if (typeof obj == 'object' && obj)
        return true

      else
        return false
    }
    catch (e) {
      return false
    }
  }
  return false
}

/**
 * 是否数组
 */
function array(value: unknown) {
  if (typeof Array.isArray === 'function')
    return Array.isArray(value)

  else
    return Object.prototype.toString.call(value) === '[object Array]'
}

/**
 * 是否对象
 */
function object(value: unknown) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/**
 * 是否短信验证码
 */
function code(value: unknown, len = 6) {
  return new RegExp(`^\\d{${len}}$`).test(value)
}

export default {
  isWechat,
  isMobile,
  checkMobile,
  checkEmail,
  checkQQ,
  email,
  mobile,
  url,
  date,
  dateISO,
  number,
  digits,
  idCard,
  carNo,
  amount,
  chinese,
  letter,
  enOrNum,
  contains,
  range,
  rangeLength,
  empty,
  isEmpty: empty,
  jsonString,
  landline,
  object,
  array,
  code,
}
