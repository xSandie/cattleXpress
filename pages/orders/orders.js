const urlModel = require('../../utils/urlSet.js')
app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navbar: ['未完成', '已完成'],
        currentTab: 0,
        blankIcon: '../../images/blank1.png',
        blank: false, //未完成是否为空
        ongoRecListCount: [],
        ongoPubListCount: [],
        finRecListCount: [],
        finPubListCount: [],
        // ongoRecListCount: [{
        //     exState: '4',
        //     reward: '6',
        //     exInstance: '圆通·硕士楼',
        //     sdInstance: '宿舍区 周园',
        //     exWorry: true,
        //     fetchCode: 'A1-400121',
        //     fatchPhone: '9021',
        //     fetchName: '张筠瑶',
        //     exWeight: '<1KG',
        //     exSize: '小件',
        //     exExTime: '05-07 18:00',
        //     orderID: '12345'
        // }], 
        //     exState: '0',
        //     reward: '6',
        //     exInstance: '中通·新勇',
        //     sdInstance: '宿舍区 硕士楼',
        //     exWorry: false,
        //     fetchCode: 'A1-401541',
        //     fatchPhone: '9021',
        //     fetchName: '向书晗',
        //     exWeight: '<1KG',
        //     exSize: '小件',
        //     exExTime: '05-07 18:00',
        //     orderID: '12345'
        // }],
        // ongoPubListCount: [{
        //         exState: '1',
        //         reward: '5',
        //         exInstance: '京东·新勇',
        //         sdInstance: '宿舍区 硕士楼',
        //         exWorry: true,
        //         recName: '刘同学 41612058',
        //         exWeight: '<1KG',
        //         exSize: '小件',
        //         exExTime: '05-07 18:00',
        //         orderID: '12345'
        //     }],
        //     {
        //         exState: '2',
        //         reward: '16',
        //         exInstance: '黄马甲·新东门',
        //         sdInstance: '宿舍区 硕士楼',
        //         exWorry: true,
        //         recName: '刘同学 41612058',
        //         exWeight: '<1KG',
        //         exSize: '小件',
        //         exExTime: '05-07 18:00',
        //         orderID: '12345'
        //     }
        // ],

        // finRecListCount: [{
        //     exState: '3',
        //     reward: '6',
        //     exInstance: '圆通·硕士楼',
        //     sdInstance: '宿舍区 周园',
        //     exWorry: true,
        //     exWeight: '<1KG',
        //     exSize: '小件',
        //     exExTime: '05-07 18:00',
        //     pubName: '向',
        //     orderID: '12345'
        // }], {
        //     exState: '3',
        //     reward: '6',
        //     exInstance: '中通·新勇',
        //     sdInstance: '宿舍区 硕士楼',
        //     exWorry: false,
        //     exWeight: '<1KG',
        //     exSize: '小件',
        //     exExTime: '05-07 18:00',
        //     pubName: '向',
        //     orderID: '12345'

        // }],
        // finPubListCount: [{
        //         exState: '4',
        //         reward: '5',
        //         exInstance: '京东·新勇',
        //         sdInstance: '宿舍区 硕士楼',
        //         exWorry: true,
        //         recName: '无',
        //         exWeight: '<1KG',
        //         exSize: '小件',
        //         exExTime: '05-07 18:00',
        //         orderID: '12345'
        //     }],
        //     {
        //         exState: '3',
        //         reward: '16',
        //         exInstance: '黄马甲·新东门',
        //         sdInstance: '宿舍区 硕士楼',
        //         exWorry: true,
        //         recName: '刘同学',
        //         exWeight: '<1KG',
        //         exSize: '小件',
        //         exExTime: '05-07 18:00',
        //         orderID: '12345'
        //     },
        //     {
        //         exState: '5',
        //         reward: '16',
        //         exInstance: '黄马甲·新东门',
        //         sdInstance: '宿舍区 硕士楼',
        //         exWorry: true,
        //         recName: '刘同学',
        //         exWeight: '<1KG',
        //         exSize: '小件',
        //         exExTime: '05-07 18:00',
        //         orderID: '12345'
        //     }
        // ],

        pubIcon: '../../images/publisher.png',
        atEnd: false
    },
    //0代表已接单待支付，1代表等待接单，2代表对方已接单未完成，3代表已完成,4代表已过期,5代表异常。
    navbarTap: function(e) {
        var that = this
        this.setData({
                currentTab: e.currentTarget.dataset.idx
            })
            // console.log(e.currentTarget.dataset.idx)
        if (e.currentTarget.dataset.idx == 0) {
            wx.request({
              url: urlModel.url.notHaveList, //未完成完成订单请求地址
                method: 'POST',
                data: {
                    'userID': app.globalData.user_ID,
                    // 'Sex': app.globalData.sex
                },
                // header: {
                //     "Content-Type": "applciation/json"
                // },
                success: function(res) {
                    // console.log(res)
                    that.setData({
                        //修改参数
                        ongoRecListCount: res.data[0],
                        ongoPubListCount: res.data[1]
                    })
                },
                fail: function() {},
                complete: function() {}
            })
        } else {
            wx.request({
              url: urlModel.url.haveList, //已完成订单请求地址
              method: 'POST',
                data: {
                    'userID': app.globalData.user_ID,
                },
                // header: {
                //     "Content-Type": "applciation/json"
                // },
                success: function(res) {
                    console.log('已完成订单请求', res)
                    
                    // if (res.data.message){
                    //   that.setData({
                    //     finRecListCount:null//修改参数
                    //   }) 
                    // }
                    // else if (res.data.message) {
                    //   that.setData({
                    //     finPubListCount: null//修改参数
                    //   })
                    // } else {
                      that.setData({
                      finRecListCount: res.data[0],
                      finPubListCount: res.data[1] //修改参数
                    })
                },
                fail: function() {},
                complete: function() {}
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        if (app.globalData.ourUserStatus == 4) {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    }
                }
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
        var that = this
            //判定是否为空的函数
        wx.request({
            url: urlModel.url.notHaveList, //未完成完成订单请求地址
            method: 'POST',
            data: {
                'userID': app.globalData.user_ID,
                // 'Sex': app.globalData.sex
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                console.log(res)
                that.setData({
                    ongoRecListCount: res.data[0],
                    ongoPubListCount: res.data[1]
                        //修改参数
                })
                if (that.data.ongoPubListCount == false && that.data.ongoRecListCount == false) {
                    that.setData({
                        blank: true
                    })
                } else {
                    that.setData({
                        blank: false
                    })
                }
            },
            fail: function() {},
            complete: function() {
                if (that.data.ongoPubListCount == false && that.data.ongoRecListCount == false) {
                    that.setData({
                        blank: true
                    })
                } else {
                    that.setData({
                        blank: false
                    })
                }
            }
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
        var that = this
        wx.request({
            url: urlModel.url.notHaveList, //未完成完成订单请求地址
            method: 'POST',
            data: {
                'userID': app.globalData.user_ID,
                // 'Sex': app.globalData.sex
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                // console.log(res)
                that.setData({
                    //修改参数,两边同时刷新
                    ongoRecListCount: res.data[0],
                    ongoPubListCount: res.data[1]
                })
            },
            fail: function() {},
            complete: function() {
                if (that.data.ongoPubListCount == false && that.data.ongoRecListCount == false) {
                    that.setData({
                        blank: true
                    })
                } else {
                    that.setData({
                        blank: false
                    })
                }
            }
        })
        //考虑加入刷新已完成订单请求
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
    toPubDetails: function(event) {
        var orderId = event.currentTarget.dataset.orderId
        wx.navigateTo({
            url: '../orderDetailsPub/orderDetailsPub?key=1&id=' + orderId,
        })
    },
    toRecDetails: function(event) {
        var orderId = event.currentTarget.dataset.orderId
            // console.log(event)
        wx.navigateTo({
            url: '../orderDetailsRec/orderDetailsRec?key=1&id=' + orderId,
        })
    }
})