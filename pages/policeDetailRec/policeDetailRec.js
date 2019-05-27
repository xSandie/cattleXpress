var app = getApp();
const urlModel = require('../../utils/urlSet.js');
const helper = require('../../utils/helper.js');
const Promise = require('../../units/promise.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportProcess: 2,

        policeIcon: "../../images/policeLight.png",
        camIcon: "../../images/photo.png",
        pubLastName: "黄牛同学",
        reportTime: "",
        description: '若对方举报信息不实，请申诉',

        reportRe1: '等待一下，马上显示',
        report1: [
            "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
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

        uploadIcon:'/images/photo.png',
        fontColor:'#373c46',
        imgTotal: 3,
        imgList: [
            // 'http://a0.att.hudong.com/23/02/300000876508129592021450066_950.jpg',
            // 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1534301532&di=24ef71de1aa5a0cfd332302edaedd9d4&src=http://img4.duitang.com/uploads/item/201303/26/20130326111750_8mEnj.jpeg',
            // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534312674356&di=302fedd307b810868a2c472d75cf5a60&imgtype=0&src=http%3A%2F%2Fs6.sinaimg.cn%2Fmw690%2F001oPD81zy7eKtwl69n95%26690',
        ],
        imgWidth:'180rpx',
        preview: true,
        showClose: true,
        imgCount: 3,

        orderId: null,
        policeId: null //本条举报记录的id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        that.setData({
            policeId: options.detailID
        })
        wx.request({ //获取举报订单详情
            url: urlModel.url.reportDetail,
            method: 'GET',
            data: {
                'complain_id': options.detailID,
                'sessionID': app.globalData.sessionID
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    //reportProcess 卡住显示的内容 设置全部内容 
                    that.setData({
                        reportProcess: res.data.report_status,
                        reportRe1: res.data.reason1 ? res.data.reason1 : null,
                        report1: res.data.img1 ? res.data.img1 : null,
                        complainRe1: res.data.complain1 ? res.data.complain1 : null,
                        complain1: res.data.complain_img1 ? res.data.complain_img1 : null,
                        reportRe2: res.data.reason2 ? res.data.reason2 : null,
                        report2: res.data.img3 ? res.data.img3 : null,
                        complainRe2: res.data.complain2 ? res.data.complain2 : null,
                        complain2: res.data.complain_img2 ? res.data.complain_img2 : null,
                        orderId: res.data.order_id,
                        pubLastName: res.data.lastname,
                        reportTime: res.data.pub_time
                    })
                }
            },
            fail: function() {}
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
        if(this.data.reportProcess==0){//为发起请求不允许刷新
            wx.stopPullDownRefresh()
            return
        }
        var that = this
        wx.showLoading({
            title: '刷新中',
        })
        wx.request({ //获取举报订单详情
            url: urlModel.url.reportDetail,
            method: 'GET',
            data: {
                'complain_id': that.data.policeId,
                'sessionID': app.globalData.sessionID
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    //reportProcess 卡住显示的内容 设置全部内容 
                    that.setData({
                        reportProcess: res.data.report_status,
                        reportRe1: res.data.reason1 ? res.data.reason1 : null,
                        report1: res.data.img1 ? res.data.img1 : null,
                        complainRe1: res.data.complain1 ? res.data.complain1 : null,
                        complain1: res.data.complain_img1 ? res.data.complain_img1 : null,
                        reportRe2: res.data.reason2 ? res.data.reason2 : null,
                        report2: res.data.img2 ? res.data.img2 : null,
                        complainRe2: res.data.complain2 ? res.data.complain2 : null,
                        complain2: res.data.complain_img2 ? res.data.complain_img2 : null,
                        orderId: res.data.order_id,
                        pubLastName: res.data.lastname,
                        reportTime: res.data.pub_time
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
        wx.stopPullDownRefresh()
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
    /**
     * 表单提交
     */
    nextSubmit: function(e) {
        var that = this
            // console.log(e)
            //申诉
        var upRes = 0
        helper.funcManager.formIdCollecter(e.detail.formId,
            app.globalData.sessionID,urlModel.url.collectFormId);
        if (e.detail.value.reason == '') {
            wx.showModal({
                title: '提示',
                content: '请说明举报原因',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#faaf42'
            })
            return
        }
        helper.UIManager.loading('申诉中');
        wx.request({
            url: urlModel.url.complainPub,
            data: {
                'reason':e.detail.value.reason,
                'order_id':that.data.orderId,
                'sessionID':app.globalData.sessionID,
                'complain_id':that.data.policeId
            },
            method:'POST',
            success: function(res) {
                if (res.statusCode == 200) 
                    that.uploadPic(res.data.complain_id)
            },
            fail: function() { //无论成功还是失败都会执行
                wx.hideLoading()
                wx.showToast({
                    title:'申诉失败，请重试或联系客服',
                    icon:'none'
                })
            }
        })
    },
  uploadPic: function (complainId) {
    var ok = 0;
    var that = this
      if (that.data.imgList.length==0){
          wx.hideLoading()
          wx.showToast({
              title: '申诉成功'
          })
          setTimeout(() => { that.onPullDownRefresh() }, 1000)
          return
      }
    var temp = new Promise(function (resolve, reject) {
      for (let i in that.data.imgList) {
        wx.uploadFile({
          url: urlModel.url.policePic,
          filePath: that.data.imgList[i],
          name: 'police_img',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            //'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            sessionID: app.globalData.sessionID, //其他额外的formdata，userId
            complain_id: complainId,
            report_status: that.data.reportProcess
          },
          success: function (res) {
            if (res.statusCode == 200) {
              ok = ok + 1;
              if (ok == that.data.imgList.length) {
                resolve('ok');
              }
            } else {
              ok = ok - 1;
              reject('error')
            }
          },
          fail: function () {
            ok = ok - 1;
            reject('error')
          }
        })
      }
    }).then(() => {
      if (ok == that.data.imgList.length) {
        wx.hideLoading()
        wx.showToast({
          title: '申诉成功'
        })
        setTimeout(() => { that.onPullDownRefresh() }, 1000)
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '申诉失败，请重试',
          icon: 'none'
        })
        return 0;//有图片上传失败
      }
    }).catch(function () {
      wx.hideLoading()
      wx.showToast({
        title: '申诉失败，请重试',
        icon: 'none'
      })
    })
  },
    previewIMG: function(e) {
        var src = e.currentTarget.dataset.src
        var list = e.currentTarget.dataset.list
        wx.previewImage({
            current: src, // 当前显示图片的http链接
            urls: list // 需要预览的图片http链接列表
        })
    },
    // chooseIMG: function(e) {
    //     var tempFilePaths
    //     var that = this
    //     wx.chooseImage({
    //         count: 1, // 默认9
    //         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //         success: function(res) {
    //             // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //             var tempFilePaths = res.tempFilePaths
    //                 // console.log(tempFilePaths);
    //             that.setData({
    //                 imgUpList: tempFilePaths,
    //                 img1: tempFilePaths
    //                     // img2: tempFilePaths[1],
    //                     // img3: tempFilePaths[2]
    //             })
    //         }
    //     })
    // },
    removeImg:function (e) {
        var index = e.detail
        var imgList = this.data.imgList
        imgList.splice(index, 1);
        var count = this.data.imgCount + 1
        this.setData({
            imgList:imgList,
            imgCount:count
        })
    },
    addImg:function (e) {
        console.log(e)
        var imgSeq = e.detail
        if (imgSeq.length == 1){
            this.setData({
                imgCount:2
            })
        }else if (imgSeq.length == 2){
            this.setData({
                imgCount:1
            })
        } else if (imgSeq.length == 3){
            this.setData({
                imgCount:0
            })
        }
        this.setData({
            imgList:imgSeq,
        })
    },
    toDetail: function() {
        wx.switchTab({
            url: '../orders/orders',
        })
    }
})