import * as echarts from '../../ec-canvas/echarts';
Page({

  data: {
    ec: {
      lazyLoad: true
    },
    sFlag:true,
    devices: [],
    historyItems: [],
    pieItems: [
      ['2022/3/08', 10, '土壤温度'],
      ['2022/3/09', 15, '土壤温度'],
      ['2022/3/10', 25, '土壤温度'],
      ['2022/3/14', 7, '土壤温度'],
      ['2022/3/15', 2, '土壤温度'],
      ['2022/3/16', 17, '土壤温度'],
      ['2022/3/17', 23, '土壤温度'],
      ['2022/3/18', 30, '土壤温度'],
      ['2022/3/19', 22, '土壤温度'],
      ['2022/3/20', 26, '土壤温度'],
      ['2022/3/21', 25, '土壤温度'],
      ['2022/3/22', 20, '土壤温度'],
      ['2022/3/23', 22, '土壤温度'],
      ['2022/3/24', 26, '土壤温度'],
      ['2022/3/25', 22, '土壤温度'],

      ['2022/3/08', 35, '土壤湿度'],
      ['2022/3/09', 36, '土壤湿度'],
      ['2022/3/10', 37, '土壤湿度'],
      ['2022/3/11', 22, '土壤湿度'],
      ['2022/3/12', 24, '土壤湿度'],
      ['2022/3/13', 26, '土壤湿度'],
      ['2022/3/14', 34, '土壤湿度'],
      ['2022/3/15', 21, '土壤湿度'],
      ['2022/3/16', 18, '土壤湿度'],
      ['2022/3/17', 45, '土壤湿度'],
      ['2022/3/18', 32, '土壤湿度'],
      ['2022/3/19', 35, '土壤湿度'],
      ['2022/3/20', 30, '土壤湿度'],
      ['2022/3/21', 28, '土壤湿度'],
      ['2022/3/22', 27, '土壤湿度'],
      ['2022/3/23', 26, '土壤湿度'],
      ['2022/3/24', 15, '土壤湿度'],
      ['2022/3/25', 30, '土壤湿度'],
      ['2022/3/26', 35, '土壤湿度'],
      ['2022/3/27', 42, '土壤湿度'],
      ['2022/3/28', 42, '土壤湿度'],

      ['2022/3/08', 21, '光照强度'],
      ['2022/3/09', 25, '光照强度'],
      ['2022/3/10', 27, '光照强度'],
      ['2022/3/11', 23, '光照强度'],
      ['2022/3/12', 24, '光照强度'],
      ['2022/3/13', 21, '光照强度'],
      ['2022/3/14', 35, '光照强度'],
      ['2022/3/15', 39, '光照强度'],
      ['2022/3/16', 40, '光照强度'],
      ['2022/3/17', 36, '光照强度'],
      ['2022/3/18', 33, '光照强度'],
      ['2022/3/19', 43, '光照强度'],
      ['2022/3/20', 40, '光照强度'],
      ['2022/3/21', 34, '光照强度'],
      ['2022/3/22', 28, '光照强度'],

      ['2022/3/14', 7, '二氧化碳'],
      ['2022/3/15', 2, '二氧化碳'],
      ['2022/3/16', 17, '二氧化碳'],
      ['2022/3/17', 33, '二氧化碳'],
      ['2022/3/18', 40, '二氧化碳'],
      ['2022/3/19', 32, '二氧化碳'],
      ['2022/3/20', 26, '二氧化碳'],
      ['2022/3/21', 35, '二氧化碳'],
      ['2022/3/22', 40, '二氧化碳'],
      ['2022/3/23', 32, '二氧化碳'],
      ['2022/3/24', 26, '二氧化碳'],
      ['2022/3/25', 22, '二氧化碳'],
      ['2022/3/26', 16, '二氧化碳'],
      ['2022/3/27', 22, '二氧化碳'],
      ['2022/3/28', 10, '二氧化碳'],

      ['2022/3/08', 10, '土壤PH'],
      ['2022/3/09', 15, '土壤PH'],
      ['2022/3/10', 35, '土壤PH'],
      ['2022/3/11', 38, '土壤PH'],
      ['2022/3/12', 22, '土壤PH'],
      ['2022/3/13', 16, '土壤PH'],
      ['2022/3/14', 7, '土壤PH'],
      ['2022/3/15', 2, '土壤PH'],
      ['2022/3/16', 17, '土壤PH'],
      ['2022/3/17', 33, '土壤PH'],
      ['2022/3/18', 40, '土壤PH'],
      ['2022/3/19', 32, '土壤PH'],
      ['2022/3/20', 26, '土壤PH'],
      ['2022/3/21', 35, '土壤PH'],
      ['2022/3/22', 4, '土壤PH'],
      ['2022/3/23', 32, '土壤PH'],
      ['2022/3/24', 26, '土壤PH'],
      ['2022/3/25', 22, '土壤PH'],
      ['2022/3/26', 16, '土壤PH'],
      ['2022/3/27', 22, '土壤PH'],
      ['2022/3/28', 10, '土壤PH'],

      ['2022/3/08', 10, '电导率'],
      ['2022/3/09', 15, '电导率'],
      ['2022/3/10', 35, '电导率'],
      ['2022/3/11', 38, '电导率'],
      ['2022/3/12', 22, '电导率'],
      ['2022/3/13', 16, '电导率'],
      ['2022/3/14', 7, '电导率'],
      ['2022/3/15', 2, '电导率'],
      ['2022/3/16', 17, '电导率'],
      ['2022/3/17', 33, '电导率'],
      ['2022/3/18', 4, '电导率'],
      ['2022/3/19', 32, '电导率'],
      ['2022/3/20', 26, '电导率'],
      ['2022/3/21', 35, '电导率'],
      ['2022/3/22', 40, '电导率'],
      ['2022/3/23', 32, '电导率'],
      ['2022/3/24', 26, '电导率'],
      ['2022/3/25', 22, '电导率'],
      ['2022/3/26', 16, '电导率'],
      ['2022/3/27', 22, '电导率'],
      ['2022/3/28', 60, '电导率']
    ],
    item: ["soilTemp",
      "soilMoisture",
      "soilPh",
      "airTemp",
      "airMoisture",
      "soilN",
      "soilP",
      "soilK"
    ],
    itemName: [
      '土壤温度', '土壤湿度', '土壤PH',  '空气温度', '空气湿度', '氮', '磷', '钾'
    ]
  },

  onLoad(options) {
    if (this.data.sFlag) {
      wx.showModal({
        title: '预测分析可视化展示',
        content: '点击[确定]跳转到[场地管理]页面，先查看监控设备近期历史记录，产生监控设备的历史记录后再切换到当前[预测分析]页面显示各项指标变化趋势。',
        showCancel: false,
      })
      this.setData({
        sFlag:false
      })
    }
    let pieItems = this.geneateRecordArray(getApp().globalData.historyItems, this.data.item)
    this.setData({
      devices: getApp().globalData.devices,
      pieItems: pieItems
    })
    console.log(this.data.pieItems);
    this.initLine()
  },

  geneateRecordArray(datas, keys) {
    let result = [];
    for (let [index,key] of keys.entries()) {
      for (let data of datas) {
        let ele = [];
        ele[0] = data.createTime;
        ele[1] = data[key]
        ele[2] = this.data.itemName[index]
        result.push(ele)
      }
    }
    return result;
  },

  initLine() {
    this.selectComponent("#mychart-dom-pie").init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      chart.setOption(this.getOptionPie())
      return chart;
    })

  },
  getOptionPie() {
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(0,0,0,0.2)',
            width: 1,
            type: 'solid'
          }
        }
      },

      legend: {
        data: this.data.itemName
      },

      singleAxis: {
        top: 50,
        bottom: 50,
        axisTick: {},
        axisLabel: {},
        type: 'time',
        axisPointer: {
          animation: true,
          label: {
            show: true
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            opacity: 0.2
          }
        }
      },

      series: [{
        type: 'themeRiver',
        itemStyle: {
          emphasis: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.8)'
          }
        },
        data: this.data.pieItems
      }]
    }
    return option;
  },
  getOptionLine() {
    const schema = [{
        name: 'date',
        index: 0,
        text: '日'
      },
      {
        name: 'AQIindex',
        index: 1,
        text: '生长指数'
      },
      {
        name: 'PM25',
        index: 2,
        text: '长势'
      },
      {
        name: 'PM10',
        index: 3,
        text: '光照'
      },
      {
        name: 'CO',
        index: 4,
        text: '氮'
      },
      {
        name: 'NO2',
        index: 5,
        text: '磷'
      },
      {
        name: 'SO2',
        index: 6,
        text: '钾'
      }
    ]
    var option = {
      color: ['#电导率4444', '#fec42c'],
      legend: {
        top: 10,
        data: this.data.devices,
        textStyle: {
          fontSize: 12
        }
      },
      grid: {
        left: '13%',
        right: 100,
        top: '18%',
        bottom: '10%'
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        formatter: function (param) {
          var value = param.value;
          // prettier-ignore
          return '' +
            param.seriesName + ' ' + value[0] + '日 ' +
            value[7] + ' ' +
            schema[4].text + ':' + value[4] + ' ' +
            schema[5].text + ':' + value[5] + ' ' +
            schema[6].text + ':' + value[6];
        }
      },
      xAxis: {
        type: 'value',
        name: '日期',
        nameGap: 16,
        nameTextStyle: {
          fontSize: 12
        },
        max: 31,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: '生长指数',
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
          fontSize: 12
        },
        splitLine: {
          show: false
        }
      },
      visualMap: [{
          left: 'right',
          top: '10%',
          dimension: 2,
          min: 0,
          max: 300,
          itemWidth: 30,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ['大小：长势'],
          textGap: 30,
          inRange: {
            土壤PHmbolSize: [10, 70]
          },
          outOfRange: {
            土壤PHmbolSize: [10, 70],
            color: ['rgba(255,255,255,0.4)']
          },
          controller: {
            inRange: {
              color: ['#c23531']
            },
            outOfRange: {
              color: ['#999']
            }
          }
        },
        {
          left: 'right',
          bottom: '5%',
          dimension: 6,
          min: 0,
          max: 50,
          itemHeight: 120,
          text: ['强度：光照'],
          textGap: 30,
          inRange: {
            colorLightne光照强度: [0.9, 0.5]
          },
          outOfRange: {
            color: ['rgba(255,255,255,0.4)']
          },
          controller: {
            inRange: {
              color: ['#c23531']
            },
            outOfRange: {
              color: ['#999']
            }
          }
        }
      ],
      series: [{
          name: this.data.devices[0],
          type: 'scatter',
          itemStyle: this.data.itemStyle,
          data: this.data.dataBJ
        },
        {
          name: this.data.devices[1],
          type: 'scatter',
          itemStyle: this.data.itemStyle,
          data: this.data.dataSH
        }

      ]
    };

    return option;
  },
  onPullDownRefresh() {
    this.onLoad()
    wx.stopPullDownRefresh()
  }
});