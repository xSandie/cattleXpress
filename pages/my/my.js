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
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
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
                'userID': app.globalData.sessionID,
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                // console.log(res)
                if (res.statusCode == 200) {
                    that.setData({
                        balance: res.data.balance, //修改参数
                        creditScore: res.data.credit,
                        level: res.data.level
                    })
                    app.globalData.havePayCode = res.data.havePayCode
                    app.globalData.ourUserStatus = res.data.userStatus
                    if (res.data.userStatus != 4) { app.globalData.haveCertif = true }
                    app.globalData.balance = res.data.balance
                }

            },
            fail: function() {},
            complete: function() {}
        })
        this.setData({
            realName: app.globalData.userName,
            schoolNumb: app.globalData.schoolNumb,
        })
        if (app.globalData.ourUserStatus != 4) {
            this.setData({
                haveCertif: true
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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
                'userID': app.globalData.sessionID,
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                console.log(res)
                wx.hideLoading()
                if (res.statusCode == 200) {
                    app.globalData.havePayCode = res.data.havePayCode
                    that.setData({
                        balance: res.data.balance, //修改参数
                        creditScore: res.data.credit,
                        level: res.data.level
                    })
                    app.globalData.balance = res.data.balance
                    wx.showToast({
                        title: '刷新成功',
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
            complete: function() {}
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
            wx.showToast({
                title: '请先通过校园认证',
                icon: 'none',
                success: function() {}
            })
            wx.redirectTo({
                url: '../certifPage/certifPage',
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
            wx.showToast({
                title: '请先通过校园认证',
                icon: 'none',
                complete: function() {
                    wx.redirectTo({
                        url: '../certifPage/certifPage',
                    })
                }
            })
        }
    }
})