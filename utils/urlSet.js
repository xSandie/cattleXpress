var testurl = new Object({
    codeUrl: 'http://148.70.54.102:5000/minav1/auth/login',
    baseInfoUrl: 'http://148.70.54.102:5000/minav1/auth/base_info',
    configUrl: 'http://148.70.54.102:5000/minav1/school/config',

    changePayCode: 'http://148.70.54.102:5000/minav1/pay/set',
    getMyPayCode: 'http://148.70.54.102:5000/minav1/pay/getmy',

    getBanner:'https://ads.inschool.tech/ad/banners',//广告banners
    adsDetail:'https://ads.inschool.tech/ad/detail',//广告详情
    relativeRoute:'https://ads.inschool.tech',//广告图片相对路径
    checkUnPay:'http://148.70.54.102:5000/minav1/orders/unpay',//todo 检查是否有未支付的

    postAvatar: 'http://148.70.54.102:5000/minav1/auth/wxSetAvatar', //上传用户昵称头像接口
    postAddr: 'http://148.70.54.102:5000/minav1/addr/set', //设置默认地址接口
    getAddr: 'http://148.70.54.102:5000/minav1/addr/get', //获取默认收货地址
    reqHomeOrder: 'http://148.70.54.102:5000/minav1/orders/get', //请求订单
    pubOrder: 'http://148.70.54.102:5000/minav1/order/pub', //发布订单
    getOrdersList: 'http://148.70.54.102:5000/minav1/orders/list', //获取首页订单列表
    toOrderSum: 'http://148.70.54.102:5000/minav1/order/preToSum', //未接单前获取大致快递信息
    recOrder: 'http://148.70.54.102:5000/minav1/order/recOrder', //接受订单
    receiverOrderDetail: 'http://148.70.54.102:5000/minav1/order/receiver', //接单人看具体信息接口
    publisherOrderDetail: 'http://148.70.54.102:5000/minav1/order/publisher', //发布人查看订单具体信息
    changeOrderStatus: 'http://148.70.54.102:5000/minav1/order/changeMode', //更改订单状态接口（除了举报状态）

    policePub: 'http://148.70.54.102:5000/minav1/police/report_pub', //首次发起举报
    policePic: 'http://148.70.54.102:5000/minav1/police/pic', //上传举报图片
    complainPub: 'http://148.70.54.102:5000/minav1/police/complain', //首次发起举报

    usrinfo: 'http://148.70.54.102:5000/minav1/auth/wx_usrinfo', //我的页面获取用户基本信息
    policelist: 'http://148.70.54.102:5000/minav1/police/list', //查询举报条目列表
    reportDetail: 'http://148.70.54.102:5000/minav1/police/report_detail', //获取举报详情
    complainReport: 'http://148.70.54.102:5000/minav1/police/complain', //申诉
    haveList: 'http://148.70.54.102:5000/minav1/orders/haveList', //获取已完成订单列表
    notHaveList: 'http://148.70.54.102:5000/minav1/orders/notHaveList', //获取未完成订单列表
    toPayGet: 'http://148.70.54.102:5000/minav1/pay/get', //获取对方支付二维码接口
    cancelPolice: 'http://148.70.54.102:5000/minav1/police/cancel', //撤销举报接口
    changeSchool: 'http://148.70.54.102:5000/minav1/school/change', //选择学校
    searchSchool: 'http://148.70.54.102:5000/minav1/school/search', //搜索学校

    reportExError:'http://148.70.54.102:5000/minav1/fdbck/exp_station_error',
    getAllSchool: 'http://148.70.54.102:5000/minav1/school/getAll', //暂时使用，获得所有学校列表接口
    getCertifInfo: 'http://148.70.54.102:5000/minav1/certif/get', //获取 ①认证图片信息 ②账号提示信息
    postCertifMes: 'http://148.70.54.102:5000/minav1/certif/certif',
    
    intelliRecogn:'http://148.70.54.102:5000/minav1/exp/recogn',
    collectFormId:'http://148.70.54.102:5000/minav1/pstMsg/formId'//收集formId
})
var url = new Object({
    codeUrl: 'https://www.inschool.tech/minav1/auth/login',
    configUrl: 'http://148.70.54.102:5000/minav1/school/config',
    baseInfoUrl: 'http://148.70.54.102:5000/minav1/auth/base_info',

    changePayCode: 'https://www.inschool.tech/minav1/pay/set',
    getMyPayCode: 'https://www.inschool.tech/minav1/pay/getmy',

    postAvatar: 'https://www.inschool.tech/minav1/auth/wxSetAvatar', //上传用户昵称头像接口
    postAddr: 'https://www.inschool.tech/minav1/addr/set', //设置默认地址接口
    getAddr: 'https://www.inschool.tech/minav1/addr/get', //获取默认收货地址
    reqHomeOrder: 'https://www.inschool.tech/minav1/orders/get', //请求订单
    pubOrder: 'https://www.inschool.tech/minav1/order/pub', //发布订单
    getOrdersList: 'https://www.inschool.tech/minav1/orders/list', //获取首页订单列表
    toOrderSum: 'https://www.inschool.tech/minav1/order/preToSum', //未接单前获取大致快递信息
    recOrder: 'https://www.inschool.tech/minav1/order/recOrder', //接受订单
    receiverOrderDetail: 'https://www.inschool.tech/minav1/order/receiver', //接单人看具体信息接口
    publisherOrderDetail: 'https://www.inschool.tech/minav1/order/publisher', //发布人查看订单具体信息
    changeOrderStatus: 'https://www.inschool.tech/minav1/order/changeMode', //更改订单状态接口（除了举报状态）

    policePub: 'https://www.inschool.tech/minav1/police/report_pub', //首次发起举报
    policePic: 'https://www.inschool.tech/minav1/police/pic', //上传举报图片
    complainPub: 'https://www.inschool.tech/minav1/police/complain', //首次发起举报

    usrinfo: 'https://www.inschool.tech/minav1/auth/wx_usrinfo', //我的页面获取用户基本信息
    policelist: 'https://www.inschool.tech/minav1/police/list', //查询举报条目列表
    reportDetail: 'https://www.inschool.tech/minav1/police/report_detail', //获取举报详情
    complainReport: 'https://www.inschool.tech/minav1/police/complain', //申诉
    haveList: 'https://www.inschool.tech/minav1/orders/haveList', //获取已完成订单列表
    notHaveList: 'https://www.inschool.tech/minav1/orders/notHaveList', //获取未完成订单列表
    toPayGet: 'https://www.inschool.tech/minav1/pay/get', //获取对方支付二维码接口
    cancelPolice: 'https://www.inschool.tech/minav1/police/cancel', //撤销举报接口
    changeSchool: 'https://www.inschool.tech/minav1/school/change', //选择学校
    searchSchool: 'https://www.inschool.tech/minav1/school/search', //搜索学校

    reportExError:'https://www.inschool.tech/minav1/fdbck/exp_station_error',
    getAllSchool: 'https://www.inschool.tech/minav1/school/getAll', //暂时使用，获得所有学校列表接口
    getCertifInfo: 'https://www.inschool.tech/minav1/certif/get', //获取 ①认证图片信息 ②账号提示信息
    postCertifMes: 'https://www.inschool.tech/minav1/certif/certif',

    intelliRecogn:'https://www.inschool.tech/minav1/exp/recogn',
    collectFormId:'https://www.inschool.tech/minav1/pstMsg/formId',

    getBanner:'https://ads.inschool.tech/ad/banners',//广告banners
    adsDetail:'https://ads.inschool.tech/ad/detail',//广告详情
    relativeRoute:'https://ads.inschool.tech',//广告图片相对路径
    // checkUnpay:'http://148.70.54.102:5000'//检查是否有未支付的
})
exports.url = testurl;