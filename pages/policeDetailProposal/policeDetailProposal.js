var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportProcess: null, //卡住显示的内容

        policeIcon: "../../images/policeLight.png",
        camIcon: "../../images/photo.png",
        LName: "",
        reportTime: "暂未生成",
        lastDep: '乱举报也会被封号，请谨慎举报',

        reportRe1: '',
        report1: [
            // "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
        ],
        complainRe1: '',
        complain1: [
            // "http://img02.tooopen.com/images/20150514/tooopen_sy_122783536345.jpg", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
        ],
        reportRe2: '',
        report2: [
            // "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
        ],
        complainRe2: '',
        complain2: [
            // "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
        ],
        //图片上传相关
        img1: null,
        img2: null,
        img3: null,
        imgUp: [],

        orderID: null,
        policeID: null //本条举报记录的id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options.orderID)
        var that = this
        if (options.orderID) {
            //从订单过来的
            var oDate = new Date();
            var year = oDate.getFullYear();
            var month = oDate.getMonth() + 1;
            var day = oDate.getDate();
            var hour = oDate.getHours();
            var minute = oDate.getMinutes();
            var generateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
            that.setData({
                reportTime: generateTime,
                orderID: options.orderID,
                LName: options.LName,
                reportProcess: 0
            })
        }
        if (options.detailID) {
            // detailID即举报记录id,从列表过来的
            this.setData({
                policeID: options.detailID
            })
            wx.request({ //获取举报订单详情
                url: urlModel.url.reportDetail,
                method: 'GET',
                data: {
                    'policeID': options.detailID,
                    'getterID': app.globalData.user_ID
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        //reportProcess 卡住显示的内容 设置全部内容 
                        that.setData({
                            reportProcess: res.data.Status,
                            reportRe1: res.data.reason1 ? res.data.reason1 : null,
                            report1: res.data.img1 ? res.data.img1 : null,
                            complainRe1: res.data.complain1 ? res.data.complain1 : null,
                            complain1: res.data.img2 ? res.data.img2 : null,
                            reportRe2: res.data.reason2 ? res.data.reason2 : null,
                            report2: res.data.img3 ? res.data.img3 : null,
                            complainRe2: res.data.complain2 ? res.data.complain2 : null,
                            complain2: res.data.img4 ? res.data.img4 : null,
                            orderID: res.data.orderID,
                            LName: res.data.LName,
                            reportTime: res.data.pubTime
                        })
                    }
                }
            })
        }
        //生成举报记录的前端时间 

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
        var that = this
        wx.showLoading({
            title: '刷新中',
        })
        wx.request({ //获取举报订单详情
            url: urlModel.url.reportDetail,
            method: 'GET',
            data: {
                'policeID': that.data.policeID,
                'getterID': app.globalData.user_ID
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    //reportProcess 卡住显示的内容 设置全部内容 
                    that.setData({
                        reportProcess: res.data.Status,
                        reportRe1: res.data.reason1 ? res.data.reason1 : null,
                        report1: res.data.img1 ? res.data.img1 : null,
                        complainRe1: res.data.complain1 ? res.data.complain1 : null,
                        complain1: res.data.img2 ? res.data.img2 : null,
                        reportRe2: res.data.reason2 ? res.data.reason2 : null,
                        report2: res.data.img3 ? res.data.img3 : null,
                        complainRe2: res.data.complain2 ? res.data.complain2 : null,
                        complain2: res.data.img4 ? res.data.img4 : null,
                        orderID: res.data.orderID,
                        LName: res.data.LName,
                        reportTime: res.data.pubTime
                    })
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新成功',
                    })
                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '刷新失败，请重试',
                        icon: 'none'
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '刷新失败，请重试',
                    icon: 'none'
                })
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

    },
    /**
     * 表单提交
     */
    report: function(e) {
        console.log("发起举报")
        console.log(e)
        var that = this
      if (e.detail.value.reportRe1 == '' || that.data.imgUp.length == 0) {
        wx.showModal({
          title: '提示',
          content: '请上传一张照片，并说明举报原因',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#faaf42'
        })
        return

      }
        if (that.data.reportProcess) {
            //再次举报
            wx.uploadFile({
                url: urlModel.url.policePub,
                filePath: that.data.imgUp[0],
                name: 'police_img',
                header: {
                    "Content-Type": "multipart/form-data",
                    'accept': 'application/json',
                    //'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
                },
                formData: {
                    gId: app.globalData.user_ID, //其他额外的formdata，userId
                    reason: e.detail.value.reportRe1,
                    policeID: that.data.policeID,
                    orderID: that.data.orderID
                        // pubTime: that.data.reportTime
                },
                success: function(res) {
                    console.log(res)
                    if (res.statusCode == 200) {
                        wx.showToast({
                                title: '再次举报成功',
                            })
                            //调用刷新
                        that.onPullDownRefresh()
                    } else {
                        wx.showToast({
                            title: '举报失败请重试',
                            icon: 'none'
                        })
                    }
                }
            })
        } else {
            //初次举报
            wx.uploadFile({
                url: urlModel.url.policePub,
              filePath: that.data.imgUp[0] ? that.data.imgUp[0]:'',
                name: 'police_img',
                header: {
                    "Content-Type": "multipart/form-data",
                    'accept': 'application/json',
                    //'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
                },
                formData: {
                    gId: app.globalData.user_ID, //其他额外的formdata，userId
                    reason: e.detail.value.reportRe1,
                    orderID: that.data.orderID,
                    pubTime: that.data.reportTime
                },
                success: function(res) {
                    console.log(res)
                    if (res.statusCode == 200) {
                        wx.showToast({
                                title: '举报成功',
                            })
                            //调用刷新
                        setTimeout(function() {}, 1000)
                        wx.showToast({
                                title: '请至 我的>举报/申诉进度 查看',
                                icon: 'none'
                            })
                        wx.switchTab({
                          url: '../my/my',
                        })
                            // that.onPullDownRefresh()
                    } else {
                        wx.showToast({
                            title: '举报失败请重试',
                            icon: 'none'
                        })
                    }
                }
            })
        }

    },
    retrieve: function() {
        var that = this
        wx.showModal({
                title: '确定撤销？',
                content: '撤销后仍可重新发起新的举报',
                confirmText: '我想好了',
                confirmColor: '#faaf42',
                success:function(res){
                  if(res.confirm){
                    wx.request({
                      url: urlModel.url.cancelPolice,
                      method: 'POST',
                      data: {
                        'gId': app.globalData.user_ID,
                        'policeID': that.data.policeID
                      },
                      success: function (res) {
                        if (res.statusCode == 200 && res.data.msg == 'ok') {
                          wx.showToast({
                            title: '撤销成功',
                            icon: 'none',
                          })
                          that.onPullDownRefresh()
                        }
                      }

                    })
                  }
                }
            })
            //发起撤销请求，上传撤销用户id，后端查询是否有权力撤销
        

    },
    previewIMG: function(e) {
        var src = e.currentTarget.dataset.src
        var list = e.currentTarget.dataset.list
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: list // 需要预览的图片http链接列表
        })
    },
    chooseIMG: function(e) {
        var tempFilePaths
        var that = this
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths);
                that.setData({
                    imgUp: tempFilePaths,
                    img1: tempFilePaths,
                    // img2: tempFilePaths[1],
                    // img3: tempFilePaths[2]
                })
            }
        })
    },
    // toDetail:function(){
    //   wx.navigateTo({
    //     url: '../',
    //   })
    // }
    //todo 最后来写，目测要加一个查看页面
    // uploadIMG: function() {
    //     //上传选择的图片
    // }
})