export function getStorageSync(key: string) {
  let data: any
  // #ifndef MP-TOUTIAO || MP-BAIDU
  data = uni.getStorageSync(key)
  // #endif
  // #ifdef MP-TOUTIAO
  data = tt.getStorageSync(key)
  // #endif
  // #ifdef MP-BAIDU
  data = swan.getStorageSync(key)
  // #endif

  return data
}

export function setStorageSync(key: string, value: any) {
  // #ifndef MP-TOUTIAO || MP-BAIDU
  uni.setStorageSync(key, value)
  // #endif
  // #ifdef MP-TOUTIAO
  tt.setStorageSync(key, value)
  // #endif
  // #ifdef MP-BAIDU
  swan.setStorageSync(key, value)
  // #endif
}
