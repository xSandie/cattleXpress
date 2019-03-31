var UIManager = {
    //认证提示
    toCertif:function (canCancel=true) {
        if(canCancel){
            wx.showModal({
                title: '请认证',
                content: '教务系统认证之后，黄牛才能更好的为您服务噢~',
                confirmColor: '#faaf42',
                confirmText:'去认证',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '/pages/certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        }else {
            wx.showModal({
                title: '请认证',
                content: '教务系统认证之后，黄牛才能更好的为您服务噢~',
                confirmColor: '#faaf42',
                confirmText:'去认证',
                showCancel:false,
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '/pages/certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        }

    },
    //查看异常状态提示
    checkAbnormal:function (canCancel=false) {
        if (canCancel==false){
            wx.showModal({
                title: '状态异常',
                content: '请前往我的>举报\申诉进度查看',
                confirmColor: '#faaf42',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.switchTab({
                            url: '/pages/my/my'
                        })
                    }
                }
            })
        }
    },
    //联系对方
    contactTA:function (phone_number) {
        wx.showModal({
            title: '发短信还是拨打电话？',
            content: '选择 发送短信 将复制号码，请自行粘贴并发送短信。',
            confirmColor: '#999BA1',
            confirmText: '拨打号码',
            cancelColor: '#faaf42',
            cancelText: '发送短信',
            success: function(res) {
                if (res.cancel) {
                    wx.setClipboardData({
                        data: phone_number,
                    })
                } else if (res.confirm) {
                    wx.makePhoneCall({
                        phoneNumber: phone_number //仅为示例，并非真实的电话号码
                    })
                }
            }
        })
    },
    //暂未开放的提示
    todo:function () {
        wx.showToast({
            title: '近期开放，敬请期待~',
            icon: 'none'
        })
    }
}
exports.UIManager = UIManager;