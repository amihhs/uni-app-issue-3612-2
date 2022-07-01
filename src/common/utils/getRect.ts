// 查询节点信息
// 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
// 解决办法为在组件根部再套一个没有任何作用的view元素
// 问题：貌似在没有找到对于节点是Promise一直处于pedding无返回
export function getComponentRect(selector: string, all: false, _this: unknown): Promise<UniApp.NodeInfo>
export function getComponentRect(selector: string, all: true, _this: unknown): Promise<UniApp.NodeInfo[]>
export function getComponentRect(selector: string, all: boolean, _this: unknown = undefined): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> {
  return new Promise((resolve, reject) => {
    uni.createSelectorQuery()
      .in(_this)[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length)
          resolve(rect)
        if (!all && rect)
          resolve(rect)
        if (!rect)
          reject(new Error(`no search node:${selector}`))
      })
      .exec()
  })
}

export function getPageRect(selector: string, all: false): Promise<UniApp.NodeInfo>
export function getPageRect(selector: string, all: true): Promise<UniApp.NodeInfo[]>
export function getPageRect(selector: string, all = false): Promise<UniApp.NodeInfo | UniApp.NodeInfo[]> {
  return new Promise((resolve, reject) => {
    uni.createSelectorQuery()[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length)
          resolve(rect)
        if (!all && rect)
          resolve(rect)
        if (!rect)
          reject(new Error(`no search node:${selector}`))
      })
      .exec()
  })
}

export default {
  getComponentRect,
  getPageRect,
}
