// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const filepath = options.filepath
    const _this = this
    _this.setData({
      imgUrl:filepath,
      results:[]
    })
    wx.getFileSystemManager().readFile({
      filePath:filepath,
      encoding:'base64',
      success(fileRes){
        const baseUrl = fileRes.data
        wx.showLoading({
          title:"识别中..."
        });
        wx.request({
          url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=kgjsZlHdOmanjmrMSYZluzYl&client_secret=yPG85YRKRLl3Sqk0mAT5yVc3dx2tcwbY',
          success:res=>{
            console.log(res);
            wx.request({
              url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/plant?access_token='+res.data.access_token, //仅用植物花卉识别接口作为实例
              header: { 
                'content-type': 'application/x-www-form-urlencoded'
               }, 
              data:{
                // BASE64编码不需要带 "data:image/jpeg;base64,"否则会报403
                'image':baseUrl,
                'baike_num':100
              },
              method:'POST',
              success (res){
                wx.hideLoading();
                _this.setData({
                  results:res.data.result
                })
                console.log(res);
              },
              fail(error){
                console.error('请求出错：' + err);
              }
            })
          }
        })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})