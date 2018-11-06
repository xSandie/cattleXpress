
var url= new Object({
  codeUrl:'http://192.168.123.215:5000/v1/auth/login',

  changePayCode:'http://45.40.197.154:5000/v1/pay/set',
  getMyPayCode:'http://45.40.197.154:5000/v1/pay/getmy',

  getCertifCode:'http://192.168.123.215:5000/v1/certif/get',
  postCertifMes:'http://192.168.123.215:5000/v1/certif/certif',
  postAvatar:'http://192.168.123.215:5000/v1/auth/setAvatar',//上传用户昵称头像接口
  postAddr:'http://192.168.123.215:5000/v1/addr/set',//设置默认地址接口
  getAddr: 'http://192.168.123.215:5000/v1/addr/get',
  reqHomeOrder:'http://192.168.123.215:5000/v1/order/get',//请求订单
  pubOrder:''//发布订单
})

exports.url = url;


