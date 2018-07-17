var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mySchoolName: '陕西师范大学长安校区',
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.getSetting({
                success: function(res) {
                    if (res.authSetting['scope.userInfo']) {
                        wx.getUserInfo({
                            success: function(res) {}
                        })
                    } else {
                        //未授权
                        wx.reLaunch({
                            url: '../welcome/welcome',
                        })
                    }
                }
            })
            // wx.login({
            //     success: function(res) {
            //         if (res.code) {
            //             //发起网络请求
            //             wx.request({
            //                 url: 'http://10.2.24.200:8080/HelloWord/receivecode/getopenid', //服务器api
            //                 data: {
            //                     code: res.code
            //                 },
            //                 success: function(res) { //服务器解密后，客户端收到基本信息
            //                     console.log(res.data)
            //                     app.globalData.user_ID = res.data[0].account
            //                     app.globalData.userName = res.data[0].uname
            //                     app.globalData.schoolNumb = res.data[0].uid //学号
            //                     app.globalData.schoolID = res.data[0].schoolid
            //                     app.globalData.schoolName = res.data[0].school
            //                     app.globalData.ourUserStatus = res.data[0].status
            //                     app.globalData.sex = res.data[0].sex
            //                     app.globalData.exlocArray = res.data[1].kuaidi
            //                     app.globalData.column2_0 = res.data[1].sushequ
            //                     app.globalData.column2_1 = res.data[1].jiaoxuequ
            //                     app.globalData.column2_2 = res.data[1].othersarea
            //                     app.globalData.column2_3 = res.data[1].kuaxiaoqu //替换掉xx
            //                     app.globalData.balance = res.data[0].money,
            //                       app.globalData.default = res.data[1].default
            //                         that.setData({
            //                             exlocArray: app.globalData.exlocArray,
            //                             column2_0: app.globalData.column2_0,
            //                             column2_1: app.globalData.column2_1,
            //                             column2_2: app.globalData.column2_2,
            //                             column2_3: app.globalData.column2_3,
            //                             mySchoolName: app.globalData.schoolName,
            //                         })
            //                 },
            //                 fail: function() {
            //                     //app.globalData.userInfo = "dfjkadhfkahfauhf"
            //                 }
            //             })
            //         } else {
            //             console.log('登录失败！' + res.errMsg)
            //         } //服务器将存储用户code
            //     }
            // })
        var that = this
        app.getUser().then(function(res) {
            that.setData({
                    requestTime: 1,
                })
                // console.log("onload被执行")
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
            wx.request({
                url: 'http://45.40.197.154/HelloWord/firstpage/schoolidwaitreceive', //填充请求订单
                method: 'GET',
                data: {
                    'schoolID': app.globalData.schoolID,
                    'Account': app.globalData.user_ID,
                    'exloc': that.data.expressLoc,
                    'sdloc': that.data.sendLoc,
                    'Sex': app.globalData.sex,
                    'time': 1
                },
                header: {
                    "Content-Type": "applciation/json"
                },
                success: function(res) {
                    // console.log(res)
                    that.setData({
                        listCount: res.data[0]
                    })
                },
                fail: function() {},
                complete: function() {}
            })
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
        //console.log('刚开始onshow', app.globalData.schoolName)
        var that = this
        // app.getUser().then(function(res) {
        //     that.setData({
        //             requestTime: 1,
        //         })
        //         //console.log("onshow getUser被执行")
        //     that.setData({
        //             exlocArray: app.globalData.exlocArray,
        //             column2_0: app.globalData.column2_0,
        //             column2_1: app.globalData.column2_1,
        //             column2_2: app.globalData.column2_2,
        //             column2_3: app.globalData.column2_3,
        //             mySchoolName: app.globalData.schoolName,
        //             sdlocArray: [
        //                 ['宿舍区', '教学区', '其他区', '跨校区'], that.data.column2_0
        //             ]
        //         })
        //         // console.log('onshowmy', that.data.mySchoolName)
        //         // console.log("onshow" + app.globalData.sex)
        //         // console.log('onshow' + app.globalData.schoolName)
        // })
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
        console.log("refresh")
        this.setData({
            fabuOrDingbu: true
        })
        var that = this
        if (that.data.expressLoc == "选择取快递的站点" || that.data.sendLoc == "选择快递送达地点") {
            wx.request({
                url: 'http://45.40.197.154/HelloWord/firstpage/schoolidwaitreceive', //填充请求订单
                method: 'GET',
                data: {
                    'schoolID': app.globalData.schoolID,
                    'Account': app.globalData.user_ID,
                    'exloc': that.data.expressLoc,
                    'sdloc': that.data.sendLoc,
                    'Sex': app.globalData.sex,
                    'time': 1
                },
                header: {
                    "Content-Type": "applciation/json"
                },
                success: function(res) {
                    //console.log(res)
                    that.setData({
                        listCount: res.data[0]
                    })
                },
                fail: function() {},
                complete: function() {}
            })
        } else {
            wx.request({
                url: 'http://45.40.197.154/HelloWord/firstpage/expwaitreceiveinfo', //填充url筛选请求列表
                method: 'GET',
                data: {
                    'schoolID': app.globalData.schoolID,
                    'Account': app.globalData.user_ID,
                    'exloc': that.data.expressLoc,
                    'sdloc': that.data.sendLoc,
                    'Sex': app.globalData.sex,
                    'time': 1
                },
                header: {
                    "Content-Type": "applciation/json"
                },
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
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        //console.log("到底了")
        this.setData({
            fabuOrDingbu: false
        })
        var that = this
        var that = this
        if (that.data.expressLoc == "选择取快递的站点" || that.data.sendLoc == "选择快递送达地点") {
            wx.request({
                url: 'http://45.40.197.154/HelloWord/firstpage/schoolidwaitreceive', //填充请求订单
                method: 'GET',
                data: {
                    'schoolID': app.globalData.schoolID,
                    'Account': app.globalData.user_ID,
                    'exloc': that.data.expressLoc,
                    'sdloc': that.data.sendLoc,
                    'Sex': app.globalData.sex,
                    'time': that.data.requestTime
                },
                header: {
                    "Content-Type": "applciation/json"
                },
                success: function(res) {
                    // console.log(res)
                    that.setData({
                        listCount: res.data[0]
                    })
                },
                fail: function() {},
                complete: function() {}
            })
        } else {
            wx.request({
                url: 'http://45.40.197.154/HelloWord/firstpage/expwaitreceiveinfo', //填充url筛选请求列表
                method: 'GET',
                data: {
                    'schoolID': app.globalData.schoolID,
                    'Account': app.globalData.user_ID,
                    'exloc': that.data.expressLoc,
                    'sdloc': that.data.sendLoc,
                    'Sex': app.globalData.sex,
                    'time': that.data.requestTime
                },
                header: {
                    "Content-Type": "applciation/json"
                },
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
        }
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
                        wx.navigateTo({
                            url: '../certifPage/certifPage',
                        })
                    }
                }
            })
        }
    },
    toSumDetail: function(event) {
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
        var that = this
        wx.request({
            url: 'http://45.40.197.154/HelloWord/firstpage/expwaitreceiveinfo', //填充url筛选请求列表
            method: 'GET',
            data: {
                'schoolID': app.globalData.schoolID,
                'Account': app.globalData.user_ID,
                'exloc': that.data.expressLoc,
                'sdloc': that.data.sendLoc,
                'Sex': app.globalData.sex,
                'time': 1
            },
            header: {
                "Content-Type": "applciation/json"
            },
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
        wx.request({
            url: 'http://45.40.197.154/HelloWord/firstpage/expwaitreceiveinfo', //填充url筛选请求列表
            method: 'GET',
            data: {
                'schoolID': app.globalData.schoolID,
                'Account': app.globalData.user_ID,
                'exloc': that.data.expressLoc,
                'sdloc': that.data.sendLoc,
                'Sex': app.globalData.sex,
                'time': 1
            },
            header: {
                "Content-Type": "applciation/json"
            },
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
            requestTime: 1
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