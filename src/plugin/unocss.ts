// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function allMarginRuleHandle(match: any[]) {
  const style = {}
  const primaryKey = {
    m: 'margin',
    p: 'padding',
  }
  const positionKeys = {
    l: 'left',
    r: 'right',
    t: 'top',
    b: 'bottom',
  }
  match[2].split('').forEach((v: string) => {
    style[`${primaryKey[match[1]]}-${positionKeys[v]}`] = `${match[3]}rpx`
  })
  return style
}
