var app = getApp();
const urlModel = require('../../utils/urlSet.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tongzhi: false, //通知显示
        jieri: false, //控制可点击悬浮按钮显示
        tongzhiContent: '代课专区将于12月底试开放，敬请关注！',
        tongzhiSum: '点击查看新公告：代课专区开放公告',
        mySchoolName: '',
        loctionSrc: "../../images/location.png",
        pubIcon: '../../images/publisher.png',
        blankIcon: '../../images/blank1.png',
        topIcon: '../../images/bTopIcon.png',
        pullIcon: '../../images/pull.png',
        topubIcon: '../../images/hPubIcon.png',
        elIconImg: '../../images/kdzd.png',
        slIconImg: '../../images/sddd.png',
        fabuOrDingbu: true, //true渲染发布
        /*listCount: [{
                exInstance: '申通快递·阳光苑',
                sdInstance: '宿舍区 硕士楼',
                exWorry: true,
                reward: '2',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 18:00',
                pubName: '向同学 41612057',
                id: 155,
                key: 2
            },
            {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058',
                id: 156,
                key: 1
            },
            {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058',
                id: 157,
                key: 1
            }, {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058',
                id: 158,
                key: 1
            }, {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058',
                id: 159,
                key: 1
            }
        ],*/
        listCount: null,
        sendLoc: '选择快递送达地点',
        expressLoc: '选择取快递的站点',

        exlocArray: [],
        exlocfirstIndex: 0,
        exlocSecondIndex: 0,

        sdlocArray: [],
        sdlocIndex: [0, 0],
        sdlocfirstIndex: 0,
        sdlocSecondIndex: 0,
        column2_0: [],
        column2_1: [],
        column2_2: [],
        column2_3: [],
        requestTime: 1,
        atEnd: false,
    },
    /**
     * 会被动态设置的元素，exlocArray，sdlocArray,column2_0123,listCount
     **/

    setAvatar: function() {
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                                console.log(res)
                                send_data = {
                                    'user_nickname': res.userInfo.nickName,
                                    'user_avatarurl': res.userInfo.avatarUrl,
                                    'gId': app.globalData.user_ID
                                }
                                wx.request({
                                    url: urlModel.url.postAvatar,
                                    method: 'POST',
                                    data: send_data,
                                    success: function(res) {
                                        console.log("---上传头像--")
                                        console.log(res)
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
            })
            console.log(res)
            that.setData({
                    exlocArray: app.globalData.exlocArray,
                    column2_0: app.globalData.column2_0,
                    column2_1: app.globalData.column2_1,
                    column2_2: app.globalData.column2_2,
                    column2_3: app.globalData.column2_3,
                    mySchoolName: app.globalData.schoolName,
                    sdlocArray: [
                        ['宿舍区', '教学区', '其他区', '跨校区'], that.data.column2_0
                    ]
                })
                // console.log('onload', app.globalData.schoolName)
                // console.log('onload', app.globalData.sex)
                // console.log('onloadmy', that.data.mySchoolName)
            var send_sendLoc = ''
            var send_expressLoc = ''
            if (that.data.expressLoc == '选择取快递的站点') {
                send_expressLoc = ''
            }
            if (that.data.sendLoc == '选择快递送达地点') {
                send_sendLoc = ''
            }

            var send_data = {
                'schoolID': app.globalData.schoolID,
                'userID': app.globalData.user_ID,
                'exloc': send_expressLoc,
                'sdloc': send_sendLoc,
                'sex': app.globalData.sex,
                'time': 1
            }
            wx.request({
                url: urlModel.url.getOrdersList, //填充请求订单
                method: 'GET',
                data: send_data,
                // header: {
                //   "Content-Type": "applciation/json"
                // },
                success: function(res) {
                    console.log(res)
                    that.setData({
                        listCount: res.data
                    })
                },
                fail: function() {},
                complete: function() {}
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
            exlocArray: app.globalData.exlocArray,
            column2_0: app.globalData.column2_0,
            column2_1: app.globalData.column2_1,
            column2_2: app.globalData.column2_2,
            column2_3: app.globalData.column2_3,
            mySchoolName: app.globalData.schoolName,
            sdlocArray: [
                ['宿舍区', '教学区', '其他区', '跨校区'], that.data.column2_0
            ]
        })
        if (app.globalData.sys_status == 0) {
            return
        } else if (app.globalData.sys_status == 1) {
            //有通知
            that.setData({
                tongzhi: true,
                tongzhiContent: app.globalData.msg_con,
                tongzhiSum: app.globalData.msg_title
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
        wx.showLoading({
            title: '刷新中',
            mask: true
        })
        console.log("refresh")
        this.setData({
            fabuOrDingbu: true,
            mySchoolName: app.globalData.schoolName,
            requestTime: 1
        })
        var that = this
        if (that.data.expressLoc == "选择取快递的站点" || that.data.sendLoc == "选择快递送达地点") {
            //至少有一个没有选
            var send_sendLoc = that.data.sendLoc
            var send_expressLoc = that.data.expressLoc
            if (send_expressLoc == '选择取快递的站点') {
                send_expressLoc = ''
            }
            if (send_sendLoc == '选择快递送达地点') {
                send_sendLoc = ''
            }

            var send_data = {
                'schoolID': app.globalData.schoolID,
                'userID': app.globalData.user_ID,
                'exloc': send_expressLoc,
                'sdloc': send_sendLoc,
                'sex': app.globalData.sex,
                'time': 1
            }
            wx.request({
                url: urlModel.url.getOrdersList, //填充请求订单
                method: 'GET',
                data: send_data,
                // header: {
                //     "Content-Type": "applciation/json"
                // },
                success: function(res) {
                    //console.log(res)
                    that.setData({
                        listCount: res.data
                    })
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新成功',
                    })
                },
                fail: function() {
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新失败，请稍后重试',
                        icon: 'none'
                    })
                },
                complete: function() {}
            })
        } else {
            //两个筛选条件都选了
            wx.request({
                url: urlModel.url.getOrdersList,
                //填充url筛选请求列表
                method: 'GET',
                data: {
                    'schoolID': app.globalData.schoolID,
                    'userID': app.globalData.user_ID,
                    'exloc': that.data.expressLoc,
                    'sdloc': that.data.sendLoc,
                    'sex': app.globalData.sex,
                    'time': 1
                },
                // header: {
                //     "Content-Type": "applciation/json"
                // },
                success: function(res) {
                    //console.log(res)
                    wx.hideLoading()
                    that.setData({
                        listCount: res.data
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
                complete: function() {}
            })
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() { //这里list都是append逻辑
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        console.log("到底了")
        var that = this
        this.setData({
            requestTime: that.data.requestTime + 1
        })
        console.log(this.data.requestTime)
        this.setData({
            fabuOrDingbu: false
        })
        var that = this
        var that = this
        if (that.data.expressLoc == "选择取快递的站点" || that.data.sendLoc == "选择快递送达地点") {
            //至少有一个没有设置筛选
            var send_sendLoc = that.data.sendLoc
            var send_expressLoc = that.data.expressLoc
            if (send_expressLoc == '选择取快递的站点') {
                send_expressLoc = ''
            }
            if (send_sendLoc == '选择快递送达地点') {
                send_sendLoc = ''
            }

            var send_data = {
                'schoolID': app.globalData.schoolID,
                'userID': app.globalData.user_ID,
                'exloc': send_expressLoc,
                'sdloc': send_sendLoc,
                'sex': app.globalData.sex,
                'time': that.data.requestTime
            }
            wx.request({
                url: urlModel.url.getOrdersList, //填充请求订单
                method: 'GET',
                data: send_data,
                // header: {
                //     "Content-Type": "applciation/json"
                // },
                success: function(res) {
                    console.log(res)
                    if (res.data.length == 0) {
                        that.setData({
                            atEnd: true
                        })
                    } else {
                        that.setData({
                            listCount: that.data.listCount.concat(res.data)
                        })
                    }
                    // that.data.listCount.push(res.data)

                },
                fail: function() {},
                complete: function() {
                    wx.hideLoading()
                }
            })
        } else {
            //都设置了筛选
            wx.request({
                url: urlModel.url.getOrdersList, //填充url筛选请求列表
                method: 'GET',
                data: {
                    'schoolID': app.globalData.schoolID,
                    'userID': app.globalData.user_ID,
                    'exloc': that.data.expressLoc,
                    'sdloc': that.data.sendLoc,
                    'sex': app.globalData.sex,
                    'time': that.data.requestTime
                },
                // header: {
                //     "Content-Type": "applciation/json"
                // },
                success: function(res) {
                    console.log(res)
                    if (res.data.length == 0) {
                        that.setData({
                            atEnd: true
                        })
                    } else {
                        that.setData({
                            listCount: that.data.listCount.concat(res.data)
                        })
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
        }
    },
    toTongzhi: function() {
        var that = this
        wx.showModal({
            title: '公告',
            content: that.data.tongzhiContent,
            showCancel: false,
            confirmText: '知道啦',
            confirmColor: '#faaf42',
        })
    },
    onPageScroll: function(e) {
        if (e.scrollTop == 0) {
            this.setData({
                fabuOrDingbu: true
            })
        } else {
            // if (e.scrollTop == 1500){
            this.setData({
                fabuOrDingbu: false
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    ifCertif: function() {
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
                        wx.redirectTo({
                          url: '../certifPage/certifPage',
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

    /**
     * 设置地点框里显示的值
     */
    exlocChange: function(e) {
        //console.log(e);
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.exlocArray[0][this.data.exlocfirstIndex] + '·' + this.data.exlocArray[1][this.data.exlocSecondIndex]
        this.setData({
            expressLoc: selected
        })
        var that = this
            //发起筛选快递站点请求
        var send_sendLoc = that.data.sendLoc
        var send_expressLoc = that.data.expressLoc
        if (send_expressLoc == '选择取快递的站点') {
            send_expressLoc = ''
        }
        if (send_sendLoc == '选择快递送达地点') {
            send_sendLoc = ''
        }

        var send_data = {
            'schoolID': app.globalData.schoolID,
            'userID': app.globalData.user_ID,
            'exloc': send_expressLoc,
            'sdloc': send_sendLoc,
            'sex': app.globalData.sex,
            'time': 1
        }
        var that = this
        wx.request({
            url: urlModel.url.getOrdersList, //填充url筛选请求列表
            method: 'GET',
            data: send_data,
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                // console.log(res)
                that.setData({
                    listCount: res.data
                })
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
            complete: function() {}
        })
        this.setData({
            requestTime: 1
        })
    },
    sdlocChange: function(e) {
        var that = this
            //console.log(e);
            //console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.sdlocArray[0][this.data.sdlocIndex[0]] + '·' + this.data.sdlocArray[1][this.data.sdlocIndex[1]]
        this.setData({
                sendLoc: selected
            })
            //发起筛选送达地点请求
        var that = this
        var send_sendLoc = that.data.sendLoc
        var send_expressLoc = that.data.expressLoc
        if (send_expressLoc == '选择取快递的站点') {
            send_expressLoc = ''
        }
        if (send_sendLoc == '选择快递送达地点') {
            send_sendLoc = ''
        }

        var send_data = {
            'schoolID': app.globalData.schoolID,
            'userID': app.globalData.user_ID,
            'exloc': send_expressLoc,
            'sdloc': send_sendLoc,
            'sex': app.globalData.sex,
            'time': 1
        }
        wx.request({
            url: urlModel.url.getOrdersList, //填充url筛选请求列表
            method: 'GET',
            data: send_data,
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                //console.log(res)
                that.setData({
                    listCount: res.data
                })
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
            complete: function() {}
        })
        this.setData({
            requestTime: 1 //设置逻辑有误，再调整
        })
    },
    exlocColumnChange: function(e) {
        //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        if (e.detail.column == 0) {
            this.setData({
                exlocfirstIndex: e.detail.value
            })
        } else {
            this.setData({
                exlocSecondIndex: e.detail.value
            })
        }
    },
    sdlocColumnChange: function(e) {
        //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            sdlocArray: this.data.sdlocArray,
            sdlocIndex: this.data.sdlocIndex
        }
        data.sdlocIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.sdlocIndex[0]) {
                    case 0:
                        data.sdlocArray[1] = this.data.column2_0;
                        //console.log(data.sdlocArray[1])
                        break;

                    case 1:
                        data.sdlocArray[1] = this.data.column2_1;
                        //console.log(data.sdlocArray[1])
                        break;
                    case 2:
                        data.sdlocArray[1] = this.data.column2_2;
                        // console.log(data.sdlocArray[1])
                        break;
                    case 3:
                        data.sdlocArray[1] = this.data.column2_3;
                        // console.log(data.sdlocArray[1])
                        break;
                }
                data.sdlocIndex[1] = 0;
                break;

            case 1:
                break;
        }
        this.setData(data);
        // console.log(data)

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
            fabuOrDingbu: true
        })
    },
    toPub: function() {
        wx.switchTab({
            url: '../publish1/publish1',
        })
    }
})