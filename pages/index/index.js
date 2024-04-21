// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  // 事件处理函数
  uploadImg(){
    wx.chooseImage({
      count:1,
      success (res) {
        const tempFilePaths = res.tempFilePaths[0]
        wx.navigateTo({
          url: '../result/result?filepath=' + tempFilePaths,
        })
      }
    })
  },
  pailoadImg(){
    wx.navigateTo({
      url: '../camera/camera',
    })
  }
})
