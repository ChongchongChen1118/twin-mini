const baseUrl = "https://digital-ag.cn/";

export default function request(url, params = {}) {

  return new Promise(function (resolve, reject) {

    wx.showLoading({
      title: '加载中···'
    })

    //封装携带header信息
    // let token = wx.getStorageSync('token')
    // var defaultHeader = {}
    // if (token) {
    //   if (params.header) {
    //     params.header['Authorization'] = token
    //   } else {
    //     defaultHeader = {
    //       'Authorization': token
    //     }
    //   }
    // } 

    wx.request({
      url: baseUrl + url,
      data: params.data || {},
      header: params.header || {},
      method: params.method || 'GET',
      dataType: 'json',
      success: function (res) {
        wx.hideLoading();

        if (res.data.code == 200) {
          resolve(res.data)
        }

      },
      fail: function (err) {
        wx.hideLoading();
        wx.showToast({
          title: err || '请求错误'
        })
        reject(err)
      }
    })

  })
}