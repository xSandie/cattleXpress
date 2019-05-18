var app = getApp();
const urlModel = require('../../utils/urlSet.js');
const helper = require('../../utils/helper.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportProcess: 0, //卡住显示的内容

        policeIcon: "../../images/policeLight.png",
        camIcon: "../../images/upload.png",
        recLastName: "黄牛同学",//被举报人姓
        reportTime: "暂未生成",
        description: '乱举报也会被封号，请谨慎举报',

        reportRe1: '',
        report1: [],
        complainRe1: '',
        complain1: [],
        reportRe2: '',
        report2: [],
        complainRe2: '',
        complain2: [],
        //图片上传相关

        orderId: null,
        policeId: null, //本条举报记录的id
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
        imgCount: 3


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options.orderId)
        var that = this
        if (options.orderId) {
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
                orderId: options.orderId,
                recLastName: options.pubLastName,
                reportProcess: 0
            })
        }
        if (options.detailID) {
            // detailID即举报记录id,从列表过来的
            this.setData({
                policeId: options.detailID
            })
            wx.request({ //获取举报订单详情
                url: urlModel.url.reportDetail,
                method: 'GET',
                data: {
                    'policeId': options.detailID,
                    'getterID': app.globalData.sessionID
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
                            orderId: res.data.orderId,
                            recLastName: res.data.pubLastName,
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
                        recLastName: res.data.lastname,
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
    report: function(e) {
        var that = this
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
        helper.UIManager.loading('发布中');
        if (that.data.reportProcess) {
            //再次举报
            wx.request({
                url: urlModel.url.policePub,
                data: {
                    'reason':e.detail.value.reason,
                    'order_id':that.data.orderId,
                    'sessionID':app.globalData.sessionID,
                    'complain_id':that.data.policeId
                },
                method:'POST',
                success: function(res) {
                    if (res.statusCode == 200) {
                        upRes = this.uploadPic(res.data.complain_id)
                        wx.hideLoading()
                        if (upRes==0){
                            wx.showToast({
                                title:'发布失败，请重试',
                                icon:'none'
                            })
                        } else{
                            wx.showToast({
                                title:'发布成功'
                            })
                            that.onPullDownRefresh()
                        }
                    }else {
                        wx.hideLoading()
                        wx.showToast({
                            title:'发布失败，请重试',
                            icon:'none'
                        })
                    }
                },
                fail: function() { //无论成功还是失败都会执行
                    wx.hideLoading()
                    wx.showToast({
                        title:'发布失败，请重试',
                        icon:'none'
                    })
                }
            })
        } else {
            //初次举报
            wx.request({
                url: urlModel.url.policePub,
                data: {
                    'reason':e.detail.value.reason,
                    'order_id':that.data.orderId,
                    'sessionID':app.globalData.sessionID,
                    'report_time':that.data.reportTime
                },
                method:'POST',
                success: function(res) {
                    if (res.statusCode == 200) {
                        upRes = this.uploadPic(res.data.complain_id)
                        wx.hideLoading()
                        if (upRes==0){
                            wx.showToast({
                                title:'发布失败，请重试',
                                icon:'none'
                            })
                        } else{
                            wx.showToast({
                                title:'发布成功'
                            })
                            that.onPullDownRefresh()
                        }
                    }else {
                        wx.hideLoading()
                        wx.showToast({
                            title:'发布失败，请重试',
                            icon:'none'
                        })
                    }
                },
                fail: function() { //无论成功还是失败都会执行
                    wx.hideLoading()
                    wx.showToast({
                        title:'发布失败，请重试',
                        icon:'none'
                    })
                }
            })
        }

    },
    retrieve: function() {
        var that = this
        wx.showModal({
                title: '确定撤销？',
                content: '撤销后不可重新发起新的举报，且举报将不再可见',
                confirmText: '我想好了',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        wx.request({
                            url: urlModel.url.cancelPolice,
                            method: 'POST',
                            data: {
                                'sessionID': app.globalData.sessionID,
                                'complain_id': that.data.policeId
                            },
                            success: function(res) {
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

    nextSubmit:function (e) {
        console.log(e)
        helper.funcManager.formIdCollecter(e.detail.formId,
            app.globalData.sessionID,urlModel.url.collectFormId);
        if(e.detail.target.dataset.srcBtn=='report'){
            console.log(e.detail.target.dataset.srcBtn)//进入举报
            this.report(e)
        }else if(e.detail.target.dataset.srcBtn=='retrieve'){
            console.log(e.detail.target.dataset.srcBtn)//进入撤销
            this.cancel(e)
        }
    },

    uploadPic:function(complainId){
        var ok=0;
        var that = this
        for (let item in this.data.imgList) {
            wx.uploadFile({
                url: urlModel.url.policePub,
                filePath: item,
                name: 'police_img',
                header: {
                    "Content-Type": "multipart/form-data",
                    'accept': 'application/json',
                    //'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
                },
                formData: {
                    sessionID: app.globalData.sessionID, //其他额外的formdata，userId
                    complain_id: complainId,
                    report_status:that.data.reportProcess
                },
                success: function(res) {
                    if (res.statusCode == 200) {
                        ok += 1;
                    } else {
                        ok -= 1;
                    }
                },
                fail:function () {
                    ok -= 1;
                }
            })
        }
        if(ok == this.data.imgList.length){
            return 1;
        }else {
            return 0;//有图片上传失败
        }
    }
})