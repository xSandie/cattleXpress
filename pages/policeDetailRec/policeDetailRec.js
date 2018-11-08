var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportProcess: 1,

        policeIcon: "../../images/policeLight.png",
        camIcon: "../../images/photo.png",
      LName: "向同学",
        reportTime: "",
        lastDep: '若对方举报信息不实，请申诉',

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

        img1: null,
        img2: null,
        img3: null,
        imgUp: [],

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
        console.log(e)
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
    uploadIMG: function() {
        //上传选择的图片
    }
})