
App({
  onLaunch(){
    wx.cloud.init({
      env:"twin-4gahved9fe372eae"
    })
  },
  globalData:{
    prevRoute:null,
    //是否返回上一页
    isBack:false,
    isFromTabbar:null,
    devices:["dtu1","dtu2"],
    historyItems:[]
  }
})