var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expLogoUrl: '../../images/logo.jpg',//填充黄牛小logo
        expOpenTime: '都说别急嘛，急啥急~',
        expStationName: '别急，正在赶来',
        fixIcon: '../../images/fixBtnIcon.png',

        contactIcon: '../../images/checkLight.png',
        sdInstance: '订单马上呈现',

        limit: null,
        expWeight: '<1kg',
        expSize: '小件',
        endTime: '00-00 00:00',

        expDescript: '别着急，订单马上呈现',

        reward: '6',
        // schNum: ''暂时没有用上学号,
        pubLastName: '黄',
        pubTime: '0000-00-00',
        orderId: '',
        receiverPhone: '有问题及时反馈噢',
    },
    backhome:function(){
        wx.switchTab({
            url: '../home/home',
            success:function () {
                app.globalData.reloadHomePage=true
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        // console.log(options.id);
        var that = this
        let send_data = {
            'order_id': options.id,
            'sessionID': app.globalData.sessionID, //为以后埋点做准备
            'school_id': app.globalData.schoolID
        }
        wx.request({
            url: urlModel.url.toOrderSum, //填充请求浏览者订单详情url
            method: 'GET',
            data: send_data,
            success: function(res) {
                console.log(res)
                if (res.data.can_get == true) {
                    that.setData({
                        //设置页面参数
                        expLogoUrl: res.data.exp_logo,
                        expOpenTime: res.data.exp_opentime,
                        expStationName: res.data.exp_station,
                        //以上是快递站点信息
                        orderId: res.data.order_id,
                        sdInstance: res.data.send_loc,
                        expWeight: res.data.exp_weight,
                        expSize: res.data.exp_size,
                        endTime: res.data.expire_time,
                        reward: res.data.reward,
                        pubLastName: res.data.pub_lastname,
                        pubTime: res.data.pub_time,
                        receiverPhone: res.data.receiver_phone,
                        expDescript: res.data.description,
                        limit:res.data.limit
                    })
                } else {
                    wx.showToast({
                        title: '抱歉，订单已经被抢啦~',
                        icon: 'none',
                        success: function() {
                            setTimeout(that.backhome,1500)

                        }
                    })
                }

            },
            fail: function() {},
            complete: function() {}
        })

        // console.log("ok")//会先执行ok再等到收到数据执行success
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
    /**
     * 接单按钮按下
     */
    recOrder: function(event) {
        var that = this
        var formId = event.detail.formId;
        if (!app.globalData.havePayCode) {
            //未设置paycode
            wx.showModal({
                title: '设置收款二维码',
                content: '暂不可接单，请前往设置收款二维码',
                confirmColor: '#faaf42',
                confirmText: '去设置',
                success: function(res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '../myCode/myCode',
                        })
                    }
                }
            })
        } else if (app.globalData.haveCertif == true) {
            var orderId = event.currentTarget.dataset.orderId;
            wx.showModal({
                title: '确认接单',
                content: '接单后要准时送达噢',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        let send_data = {
                            'form_id': formId,
                            'order_id': orderId,
                            'sessionID': app.globalData.sessionID,
                        }
                        wx.request({
                            url: urlModel.url.recOrder, //订单动作接口
                            method: 'GET',
                            data: send_data,
                            success: function(res) {
                                if (res.data.can_get == true) {
                                    wx.redirectTo({
                                        url: "../orderDetailsRec/orderDetailsRec?id=" + orderId
                                    })
                                } else if (res.data.without_addr) {
                                    wx.showModal({
                                        title: '补全资料',
                                        content: '缺少默认联系电话',
                                        cancelText: '下次再说',
                                        confirmText: '去填写',
                                        confirmColor: '#f9a93e',
                                        success: function(res) {
                                            if (res.confirm) {
                                                wx.navigateTo({
                                                    url: '../defAddrEdit/defAddrEdit?path=haveCertif'
                                                })
                                            }
                                        }
                                    })
                                } else if(res.data.not_allow){
                                    wx.showToast({
                                      title: '不符合订单条件噢~',
                                        icon:'none',
                                        success: function() {
                                            setTimeout(that.backhome,1500)
                                        }
                                    })
                                }else
                                    {
                                    wx.showToast({
                                        title: '来晚一步，订单被抢啦~',
                                        icon:'none',
                                        success: function() {
                                            setTimeout(that.backhome,1500)
                                        }
                                    })
                                }

                            },
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        }

    },
    conTA: function() {
        var that = this
        if (app.globalData.haveCertif == false) {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showModal({
                title: '发短信还是拨打电话？',
                content: '发送短信 将复制对方号码。',
                confirmColor: '#faaf42',
                confirmText: '发送短信',
                cancelColor: '#999ba1',
                cancelText: '拨打号码',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.setClipboardData({
                                data: that.data.receiverPhone,
                            })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                        wx.makePhoneCall({
                            phoneNumber: that.data.receiverPhone //仅为示例，并非真实的电话号码
                        })
                    }
                }
            })

        }
    },
    toFix: function(event) {
        let that = this
        wx.navigateTo({
            url: '../reportExError/reportExError?title=' + that.data.expStationName,
        })
    }
})