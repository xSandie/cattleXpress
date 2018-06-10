//app.js
App({
    onLaunch: function() {
        var app = this
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
                        url: 'http://10.2.24.200:8080/HelloWord/receivecode/getopenid', //服务器api
                        data: {
                            code: res.code
                        },
                        success: function(res) { //服务器解密后，客户端收到基本信息
                            console.log(res)
                            app.globalData.userInfo = res.data.xx
                            app.globalData.user_ID = res.data.xx
                            app.globalData.schoolNumb = res.data.xx
                            app.globalData.schoolID = res.data.xx
                            app.globalData.schoolName = res.data.xx
                            app.globalData.ourUserStatus = res.data.xx
                            app.globalData.sex = res.data.xx
                            app.globalData.exlocArray = res.data.xx
                            app.globalData.column2_0 = res.data.xx
                            app.globalData.column2_1 = res.data.xx
                            app.globalData.column2_2 = res.data.xx
                            app.globalData.column2_3 = res.data.xx //替换掉xx
                        },
                        fail: function() {
                            //app.globalData.userInfo = "dfjkadhfkahfauhf"
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
        user_ID: null, //用户ID
        userName: '', //用户姓名
        schoolNumb: null, //用户学号
        schoolID: null,
        schoolName: "陕西师范大学（长安校区）",
        ourUserStatus: 4, //用户状态码
        sex: '',
        exlocArray: [], //两列快递站点数组

        column2_0: [],
        column2_1: [],
        column2_2: [],
        column2_3: [] //四列
    }
})