function toast(title: string, duration = 1500, mask = false) {
  uni.showToast({
    title,
    icon: 'none',
    duration,
    mask,
  })
}
function showModel(msg: string, title = '提示') {
  uni.showModal({
    title,
    content: msg,
  })
}
function errorShowModal(msg: string, title = '提示') {
  uni.showModal({
    title,
    content: msg,
    cancelText: '反馈问题',
    success(res) {
      if (res.cancel) {
        uni.navigateTo({
          url: '/subpages/pages/setting/opinion_feedback',
        })
      }
    },
  })
}
export { toast, errorShowModal, showModel }
