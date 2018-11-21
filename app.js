//app.js
const Promise = require('units/promise.js');
const urlModel = require('utils/urlSet.js')
App({
    onLaunch: function() {},
    //获取基本信息方法
    getUser: function() {
        var app = this
        return new Promise(function(resolve, reject) {
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            wx.login({
                success: function(res) {
                    if (res.code) {
                        console.log(res.code)
                            //发起网络请求
                        wx.request({
                            url: urlModel.url.codeUrl,
                            data: {
                                code: res.code
                            },
                            success: function(res) {
                                //   console.log(res.data)//服务器解密后，客户端收到基本信息                      
                                console.log('code')
                                console.log(res)
                                if (res.statusCode == 200 && !res.data.reqExceed) {
                                    // if(res.data.noshool==true){
                                    //   wx.showModal({
                                    //     title: '欢迎注册',
                                    //     content: '请先选择学校',
                                    //     showCancel:false,
                                    //     cancelText:'好',
                                    //     cancelColor: '#f9a93e',
                                    //     success:function(){
                                    //       wx.navigateTo({
                                    //         url: 'pages/changeSchool/changeSchool',
                                    //       })
                                    //     }
                                    //   })
                                    // }else{
                                    if (res.data.username) {
                                        //有姓名，剩下的都会有
                                        app.globalData.userName = res.data.username
                                        app.globalData.schoolNumb = res.data.school_num //学号
                                        app.globalData.schoolID = res.data.school_id
                                        app.globalData.schoolName = res.data.school_name
                                        app.globalData.sex = res.data.sex
                                        app.globalData.exlocArray = res.data.kuaidi
                                        app.globalData.column2_0 = res.data.sushequ
                                        app.globalData.column2_1 = res.data.jiaoxuequ
                                        app.globalData.column2_2 = res.data.othersarea
                                        app.globalData.column2_3 = res.data.kuaxiaoqu
                                        app.globalData.balance = res.data.balance,
                                            app.globalData.dateRange = res.data.dateRange,
                                            app.globalData.havesetPayCode = res.data.havePayCode
                                    } else { //没有学校设置成陕师大
                                        app.globalData.exlocArray = res.data.kuaidi
                                        app.globalData.column2_0 = res.data.sushequ
                                        app.globalData.column2_1 = res.data.jiaoxuequ
                                        app.globalData.column2_2 = res.data.othersarea
                                        app.globalData.column2_3 = res.data.kuaxiaoqu
                                        app.globalData.balance = res.data.balance,
                                            app.globalData.dateRange = res.data.dateRange,
                                            app.globalData.schoolName = res.data.school_name
                                    }
                                    //设置通知 和 系统状态
                                    app.globalData.msg_con = res.data.msg_con
                                    app.globalData.msg_title = res.data.msg_title
                                    app.globalData.sys_status = res.data.sys_status

                                    if (res.data.default) { app.globalData.default = res.data.default }
                                    // }
                                    app.globalData.user_ID = res.data.gId
                                    app.globalData.ourUserStatus = res.data.user_status
                                    if (res.data.user_status == 4) { app.globalData.certif = false } else { app.globalData.certif = true }
                                    wx.hideLoading()
                                } else {
                                    wx.hideLoading()
                                    wx.showToast({
                                        title: '网络不太畅通，请检查网络，再关闭微信重试',
                                        icon: 'none',
                                        duration: 10000,
                                        mask: true,
                                        success: function() {}
                                    })
                                }
                                resolve(res);
                            },
                            fail: function() {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '网络不太畅通，请检查网络，再关闭微信重试',
                                    icon: 'none',
                                    duration: 10000,
                                    mask: true,
                                    success: function() {}
                                })
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
        user_ID: '', //用户ID
        userName: '', //用户姓名
        schoolNumb: '', //用户学号
        schoolID: 1, //学校id
        schoolName: "点击选择学校",
        ourUserStatus: 4, //用户状态码，默认先为4未认证
        sex: '',
        exlocArray: [], //两列快递站点数组
        phoneNumber: null,
        column2_0: [], //宿舍区
        column2_1: [], //教学区
        column2_2: [], //其他区
        column2_3: [], //跨校区
        balance: '0.00',
        certif: false,
        default: {
            conPhoneNum: '点击输入电话号码',
            sendLoc: '选择地点',
            sendLocIn: '填写地点',
            recName: '填写姓名',
            phoneRear: '四位数字',
            //date: '点击选择日期', //往后加一天
        },
        dateRange: [],
        havesetPayCode: false,

        msg_title: '',
        msg_con: '',
        sys_status: 0
    }
})