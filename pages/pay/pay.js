// pages/pay/pay.js
const urlModel = require('../../utils/urlSet.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        payCodeUrl: null,
        orderId: null

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        if (options.orderId) {
            that.setData({
                orderId: options.orderId
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
        wx.request({
            //获取对方支付二维码接口
            url: urlModel.url.toPayGet,
            method: 'POST',
            data: {
                'orderId': that.data.orderId,
                'payerID': app.globalData.sessionID
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        payCodeUrl: res.data.payCodeUrl
                            // receiverSchoolId:'',
                            // receiverAvatar:'',
                            // receiverNickname:'',
                            // receiverLname:''
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
        wx.showLoading({
            title: '刷新中',
        })
        wx.request({
            //获取对方支付二维码接口
            url: urlModel.url.toPayGet,
            method: 'POST',
            data: {
                'orderId': that.data.orderId,
                'payerID': app.globalData.sessionID
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        payCodeUrl: res.data.payCodeUrl
                            // receiverSchoolId:'',
                            // receiverAvatar:'',
                            // receiverNickname:'',
                            // receiverLname:''
                    })
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新成功',
                    })
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
    showLarge: function() {
        var that = this
        wx.previewImage({
            urls: [that.data.payCodeUrl],
        })
    },
    saveCode: function() {
        // 接口调用询问  
        var that = this
        wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
                // console.log("2-授权《保存图片》权限成功");
                // util.downloadImage(downloadUrl);
                wx.downloadFile({
                    url: that.data.payCodeUrl,
                    success: function(res) {
                        // console.log(res)
                        wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: function(res) {
                                // console.log(res)
                                wx.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 2000
                                })
                            },
                            fail: function(res) {
                                // console.log(res)
                                // console.log('fail')
                            }
                        })
                    },
                    fail: function() {
                        // console.log('fail')
                    }
                })
            },
            fail() {
                // 用户拒绝了授权  
                // console.log("2-授权《保存图片》权限失败");
                // 打开设置页面 
                wx.showToast({
                    title: '请再次点击，并授权',
                    icon: 'none'
                })
            }
        })
    }
})