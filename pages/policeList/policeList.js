var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myPoliceList: [
            // myPoliceList: [{
            //     LName: '',
            //     policeStatus: null,
            //     reason: "",
            //     reportOrderID: '',
            // }, {
            //     LName: '',
            //     policeStatus: null,
            //     reason: "",
            //     reportOrderID: '',
            // }],
        ],
        policeMeList: [
            //     {
            //     LName: '',
            //     policeStatus: null,
            //     reason: "",
            //     reportOrderID: '',
            // }, {
            //     LName: '',
            //     policeStatus: null,
            //     reason: "",
            //     reportOrderID: '',
            // }
        ]
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
        var that = this
        wx.request({
          url: 'http://api.inschool.tech/HelloWord/my/reportinfo', //填充完成订单url
            method: 'GET',
            data: {
                'uid': app.globalData.user_ID,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    myPoliceList: res.data[0],
                    policeMeList: res.data[1]
                })
            },
            fail: function() {},
            complete: function() {}
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
    toDetailProposal: function(event) {
        var that = this
        var reportOrderID = event.currentTarget.dataset.reportorderid;
        wx.navigateTo({
            url: '../policeDetailProposal/policeDetailProposal?id=' + reportOrderID,
        })
    },
    toDetailRec: function(event) {
        var that = this
        var reportOrderID = event.currentTarget.dataset.reportorderid;
        wx.navigateTo({
            url: '../policeDetailRec/policeDetailRec?id=' + reportOrderID,
        })
    }
})