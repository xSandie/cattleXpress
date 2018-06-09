//app.js
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        console.log("评委老师们辛苦了！")
            // 登录
        wx.login({
            success: function(res) {
                if (res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://test.com/onLogin', //服务器api
                        data: {
                            code: res.code
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                } //服务器将存储用户code
            }
        });

    },

    globalData: {
        userInfo: null,
        session_ID: null,
        schoolID: null,
        schoolName: "陕西师范大学（长安校区）",
        ourUserStatus: 0
    }
})