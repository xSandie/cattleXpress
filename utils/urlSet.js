
var url= new Object({
  codeUrl:'http://192.168.123.215:5000/v1/auth/login',

  changePayCode:'http://45.40.197.154:5000/v1/pay/set',
  getMyPayCode:'http://45.40.197.154:5000/v1/pay/getmy',

  getCertifCode:'http://192.168.123.215:5000/v1/certif/get',
  postCertifMes:'http://192.168.123.215:5000/v1/certif/certif',
  postAvatar:'http://192.168.123.215:5000/v1/auth/setAvatar',//上传用户昵称头像接口
  postAddr:'http://192.168.123.215:5000/v1/addr/set',//设置默认地址接口
  getAddr: 'http://192.168.123.215:5000/v1/addr/get',
  reqHomeOrder:'http://192.168.123.215:5000/v1/orders/get',//请求订单
  pubOrder:'http://192.168.123.215:5000/v1/order/pub',//发布订单
  getOrdersList: 'http://192.168.123.215:5000/v1/orders/list',//获取首页订单列表
  toOrderSum: 'http://192.168.123.215:5000/v1/order/preToSum',//未接单前获取大致快递信息
  recOrder:'http://192.168.123.215:5000/v1/order/recOrder',//接受订单
  receiverOrderDetail:'http://192.168.123.215:5000/v1/order/receiver',//接单人看具体信息接口
  publisherOrderDetail:'http://192.168.123.215:5000/v1/order/publisher',//发布人查看订单具体信息
  changeOrderStatus:'http://192.168.123.215:5000/v1/order/changeMode',//更改订单状态接口（除了举报状态）
  // prePolice:'http://192.168.123.215:5000/v1/police/prepolice',//返回被举报人信息
  policePub:'http://192.168.123.215:5000/v1/police/reportpub',//首次发起举报
  usrinfo:'http://192.168.123.215:5000/v1/auth/usrinfo',//我的页面获取用户基本信息
  policelist: 'http://192.168.123.215:5000/v1/police/list',//查询举报条目列表
  reportDetail:'http://192.168.123.215:5000/v1/police/reportDetail',//获取举报详情
  complainReport: 'http://192.168.123.215:5000/v1/police/complain',//申诉
  haveList:'http://192.168.123.215:5000/v1/orders/haveList',//获取已完成订单列表
  notHaveList:'http://192.168.123.215:5000/v1/orders/notHaveList',//获取未完成订单列表
  toPayGet:'http://192.168.123.215:5000/v1/pay/get',//获取对方支付二维码接口

})

exports.url = url;


