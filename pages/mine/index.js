import {
  LoginApi,
  UserInfoApi
} from '../request/api'
Page({

  data: {
    username: wx.getStorageSync('token') ? JSON.parse(wx.getStorageSync('username')) : '点击登录',
    avatar: wx.getStorageSync('token') ? '../../assets/images/avatar.jpeg' : '../../assets/images/avatar-no.jpg',
    isLoginPopup: false,
    userpass_error: false,
    username_error: false,
    login_username: '',
    login_password: '',
    isLogined: wx.getStorageSync('token'),
    isShowLogoutDialog: false,
    showShare: false,
    options: [{
        name: '朋友',
        icon: 'wechat',
        openType: 'share'
      }
    ],
  },

  goLogin() {
    if (this.data.isLogined) {
      return
    }
    this.setData({
      isLoginPopup: true
    })
  },

  isLogoutOK() {
    //清除storage
    wx.clearStorageSync()
    this.setData({
      isLogined: false,
      avatar: '../../assets/images/avatar-no.jpg',
      username: '点击登录'
    })

    wx.showToast({
      title: '用户已登出',
      mask: true
    })
  },

  onInputUsername(e) {
    this.setData({
      login_username: e.detail,
      username_error: e.detail.trim() === ''
    })
  },
  onInputPassword(e) {
    this.setData({
      login_password: e.detail,
      userpass_error: e.detail.trim() === ''
    })
  },
  goLogout() {
    if (!this.data.isLogined) {
      return
    }
    this.setData({
      isShowLogoutDialog: true
    })
  },
  onClose() {
    this.setData({
      isLoginPopup: false,
      isShowLogoutDialog: false
    })
  },

  async login() {
    if (!this.data.login_username) {
      this.setData({
        username_error: true
      })
      return
    }
    if (!this.data.login_password) {
      this.setData({
        userpass_error: true
      })
      return
    }

    //处理登录请求
    let res = await LoginApi({
      method: 'POST',
      data: {
        username: this.data.login_username,
        password: this.data.login_password
      }
    }) 
    console.log("111122222")
    //1.提示登录成功
    wx.showToast({
      title: '登录成功',
      icon: 'success',
      mask: true //防止期间点击非此区域产生操作
    })
    //2.保存用户信息
    wx.setStorageSync("token", res.token)
    let {
      user
    } = await UserInfoApi({
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })
    wx.setStorageSync("username", JSON.stringify(user.realName))

    //3.关闭登录框,渲染用户信息
    setTimeout(() => {
      this.setData({
        isLoginPopup: false,
        username: user.realName,
        avatar: user.avatar?user.avatar:"../../assets/images/avatar.jpeg",
        isLogined: true,
        login_username: '',
        login_password: ''
      })
    }, 500);

  },
  onShareFriend() {
    if (!this.data.isLogined) {
      wx.showToast({
        title: '请先登录',
        mask: true
      })
      return
    }
    this.setData({
      showShare: true
    });
  },
  onCloseShare() {
    this.setData({
      showShare: false
    })
  },
  tapDevice() {
    if (!this.data.isLogined) {
      wx.showToast({
        title: '请先登录',
        mask: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/device/index',
    })
  }

})