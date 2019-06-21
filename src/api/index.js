import http from "./http";
import axios from "axios";

// import qs from 'qs'

class API {
  constructor() {}
  //定义一些获取数据的接口

  // 注册

  // 获取验证码
  code = params => {
    return http.post("PublicApi/sendemail", params);
  };
  toLogin = params => {
    return http.post("Login/checkLogin", params);
  };
  // Login/reg 注册
  reg = params => {
    return http.post("Login/reg", params);
  };
  //个人信息
  getInfo = params => {
    return http.post("User/getperinfo", params);
  };
  // 兑换通证单价
  getPrice = params => {
    return http.post("PublicApi/tzprice", params);
  };
  // db兑换   myApi/tzchange
  tzchange = params => {
    return http.post("myApi/tzchange", params);
  };
  // UDB提现myApi/txudb
  txudb = params => {
    return http.post("myApi/txudb", params);
  };
  // 提现记录
  txlist = params => {
    return http.post("myApi/txlist", params);
  };
  // 收益纪律
  udbearninglist = params => {
    return http.post("myApi/udbearninglist", params);
  };
  // 首页信息
  indexinfo = params => {
    return http.post("myApi/indexinfo", params);
  };
  // 复投
  dofutou = params => {
    return http.post("myApi/dofutou", params);
  };
  // 复投记录
  ftlist = params => {
    return http.post("myApi/ftlist", params);
  };
  // 锁仓 myApi/closeudb
  closeudb = params => {
    return http.post("myApi/closeudb", params);
  };
  // myApi/udbcloselist 锁仓列表
  udbcloselist = params => {
    return http.post("myApi/udbcloselist", params);
  };
  // 痛症互转
  changetz = params => {
    return http.post("user/changetz", params);
  };
  // 余额互转
  changemoney = params => {
    return http.post("user/changemoney", params);
  };
  // myApi/myudblist udb通证记录
  myudblist = params => {
    return http.post("myApi/myudblist", params);
  };
  // 上传图片 User/upImg
  upImg = params => {
    return http.post("User/upImg", params);
  };
  // 充值  User/addmoney
  addmoney = params => {
    return http.post("User/addmoney", params);
  };
  // 退出登录 Login/logout
  logout = params => {
    return http.post("Login/logout", params);
  };
  // myApi/verpsw 校验
  verpsw = params => {
    return http.post("myApi/verpsw", params);
  };
  // myApi/setpsw
  setpsw = params => {
    return http.post("myApi/setpsw", params);
  };
}

export default new API();
// export{ dataGet }
