import * as echarts from '../../ec-canvas/echarts';
import {
  HistoryRecordApi
} from '../request/api'
Page({
  data: {
    ec: {
      lazyLoad: true,
    },
    deviceNo: '',
    title: '',
    key: '',
    unit: '',
    xData: [],
    yData: []
  },
  
  onLoad(options) {
    this.setData({
      deviceNo: options.deviceNo,
      title: options.title,
      key: options.key,
      unit: options.unit
    });
    this.queryHistoryRecord();
  },
  async queryHistoryRecord() {
    let {
      data
    } = await HistoryRecordApi({
      data: {
        deviceNo: this.data.deviceNo
      },
      header: {
        Authorization: wx.getStorageSync('token')
      }
    })
    
    getApp().globalData.historyItems = data

    let xData = []
    let yData = []

    for (let i = data.length - 1; i >= 0; i--) {
      let item = data[i];
      xData.push(item.createTime.substring(11, 16));
      yData.push(item[this.data.key])
    }
   
    this.setData({
      xData: xData,
      yData: yData
    });
    this.initChart();
  },
  initChart() {
    this.selectComponent("#mychart-dom-line").init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      canvas.setChart(chart);
      chart.setOption(this.getOption())
      return chart;
    })
  },
  getOption() {
    const option = {
      title: {
        text: this.data.title + '变化趋势(' + this.data.unit + ')',
        left: 'center'
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            type: ['line', 'bar']
          },
          restore: {}
        }
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: this.data.xData
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.data.yData,
        type: 'line',
        smooth: true,
        itemStyle: {
          normal: {
            color: "#009f72",
            lineStyle: {
              color: "#009f72"
            }
          }
        },
        markLine: {
          data: [{
              type: 'average',
              name: 'Avg'
            },
            [{
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max'
                }
              }
            ]
          ]
        }
      }]
    }
    return option;
  },
  saveImage(e) {
    this.saveAsImage()
  },
  saveAsImage() {
    const ecComponent = this.selectComponent('#mychart-dom-line');

    // 先保存图片到临时的本地文件，然后存入系统相册
    ecComponent.canvasToTempFilePath({
      success: res => {
        console.log("tempFilePath:", res.tempFilePath)

        // 存入系统相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath || '',
          success: res => {
            wx.showToast({
              title: '已保存至手机相册',
              icon: 'success',
              duration: 1500
            })
            console.log("success", res)
          },
          fail: res => {
            console.log("fail", res)
          }
        })
      },
      fail: res => console.log(res)
    });
  },
  onShow(){
    
  },
  onPullDownRefresh() {
    this.queryHistoryRecord();
    this.initChart();
    wx.stopPullDownRefresh()
  }
})