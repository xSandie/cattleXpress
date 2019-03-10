var url = new Object({
    codeUrl: 'http://127.0.0.1:5000/minav1/auth/login',

    changePayCode: 'http://127.0.0.1:5000/minav1/pay/set',
    getMyPayCode: 'http://127.0.0.1:5000/minav1/pay/getmy',


    postAvatar: 'http://127.0.0.1:5000/minav1/auth/setAvatar', //上传用户昵称头像接口
    postAddr: 'http://127.0.0.1:5000/minav1/addr/set', //设置默认地址接口
    getAddr: 'http://127.0.0.1:5000/minav1/addr/get', //获取默认收货地址
    reqHomeOrder: 'http://127.0.0.1:5000/minav1/orders/get', //请求订单
    pubOrder: 'http://127.0.0.1:5000/minav1/order/pub', //发布订单
    getOrdersList: 'http://127.0.0.1:5000/minav1/orders/list', //获取首页订单列表
    toOrderSum: 'http://127.0.0.1:5000/minav1/order/preToSum', //未接单前获取大致快递信息
    recOrder: 'http://127.0.0.1:5000/minav1/order/recOrder', //接受订单
    receiverOrderDetail: 'http://127.0.0.1:5000/minav1/order/receiver', //接单人看具体信息接口
    publisherOrderDetail: 'http://127.0.0.1:5000/minav1/order/publisher', //发布人查看订单具体信息
    changeOrderStatus: 'http://127.0.0.1:5000/minav1/order/changeMode', //更改订单状态接口（除了举报状态）
    // prePolice:'http://127.0.0.1:5000/minav1/police/prepolice',//返回被举报人信息
    policePub: 'http://127.0.0.1:5000/minav1/police/reportpub', //首次发起举报
    usrinfo: 'http://127.0.0.1:5000/minav1/auth/usrinfo', //我的页面获取用户基本信息
    policelist: 'http://127.0.0.1:5000/minav1/police/list', //查询举报条目列表
    reportDetail: 'http://127.0.0.1:5000/minav1/police/reportDetail', //获取举报详情
    complainReport: 'http://127.0.0.1:5000/minav1/police/complain', //申诉
    haveList: 'http://127.0.0.1:5000/minav1/orders/haveList', //获取已完成订单列表
    notHaveList: 'http://127.0.0.1:5000/minav1/orders/notHaveList', //获取未完成订单列表
    toPayGet: 'http://127.0.0.1:5000/minav1/pay/get', //获取对方支付二维码接口
    cancelPolice: 'http://127.0.0.1:5000/minav1/police/cancel', //撤销举报接口
    changeSchool: 'http://127.0.0.1:5000/minav1/school/change', //选择学校
    searchSchool: 'http://127.0.0.1:5000/minav1/school/search', //搜索学校

    getAllSchool: 'http://127.0.0.1:5000/minav1/school/getAll', //暂时使用，获得所有学校列表接口
    getCertifInfo: 'http://127.0.0.1:5000/minav1/certif/get', //获取 ①认证图片信息 ②账号提示信息
    postCertifMes: 'http://127.0.0.1:5000/minav1/certif/certif'
})

exports.url = url;