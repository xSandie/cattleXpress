const urlModel = require('../../utils/urlSet.js');
var app = getApp();
const ui = require('../../utils/helper.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navBar: ['未完成', '已完成'],
        currentTab: 0,
        blankIcon: '../../images/blank1.png',
        blank: false, //未完成是否为空
        ongoRecList: [],
        ongoPubList: [],
        finRecList: [],
        finPubList: [],

        pubPersonIcon: '../../images/publisher.png',
        pubPersonIconGrey: '../../images/publisherGrey.png',
        atEndFlag: false,
        requestTime: 1
    },
    //0代表已接单待支付，1代表等待接单，2代表对方已接单未完成，3代表已完成,4代表已过期,5代表异常。
    navbarTap: function(e) {
        var that = this
        this.setData({
                currentTab: e.currentTarget.dataset.idx,
                requestTime: 1
            })
            // console.log(e.currentTarget.dataset.idx)
        if (e.currentTarget.dataset.idx == 0) {
            wx.request({
                url: urlModel.url.notHaveList, //未完成完成订单请求地址
                method: 'POST',
                data: {
                    'sessionID': app.globalData.sessionID,
                },
                success: function(res) {
                    // console.log(res)
                    that.setData({
                        //修改参数
                        ongoRecList: res.data.ongoRecList,
                        ongoPubList: res.data.ongoPubList
                    })
                },
                fail: function() {},
                complete: function() {
                    if (that.data.ongoPubList.length == 0 && that.data.ongoRecList.length == 0) {
                        that.setData({
                            blank: true
                        })
                    } else {
                        that.setData({
                            blank: false
                        })
                    }
                }
            })
        } else {
            wx.request({
                url: urlModel.url.haveList, //已完成订单请求地址
                method: 'POST',
                data: {
                    'sessionID': app.globalData.sessionID,
                    'request_time': 1
                },
                success: function(res) {
                    console.log('已完成订单请求', res)
                    if (res.data.finRecList.length == 0 && res.data.finPubList == 0) {
                        that.setData({
                            atEndFlag: true
                        })
                    } else {
                        that.setData({
                            finRecList: res.data.finRecList,
                            finPubList: res.data.finPubList //修改参数
                        })
                    }

                },
                fail: function() {},
                complete: function() {}
            })
        }
    },
    onShow: function() {
        var that = this
        if (app.globalData.ourUserStatus == 4) {
            ui.UIManager.toCertif(false)
            return
        }
        if (app.globalData.ourUserStatus == 1) {
            ui.UIManager.checkAbnormal(false)
            return
        }
        //判定是否为空的函数
        wx.request({
            url: urlModel.url.notHaveList, //未完成完成订单请求地址
            method: 'POST',
            data: {
                'sessionID': app.globalData.sessionID,
            },
            success: function(res) {
                that.setData({
                    ongoRecList: res.data.ongoRecList,
                    ongoPubList: res.data.ongoPubList
                })
            },
            fail: function() {},
            complete: function() {
                if (that.data.ongoPubList.length == 0 && that.data.ongoRecList.length == 0) {
                    that.setData({
                        blank: true
                    })
                } else {
                    that.setData({
                        blank: false
                    })
                }
            }
        })

    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        var that = this
        that.setData({
            requestTime: 1
        })
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
                url: urlModel.url.notHaveList, //未完成完成订单请求地址
                method: 'POST',
                data: {
                    'sessionID': app.globalData.sessionID,
                },
                success: function(res) {
                    if (res.statusCode==200){
                        that.setData({
                            //修改参数,两边同时刷新
                            ongoRecList: res.data.ongoRecList,
                            ongoPubList: res.data.ongoPubList
                        })
                        wx.hideLoading()
                        wx.showToast({
                            title: '刷新成功',
                            duration: 2000
                        })
                    } else {
                        wx.hideLoading()
                        wx.showToast({
                            title: '刷新失败，请稍后重试',
                            icon: 'none'
                        })
                    }

                },
                fail: function() {
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新失败，请稍后重试',
                        icon: 'none'
                    })
                },
                complete: function() {
                    if (that.data.ongoPubList.length == 0 && that.data.ongoRecList.length == 0) {
                        that.setData({
                            blank: true
                        })
                    } else {
                        that.setData({
                            blank: false
                        })
                    }
                    wx.stopPullDownRefresh()
                }
            })
            //考虑加入刷新已完成订单请求,没必要本来变动就不大



    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this
        //请求已完成订单。判断currentTab在哪边
        if (that.data.currentTab == 1) {
            //请求已完成订单
            that.setData({
                requestTime: that.data.requestTime + 1
            })
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            wx.request({
                url: urlModel.url.haveList, //已完成订单请求地址
                method: 'POST',
                data: {
                    'sessionID': app.globalData.sessionID,
                    'request_time': that.data.requestTime
                },
                success: function(res) {
                    console.log('触底',res)
                    if (res.data.finRecList.length == 0 && res.data.finPubList == 0) {
                        that.setData({
                            atEndFlag: true
                        })
                    } else {
                        that.setData({
                            finRecList: that.data.finRecList.concat(res.data.finRecList),
                            finPubList: that.data.finPubList.concat(res.data.finPubList) //修改参数
                        })
                    }
                },
                fail: function() {},
                complete: function() { wx.hideLoading() }
            })
        }
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
    toPubDetails: function(event) {
        var orderId = event.currentTarget.dataset.orderId
        wx.navigateTo({
            url: '../orderDetailsPub/orderDetailsPub?key=1&id=' + orderId,
        })
    },
    toRecDetails: function(event) {
        var orderId = event.currentTarget.dataset.orderId
        wx.navigateTo({
            url: '../orderDetailsRec/orderDetailsRec?key=1&id=' + orderId,
        })
    }
})