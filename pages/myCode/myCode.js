// pages/myCode/myCode.js
const urlModel = require('../../utils/urlSet.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canChange: false,
        myPayCodeUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        wx.request({
            url: urlModel.url.getMyPayCode,
            data: {
                'sessionID': app.globalData.sessionID
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    if (res.data.canChange) {
                        that.setData({
                            myPayCodeUrl: res.data.my_paycode + '?v=' + Math.random(),
                            canChange: res.data.canChange
                        })
                    }
                }
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        var that = this
        wx.request({
            url: urlModel.url.getMyPayCode,
            data: {
                'sessionID': app.globalData.sessionID
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    console.log(res)
                    if (res.data.canChange) {
                        that.setData({
                            myPayCodeUrl: res.data.my_paycode + '?v=' + Math.random(),
                            canChange: res.data.canChange
                        })
                    }
                }
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
    showHelp: function() {
        wx.showModal({
            title: '保存收款二维码',
            content: '1.点击右上角圆圈返回微信\r\n2.进入 我>钱包>收付款>二维码收款 中保存收款码\r\n3.注意：收款二维码是对方支付的唯一渠道！',
            confirmText: '知道啦',
            confirmColor: '#f9a93e',
            showCancel: false
        })
    },
    showLarge: function() {
        var that = this
        wx.previewImage({
            urls: [that.data.myPayCodeUrl],
        })
    },
    changeCode: function() {
        var that = this
        wx.chooseImage({
            count: 1,
            sourceType: ['album'],
            sizeType: ['compressed'],
            success: function(res) {
                //发起上传图片请求
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: urlModel.url.changePayCode,
                    filePath: tempFilePaths[0],
                    name: 'payCode',
                    header: {
                        "Content-Type": "multipart/form-data",
                        'accept': 'application/json',
                    },
                    formData: {
                        'sessionID': app.globalData.sessionID //其他额外的formdata，userId
                    },
                    success: function(res) {
                        // console.log(res)
                        if (res.statusCode == 200) {
                            wx.showToast({
                                title: '上传成功',
                            })
                            app.globalData.havePayCode = res.data.havePayCode
                            that.onPullDownRefresh()
                        } else {
                            wx.showToast({
                                title: '上传失败请重试',
                            })
                        }
                    }
                })
            },
        })
    },
    upCode: function() {
        this.changeCode()
        this.setData({
                canChange: true
            })
            //然后服务器端也设置成true
    },
    upOrChangeCode: function() {
        if (this.data.canChange == true) {
            this.changeCode()
        } else {
            this.upCode()
        }
    }
})