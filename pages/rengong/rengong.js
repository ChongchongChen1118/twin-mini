var openid;
var geshi = require('../../utils/date.js')
// pages/rengong/rengong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  
  gpt(){
    wx.navigateTo({
      url:"../gpt/gpt"
    })
  },
  photo(){
    wx.navigateTo({
      url:"../index/index"
    })
  },
  // huoqu(){
  //   wx.requestSubscribeMessage({
  //     tmplIds: ['vCM65pZeMWf67WQNXsUgnF1LtgAioaaq7F7YOZKa4OM'], //这里填入我们生成的模板id
  //     success(res) {
  //       console.log('授权成功', res)
  //     },
  //     fail(res) {
  //       console.log('授权失败', res)
  //     }
  //   })
  // },
  // async fasong(){
    
    

  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})