var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        exLogo: '../../images/STOLOGO.png',
        exLocTime: '',
        exInstance: '',
        fxIcon: '../../images/fixBtnIcon.png',
        LName: '',
        pubtime: '',
        reward: '',

        finIcon: '../../images/checkLight.png',
        policeTAIcon: '../../images/policeDim.png',
        conTAIcon: '../../images/conDim.png',
        conIcon: '../../images/conIcon.png',
        policeIcon: '../../images/policeLight.png',

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
        exWorry: null,
        phoneNum: '',

        statusCode: null,
        expressID: '',
        orderId: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var that = this
        if (options.key == null) {
            wx.request({
              url: 'http://45.40.197.154/HelloWord/firstpage/havereceiveinfo', //填充请求订单具体信息url
                method: 'GET',
                data: {
                    'orderID': options.id,
                    'user_ID': app.globalData.user_ID,
                },
                header: {
                    "Content-Type": "applciation/json"
                },
                success: function(res) {
                    console.log(res)
                    if (!res.data.reward) {
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
                            exLogo: res.data.exLogo,
                            exLocTime: res.data.exLocTime,
                            exInstance: res.data.exInstance,
                            expressID: res.data.expressID,
                            //以上是快递站点信息
                            orderId: res.data.orderID,
                            sdInstance: res.data.exInstance,
                            exWorry: res.data.exWorry,
                            weightInfo: res.data.weightInfo,
                            reward: res.data.reward,
                            LName: res.data.LName,
                            pubtime: res.data.pubtime,
                            phoneNum: res.data.phoneNum,
                            shiText: res.data.shiText,
                            mingText: res.data.mingText,
                            jianText: res.data.jianText,
                            haoText: res.data.haoText,
                            fetchCode: res.data.fetchCode,
                            otherInfo: res.data.otherInfo,
                            statusCode: res.data.state,
                            sdLoc: res.data.sdLoc


                        })
                    }
                },
                fail: function() {},
                complete: function() {}
            })
        } else {

            //从订单页面来的接口
            wx.request({
              url: 'http://45.40.197.154/HelloWord/getorderinfo/receive', //填充请求订单具体信息url
                method: 'GET',
                data: {
                    'ordNum': options.id,
                    'account': app.globalData.user_ID,
                },
                header: {
                    "Content-Type": "applciation/json"
                },
                success: function(res) {
                    console.log("从订单页面进入发送请求", res)
                    that.setData({
                        //设置页面参数
                        exLogo: res.data.exLogo,
                        exLocTime: res.data.exLocTime,
                        exInstance: res.data.exInstance,
                        expressID: res.data.expressID,
                        //以上是快递站点信息
                        orderId: res.data.orderID,
                        sdInstance: res.data.exInstance,
                        exWorry: res.data.exWorry,
                        weightInfo: res.data.weightInfo,
                        reward: res.data.reward,
                        LName: res.data.LName,
                        pubtime: res.data.pubtime,
                        phoneNum: res.data.phoneNum,
                        shiText: res.data.shiText,
                        mingText: res.data.mingText,
                        jianText: res.data.jianText,
                        haoText: res.data.haoText,
                        fetchCode: res.data.fetchCode,
                        otherInfo: res.data.otherInfo,
                        statusCode: res.data.State,
                        sdLoc: res.data.sdLoc
                    })
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
        // var that = this
        // wx.request({
        //     url: '', //填充请求订单具体信息url
        //     method: 'GET',
        //     data: {
        //         'orderID': that.data.orderID,
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
                    // console.log('用户点击确定')
                } else if (res.cancel) {
                    // console.log('用户点击取消')
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
        //             wx.request({ //更改默认地址，为空的就是没变
        //                 url: 'http://10.2.24.200:8080/HelloWord/getorderinfo/report',
        //                 method: 'POST',
        //                 data: {
        //                     'uidNum': app.globalData.user_ID, //加其他字段
        //                     'ordNum': that.data.orderId
        //                 },
        //                 header: {
        //                     "Content-Type": "application/x-www-form-urlencoded"
        //                 },
        //                 success: function(res) {
        //                     if (res.statusCode == 200) {
        //                         console.log('举报订单生成', res)
        //                         console.log(res.data.reportid)
        //                         wx.redirectTo({
        //                             url: '../policeDetailProposal/policeDetailProposal?id=' + that.data.orderId
        //                         })
        //                     }

        //                 },
        //                 fail: function() {},
        //                 complete: function() {}
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
    finOrder: function() {
        var that = this
        wx.showModal({
            title: '确认送达？',
            content: '对方确认后，赏金就到手啦',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        url: 'http://45.40.197.154/HelloWord/getorderinfo/havesongda', //填充完成订单url
                        method: 'GET',
                        data: {
                            'ordNum': that.data.orderId,
                        },
                        header: {
                            "Content-Type": "applciation/json"
                        },
                        success: function(res) {
                            // console.log("确认送达", res)
                            that.setData({
                                //设置页面参数
                                statusCode: res.data.State,
                            })
                            wx.showToast({
                                title: '等待对方确认',
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

    }

})