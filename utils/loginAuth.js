export default () => {
  let token = wx.getStorageSync('token')

  let pages = getCurrentPages()
  let prevRoute = "/" + pages[pages.length - 1].route

  if (!token) {
    getApp().globalData.prevRoute = prevRoute
    getApp().globalData.isBack = true
    getApp().globalData.isFromTabbar = false
    wx.showToast({
      title: '请先登录',
      icon: 'success',
      duration:1000,
      mask: true
    })
    setTimeout(() => {
      wx.switchTab({
        url: '/pages/mine/index',
      })
    }, 2000);
    return true
  }
  return false
}