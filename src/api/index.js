import http from './http'
import axios from 'axios'

// import qs from 'qs'

class API {

  constructor() {

  }
  //定义一些获取数据的接口


  // 注册


  // 获取验证码
  code = params => {
    return http.post('PublicApi/sendemail', params)
  }
  toLogin = params => {
    return http.post('Login/checkLogin', params)
  }
  //个人信息
  getInfo = params => {
    return http.post('User/getperinfo', params)
  }
}


export default new API()
// export{ dataGet }
