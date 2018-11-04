//app.js
const Promise = require('units/promise.js');
const urlModel=require('utils/urlSet.js')
App({
    onLaunch: function() {
    },
    //获取基本信息方法
    getUser: function() {
        var app = this
        return new Promise(function(resolve, reject) {
            wx.login({
                success: function(res) {
                    if (res.code) {
                      console.log(res.code)
                        //发起网络请求
                        wx.request({
                          url: urlModel.url.codeUrl, //服务器api
                            // url:'http://127.0.0.1:5000/v1',
                            data: {
                                code: res.code
                            },
                            success: function(res) {
                              //   console.log(res.data)//服务器解密后，客户端收到基本信息                      
                              console.log('code')
                              console.log(res)
                              if (res.statusCode == 200 && !res.data.reqExceed){
                                app.globalData.user_ID = res.data.gId
                                app.globalData.userName = res.data.username
                                app.globalData.schoolNumb = res.data.school_num //学号
                                app.globalData.schoolID = res.data.school_id
                                app.globalData.schoolName = res.data.school_name
                                app.globalData.ourUserStatus = res.data.user_status
                                app.globalData.sex = res.data.sex
                                app.globalData.exlocArray = res.data.kuaidi
                                app.globalData.column2_0 = res.data.sushequ
                                app.globalData.column2_1 = res.data.jiaoxuequ
                                app.globalData.column2_2 = res.data.othersarea
                                app.globalData.column2_3 = res.data.kuaxiaoqu 
                                app.globalData.balance = res.data.balance,
                                app.globalData.dateRange = res.data.dateRange
                                if (res.data.default) { app.globalData.default = res.data.default }
                                if (res.data.user_status == 4) { app.globalData.certif = false } else { app.globalData.certif = true }
                                }
                                resolve(res);
                            },
                            fail: function() {
                                reject('error');
                                //app.globalData.userInfo = "dfjkadhfkahfauhf"
                            }
                        })
                    } else {
                        reject('error');
                        console.log('登录失败！' + res.errMsg)
                    }
                }
            })
        })
    },

    globalData: {
      user_ID: 'oberz0IZWeI5X66CegUezh-pszBA', //用户ID
        userName: '', //用户姓名
        schoolNumb: '', //用户学号
        schoolID: 1, //学校id
        schoolName: "陕西师范大学长安校区",
        ourUserStatus: 4, //用户状态码，默认先为4未认证
        sex: '',
        exlocArray: [], //两列快递站点数组
        phoneNumber: null,
        column2_0: [],//宿舍区
        column2_1: [],//教学区
        column2_2: [],//其他区
        column2_3: [], //跨校区
        balance: '0.00',
        certif:false,
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