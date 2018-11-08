var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportProcess: null,

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
        policeID:null//本条举报记录的id
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      // console.log(options.orderID)
        var that = this
        this.setData({
          orderID: options.orderID
        })
      if (options.detailID){
        // detailID即举报记录id
        this.setData({
          policeID: options.detailID
        })
        wx.request({//获取举报订单详情
          url: urlModel.url.reporterDetail,
          method:'GET',
          data:{
            'policeID': options.detailID
          },
          success:function(res){

          }
        })
      }else{
        //生成举报记录的前端时间
        var oDate = new Date();
        var year = oDate.getFullYear();
        var month = oDate.getMonth() + 1;
        var day = oDate.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var generateTime = year + '-' + month + '-' + day + ' ' + hour+':' + minute
        that.setData({
          reportTime:generateTime,
          orderID: options.orderID,
          LName:options.LName
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
        var that=this
        //发起举报
      if (that.data.reportProcess){
        //再次举报
      }else{
        //初次举报
        wx.uploadFile({
          url: urlModel.url.policePub,
          filePath: that.data.imgUp,
          name: 'police_img',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            //'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            gId: app.globalData.user_ID,  //其他额外的formdata，userId
            reason: e.detail.value.reportRe1,
            orderID: that.data.orderID,
            pubTime: that.data.reportTime
          },
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              //设置返回参数
              that.setData({

              })
              wx.showToast({
                title: '举报成功',
              })
              
            } else {
              wx.showToast({
                title: '举报失败请重试',
                icon:'none'
              })
            }
          }
        })
      }
      
    },
    retrieve: function() {
        wx.showModal({
            title: '确定撤销？',
            content: '撤销后仍可重新发起新的举报',
            confirmText: '我想好了',
            confirmColor: '#faaf42'
        })
        //发起撤销请求，上传撤销用户id，后端查询是否有权力撤销
        wx.request({
          url: '',
          method:'POST',

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
    chooseIMG: function(e) {
        var tempFilePaths
        var that = this
        wx.chooseImage({
            count: 3, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                console.log(tempFilePaths);
                that.setData({
                    imgUp: tempFilePaths,
                    img1: tempFilePaths[0],
                    img2: tempFilePaths[1],
                    img3: tempFilePaths[2]
                })
            }
        })
    },
    // uploadIMG: function() {
    //     //上传选择的图片
    // }
})