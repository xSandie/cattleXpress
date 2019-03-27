var app = getApp();
const urlModel = require('../../utils/urlSet.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ads: ['../../images/banner1.png', '../../images/banner2.png'], //广告banner图片地址

        schoolName: '',
        locIcon: "../../images/location.png",
        pubPersonIcon: '../../images/publisher.png',
        pubPersonIconGrey: '../../images/publisherGrey.png',
        blankIcon: '../../images/blank1.png',
        topIcon: '../../images/bTopIcon.png',
        pullIcon: '../../images/pull.png',
        toTopIcon: '../../images/hPubIcon.png',
        viewEye: '../../images/pageview.png',
        recBadge: '../../images/recBadge.png',
        pubOrTop: true, //true渲染发布

        orderList: null,
        finishedOrderList: null,
        requestTime: 1,
        atEndFlag: false,
        loginFailed:true,
        blank:false
    },
    getBanner:function(){
        //获取并设置广告
        var send_data = {
            'school_id': app.globalData.schoolID,
            'sessionID': app.globalData.sessionID,
        }
        wx.request({
            url: urlModel.url.getBanner, //请求首页订单列表
            method: 'GET',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200){
                    that.setData({
                        ads:res.data.ads
                    })
                }
                console.log(res)
            },
            fail: function() {},
            complete: function() {}
        })
    },

    setAvatar: function() {
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                                // console.log(res)
                                let send_data = {
                                    'user_nickname': res.userInfo.nickName,
                                    'user_avatarurl': res.userInfo.avatarUrl,
                                    'sessionID': app.globalData.sessionID
                                }
                                wx.request({
                                    url: urlModel.url.postAvatar,
                                    method: 'POST',
                                    // header: { "Content-Type": "application/x-www-form-urlencoded" },
                                    data: send_data,
                                    success: function(res) {
                                        // console.log("---上传头像--")
                                        // console.log(res)
                                    }
                                })
                            } //发起发送用户头像昵称请求
                    })
                } else {
                    //未授权
                    wx.reLaunch({
                        url: '../welcome/welcome',
                    })
                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        app.getUser().then(function(res) {
            that.setData({
                requestTime: 1,
                atEndFlag: false
            })
            that.setData({
                schoolName: app.globalData.schoolName,
                loginFailed:false
            })
            var send_data = {
                'school_id': app.globalData.schoolID,
                'sessionID': app.globalData.sessionID,
                'request_time': 1
            }
            wx.showLoading({
                title: '装填订单',
                mask: true
            })
            wx.request({
                url: urlModel.url.getOrdersList, //请求首页订单列表
                method: 'GET',
                data: send_data,
                success: function(res) {
                    if(res.statusCode == 200){
                        that.setData({
                            orderList: res.data.waiting_orders,
                            finishedOrderList: res.data.finish_orders
                        })
                    }
                    console.log(res)
                },
                fail: function() {},
                complete: function() { wx.hideLoading()
                if (that.data.orderList.length==0 && that.data.finishedOrderList.length==0){
                    that.setData({
                        atEndFlag:false,
                        blank:true
                    })
                } else {
                    that.setData({
                        blank:false
                    })
                }
                }
            })
            var send_data = {
                'sessionID': app.globalData.sessionID
            }
            //获取默认地址
            wx.request({
                url: urlModel.url.getAddr,
                data: send_data,
                success: function(res) {
                    if (res.data.default) {
                        app.globalData.default.conPhone = res.data.phone
                        app.globalData.default.phoneRear = res.data.phone_rear
                        app.globalData.default.recName = res.data.rec_name
                        app.globalData.default.sendLocInput = res.data.send_loc_detail
                        app.globalData.default.sendLocSelect = res.data.send_loc_sum
                        app.globalData.default.QQ = res.data.QQ || '可不填写'
                    }
                }
            })
            that.setAvatar();
        }).catch(function () {
            that.setData({
                loginFailed:true
            })
        })

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        //每次显示都刷新学校名称
        var that = this
        that.setData({
                schoolName: app.globalData.schoolName
            })
        setTimeout(that.timeOutRefresh,1000)

    },
    timeOutRefresh:function(){
        if(app.globalData.reloadHomePage){
            app.globalData.reloadHomePage = false
            this.onPullDownRefresh()
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
        wx.showLoading({
            title: '刷新中',
            mask: true
        })
        this.setData({
            pubOrTop: true,
            schoolName: app.globalData.schoolName,
            requestTime: 1
        })
        var that = this
        wx.request({
            url: urlModel.url.getOrdersList,
            method: 'GET',
            data: {
                'school_id': app.globalData.schoolID,
                'sessionID': app.globalData.sessionID,
                'request_time': 1
            },
            success: function(res) {
                wx.hideLoading()
                that.setData({
                    orderList: res.data.waiting_orders,
                    finishedOrderList: res.data.finish_orders
                })
            },
            fail: function() {
                wx.hideLoading()
                wx.showModal({
                    title: '提示',
                    content: '网络不太畅通，请稍后再试噢',
                    showCancel: false,
                    confirmText: '返回',
                    confirmColor: '#faaf42',
                })
            },
            complete: function() {
                if (that.data.orderList.length==0 && that.data.finishedOrderList.length==0){
                    that.setData({
                        atEndFlag:false,
                        blank:true
                    })
                } else {
                    that.setData({
                        blank:false
                    })
                }
                wx.stopPullDownRefresh() }
        })

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() { //这里list都是append逻辑
        var that = this
        this.setData({
            requestTime: that.data.requestTime + 1
        })
        this.setData({
            pubOrTop: false
        })
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: urlModel.url.getOrdersList, //填充url筛选请求列表
            method: 'GET',
            data: {
                'school_id': app.globalData.schoolID,
                'sessionID': app.globalData.sessionID,
                'request_time': that.data.requestTime
            },
            success: function(res) {
                if (res.data.length == 0) {
                    that.setData({
                        atEndFlag: true
                    })
                } else {
                    if (that.data.orderList) {
                        that.setData({
                            orderList: that.data.orderList.concat(res.data.waiting_orders),
                        })
                    }
                    if (res.data.finish_orders.length != 0) {
                        that.setData({
                            finishedOrderList: that.data.finishedOrderList.concat(res.data.finish_orders)
                        })
                    } else {
                        that.setData({
                            atEndFlag: true
                        })
                    }

                }
            },
            fail: function() {
                wx.showModal({
                    title: '提示',
                    content: '网络不太畅通，请稍后再试噢',
                    showCancel: false,
                    confirmText: '返回',
                    confirmColor: '#faaf42',
                })
            },
            complete: function() {
                wx.hideLoading()
            }
        })

    },
    onPageScroll: function(e) {
        if (e.scrollTop == 0) {
            this.setData({
                pubOrTop: true
            })
        } else {
            this.setData({
                pubOrTop: false
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
    ifCertif: function() {
        if (app.globalData.ourUserStatus == 4) {
            wx.showModal({
                title: '提示',
                content: '请先通过教务系统认证',
                cancelText: '返回',
                confirmText: '前往认证',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        wx.redirectTo({
                            url: '../certifPage/certifPage',
                        })
                    } else {}
                }
            })
        }
    },
    toSumDetail: function(event) {
        if (app.globalData.ourUserStatus == 1) {
            wx.showModal({
                title: '状态异常',
                content: '请前往我的>举报\申诉进度查看',
                confirmColor: '#faaf42',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.switchTab({
                            url: '../my/my'
                        })
                    }
                }
            })
        } else
        if (app.globalData.ourUserStatus == 4) {
            wx.showModal({
                title: '提示',
                content: '请先通过教务系统认证',
                showCancel: false,
                confirmText: '前往认证',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        //console.log('用户点击确定')
                        wx.navigateTo({
                            url: '../certifPage/certifPage',
                        })
                    }
                }
            })
        } else {
            //console.log(event)
            var orderId = event.currentTarget.dataset.orderId;
            //console.log(orderId)
            wx.navigateTo({
                url: "../orderDetailsVeiwer/orderDetailsVeiwer?id=" + orderId
            })
        }
    },
    relogin:function(){
        //重新登陆
        this.onLoad()
    },
    changeSchool: function() {
        wx.navigateTo({
            url: '../changeSchool/changeSchool',
        })
    },
    toTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
        this.setData({
            pubOrTop: true
        })
    },
    toPub: function() {
        wx.switchTab({
            url: '../smartPub/smartPub',
        })
    }
})