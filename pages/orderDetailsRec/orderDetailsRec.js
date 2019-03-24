var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expLogoUrl: '../../images/logo.jpg',
        expOpenTime: '都说了别着急嘛~',
        expStationName: '马上赶来',
        fixIcon: '../../images/fixBtnIcon.png',
        reward: '6',
        //图标类
        finIcon: '../../images/checkLight.png',
        policeIconDim: '../../images/policeDim.png',
        contactIconDim: '../../images/conDim.png',
        contactIcon: '../../images/conIcon.png',
        policeIcon: '../../images/policeLight.png',

        fetchCode: '666666',
        phoneRearIcon: '../../images/numRear.png',
        nameIcon: '../../images/deName.png',
        sizeIcon: '../../images/sizeIcon.png',
        timeIcon: '../../images/timeIcon.png',

        endTime: '00-00 00:00',
        fetchName: '黄牛本牛',
        expSize: '小件',
        phoneRear: '6666',

        sendLocAll: '666号 黄牛之家',
        weightInfo: '<1kg',
        otherInfo: '',
        limit: null,

        pubPhone: '66666666',
        pubQQ:null,
        pubLastName: '黄牛同学',
        pubTime: '00-00 00:00',

        hideStatusBar:false,
        statusCode: null,
        statusName: "",
        statusBgColor: "",
        statusBackWaitMe: "linear-gradient(90deg,#fed25c, #f9a93e)",
        statusBackFinOrRec: "linear-gradient(90deg,#4ED662, #37BD76)",
        statusBackOutofTime: "linear-gradient(90deg,#D6D6D6, #BABABA)",
        orderId: ''
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
    onLoad: function(options) {
        // console.log(options)
        var that = this
        if (options.key == null) {
            that.getOrderInfo(options.id)
        } else {
            //从订单页面来的接口
            that.getOrderInfo(options.id)
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        //刷新信息，同onload函数
        var that = this
        wx.showLoading({
            title: '刷新中',
            mask: true
        })
        wx.request({
            url: urlModel.url.receiverOrderDetail, //填充请求订单具体信息url
            method: 'POST',
            data: {
                'order_id': that.data.orderId,
                'sessionID': app.globalData.sessionID,
                'school_id': app.globalData.schoolID
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        //设置页面参数
                        expLogoUrl: res.data.exp_logo,
                        expOpenTime: res.data.exp_opentime,
                        expStationName: res.data.exp_station,
                        //以上是快递站点信息
                        orderId: res.data.order_id,
                        weightInfo: res.data.exp_weight,
                        reward: res.data.reward,
                        pubLastName: res.data.pub_lname+'同学',
                        pubTime: res.data.pub_time,
                        endTime: res.data.expire_time,
                        fetchName: res.data.exp_name,
                        expSize: res.data.exp_size,
                        phoneRear: res.data.phone_rear,
                        fetchCode: res.data.exp_code,
                        otherInfo: res.data.description,
                        statusCode: res.data.status,
                        sendLocAll: res.data.send_loc,
                        limit:res.data.limit,
                    })
                    if (res.data.pub_phone){
                        that.setData({
                            pubPhone: res.data.pub_phone,
                            pubQQ:res.data.pub_QQ?res.data.pub_QQ:'暂无'
                        })
                        //设置完改变状态条状态
                        that.changeStatusBar()
                    } else {
                        //没有返回隐私信息，隐藏状态栏
                        that.setData({
                            hideStatusBar:true
                        })
                    }
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新成功',
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
                wx.stopPullDownRefresh()
                that.changeStatusBar()
            }
        })
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
            cancelColor: '#999BA1',
            cancelText: '拨打号码',
            success: function(res) {
                if (res.confirm) {
                    wx.setClipboardData({
                            data: that.data.pubPhone,
                        })
                } else if (res.cancel) {
                    wx.makePhoneCall({
                        phoneNumber: that.data.pubPhone
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
            title: '暂未开放',
            content: '程序猿抓紧完善中~~',
            confirmColor: '#faaf42',
            showCancel: false,
            confirmText: '加油吧',
            success: function(res) {
            }
        })
        // wx.showModal({
        //     title: '确定举报？',
        //     content: '请谨慎举报',
        //     confirmText: '确认举报',
        //     confirmColor: '#faaf42',
        //     success: function(res) {
        //         if (res.confirm) {
        //             wx.redirectTo({
        //                 url: '../policeDetailProposal/policeDetailProposal?orderId=' + that.data.orderId + '&pubLastName=' + that.data.pubLastName
        //             })
        //         } else if (res.cancel) {
        //         }
        //     }
        // })
    },
    toFix: function(event) {
        var that = this
        wx.navigateTo({
            url: '../reportExError/reportExError?title=' + that.data.expStationName,
        })
    },
    finOrder: function(event) {
        var that = this
        var formId = event.detail.formId;
        wx.showModal({
            title: '确认送达？',
            content: '确认后，请关注到账通知',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    let send_data = {
                        'order_id': that.data.orderId,
                        'sessionID': app.globalData.sessionID,
                        'next_state': 0,
                        'form_id':formId
                    }
                    wx.request({
                        url: urlModel.url.changeOrderStatus, //填充完成订单url
                        method: 'POST',
                        data: send_data,
                        success: function(res) {
                            if (res.statusCode==200) {
                                wx.showToast({
                                    title: '等待对方确认',
                                    icon: 'success',
                                    duration: 1500
                                })
                                setTimeout(that.onPullDownRefresh,1500)
                            } else {
                                that.onPullDownRefresh()
                            }
                        },
                        fail: function() {},
                        complete: function() {}
                    })
                }
            }
        })
    },
    getOrderInfo:function (orderId) {
        var that = this
        wx.request({
            url: urlModel.url.receiverOrderDetail, //填充请求订单具体信息url
            method: 'POST',
            data: {
                'order_id': orderId,
                'sessionID': app.globalData.sessionID,
                'school_id': app.globalData.schoolID
            },
            success: function(res) {
                console.log('详情',res)
                if (res.statusCode == 200) {
                    that.setData({
                        //设置页面参数
                        expLogoUrl: res.data.exp_logo,
                        expOpenTime: res.data.exp_opentime,
                        expStationName: res.data.exp_station,
                        //以上是快递站点信息
                        orderId: res.data.order_id,
                        weightInfo: res.data.exp_weight,
                        reward: res.data.reward,
                        pubLastName: res.data.pub_lname+'同学',
                        pubTime: res.data.pub_time,
                        endTime: res.data.expire_time,
                        fetchName: res.data.exp_name,
                        expSize: res.data.exp_size,
                        phoneRear: res.data.phone_rear,
                        fetchCode: res.data.exp_code,
                        otherInfo: res.data.description,
                        statusCode: res.data.status,
                        sendLocAll: res.data.send_loc,
                        limit:res.data.limit,
                    })
                    if(res.data.pub_phone){
                        that.setData({
                            pubQQ:res.data.pub_QQ?res.data.pub_QQ:'暂无',
                            pubPhone: res.data.pub_phone,
                        })
                        //设置完改变状态条状态
                        that.changeStatusBar()
                    }else {
                        //没有返回隐私信息，隐藏状态栏
                        that.setData({
                            hideStatusBar:true
                        })
                    }

                }
            },
            fail: function() {},
            complete: function() {
            }
        })
    }
})