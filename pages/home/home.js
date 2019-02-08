var app = getApp();
const urlModel = require('../../utils/urlSet.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ads: ['../../images/banner.png', '../../images/banner.png'], //广告banner图片地址

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

        // expressLocArray: [],
        // expFirstIndex: 0,
        // expSecondIndex: 0,

        // sendLocArray: [],
        // sendLocIndex: [0, 0],
        // sendLocFirstIndex: 0,
        // sendLocSecondIndex: 0,
        // dormArea: [],
        // teachArea: [],
        // otherArea: [],
        // transCampus: [],
        requestTime: 1,
        atEndFlag: false,
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
            wx.showLoading({
                title: '装填订单',
                mask: true
            })
            that.setData({
                    schoolName: app.globalData.schoolName,
                })
                // console.log('onload', app.globalData.schoolName)
                // console.log('onload', app.globalData.sex)
                // console.log('onloadmy', that.data.schoolName)
                //TODO:即将废弃
                // var send_sendLoc = ''
                // var send_expressLoc = ''
                // if (that.data.expressLoc == '选择取快递的站点') {
                //     send_expressLoc = ''
                // }
                // if (that.data.sendLocSelect == '选择快递送达地点') {
                //     send_sendLoc = ''
                // }

            var send_data = {
                'school_id': app.globalData.schoolID,
                'sessionID': app.globalData.sessionID,
                'request_time': 1
            }
            wx.request({
                url: urlModel.url.getOrdersList, //请求首页订单列表
                method: 'GET',
                data: send_data,
                success: function(res) {
                    console.log(res)
                    that.setData({
                        orderList: res.data.waiting_orders,
                        finishedOrderList: res.data.finish_orders
                    })

                },
                fail: function() {},
                complete: function() { wx.hideLoading() }
            })

        })
        setTimeout(that.setAvatar, 6000)

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
        var that = this
        that.setData({
                schoolName: app.globalData.schoolName
            })
            // if (app.globalData.sys_status == 0) {
            //     that.setData({
            //         tongzhi: false,
            //         // tongzhiContent: app.globalData.msg_con,
            //         // tongzhiSum: app.globalData.msg_title
            //     })
            // } else if (app.globalData.sys_status == 1) {
            //     //有通知
            //     that.setData({
            //         tongzhi: true,
            //         tongzhiContent: app.globalData.msg_con,
            //         tongzhiSum: app.globalData.msg_title
            //     })
            // }

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
            // console.log("refresh")
        this.setData({
            pubOrTop: true,
            schoolName: app.globalData.schoolName,
            requestTime: 1
        })
        var that = this

        //两个筛选条件都选了
        wx.request({
            url: urlModel.url.getOrdersList,
            //填充url筛选请求列表
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
            complete: function() { wx.stopPullDownRefresh() }
        })

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() { //这里list都是append逻辑
        wx.showLoading({
                title: '加载中',
                mask: true
            })
            // console.log("到底了")
        var that = this
        this.setData({
                requestTime: that.data.requestTime + 1
            })
            // console.log(this.data.requestTime)
        this.setData({
            pubOrTop: false
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
            // if (e.scrollTop == 1500){
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

    // /**
    //  * 设置地点框里显示的值
    //  */
    // exlocChange: function(e) {
    //     //console.log(e);
    //     //console.log('picker发送选择改变，携带值为', e.detail.value)
    //     var selected = this.data.expressLocArray[0][this.data.expFirstIndex] + '·' + this.data.expressLocArray[1][this.data.expSecondIndex]
    //     this.setData({
    //         expressLoc: selected
    //     })
    //     var that = this
    //         //发起筛选快递站点请求
    //     var send_sendLoc = that.data.sendLocSelect
    //     var send_expressLoc = that.data.expressLoc
    //     if (send_expressLoc == '选择取快递的站点') {
    //         send_expressLoc = ''
    //     }
    //     if (send_sendLoc == '选择快递送达地点') {
    //         send_sendLoc = ''
    //     }

    //     var send_data = {
    //         'schoolID': app.globalData.schoolID,
    //         'userID': app.globalData.sessionID,
    //         'exloc': send_expressLoc,
    //         'sdloc': send_sendLoc,
    //         'sex': app.globalData.sex,
    //         'endTime': 1
    //     }
    //     var that = this
    //     wx.request({
    //         url: urlModel.url.getOrdersList, //填充url筛选请求列表
    //         method: 'GET',
    //         data: send_data,
    //         // header: {
    //         //     "Content-Type": "applciation/json"
    //         // },
    //         success: function(res) {
    //             // console.log(res)
    //             that.setData({
    //                 orderList: res.data
    //             })
    //         },
    //         fail: function() {
    //             wx.showModal({
    //                 title: '提示',
    //                 content: '网络不太畅通，请稍后再试噢',
    //                 showCancel: false,
    //                 confirmText: '返回',
    //                 confirmColor: '#faaf42',
    //             })
    //         },
    //         complete: function() {}
    //     })
    //     this.setData({
    //         requestTime: 1
    //     })
    // },
    // sdlocChange: function(e) {
    //     var that = this
    //         //console.log(e);
    //         //console.log('picker发送选择改变，携带值为', e.detail.value)
    //     var selected = this.data.sendLocArray[0][this.data.sendLocIndex[0]] + '·' + this.data.sendLocArray[1][this.data.sendLocIndex[1]]
    //     this.setData({
    //             sendLocSelect: selected
    //         })
    //         //发起筛选送达地点请求
    //     var that = this
    //     var send_sendLoc = that.data.sendLocSelect
    //     var send_expressLoc = that.data.expressLoc
    //     if (send_expressLoc == '选择取快递的站点') {
    //         send_expressLoc = ''
    //     }
    //     if (send_sendLoc == '选择快递送达地点') {
    //         send_sendLoc = ''
    //     }

    //     var send_data = {
    //         'schoolID': app.globalData.schoolID,
    //         'userID': app.globalData.sessionID,
    //         'exloc': send_expressLoc,
    //         'sdloc': send_sendLoc,
    //         'sex': app.globalData.sex,
    //         'endTime': 1
    //     }
    //     wx.request({
    //         url: urlModel.url.getOrdersList, //填充url筛选请求列表
    //         method: 'GET',
    //         data: send_data,
    //         // header: {
    //         //     "Content-Type": "applciation/json"
    //         // },
    //         success: function(res) {
    //             //console.log(res)
    //             that.setData({
    //                 orderList: res.data
    //             })
    //         },
    //         fail: function() {
    //             wx.showModal({
    //                 title: '提示',
    //                 content: '网络不太畅通，请稍后再试噢',
    //                 showCancel: false,
    //                 confirmText: '返回',
    //                 confirmColor: '#faaf42',
    //             })
    //         },
    //         complete: function() {}
    //     })
    //     this.setData({
    //         requestTime: 1 //设置逻辑有误，再调整
    //     })
    // },
    // exlocColumnChange: function(e) {
    //     //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    //     if (e.detail.column == 0) {
    //         this.setData({
    //             expFirstIndex: e.detail.value
    //         })
    //     } else {
    //         this.setData({
    //             expSecondIndex: e.detail.value
    //         })
    //     }
    // },
    // sdlocColumnChange: function(e) {
    //     //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    //     var data = {
    //         sendLocArray: this.data.sendLocArray,
    //         sendLocIndex: this.data.sendLocIndex
    //     }
    //     data.sendLocIndex[e.detail.column] = e.detail.value;
    //     switch (e.detail.column) {
    //         case 0:
    //             switch (data.sendLocIndex[0]) {
    //                 case 0:
    //                     data.sendLocArray[1] = this.data.dormArea;
    //                     //console.log(data.sendLocArray[1])
    //                     break;

    //                 case 1:
    //                     data.sendLocArray[1] = this.data.teachArea;
    //                     //console.log(data.sendLocArray[1])
    //                     break;
    //                 case 2:
    //                     data.sendLocArray[1] = this.data.otherArea;
    //                     // console.log(data.sendLocArray[1])
    //                     break;
    //                 case 3:
    //                     data.sendLocArray[1] = this.data.transCampus;
    //                     // console.log(data.sendLocArray[1])
    //                     break;
    //             }
    //             data.sendLocIndex[1] = 0;
    //             break;

    //         case 1:
    //             break;
    //     }
    //     this.setData(data);
    //     // console.log(data)

    // },
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
            url: '../publish1/publish1',
        })
    }
})