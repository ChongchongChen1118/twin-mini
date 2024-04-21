import request from './request'

//登录请求
export const LoginApi = params => request("/wxapi/login", params);

//用户信息请求
export const UserInfoApi = params => request("/wxapi/userInfo", params);

//场地列表请求
export const VenueApi = params => request("/wxapi/site/list", params);

//植物列表请求
export const PlantApi = params => request("/wxapi/plant/list", params);

//设备列表请求
export const DeviceApi = params => request("/wxapi/device/list", params);

//当前监控记录请求
export const CurrentRecordApi = params => request("/wxapi/record/recent", params);

//历史监控记录请求
export const HistoryRecordApi = params => request("/wxapi/record/list", params);