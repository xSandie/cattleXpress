var url = new Object({
    codeUrl: 'https://www.inschool.tech/v1/auth/login',

    changePayCode: 'https://www.inschool.tech/v1/pay/set',
    getMyPayCode: 'https://www.inschool.tech/v1/pay/getmy',

    getCertifCode: 'https://www.inschool.tech/v1/certif/get',
    postCertifMes: 'https://www.inschool.tech/v1/certif/certif',
    postAvatar: 'https://www.inschool.tech/v1/auth/setAvatar', //上传用户昵称头像接口
    postAddr: 'https://www.inschool.tech/v1/addr/set', //设置默认地址接口
    getAddr: 'https://www.inschool.tech/v1/addr/get',
    reqHomeOrder: 'https://www.inschool.tech/v1/orders/get', //请求订单
    pubOrder: 'https://www.inschool.tech/v1/order/pub', //发布订单
    getOrdersList: 'https://www.inschool.tech/v1/orders/list', //获取首页订单列表
    toOrderSum: 'https://www.inschool.tech/v1/order/preToSum', //未接单前获取大致快递信息
    recOrder: 'https://www.inschool.tech/v1/order/recOrder', //接受订单
    receiverOrderDetail: 'https://www.inschool.tech/v1/order/receiver', //接单人看具体信息接口
    publisherOrderDetail: 'https://www.inschool.tech/v1/order/publisher', //发布人查看订单具体信息
    changeOrderStatus: 'https://www.inschool.tech/v1/order/changeMode', //更改订单状态接口（除了举报状态）
    // prePolice:'https://www.inschool.tech/v1/police/prepolice',//返回被举报人信息
    policePub: 'https://www.inschool.tech/v1/police/reportpub', //首次发起举报
    usrinfo: 'https://www.inschool.tech/v1/auth/usrinfo', //我的页面获取用户基本信息
    policelist: 'https://www.inschool.tech/v1/police/list', //查询举报条目列表
    reportDetail: 'https://www.inschool.tech/v1/police/reportDetail', //获取举报详情
    complainReport: 'https://www.inschool.tech/v1/police/complain', //申诉
    haveList: 'https://www.inschool.tech/v1/orders/haveList', //获取已完成订单列表
    notHaveList: 'https://www.inschool.tech/v1/orders/notHaveList', //获取未完成订单列表
    toPayGet: 'https://www.inschool.tech/v1/pay/get', //获取对方支付二维码接口
    cancelPolice: 'https://www.inschool.tech/v1/police/cancel', //撤销举报接口
    changeSchool: 'https://www.inschool.tech/v1/school/change', //选择学校
    searchSchool: 'https://www.inschool.tech/v1/school/search', //搜索学校

    getAllSchool: 'https://www.inschool.tech/v1/school/getAll' //暂时使用，获得所有学校列表接口
})

exports.url = url;