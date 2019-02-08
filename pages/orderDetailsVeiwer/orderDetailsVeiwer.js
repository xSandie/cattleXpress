var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expLogoUrl: '',
        expOpenTime: '',
        expStationName: '',
        fixIcon: '../../images/fixBtnIcon.png',

        contactIcon: '../../images/checkLight.png',
        sdInstance: '',

        urgent: null,
        expWeight: '',
        expSize: '',
        endTime: '',

        expDescript: '',

        reward: '',
        // schNum: ''暂时没有用上学号,
        pubLastName: '',
        pubTime: '',
        orderId: '',
        receiverPhone: '',

        expressId: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        // console.log(options.id);

        var that = this
        wx.request({
            url: urlModel.url.toOrderSum, //填充请求浏览者订单详情url
            method: 'GET',
            data: {
                'orderId': options.id,
                'userID': app.globalData.sessionID, //为以后埋点做准备
                'schoolID': app.globalData.schoolID
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                // console.log(res)
                if (res.data.can_get == true) {
                    that.setData({
                        //设置页面参数
                        expLogoUrl: res.data.expLogoUrl,
                        expOpenTime: res.data.expOpenTime,
                        expStationName: res.data.expStationName,
                        expressId: res.data.expressId,
                        //以上是快递站点信息
                        orderId: res.data.orderId,
                        sdInstance: res.data.sdInstance,
                        urgent: res.data.urgent,
                        expWeight: res.data.expWeight,
                        expSize: res.data.expSize,
                        endTime: res.data.endTime,
                        reward: res.data.reward,
                        // schNum: res.data.schNum,
                        pubLastName: res.data.pubLastName,
                        pubTime: res.data.pubTime,
                        receiverPhone: res.data.receiverPhone,
                        expDescript: res.data.expDescript
                    })
                } else {
                    wx.showToast({
                        title: '抱歉，订单已经被抢啦~',
                        icon: 'none',
                        success: function() {
                            wx.switchTab({
                                url: '../home/home',
                            })
                        }
                    })
                }

            },
            fail: function() {},
            complete: function() {}
        })

        // console.log("ok")//会先执行ok再等到收到数据执行success
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
    /**
     * 接单按钮按下
     */
    recOrder: function(event) {
        if (!app.globalData.havePayCode) {
            //未设置paycode
            wx.showModal({
                title: '设置收款二维码',
                content: '暂不可接单，请前往设置收款二维码',
                confirmColor: '#faaf42',
                confirmText: '去设置',
                success: function(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '../myCode/myCode',
                        })
                    }
                }
            })
        } else if (app.globalData.haveCertif == true) {
            var orderId = event.currentTarget.dataset.orderId;
            wx.showModal({
                title: '确认接单',
                content: '接单后要准时送达噢',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        //接单动作
                        wx.request({
                            url: urlModel.url.recOrder, //订单动作接口
                            method: 'GET',
                            data: {
                                'orderId': orderId,
                                'userID': app.globalData.sessionID,
                                'nextStat': 2
                            },
                            success: function(res) {
                                // console.log(event)
                                // console.log(orderId)

                                if (res.data.can_get == true) {
                                    wx.redirectTo({
                                        url: "../orderDetailsRec/orderDetailsRec?id=" + orderId
                                    })
                                } else if (res.data.without_addr) {
                                    wx.showModal({
                                        title: '补全资料',
                                        content: '缺少默认联系电话',
                                        cancelText: '下次再说',
                                        confirmText: '去填写',
                                        confirmColor: '#f9a93e',
                                        success: function(res) {
                                            if (res.confirm) {
                                                wx.navigateTo({
                                                    url: '../defAddrEdit/defAddrEdit?path=haveCertif'
                                                })
                                            }
                                        }
                                    })
                                } else {
                                    wx.showModal({
                                        title: '来晚一步',
                                        content: '抱歉，订单已经被抢啦~',
                                        showCancel: false,
                                        confirmColor: '#f9a93e',
                                        confirmText: '返回',
                                        success: function() {
                                            wx.switchTab({
                                                url: '../home/home',
                                            })
                                        }
                                    })
                                }

                            },
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        }

    },
    conTA: function() {
        var that = this
        if (app.globalData.haveCertif == false) {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showModal({
                title: '发短信还是拨打电话？',
                content: '选择 发送短信 将复制号码，请自行粘贴并发送短信。',
                confirmColor: '#faaf42',
                confirmText: '发送短信',
                cancelColor: '#faaf42',
                cancelText: '拨打号码',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.setClipboardData({
                                data: that.data.receiverPhone,
                            })
                            //   wx.showToast({
                            //     title: '号码已复制',
                            //     icon:'success'
                            //   })

                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                        wx.makePhoneCall({
                            phoneNumber: that.data.receiverPhone //仅为示例，并非真实的电话号码
                        })
                    }
                }
            })

        }
    },
    toFix: function(event) {
        // var expressId = event.currentTarget.dataset.expressId
        // console.log(expressId)
        // wx.navigateTo({
        //     url: '../reportExError/reportExError?id=' + expressId,
        // })
        wx.showModal({
            title: '敬请期待',
            content: '攻城狮加紧完善中',
            confirmColor: '#faaf42',
            showCancel: false,
            confirmText: '期待噢',
            success: function(res) {
                if (res.confirm) {}
            }
        })
    }
})