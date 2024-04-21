// camera.js
Page({
  onLoad(){
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'original',
      success: (res) => {
        
        wx.navigateTo({
          url: '../result/result?filepath=' + res.tempImagePath,
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})