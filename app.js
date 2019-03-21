//app.js
const Promise = require('units/promise.js');
const urlModel = require('utils/urlSet.js')
App({
    onLaunch: function() {},
    //获取基本信息方法
    getUser: function() {
        var app = this;
        return new Promise(function(resolve, reject) {
            wx.showLoading({
                title: '全速加载',
                mask: true
            })
            wx.login({
                success: function(res) {
                    if (res.code) {
                        wx.request({
                            url: urlModel.url.codeUrl,
                            data: {
                                code: res.code
                            },
                            success: function(res) {
                                if (res.statusCode == 200) {
                                    if (res.data.username) {
                                        //有姓名，已认证
                                        app.globalData.userName = res.data.user_name
                                        app.globalData.schoolNumb = res.data.school_numb //学号
                                        app.globalData.sex = res.data.sex
                                    }
                                    app.globalData.schoolID = res.data.school_id
                                    app.globalData.schoolName = res.data.school_name
                                    app.globalData.expressLocArray = res.data.express_loc_array

                                    app.globalData.dormArea = res.data.dorm_area
                                    app.globalData.teachArea = res.data.teach_area
                                    app.globalData.otherArea = res.data.others_area
                                    app.globalData.transCampus = res.data.cross_campus

                                    app.globalData.balance = res.data.balance
                                    app.globalData.dateRange = res.data.date_range
                                    app.globalData.havePayCode = res.data.have_paycode
                                    app.globalData.sessionID = res.data.sessionID
                                    app.globalData.ourUserStatus = res.data.user_status
                                    if (res.data.default) { app.globalData.default = res.data.default }
                                    if (res.data.user_status == 4) { app.globalData.haveCertif = false } else { app.globalData.haveCertif = true }

                                    wx.hideLoading()
                                    resolve('ok');
                                } else {
                                    wx.hideLoading()
                                    wx.showToast({
                                        title: '网络不太畅通，请检查网络后点击重新登陆',
                                        icon: 'none',
                                        duration: 2000,
                                        mask: false,
                                        success: function() {}
                                    })
                                    reject('error');
                                }

                            },
                            fail: function() {
                                wx.hideLoading()
                                wx.showToast({
                                    title: '网络不太畅通，请检查网络后点击重新登陆',
                                    icon: 'none',
                                    duration: 5000,
                                    mask: true,
                                    success: function() {}
                                })
                                reject('error');
                            }
                        })
                    } else {
                        reject('error');
                    }
                }
            })
        })
    },

    globalData: {
        sessionID: '', //用户ID
        userName: '', //用户姓名
        schoolNumb: '', //用户学号
        schoolID: 1, //学校id
        schoolName: "点击选择学校",
        ourUserStatus: 3, //用户状态码，默认先为4未认证
        sex: '',
        expressLocArray: [], //两列快递站点数组
        phoneNumber: null,
        dormArea: [], //宿舍区
        teachArea: [], //教学区
        otherArea: [], //其他区
        transCampus: [], //跨校区
        balance: '0.00',
        haveCertif: false,
        doubleCertif: false,
        default: {
            conPhone: '点击输入电话号码',
            sendLocSelect: '选择地点',
            sendLocInput: '填写地点',
            recName: '填写姓名',
            phoneRear: '四位数字',
            QQ: '可不填写'
        },
        dateRange: [],
        havePayCode: false,
        accountHint: '就是登陆 教务系统 的账号', //认证账号提示
        reloadHomePage:false
    }
})