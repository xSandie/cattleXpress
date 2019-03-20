var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expLogoUrl: '../../images/logo.jpg',
        expOpenTime: '',
        expStationName: '',
        fixIcon: '../../images/fixBtnIcon.png',
        pubLastName: '',
        pubTime: '',
        reward: '',
        //图标类
        finIcon: '../../images/checkLight.png',
        policeIconDim: '../../images/policeDim.png',
        contactIconDim: '../../images/conDim.png',
        contactIcon: '../../images/contactIcon.png',
        policeIcon: '../../images/policeLight.png',

        fetchCode: '',
        phoneRearIcon: '../../images/numRear.png',
        nameIcon: '../../images/deName.png',
        sizeIcon: '../../images/sizeIcon.png',
        timeIcon: '../../images/timeIcon.png',

        endTime: '',
        recName: '',
        expSize: '',
        phoneRear: '',

        sendLocAll: '',
        weightInfo: '',
        otherInfo: '',
        urgent: null,
        receiverPhone: '',

        statusCode: null,
        expressId: '',
        orderId: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        var that = this
        if (options.key == null) {
            wx.request({
                url: urlModel.url.receiverOrderDetail, //填充请求订单具体信息url
                method: 'POST',
                data: {
                    'orderId': options.id,
                    'userID': app.globalData.sessionID,
                    'schoolID': app.globalData.schoolID
                },
                success: function(res) {
                    // console.log(res)
                    if (!res.data.orderId) {
                        wx.showToast({
                            title: '订单被别人抢啦',
                            icon: 'none',
                            duration: 1000,
                            success: function() {
                                setTimeout(function() {
                                    wx.switchTab({
                                        url: '../home/home',
                                    })
                                }, 1000);
                            }
                        })
                    } else {
                        that.setData({
                            //设置页面参数
                            expLogoUrl: res.data.expLogoUrl,
                            expOpenTime: res.data.expOpenTime,
                            expStationName: res.data.expStationName,
                            expressId: res.data.expressId,
                            //以上是快递站点信息
                            orderId: res.data.orderId,
                            sdInstance: res.data.expStationName,
                            urgent: res.data.urgent,
                            weightInfo: res.data.weightInfo,
                            reward: res.data.reward,
                            pubLastName: res.data.pubLastName,
                            pubTime: res.data.pubTime,
                            receiverPhone: res.data.receiverPhone,
                            endTime: res.data.endTime,
                            recName: res.data.recName,
                            expSize: res.data.expSize,
                            phoneRear: res.data.phoneRear,
                            fetchCode: res.data.fetchCode,
                            otherInfo: res.data.otherInfo,
                            statusCode: res.data.State,
                            sendLocAll: res.data.sendLocAll
                        })
                    }
                },
                fail: function() {},
                complete: function() {}
            })
        } else {

            //从订单页面来的接口
            wx.request({
                url: urlModel.url.receiverOrderDetail, //填充请求订单具体信息url
                method: 'POST',
                data: {
                    'orderId': options.id,
                    'userID': app.globalData.sessionID,
                    'schoolID': app.globalData.schoolID
                },
                // header: {
                //     "Content-Type": "applciation/json"
                // },
                success: function(res) {
                    // console.log("从订单页面进入发送请求", res)
                    if (res.statusCode == 200) {
                        that.setData({
                            //设置页面参数
                            expLogoUrl: res.data.expLogoUrl,
                            expOpenTime: res.data.expOpenTime,
                            expStationName: res.data.expStationName,
                            expressId: res.data.expressId,
                            //以上是快递站点信息
                            orderId: res.data.orderId,
                            sdInstance: res.data.expStationName,
                            urgent: res.data.urgent,
                            weightInfo: res.data.weightInfo,
                            reward: res.data.reward,
                            pubLastName: res.data.pubLastName,
                            pubTime: res.data.pubTime,
                            receiverPhone: res.data.receiverPhone,
                            endTime: res.data.endTime,
                            recName: res.data.recName,
                            expSize: res.data.expSize,
                            phoneRear: res.data.phoneRear,
                            fetchCode: res.data.fetchCode,
                            otherInfo: res.data.otherInfo,
                            statusCode: res.data.State,
                            sendLocAll: res.data.sendLocAll
                        })
                    }

                },
                fail: function() {},
                complete: function() {}
            })
        }
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
        //刷新信息，同onload函数
        //todo 防止恶意刷新，设置loading蒙层
        var that = this
        wx.showLoading({
            title: '刷新中',
            mask: true
        })
        wx.request({
            url: urlModel.url.receiverOrderDetail, //填充请求订单具体信息url
            method: 'POST',
            data: {
                'orderId': that.data.orderId,
                'userID': app.globalData.sessionID,
                'schoolID': app.globalData.schoolID
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                // console.log('下拉刷新')
                if (res.statusCode == 200) {
                    that.setData({
                        //设置页面参数
                        expLogoUrl: res.data.expLogoUrl,
                        expOpenTime: res.data.expOpenTime,
                        expStationName: res.data.expStationName,
                        expressId: res.data.expressId,
                        //以上是快递站点信息
                        orderId: res.data.orderId,
                        sdInstance: res.data.expStationName,
                        urgent: res.data.urgent,
                        weightInfo: res.data.weightInfo,
                        reward: res.data.reward,
                        pubLastName: res.data.pubLastName,
                        pubTime: res.data.pubTime,
                        receiverPhone: res.data.receiverPhone,
                        endTime: res.data.endTime,
                        recName: res.data.recName,
                        expSize: res.data.expSize,
                        phoneRear: res.data.phoneRear,
                        fetchCode: res.data.fetchCode,
                        otherInfo: res.data.otherInfo,
                        statusCode: res.data.State,
                        sendLocAll: res.data.sendLocAll
                    })
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新完成',
                        duration: 2000
                    })
                } else {
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
    conTA: function() {
        var that = this
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
                        // wx.showToast({
                        //     title: '号码已复制',
                        //     icon: 'success'
                        // })

                } else if (res.cancel) {
                    // console.log('用户点击取消')
                    wx.makePhoneCall({
                        phoneNumber: that.data.receiverPhone //仅为示例，并非真实的电话号码
                    })
                }
            }
        })
    },
    toLaw: function() {
        wx.showModal({
            title: '请谨慎举报',
            content: '遇以下情况可举报用户：\r\n1、快递被接单者领走但未被送达；\r\n2、快递被接单者损坏；\r\n3、接单者送达后未收到酬劳；\r\n4、接单者送达后收到的酬劳少于接单前商定的酬劳；\r\n5、其他损害用户利益的行为。\r\n我们将视情况给予违规用户处罚。',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    // console.log('用户点击确定')
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        })
    },
    policeTA: function() {
        var that = this
        wx.showModal({
            title: '确定举报？',
            content: '请谨慎举报',
            confirmText: '确认举报',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    // console.log('用户点击确定')
                    wx.redirectTo({
                        url: '../policeDetailProposal/policeDetailProposal?orderId=' + that.data.orderId + '&pubLastName=' + that.data.pubLastName
                    })
                } else if (res.cancel) {
                    // console.log('用户点击取消')
                }
            }
        })
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

    },
    finOrder: function() {
        var that = this
        wx.showModal({
            title: '确认送达？',
            content: '确认后，请关注到账通知',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        url: urlModel.url.changeOrderStatus, //填充完成订单url
                        method: 'POST',
                        data: {
                            'orderId': that.data.orderId,
                            'userID': app.globalData.sessionID,
                            'nextState': 0
                        },
                        // header: {
                        //     "Content-Type": "applciation/json"
                        // },
                        success: function(res) {
                            // console.log("确认送达", res)
                            if (res.data.msg == 'ok') {
                                that.setData({
                                    //设置页面参数
                                    statusCode: res.data.State,
                                    //考虑返回发布人昵称，
                                })
                                wx.showToast({
                                    title: '等待对方确认',
                                    icon: 'success',
                                    duration: 1500
                                })
                            } else {
                                wx.showToast({
                                    title: '出错，请重试',
                                    icon: 'none',
                                    duration: 1500,
                                    success: function() {
                                        that.onPullDownRefresh()
                                    }
                                })
                            }
                        },
                        fail: function() {},
                        complete: function() {}
                    })
                }
            }
        })

    }

})