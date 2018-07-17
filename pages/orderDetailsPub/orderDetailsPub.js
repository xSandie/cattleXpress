var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

        exLogo: '',
        exLocTime: '',
        exInstance: '',
        fxIcon: '../../images/fixBtnIcon.png',
        LName: '',
        pubtime: '',
        reward: '',
        expressID: '',
        orderID: '',
        finIcon: '../../images/checkLight.png',
        policeTAIcon: '../../images/policeDim.png',
        conTAIcon: '../../images/conDim.png',
        conIcon: '../../images/conIcon.png',
        policeIcon: '../../images/policeLight.png',
        cancelIcon: "../../images/cancelIcon.png",

        fetchCode: '',
        haoIcon: '../../images/numRear.png',
        mingIcon: '../../images/deName.png',
        jianIcon: '../../images/sizeIcon.png',
        shiIcon: '../../images/timeIcon.png',

        shiText: '',
        mingText: '',
        jianText: '',
        haoText: '',

        sdLoc: '',
        weightInfo: '',
        otherInfo: '',
        exWorry: '',

        reName: null,
        reTime: null,
        phoneNum: null,

        statusCode: 0,
        status: "",
        statusBack: "",
        statusBackWaitMe: "linear-gradient(90deg,#fed25c, #f9a93e)",
        statusBackFinOrRec: "linear-gradient(90deg,#4ED662, #37BD76)",
        statusBackOutofTime: "linear-gradient(90deg,#D6D6D6, #BABABA)",
        hideStatus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { //要复制到下拉刷新中去
        console.log(options)
        var that = this
        wx.request({
            url: 'http://45.40.197.154/HelloWord/getorderinfo/publish', //填充请求订单具体信息url
            method: 'GET',
            data: {
                'ordNum': options.id,
                // 'user_ID': app.globalData.user_ID,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                console.log("onload", res)
                var tdata = res.data
                that.setData({
                    //设置页面参数，设置orderID
                    statusCode: tdata.state,
                    exWorry: tdata.exWorry,
                    expressID: tdata.expressID,
                    exLogo:tdata.exLogo,
                    exLocTime: '营业时间：' + tdata.exLocTime,
                    reward: tdata.reward,
                    shiText: tdata.shiText,
                    fetchCode: tdata.fetchCode,
                    pubtime: tdata.pubtime,
                    exInstance: tdata.exInstance,
                    orderID: options.id,
                    haoText: tdata.haoText,
                    jianText: tdata.jianText,
                    mingText: tdata.mingText,
                    otherInfo: tdata.otherInfo,
                    sdLoc: tdata.sdLoc,
                    weightInfo: tdata.weightInfo,
                })
                if (tdata.rtime) {
                    that.setData({
                        reTime: '接单时间：' + tdata.rtime,
                        reName: tdata.Uname + ' ' + tdata.Uid,
                        phoneNum: tdata.phone
                    })
                } else {
                    that.setData({
                        reTime: '若是自己取快递，记得帮别人领噢',
                        reName: '暂无'
                    })
                }
            },
            fail: function() {},
            complete: function() {
                if (that.data.statusCode == 0 || that.data.statusCode == 1) {
                    that.setData({
                        statusBack: "linear-gradient(90deg,#fed25c, #f9a93e)",
                    })
                } else if (that.data.statusCode == 2 || that.data.statusCode == 3) {
                    that.setData({
                        statusBack: "linear-gradient(90deg,#4ED662, #37BD76)"
                    })
                } else if (that.data.statusCode == 4) {
                    that.setData({
                        statusBack: "linear-gradient(90deg,#D6D6D6, #BABABA)"
                    })
                } else if (that.data.statusCode == 5 || that.data.statusCode == 6) {
                    that.setData({
                            statusBack: "linear-gradient(90deg,#D6D6D6, #BABABA)"
                        })
                        //异常也不让用户太糟心
                }


                if (that.data.statusCode == 0) {
                    that.setData({
                        status: "待收货"
                    })
                } else if (that.data.statusCode == 1) {
                    that.setData({
                        status: "待接单"
                    })
                } else if (that.data.statusCode == 2) {
                    that.setData({
                        status: "待送达"
                    })
                } else if (that.data.statusCode == 3) {
                    that.setData({
                        status: "已完成"
                    })
                } else if (that.data.statusCode == 4) {
                    that.setData({
                        status: "已过期"
                    })
                } else if (that.data.statusCode == 5 || that.data.statusCode == 6) {
                    that.setData({
                            status: "异常"
                        })
                        //异常也不让用户太糟心
                }
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
        // var that = this
        // wx.request({
        //     url: '', //填充请求订单具体信息url
        //     method: 'GET',
        //     data: {
        //         'orderID': that.orderID,
        //         'user_ID': app.globalData.user_ID,
        //     },
        //     header: {
        //         "Content-Type": "applciation/json"
        //     },
        //     success: function(res) {
        //         that.setData({
        //             //设置页面参数，设置orderID
        //         })
        //     },
        //     fail: function() {},
        //     complete: function() {}
        // })
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

    },
    toFix: function(event) {
        // var expressID = event.currentTarget.dataset.expressId
        // console.log(expressID)
        // wx.navigateTo({
        //     url: '../reportExError/reportExError?id=' + expressID,
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
        wx.makePhoneCall({
            phoneNumber: this.data.phoneNum //仅为示例，并非真实的电话号码
        })
    },
    toLaw: function() {
        wx.showModal({
            title: '请谨慎举报',
            content: '遇以下情况可举报用户：\r\n1、快递被接单者领走但未被送达；\r\n2、快递被接单者损坏；\r\n3、接单者送达后未收到酬劳；\r\n4、接单者送达后收到的酬劳少于接单前商定的酬劳；\r\n5、其他损害用户利益的行为。\r\n我们将视情况给予违规用户处罚。',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    policeTA: function(event) {
        // var that = this
        // wx.showModal({
        //     title: '确定举报？',
        //     content: '请谨慎举报',
        //     confirmText: '确认举报',
        //     confirmColor: '#faaf42',
        //     success: function(res) {
        //         if (res.confirm) {
        //             console.log('用户点击确定')
        //             wx.redirectTo({
        //                 url: '../policeDetailProposal/policeDetailProposal?id=' + that.data.expressID
        //             })
        //         } else if (res.cancel) {
        //             console.log('用户点击取消')
        //         }
        //     }
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
            title: '确认',
            content: '确认收货后赏金就自动给对方了噢！',
            confirmText: '好的',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.request({
                      url: 'http://45.40.197.154/HelloWord/getorderinfo/queren', //填充完成订单url
                        method: 'GET',
                        data: {
                          'ordNum': that.data.orderID
                            // 'user_ID': app.globalData.user_ID,
                        },
                        header: {
                            "Content-Type": "applciation/json"
                        },
                        success: function(res) {
                          console.log(res)
                            that.setData({
                                //设置页面参数
                              statusCode: res.data.State,
                            })
                            wx.showToast({
                                title: '已完成',
                                icon: 'success',
                                duration: 1000
                            })
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
                    console.log('用户点击确定')
                    wx.request({
                        url: 'http://45.40.197.154/HelloWord/getorderinfo/quxiao', //填充取消订单
                        method: 'POST',
                        data: {
                            'ordNum': that.data.orderID,
                            'uidNum': app.globalData.user_ID
                        },
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: function(res) {
                            console.log('取消', res)
                            if (res.statusCode == 200) {
                                that.setData({
                                    //设置页面参数，设置orderID
                                    statusCode: res.data,
                                    hideStatus: true
                                })
                                wx.showToast({
                                    title: '已完成',
                                    icon: 'success',
                                    duration: 1000
                                })
                                setTimeout(function() {}, 500);
                                wx.switchTab({
                                    url: '../orders/orders'
                                })
                            }

                        },
                        fail: function() {},
                        complete: function() {
                            if (that.data.statusCode == 4) {
                                that.setData({
                                    statusBack: "linear-gradient(90deg,#D6D6D6, #BABABA)",
                                    status: "已过期"
                                })
                            }
                        }
                    })
                }
            }
        })




    }
})