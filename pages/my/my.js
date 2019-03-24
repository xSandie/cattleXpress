var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardBg: "../../images/bigback.png",
        balance: null,
        creditScore: 0,
        level: 1,
        realName: "",
        haveCertif: false,
        schoolNumb: "",
        addressIcon: "../../images/myAdress.png",
        policeIcon: "../../images/police.png",
        nextIcon: "../../images/nextBlack.png",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            balance: app.globalData.balance
        })
        if (!app.globalData.havePayCode) {
            wx.showToast({
                title: '设置完 收款二维码 才能接单噢！',
                icon: 'none',
                duration: 2000
            })
        }
        var that = this
        wx.request({
            url: urlModel.url.usrinfo, //用户余额信用获取
            method: 'GET',
            data: {
                'sessionID': app.globalData.sessionID,
            },
            success: function(res) {
                // console.log(res)
                if (res.statusCode == 200) {
                    that.setData({
                        balance: res.data.balance, //修改参数
                        creditScore: res.data.credit,
                        level: res.data.level,
                    })
                    app.globalData.userName = res.data.username
                    app.globalData.schoolNumb = res.data.school_numb
                    app.globalData.havePayCode = res.data.have_pay_code
                    app.globalData.ourUserStatus = res.data.user_status
                    if (res.data.user_status != 4) { app.globalData.haveCertif = true }
                    app.globalData.balance = res.data.balance
                }

            },
            fail: function() {},
            complete: function() {
                if (app.globalData.ourUserStatus != 4) {
                    that.setData({
                        haveCertif: true
                    })
                }
                that.setData({
                    realName: app.globalData.userName,
                    schoolNumb: app.globalData.schoolNumb,
                })
            }
        })
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        var that = this
        wx.showLoading({
            title: '刷新中',
        })
        wx.request({
            url: urlModel.url.usrinfo, //用户余额信用获取
            method: 'GET',
            data: {
                'sessionID': app.globalData.sessionID,
            },
            success: function(res) {
                console.log(res)
                wx.hideLoading()
                if (res.statusCode == 200) {
                    app.globalData.havePayCode = res.data.have_pay_code
                    that.setData({
                        balance: res.data.balance, //修改参数
                        creditScore: res.data.credit,
                        level: res.data.level
                    })
                    app.globalData.userName = res.data.username
                    app.globalData.schoolNumb = res.data.school_numb
                    app.globalData.balance = res.data.balance
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新成功',
                    })
                }else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新失败，请重试',
                        icon: 'none'
                    })
                }

            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '刷新失败，请重试',
                    icon: 'none'
                })
            },
            complete: function() {
                that.setData({
                    realName: app.globalData.userName,
                    schoolNumb: app.globalData.schoolNumb,
                })
                wx.stopPullDownRefresh()
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: '校园快递互助代取平台',
            path: '/pages/home/home',
            imageUrl: '/images/sharePic.jpg'
        }
    },
    toAddrEdit: function() {
        // console.log("addr被点击了");
        wx.navigateTo({
            url: '../defAddrEdit/defAddrEdit',
        })
    },
    toPoList: function() {
        // console.log("toPoList被点击了");
        if (app.globalData.ourUserStatus != 4) {
            wx.navigateTo({
                url: '../policeList/policeList',
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '请先通过教务系统认证',
                cancelText: '返回主页',
                confirmText: '前往认证',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../certifPage/certifPage',
                        })
                    } else {
                        wx.reLaunch({
                            url: '../home/home',
                        })
                    }
                }
            })
        }

    },
    supportUs: function(e) {
        wx.showModal({
            title: '感谢',
            content: '开发团队暂时不需要支持噢！',
            showCancel: false,
            confirmText: '知道啦',
            confirmColor: '#faaf42'
        })
    },
    joinUs: function() {
        wx.showModal({
            title: '邮箱',
            content: '联系我们请发送邮件至：\r\nmornstudio@163.com',
            showCancel: false,
            confirmText: '好的',
            confirmColor: '#faaf42'
        })
    },
    myCode: function() {
        if (app.globalData.ourUserStatus != 4) {
            wx.navigateTo({
                url: '../myCode/myCode',
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '请先通过教务系统认证',
                cancelText: '返回主页',
                confirmText: '前往认证',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../certifPage/certifPage',
                        })
                    } else {
                        wx.reLaunch({
                            url: '../home/home',
                        })
                    }
                }
            })
        }
    }
})