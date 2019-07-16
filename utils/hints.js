/*
* 提示信息封装
* */
var hintsManager = {
    certifPage:{
        account:'就是登陆 教务系统 的账号,每日9:00-20:00以外小黄牛的认证服务都要休息噢',
        secret:'为了您与其他用户的安全，未同意用户隐私协议时，小黄牛无法继续为您服务噢！',//同意隐私协议
        certifError:'输入有误，请重试或联系客服',//认证失败后的提示
        setAddrSug:'去设置默认收货地址，接单或者发布时别人才能联系到你噢~',//设置默认地址的建议
    },
    mainApp:{
        loginFailed:'网络不太畅通，请检查网络后点击重新登陆',
        loadSession:'全速加载',
    }
}
exports.hintsManager = hintsManager;