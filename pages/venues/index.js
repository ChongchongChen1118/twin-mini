var openid;
var geshi = require('../../utils/date.js')
import {
  VenueApi,
  PlantApi,
  DeviceApi,
  CurrentRecordApi
} from '../request/api'
import loginAuth from '../../utils/loginAuth'
Page({
  data: {
    systemInfo: {},
    menuInfo: {},
    selectVenueId: 0,
    selectPlantId: 0,
    selectDeviceId: 0,
    venueList: [],
    plantList: [],
    deviceList: [],
    selectVenues: [],
    venues: [],
    plants: [],
    devices: [],
    deviceNo: '',
    vFlag: 0,
    isFirst: false,
    isShowed: false,
    createTime: '',
    deviceCount: 0,
    deviceStatus: 0,
    currentRecord: [],
    unit: ['℃', '%', 'PH', 'us/cm', '℃', '%', 'mg/kg', 'mg/kg', 'mg/kg', 'lux', 'ppm'],
    items: [{
        id: 1,
        text: '土壤温度',
        icon: '/assets/icons/tem.png',
        current: '',
        key: 'soilTemp'
      }, {
        id: 2,
        text: '土壤湿度',
        icon: '/assets/icons/water.png',
        current: '',
        key: 'soilMoisture'
      }, {
        id: 3,
        text: '土壤PH值',
        icon: '/assets/icons/ph.png',
        current: '',
        key: 'soilPh'
      }, {
        id: 4,
        text: '电导率',
        icon: '/assets/icons/ele.png',
        current: '',
        key: 'soilConductivity'
      }, {
        id: 5,
        text: '空气温度',
        icon: '/assets/icons/s-tem.png',
        current: '',
        key: 'airTemp'
      }, {
        id: 6,
        text: '空气湿度',
        icon: '/assets/icons/s-water.png',
        current: '',
        key: 'airMoisture'
      },
      {
        id: 7,
        text: '氮',
        icon: '/assets/icons/n.png',
        current: '',
        key: 'soilN'
      }, {
        id: 8,
        text: '磷',
        icon: '/assets/icons/p.png',
        current: '',
        key: 'soilP'
      }, {
        id: 9,
        text: '钾',
        icon: '/assets/icons/k.png',
        current: '',
        key: 'soilK'
      }, {
        id: 10,
        text: '光照强度',
        icon: '/assets/icons/sun.png',
        current: '',
        key: 'lightIntensity'
      }, {
        id: 11,
        text: '二氧化碳',
        icon: '/assets/icons/co2.png',
        current: '',
        key: 'co2'
      },
      {
        id: 12,
        text: '查看植物\n当前照片',
        icon: '/assets/icons/pic.png',
        current: '',
        key: ''
      }
    ]
  },
  async onLoad() {
    await this.queryVenueList()
    await wx.requestSubscribeMessage({
      tmplIds: ['vCM65pZeMWf67WQNXsUgnF1LtgAioaaq7F7YOZKa4OM'], //这里填入我们生成的模板id
      success(res) {
        console.log('授权成功', res)
      },
      fail(res) {
        console.log('授权失败', res)
      }
    })
    setTimeout(async res => {
      geshi.geshi();
      let date = new Date().Format("yyyy-MM-dd HH:m");
      await wx.cloud.callFunction({
        name: "getOpenId"
      }).then(res => {
        openid = res.result.openid
        console.log("获取openid成功", openid)
      }).catch(res => {
        console.log("获取openid失败", res)
      })
      console.log(date);
      await wx.cloud.callFunction({
        name: "setMessage",
        data: {
          openid: openid,
          time: date,
          leixing: "氮超标",
          data: "羊肚菌1号大棚氮超标，请检查",
          local: "羊肚菌1号大棚",
          dengji: "Ⅰ级"
        }
      }).then(res => {
        console.log("推送消息成功", res)
      }).catch(res => {
        console.log("推送消息失败", res)
      })
    }, 10000)
  },
  onShow() {
    if (loginAuth()) {
      return
    }
    if (!this.data.isFirst) {
      this.queryVenueList()
      this.setData({
        isFirst: true
      })
    }
  },

  async queryVenueList() {
    let {
      data
    } = await VenueApi({
      header: {
        Authorization: wx.getStorageSync('token')
      }
    });

    let venueList = data.map(item => {
      return {
        text: item.name,
        value: item.id
      }
    })
    this.setData({
      venueList,
      venues: data,
      selectVenues: data,
      vFlag: 1
    })
  },
  async queryPlantList() {
    let {
      data
    } = await PlantApi({
      data: {
        siteId: this.data.selectVenueId
      },
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })

    let plantList = data.map(item => {
      return {
        text: item.name,
        value: item.id
      }
    })
    this.setData({
      plantList,
      plants: data
    })

  },
  async queryDeviceList() {
    let {
      data
    } = await DeviceApi({
      data: {
        plantId: this.data.selectPlantId
      },
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })

    let deviceList = data.map(item => {
      return {
        text: item.name,
        value: item.id
      }
    })
    this.setData({
      deviceList,
      devices: data,
      deviceCount: data.length,
      deviceStatus: data[0].status,
      deviceNo: data[0].deviceNo
    })

  },
  async queryCurrentRecord() {
    let {
      data
    } = await CurrentRecordApi({
      data: {
        deviceNo: this.data.deviceNo
      },
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })

    let {
      soilTemp,
      soilMoisture,
      soilPh,
      soilConductivity,
      airTemp,
      airMoisture,
      soilN,
      soilP,
      soilK,
      lightIntensity,
      co2,
      imgUrl,
      createTime
    } = data

    let items = [{
        id: 1,
        text: '土壤温度',
        icon: '/assets/icons/tem.png',
        current: '',
        key: 'soilTemp'
      }, {
        id: 2,
        text: '土壤湿度',
        icon: '/assets/icons/water.png',
        current: '',
        key: 'soilMoisture'
      }, {
        id: 3,
        text: '土壤PH值',
        icon: '/assets/icons/ph.png',
        current: '',
        key: 'soilPh'
      }, {
        id: 4,
        text: '电导率',
        icon: '/assets/icons/ele.png',
        current: '',
        key: 'soilConductivity'
      }, {
        id: 5,
        text: '空气温度',
        icon: '/assets/icons/s-tem.png',
        current: '',
        key: 'airTemp'
      }, {
        id: 6,
        text: '空气湿度',
        icon: '/assets/icons/s-water.png',
        current: '',
        key: 'airMoisture'
      },
      {
        id: 7,
        text: '氮',
        icon: '/assets/icons/n.png',
        current: '',
        key: 'soilN'
      }, {
        id: 8,
        text: '磷',
        icon: '/assets/icons/p.png',
        current: '',
        key: 'soilP'
      }, {
        id: 9,
        text: '钾',
        icon: '/assets/icons/k.png',
        current: '',
        key: 'soilK'
      }, {
        id: 10,
        text: '光照强度',
        icon: '/assets/icons/sun.png',
        current: '',
        key: 'lightIntensity'
      }, {
        id: 11,
        text: '二氧化碳',
        icon: '/assets/icons/co2.png',
        current: '',
        key: 'co2'
      },
      {
        id: 12,
        text: '查看植物\n当前照片',
        icon: '/assets/icons/pic.png',
        current: '',
        key: ''
      }
    ]
    items[0].current = soilTemp + '℃'
    items[1].current = soilMoisture + '%'
    items[2].current = soilPh + ''
    items[3].current = soilConductivity + 'us/cm'
    items[4].current = airTemp + '℃'
    items[5].current = airMoisture + '%'
    items[6].current = soilN + 'mg/kg'
    items[7].current = soilP + 'mg/kg'
    items[8].current = soilK + 'mg/kg'
    items[9].current = lightIntensity + 'lux'
    items[10].current = co2 + 'ppm'
    items[11].current = ''
    this.setData({
      items: items,
      imgUrl: imgUrl,
      createTime: createTime
    })
  },
  onChangeVenue(e) {
    let selectVenues = this.data.selectVenues
    const filterVenue = selectVenues.filter((item) => {
      return item.id == e.detail
    })
    this.setData({
      selectVenueId: e.detail,
      venues: filterVenue,
      vFlag: 1
    })
    this.queryPlantList()
  },
  onChangePlant(e) {
    this.setData({
      selectPlantId: e.detail,
      vFlag: 2
    })
    this.queryDeviceList()
  },
  onChangeDevice(e) {
    this.setData({
      selectDeviceId: e.detail,
      vFlag: 3
    })
    this.queryCurrentRecord()
  },
  onHistoryListPage(e) {
    let items = this.data.items
    let unit = this.data.unit

    if (e.currentTarget.dataset.id != 12) {
      wx.navigateTo({
        url: `/pages/monitor/index?title=${items[e.currentTarget.dataset.id-1].text}&deviceNo=${this.data.deviceNo}&key=${items[e.currentTarget.dataset.id-1].key}&unit=${unit[e.currentTarget.dataset.id-1]}`
      })
    } else {
      this.setData({
        isShowed: true
      })
    }
  },
  onPopupClose() {
    this.setData({
      isShowed: false
    })
  },
  onPullDownRefresh() {
    this.setData({
      selectDeviceId: 0,
      selectPlantId: 0,
      selectVenueId: 0,
      venueList: [],
      plantList: [],
      deviceList: [],
      venues: [],
      plants: [],
      devices: []
    })
    this.queryVenueList()
    wx.stopPullDownRefresh()
  },
  onShareAppMessage() {
    const promise = new Promise(resolve => {

      setTimeout(() => {
        resolve({
          //title: '农业数字孪生平台'
        })
      }, 2000)
    })
    return {
      title: '农业数字孪生平台',
      path: '/pages/venues/index',
      promise
    }
  }
})