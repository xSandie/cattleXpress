var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mySchoolName: '陕西师范大学（长安校区）',
        loctionSrc: "../../images/location.png",
        pubIcon: '../../images/publisher.png',
        topIcon: '../../images/bTopIcon.png',
        pullIcon: '../../images/pull.png',
        topubIcon: '../../images/hPubIcon.png',
        elIconImg: '../../images/kdzd.png',
        slIconImg: '../../images/sddd.png',
        fabuOrDingbu: true, //true渲染发布
        listCount: [{
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
        ],
        sendLoc: '选择快递送达地点',
        expressLoc: '选择取快递的站点',

        exlocArray: [
            ['新东门', '老东门', '硕士楼', '新勇西', '阳光苑二楼'],
            ['顺丰', '申通', '中通', '圆通', '百世汇通', '韵达', '天天快递', 'EMS', '京东']
        ],
        exlocfirstIndex: 0,
        exlocSecondIndex: 0,

        sdlocArray: [
            ['宿舍区', '教学区', '其他区域', '跨校区'],
            ['周园', '秦园', '汉园', '唐园', '梅园', '兰园', '硕士楼', '研究生公寓', '博士2号楼', '竹园']
        ],
        sdlocIndex: [0, 0],
        sdlocfirstIndex: 0,
        sdlocSecondIndex: 0,
        column2_0: ['周园', '秦园', '汉园', '唐园', '梅园', '兰园', '硕士楼', '研究生公寓', '博士2号楼', '竹园'],
        column2_1: ['文津楼', '文渊楼', '文汇楼', '文澜楼', '格物楼', '致知楼', '逸夫科技楼', '六艺楼'],
        column2_2: ['图书馆', '校务楼', '阳光苑', '溢香楼', '上林体育馆', '新勇', '终南音乐厅', '教育博物馆', '游泳馆', '家属院', '校医院', '家园生活服务区', '师大附小', '其他'],
        column2_3: ['长雁通'],
        requestTime: 1
    },
    /**
     * 会被动态设置的元素，exlocArray，sdlocArray,column2_0123,listCount
     **/

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            // console.log(res.userInfo)
                            //用户已经授权过,发送一个get请求3rd_session
                        }
                    })
                } else {
                    //未授权
                    wx.redirectTo({
                        url: '../welcome/welcome',
                    })
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
        this.setData({
            requestTime: 1
        })
        var that = this
        this.setData({
            exlocArray: app.globalData.exlocArray,
            column2_0: app.globalData.column2_0,
            column2_1: app.globalData.column2_1,
            column2_2: app.globalData.column2_2,
            column2_3: app.globalData.column2_3,
            mySchoolName: app.globalData.schoolName,
        })

        //测试用代码
        // if (app.globalData.ourUserStatus == 3) {
        //     wx.showModal({
        //         title: '有未完成订单',
        //         content: '是否前往查看？',
        //         confirmText: '查看',
        //         confirmColor: '#faaf42',
        //         success: function(res) {
        //             if (res.confirm) {
        //                 console.log('用户点击确定')
        //                 wx.switchTab({
        //                     url: '../orders/orders',
        //                 })
        //             }
        //         }
        //     })
        // }
        // if (app.globalData.ourUserStatus == 1) {
        //     wx.showModal({
        //         title: '有被举报订单',
        //         content: '是否前往查看？',
        //         confirmText: '查看',
        //         confirmColor: '#faaf42',
        //         success: function(res) {
        //             if (res.confirm) {
        //                 console.log('用户点击确定')
        //                 wx.navigateTo({
        //                     url: '../policeList/policeList',
        //                 })
        //             }
        //         }
        //     })
        // }
        // if (app.globalData.ourUserStatus == 2) {
        //     wx.showModal({
        //         title: '已被封号',
        //         content: '前往查看原因？',
        //         showCancel: false,
        //         confirmText: '查看',
        //         confirmColor: '#faaf42',
        //         success: function(res) {
        //             if (res.confirm) {
        //                 console.log('用户点击确定')
        //                 wx.navigateTo({
        //                     url: '../policeList/policeList',
        //                 })
        //             }
        //         }
        //     })
        // }






        wx.request({
            url: '', //填充请求状态码地址
            method: 'GET',
            data: {
                'user_ID': app.globalData.user_ID,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                app.globalData.ourUserStatus = res.data.listCount
                if (app.globalData.ourUserStatus == 3) {
                    wx.showModal({
                        title: '有未完成订单',
                        content: '是否前往查看？',
                        confirmText: '查看',
                        confirmColor: '#faaf42',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.switchTab({
                                    url: '../orders/orders',
                                })
                            }
                        }
                    })
                }
                if (app.globalData.ourUserStatus == 1) {
                    wx.showModal({
                        title: '有被举报订单',
                        content: '是否前往查看？',
                        confirmText: '查看',
                        confirmColor: '#faaf42',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.navigateTo({
                                    url: '../policeList/policeList',
                                })
                            }
                        }
                    })
                }
                if (app.globalData.ourUserStatus == 2) {
                    wx.showModal({
                        title: '已被封号',
                        content: '前往查看原因？',
                        showCancel: false,
                        confirmText: '查看',
                        confirmColor: '#faaf42',
                        success: function(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.navigateTo({
                                    url: '../policeList/policeList',
                                })
                            }
                        }
                    })
                }
            },
            fail: function() {},
            complete: function() {}
        })
        wx.request({
            url: '', //填充url请求列表
            method: 'GET',
            data: {
                'schoolID': app.globalData.schoolID,
                'user_ID': app.globalData.user_ID,
                'time': 1
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    listCount: res.data.listCount
                })
            },
            fail: function() {},
            complete: function() {}
        })
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
        this.setData({
            fabuOrDingbu: true
        })
        wx.request({
            url: '', //填充url请求列表
            method: 'GET',
            data: {
                'schoolID': app.globalData.schoolID,
                'user_ID': app.globalData.user_ID,
                'exloc': that.data.expressLoc,
                'sdloc': that.data.sendLoc,
                'time': 1
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    listCount: res.data.listCount
                })
            },
            fail: function() {},
            complete: function() {}
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.setData({
            fabuOrDingbu: false
        })
        var that = this
        wx.request({
            url: '', //填充url请求列表
            method: 'GET',
            data: {
                'schoolID': app.globalData.schoolID,
                'user_ID': app.globalData.user_ID,
                'exloc': that.data.expressLoc,
                'sdloc': that.data.sendLoc,
                'time': ++that.data.requestTime
            }, //可能time自增逻辑有误
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                if (res.data != 'atEnd') {
                    that.setData({
                            listCount: res.data.listCount
                        }) //暂时是后端合并好数组发过来
                        // that.setData({
                        //   requestTime: ++that.data.requestTime
                        // })
                } else {
                    return
                }
            },
            fail: function() {
                // that.setData({
                //   requestTime: ++that.data.requestTime
                // })
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
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

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
                        console.log('用户点击确定')
                        wx.navigateTo({
                            url: '../certifPage/certifPage',
                        })
                    }
                }
            })
        } else {
            console.log(event)
            var orderId = event.currentTarget.dataset.orderId;
            console.log(orderId)
            wx.navigateTo({
                url: "../orderDetailsVeiwer/orderDetailsVeiwer?id=" + orderId
            })
        }


    },

    /**
     * 设置地点框里显示的值
     */
    exlocChange: function(e) {
        console.log(e);
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.exlocArray[0][this.data.exlocfirstIndex] + '·' + this.data.exlocArray[1][this.data.exlocSecondIndex]
        this.setData({
            expressLoc: selected
        })
        var that = this
            //发起筛选快递站点请求
        wx.request({
            url: '', //填充url筛选请求列表
            method: 'GET',
            data: {
                'schoolID': app.globalData.schoolID,
                'user_ID': app.globalData.user_ID,
                'exloc': that.data.expressLoc,
                'sdloc': that.data.sendLoc,
                'time': 1
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    listCount: res.data.listCount
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
        console.log(e);
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.sdlocArray[0][this.data.sdlocIndex[0]] + '·' + this.data.sdlocArray[1][this.data.sdlocIndex[1]]
        this.setData({
                sendLoc: selected
            })
            //发起筛选送达地点请求
        var that = this
        wx.request({
            url: '', //填充url筛选请求列表
            method: 'GET',
            data: {
                'schoolID': app.globalData.schoolID,
                'user_ID': app.globalData.user_ID,
                'exloc': that.data.expressLoc,
                'sdloc': that.data.sendLoc,
                'time': 1
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    listCount: res.data.listCount
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
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
                        console.log(data.sdlocArray[1])
                        break;

                    case 1:
                        data.sdlocArray[1] = this.data.column2_1;
                        console.log(data.sdlocArray[1])
                        break;
                    case 2:
                        data.sdlocArray[1] = this.data.column2_2;
                        console.log(data.sdlocArray[1])
                        break;
                    case 3:
                        data.sdlocArray[1] = this.data.column2_3;
                        console.log(data.sdlocArray[1])
                        break;
                }
                data.sdlocIndex[1] = 0;
                break;

            case 1:
                break;
        }
        this.setData(data);
        console.log(data)
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