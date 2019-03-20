var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expLogoUrl: '../../images/logo.jpg',
        expOpenTime: '都说了别着急嘛~',
        expStationName: '马上就来',
        fixIcon: '../../images/fixBtnIcon.png',
        reward: '6',
        orderId: '',
        finIcon: '../../images/checkLight.png',
        policeIconDim: '../../images/policeDim.png',
        contactIconDim: '../../images/conDim.png',
        contactIcon: '../../images/contactIcon.png',
        policeIcon: '../../images/policeLight.png',
        cancelIcon: "../../images/cancelIcon.png",

        fetchCode: '666',
        phoneRearIcon: '../../images/numRear.png',
        nameIcon: '../../images/deName.png',
        sizeIcon: '../../images/sizeIcon.png',
        timeIcon: '../../images/timeIcon.png',

        endTime: '00-00 00:00',
        fetchName: '老黄牛',
        expSize: '小件',
        phoneRear: '6666',

        sendLocAll: '666号 黄牛之家',
        weightInfo: '<1kg',
        otherInfo: '',
        limit: null,

        receiverName: null,
        receiveTime: null,
        receiverPhone: null,
        receiverQQ: null,

        statusCode: 0,
        statusName: "",
        statusBgColor: "",
        statusBackWaitMe: "linear-gradient(90deg,#fed25c, #f9a93e)",
        statusBackFinOrRec: "linear-gradient(90deg,#4ED662, #37BD76)",
        statusBackOutofTime: "linear-gradient(90deg,#D6D6D6, #BABABA)",
        //为用到，只是记录
        hideStatusBar: false //取消订单后hide
    },

    changeStatusBar:function(){
        //更改状态栏颜色等信息
        var that = this
        if (that.data.statusCode == 0 || that.data.statusCode == 1) {
            that.setData({
                statusBgColor: "linear-gradient(90deg,#fed25c, #f9a93e)",
            })
        } else if (that.data.statusCode == 2 || that.data.statusCode == 3) {
            that.setData({
                statusBgColor: "linear-gradient(90deg,#4ED662, #37BD76)"
            })
        } else if (that.data.statusCode == 4) {
            that.setData({
                statusBgColor: "linear-gradient(90deg,#D6D6D6, #BABABA)"
            })
        } else if (that.data.statusCode == 5 || that.data.statusCode == 6) {
            that.setData({
                statusBgColor: "linear-gradient(90deg,#D6D6D6, #BABABA)"
            })
            //异常也不让用户太糟心
        }


        if (that.data.statusCode == 0) {
            that.setData({
                statusName: "待收货"
            })
        } else if (that.data.statusCode == 1) {
            that.setData({
                statusName: "待接单"
            })
        } else if (that.data.statusCode == 2) {
            that.setData({
                statusName: "待送达"
            })
        } else if (that.data.statusCode == 3) {
            that.setData({
                statusName: "已完成"
            })
        } else if (that.data.statusCode == 4) {
            that.setData({
                statusName: "已过期"
            })
        } else if (that.data.statusCode == 5 || that.data.statusCode == 6) {
            that.setData({
                statusName: "异常"
            })
            //异常也不让用户太糟心
        }
    },

    copyQQ:function(){
        //复制QQ号
        var that = this
        wx.setClipboardData({
            data: that.data.receiverQQ,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { //要复制到下拉刷新中去
        // console.log(options)
        var that = this
        wx.request({
            url: urlModel.url.publisherOrderDetail, //填充请求订单具体信息url
            method: 'POST',
            data: {
                'order_id': options.id,
                'sessionID': app.globalData.sessionID,
                'school_id': app.globalData.schoolID
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                // console.log("onload", res)
                var tdata = res.data
                that.setData({
                    //设置页面参数，设置orderID
                    statusCode: tdata.state,
                    limit: tdata.limit,
                    expLogoUrl: tdata.exp_logo,
                    expOpenTime: '营业时间：' + tdata.exp_opentime,
                    reward: tdata.reward,
                    endTime: tdata.expire_time,
                    fetchCode: tdata.exp_code,
                    expStationName: tdata.exp_station,
                    phoneRear: tdata.phone_rear,
                    expSize: tdata.exp_size,
                    recName: tdata.exp_name,
                    otherInfo: tdata.description,
                    sendLocAll: tdata.send_loc,
                    weightInfo: tdata.weight,
                })
                if (tdata.rtime != '') {
                    that.setData({
                        receiveTime: '接单时间：' + tdata.rec_time,
                        receiverName: tdata.username + '同学 ' + tdata.school_numb,
                        receiverPhone: tdata.phone
                    })
                } else {
                    that.setData({
                        receiveTime: '若是自己取快递，记得帮别人领噢',
                        receiverName: '暂无'
                    })
                }
            },
            fail: function() {},
            complete: function() {
                that.changeStatusBar()
            }
        })
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
        var that = this
            //刷新当前状态，可直接使用获取订单信息接口
            //todo 防止恶意刷新，设置loading蒙层
            // var that = this
        wx.showLoading({
            title: '刷新中',
            mask: true
        })
        wx.request({
            url: urlModel.url.publisherOrderDetail, //填充请求订单具体信息url
            method: 'POST',
            data: {
                // 'ordNum': options.id,
                'order_id': that.data.orderId,
                'sessionID': app.globalData.sessionID,
                'school_id': app.globalData.schoolID

                // 'sessionID': app.globalData.sessionID,
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                wx.stopPullDownRefresh()
                // console.log("onPullDownRefresh", res)
                if (res.statusCode == 200) {
                    var tdata = res.data
                    that.setData({
                        //设置页面参数，设置orderID
                        statusCode: tdata.status,
                        urgent: tdata.urgent,
                        expressId: tdata.expressId,
                        expLogoUrl: tdata.expLogoUrl,
                        expOpenTime: '营业时间：' + tdata.expOpenTime,
                        reward: tdata.reward,
                        endTime: tdata.endTime,
                        fetchCode: tdata.fetchCode,
                        expStationName: tdata.expStationName,
                        orderId: tdata.orderId,
                        phoneRear: tdata.phoneRear,
                        expSize: tdata.expSize,
                        recName: tdata.recName,
                        otherInfo: tdata.otherInfo,
                        sendLocAll: tdata.sendLocAll,
                        weightInfo: tdata.weightInfo,
                    })
                    if (tdata.rtime) {
                        that.setData({
                            receiveTime: '接单时间：' + tdata.rtime,
                            receiverName: tdata.Uname + '同学 ' + tdata.Uid,
                            receiverPhone: tdata.phone
                        })
                    } else {
                        that.setData({
                            receiveTime: '若是自己取快递，记得帮别人领噢',
                            receiverName: '暂无'
                        })
                    }
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新成功',
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
            complete: function() {
                that.changeStatusBar()
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
        // var that = this
        wx.showModal({
            title: '请谨慎举报',
            content: '遇以下情况可举报用户：\r\n1、快递被接单者领走但未被送达；\r\n2、快递被接单者损坏；\r\n3、接单者送达后未收到酬劳；\r\n4、接单者送达后收到的酬劳少于接单前商定的酬劳；\r\n5、其他损害用户利益的行为。\r\n我们将视情况给予违规用户处罚。',
            confirmColor: '#faaf42',
            showCancel: false,
            confirmText: '知道了',
            success: function(res) {
                // if (res.confirm) {
                //     console.log('用户点击确定')
                // } else if (res.cancel) {
                // console.log('用户点击')
                // }
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
                            url: '../policeDetailProposal/policeDetailProposal?orderId=' + that.data.orderId + '&pubLastName=' + that.data.receiverName
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
            // wx.showModal({
            //     title: '敬请期待',
            //     content: '攻城狮加紧完善中',
            //     confirmColor: '#faaf42',
            //     showCancel: false,
            //     confirmText: '期待噢',
            //     success: function(res) {
            //         if (res.confirm) {}
            //     }
            // })

    },
    finOrder: function() {
        var that = this
        wx.showModal({
            title: '确认',
            content: '确认收货后,请自觉支付赏金噢！',
            confirmText: '好的',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    // console.log('用户点击确定')
                    wx.request({
                        url: urlModel.url.changeOrderStatus, //填充完成订单url
                        method: 'POST',
                        data: {
                            'orderId': that.data.orderId,
                            'userID': app.globalData.sessionID,
                            'nextState': 3
                        },
                        // h
                        // header: {
                        //     "Content-Type": "applciation/json"
                        // },
                        success: function(res) {
                            // console.log(res)
                            if (res.data.msg == 'ok') {
                                that.setData({
                                    //设置页面参数
                                    statusCode: res.data.State,
                                })
                                wx.showToast({
                                    title: '请支付',
                                    icon: 'success',
                                    duration: 1000,
                                    success: function() {
                                        wx.navigateTo({
                                            url: '../pay/pay?orderId=' + that.data.orderId,
                                        })
                                    }
                                })
                            } else {
                                wx.showToast({
                                    title: '请重试',
                                    icon: 'none',
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


    },
    cancelOrder: function() {
        var that = this
        wx.showModal({
            title: '确定取消？',
            content: '建议取消前先联系对方',
            confirmText: '确认取消',
            cancelText: '再想想',
            cancelColor: '#faaf42',
            confirmColor: '#999ba1',
            success: function(res) {
                if (res.confirm) {
                    // console.log('用户点击确定')
                    wx.request({
                        url: urlModel.url.changeOrderStatus, //填充完成订单url
                        method: 'POST',
                        data: {
                            'orderId': that.data.orderId,
                            'userID': app.globalData.sessionID,
                            'nextState': 4
                                //4为过期或取消状态
                        },
                        // header: {
                        //     "Content-Type": "application/x-www-form-urlencoded"
                        // },
                        success: function(res) {
                            // console.log('取消', res)
                            if (res.statusCode == 200 && res.data.msg == 'ok') {
                                that.setData({
                                    //设置页面参数，设置orderID
                                    statusCode: res.data.State,
                                    hideStatusBar: true,
                                })
                                wx.showToast({
                                    title: '取消成功',
                                    icon: 'success',
                                    duration: 1000
                                })
                                that.onPullDownRefresh()
                                    // setTimeout(function() {}, 500);
                                    // wx.switchTab({
                                    //     url: '../orders/orders'
                                    // })
                            } else {
                                wx.showToast({
                                    title: '取消失败，请重试',
                                    icon: 'none',
                                    success: function() {
                                        that.onPullDownRefresh()
                                    }
                                })
                            }

                        },
                        fail: function() {},
                        complete: function() {
                            if (that.data.statusCode == 4) {
                                that.setData({
                                    statusBgColor: "linear-gradient(90deg,#D6D6D6, #BABABA)",
                                    statusName: "已过期"
                                })
                            }
                        }
                    })
                }
            }
        })




    },
    toPay: function() {
        var that = this
        wx.navigateTo({
            url: '../pay/pay?orderId=' + that.data.orderId,
        })
    }
})