import { isValidKey } from '../check'

/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 */
export function queryParams(data: Record<string, any> = {}, isPrefix = true, arrayFormat = 'brackets') {
  const prefix = isPrefix ? '?' : ''
  const _result = []
  if (!['indices', 'brackets', 'repeat', 'comma'].includes(arrayFormat))
    arrayFormat = 'brackets'
  for (const key in data) {
    const value = data[key]
    // 去掉为空的参数
    if (['', undefined, null].includes(value))
      continue

    // 如果值为数组，另行处理
    // console.log('value.constructor === Array', value.constructor === Array)
    // console.log('arrayFormat', arrayFormat)
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++)
            _result.push(`${key}[${i}]=${value[i]}`)

          break
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`)
          })
          break
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach((_value) => {
            _result.push(`${key}=${_value}`)
          })
          break
        case 'comma':
          // 结果: ids=1,2,3
          // eslint-disable-next-line no-case-declarations
          let commaStr = ''
          value.forEach((_value) => {
            commaStr += (commaStr ? ',' : '') + _value
          })
          _result.push(`${key}=${commaStr}`)
          break
        default:
          value.forEach((_value) => {
            _result.push(`${key}[]=${_value}`)
          })
      }
    }
    else {
      _result.push(`${key}=${value}`)
    }
  }
  return _result.length ? prefix + _result.join('&') : ''
}

export function splitQuery(str: string) {
  if (!str)
    return undefined
  const strArr = str.split('?')?.[1]?.split('&')
  const strObject: Record<string, any> = {}
  strArr?.forEach((v) => {
    const strContent = v.split('=')
    const strKey = strContent?.[0]
    const strValue = strContent?.[1]

    if (isValidKey(strKey, strObject) && Array.isArray(strObject[strKey]))
      strObject[strKey].push(strValue)
    else if (isValidKey(strKey, strObject) && !Array.isArray(strObject[strKey]))
      strObject[strKey] = [strObject[strKey], strValue]
    else
      strObject[strKey] = strValue
  })
  return strObject
}

export default queryParams
