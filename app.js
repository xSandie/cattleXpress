//app.js
const Promise = require('units/promise.js');

App({
    onLaunch: function() {
        var app = this
            // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        console.log("黄牛快递代领")
        console.log("校园快递最后一公里问题的最优解")
        console.log("时间仓促，部分功能未完善（详情见项目需求文档），还望评委海涵!")
        console.log("评委老师们辛苦了！")

        //登录
    },
    //获取基本信息方法
    getUser: function() {
        var app = this
        return new Promise(function(resolve, reject) {
            wx.login({
                success: function(res) {
                    if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: 'http://45.40.197.154/HelloWord/receivecode/getopenid', //服务器api
                            data: {
                                code: res.code
                            },
                            success: function(res) {
                                //   console.log(res.data)//服务器解密后，客户端收到基本信息
                                app.globalData.user_ID = res.data[0].account
                                app.globalData.userName = res.data[0].uname
                                app.globalData.schoolNumb = res.data[0].uid //学号
                                app.globalData.schoolID = res.data[0].schoolid
                                app.globalData.schoolName = res.data[0].school
                                app.globalData.ourUserStatus = res.data[0].status
                                app.globalData.sex = res.data[0].sex
                                app.globalData.exlocArray = res.data[1].kuaidi
                                app.globalData.column2_0 = res.data[1].sushequ
                                app.globalData.column2_1 = res.data[1].jiaoxuequ
                                app.globalData.column2_2 = res.data[1].othersarea
                                app.globalData.column2_3 = res.data[1].kuaxiaoqu //替换掉xx
                                app.globalData.balance = res.data[0].money,
                                    app.globalData.default = res.data[1].default,
                                    app.globalData.dateRange = res.data[1].dateRange,
                                    resolve(res);
                                // console.log(app.globalData.sex)
                                // console.log("获取用户信息初始化被执行")
                            },
                            fail: function() {
                                reject('error');
                                //app.globalData.userInfo = "dfjkadhfkahfauhf"
                            }
                        })
                    } else {
                        reject('error');
                        console.log('登录失败！' + res.errMsg)
                    } //服务器将存储用户code
                }
            })
        })
    },

    globalData: {
        user_ID: null, //用户ID
        userName: '向书晗', //用户姓名
        schoolNumb: '41612057', //用户学号
        schoolID: 1, //学校id
        schoolName: "陕西师范大学长安校区",
        ourUserStatus: 0, //用户状态码，默认先为0
        sex: '',
        exlocArray: [], //两列快递站点数组
        phoneNumber: null,
        column2_0: [],
        column2_1: [],
        column2_2: [],
        column2_3: [], //四列
        balance: 40.00,
        default: {
            conPhoneNum: '点击输入电话号码',
            sendLoc: '选择地点',
            sendLocIn: '填写地点',
            recName: '填写姓名',
            phoneRear: '四位数字',
            //date: '点击选择日期', //往后加一天
        },
        dateRange: []
    }
})