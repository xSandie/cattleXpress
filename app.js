//app.js
const Promise = require('units/promise.js');
const urlModel = require('utils/urlSet.js');
const hintsModel = require('utils/hints.js');
const Towxml = require('/towxml/main');
App({
    onLaunch: function() {},
    towxml: new Towxml(),
    //获取基本信息方法
    getUserSync: function() {
        var app = this;
        return new Promise(function(resolve, reject) {
            wx.showLoading({
                title: hintsModel.hintsManager.mainApp.loadSession,
                mask: true
            });
            wx.login({
                success: function(res) {
                    //只会拿到一个code
                    if (res.code) {
                        wx.request({
                            url: urlModel.url.codeUrl,
                            data: {
                                code: res.code
                            },
                            success: function(res) {
                                if (res.statusCode == 200) {
                                    app.globalData.sessionID = res.data.sessionID;
                                    wx.hideLoading();
                                    resolve('ok');
                                } else {
                                    wx.hideLoading();
                                    wx.showToast({
                                        title: hintsModel.hintsManager.mainApp.loginFailed,
                                        icon: 'none',
                                        duration: 2000,
                                        mask: false,
                                        success: function() {}
                                    });
                                    reject('error');
                                }

                            },
                            fail: function() {
                                wx.hideLoading();
                                wx.showToast({
                                    title: hintsModel.hintsManager.mainApp.loginFailed,
                                    icon: 'none',
                                    duration: 5000,
                                    mask: true,
                                    success: function() {}
                                });
                                reject('error');
                            }
                        })
                    } else {
                        reject('error');
                    }
                },
                fail: function () {
                    wx.hideLoading();
                    wx.showToast({
                        title: hintsModel.hintsManager.mainApp.loginFailed,
                        icon: 'none',
                        duration: 2000,
                        mask: false,
                        success: function() {}
                    })
                }
            })
        })
    },
    getBaseInfoSync:function(sessionID=null){
        var app = this;
        if(sessionID == null)sessionID=app.globalData.sessionID;
        return new Promise((resolve, reject)=>{
            wx.request({
                url: urlModel.url.baseInfoUrl,
                data: {
                    "sessionID": sessionID
                },
                success: function(res) {
                    console.log(res);
                    if (res.statusCode == 200) {
                        app.globalData.ourUserStatus = res.data.user_status;
                        // app.globalData.smartPub = res.data.smart_pub;
                        // app.globalData.defaultReward = res.data.default_reward;
                        if (res.data.default) { app.globalData.default = res.data.default }
                        if (res.data.user_status == 4) { app.globalData.haveCertif = false } else
                            { app.globalData.haveCertif = true }
                        if (res.data.user_name) {
                            //有姓名，已认证
                            app.globalData.userName = res.data.user_name;
                            app.globalData.schoolNumb = res.data.school_numb; //学号
                            app.globalData.sex = res.data.sex
                        }
                        app.globalData.schoolID = res.data.school_id;
                        app.globalData.schoolName = res.data.school_name;
                        app.globalData.expressLocArray = res.data.express_loc_array;

                        app.globalData.dormArea = res.data.dorm_area;
                        app.globalData.teachArea = res.data.teach_area;
                        app.globalData.otherArea = res.data.others_area;
                        app.globalData.transCampus = res.data.cross_campus;

                        app.globalData.balance = res.data.balance;
                        app.globalData.dateRange = res.data.date_range;
                        app.globalData.havePayCode = res.data.have_paycode;

                        wx.hideLoading();
                        resolve()
                    } else {
                        wx.hideLoading();
                        wx.showToast({
                            title: '网络不太畅通，请检查网络后点击重新登陆',
                            icon: 'none',
                            duration: 2000,
                            mask: false,
                            success: function() {}
                        });
                        reject()
                    }
                },
                fail: function() {
                    wx.hideLoading();
                    wx.showToast({
                        title: '网络不太畅通，请检查网络后点击重新登陆',
                        icon: 'none',
                        duration: 5000,
                        mask: true,
                        success: function() {}
                    });
                    reject()
                }
            })
        });


    },
//     app.globalData.ourUserStatus = res.data.user_status
//     app.globalData.smartPub = res.data.smart_pub
//     app.globalData.defaultReward = res.data.default_reward
//     if (res.data.default) { app.globalData.default = res.data.default }
// if (res.data.user_status == 4) { app.globalData.haveCertif = false } else { app.globalData.haveCertif = true }
//     if (res.data.user_name) {
//     //有姓名，已认证
//     app.globalData.userName = res.data.user_name
//     app.globalData.schoolNumb = res.data.school_numb //学号
//     app.globalData.sex = res.data.sex
// }
// app.globalData.schoolID = res.data.school_id
// app.globalData.schoolName = res.data.school_name
// app.globalData.expressLocArray = res.data.express_loc_array
//
// app.globalData.dormArea = res.data.dorm_area
// app.globalData.teachArea = res.data.teach_area
// app.globalData.otherArea = res.data.others_area
// app.globalData.transCampus = res.data.cross_campus
//
// app.globalData.balance = res.data.balance
// app.globalData.dateRange = res.data.date_range
// app.globalData.havePayCode = res.data.have_paycode
    // 加载动态配置文件
    loadConfig:function(){
        var app = this;
        wx.request({
            url: urlModel.url.configUrl,
            data: {
                "sessionID": app.globalData.sessionID
            },
            success: function(res) {
                console.log(res);
                if (res.statusCode == 200) {
                    app.globalData.smartPub = res.data.smart_pub;
                    app.globalData.defaultReward = res.data.default_reward;
                    app.globalData.defaultLimit = res.data.default_limit;
                } else {
                }
            }
        })
    },

    globalData: {
        sessionID: '', //用户ID
        userName: '', //用户姓名
        schoolNumb: '', //用户学号
        schoolID: 1, //学校id
        schoolName: "点击选择学校",
        ourUserStatus: 4, //用户状态码，默认先为4未认证
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
        default: {//相当于缓存，中间存储一下变量而已。
            conPhone: '点击输入电话号码',
            sendLocSelect: '选择区域',
            sendLocInput: '填写地点',
            recName: '填写姓名',
            phoneRear: '四位数字',
            QQ: '可不填写'
        },
        dateRange: [],
        havePayCode: false,
        reloadHomePage:false,
        //动态配置文件
        smartPub:true,  //智能发布开关
        defaultReward: 2, //默认赏金
        defaultLimit: true //默认取件人限制
    }
});