var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportProcess: 1,

        policeIcon: "../../images/policeLight.png",
        camIcon: "../../images/photo.png",
        LName: "向同学",
        reportTime: "2018-05-07 16:00",
        lastDep: '若对方举报信息不实，请申诉',

        reportRe1: '按公式的飞机嘎设计的飞机啥的就放假啊是，哈吉斯的功夫哈三个地方和嘎哈施工方就发哈上雕刻技法哈师大复活节，撒娇的黄瓜富含精氨酸规划就',
        report1: [
            "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
        ],
        complainRe1: '骄傲是的回复几个撒旦艰苦法国红酒嘎时间激发函数嗲激发，是大哥和法师就规划结婚啥的发货',
        complain1: [
            "http://img02.tooopen.com/images/20150514/tooopen_sy_122783536345.jpg", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
        ],
        reportRe2: '爱德华三分绝杀到付即可获得就寒假结束大华，刷等级回复就安徽啊',
        report2: [
            "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
        ],
        complainRe2: '安徽大厦回复接受的话就返回基地和飞机啊发，艰苦撒旦和福建安徽山东分局数据库的回复接受的话附件',
        complain2: [
            "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png", "http://p1.qzone.la/upload/20150311/tsljdoeq.png"
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