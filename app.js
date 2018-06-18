//app.js
App({
    onLaunch: function() {
        var app = this
            // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        console.log("评委老师们辛苦了！")
            //登录
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
                              app.globalData.default = res.data[1].default
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
        user_ID: 2, //用户ID
        userName: '头号黄牛', //用户姓名
        schoolNumb: '暂无', //用户学号
        schoolID: 1, //学校id
        schoolName: "点击选择学校",
        ourUserStatus: 0, //用户状态码，默认先为0
        sex: '男',
        exlocArray: [], //两列快递站点数组
        phoneNumber: null,
        column2_0: [],
        column2_1: [],
        column2_2: [],
        column2_3: [], //四列
        balance: null,
        default: {
          conPhoneNum: '点击输入电话号码',
          sendLoc: '选择地点',
          sendLocIn: '填写地点',
          recName: '填写姓名',
          phoneRear: '四位数字',
          //date: '点击选择日期', //往后加一天
          dateRange: ['06-01', '06-02', '06-03', '其他']
          }
    }
})