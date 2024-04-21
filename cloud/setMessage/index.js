// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  try {
  const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid, //要推送给那个用户
      page: 'pages/index/index', //要跳转到那个小程序页面
      data: {//推送的内容
        time1: {
          value: event.time
        },
        short_thing2: {
          value: event.leixing
        },
        thing3: {
          value: event.data
        },
        thing5: {
          value: event.local
        },
        short_thing4: {
          value: event.dengji
        }
      },
      templateId: 'vCM65pZeMWf67WQNXsUgnF1LtgAioaaq7F7YOZKa4OM' //模板id
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}