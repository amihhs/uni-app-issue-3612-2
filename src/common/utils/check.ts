import test, {
  isMobile,
  isWechat,
} from './function/test'

// 平台校验
export const platformCheck = {
  isMobile,
  isWechat,
}
// 数据校验
export const dataCheck = {
  ...test,
}
// 类型校验
export function isString(data: unknown): data is string {
  return typeof data === 'string'
}
export function isNumber(data: unknown): data is number {
  return typeof data === 'number' && !isNaN(data)
}
export const isArray = Array.isArray

export const isValidKey = <T extends object>(key: string | number | symbol, data: T): key is keyof typeof data => {
  const hasBarProperty = Object.prototype.hasOwnProperty.call(data, key)
  return key in data && hasBarProperty
}

/**
 * 通过判断是否有对应的键来判断是否是类型 T
 * eg：Item： Item1 | Item2  => isValidType<Item>(target, 'a') => target:Item1
 * @param target
 * @param key
 * @returns
 */
function isValidType<T>(target: {}, key: string): target is T {
  const hasBarProperty = Object.hasOwnProperty.call(target, key)
  return key in target && hasBarProperty
}
function isValidArrayType<T>(target: any[], key: string): target is T[] {
  if (!isArray(target))
    return false
  if (!target.length)
    return true
  const hasBarProperty = Object.hasOwnProperty.call(target[0], key)
  return key in target[0] && hasBarProperty
}

export const typeCheck = {
  isString,
  isNumber,
  isArray,

  isValidKey,
  isValidType,
  isValidArrayType,
}
