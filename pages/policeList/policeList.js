const urlModel = require('../../utils/urlSet.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myPoliceList: [
            // myPoliceList: [{
            //     pubLastName: '',
            //     policeStatus: null,
            //     reason: "",
            //     reportOrderID: '',
            // }, {
            //     pubLastName: '',
            //     policeStatus: null,
            //     reason: "",
            //     reportOrderID: '',
            // }],
        ],
        policeMeList: [
            //     {
            //     pubLastName: '',
            //     policeStatus: null,
            //     reason: "",
            //     reportOrderID: '',
            // }, {
            //     pubLastName: '',
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
            url: urlModel.url.policelist, //查询举报条目列表
            method: 'GET',
            data: {
                'userID': app.globalData.sessionID,
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
            success: function(res) {
                // console.log(res)
                that.setData({
                    myPoliceList: res.data.myPoliceList,
                    policeMeList: res.data.policeMeList
                })
                if (res.data.myPoliceList.length == 0 && res.data.policeMeList.length == 0) {
                    wx.showToast({
                        title: '太好了,什么也没有',
                        icon: 'none',
                        duration: 2000
                    })
                }
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
        return {
            title: '校园快递互助代取平台',
            path: '/pages/home/home',
            imageUrl: '/images/sharePic.jpg'
        }
    },
    toDetailProposal: function(event) {
        // var that = this
        var reportOrderID = event.currentTarget.dataset.reportorderid;
        wx.navigateTo({
            url: '../policeDetailProposal/policeDetailProposal?detailID=' + reportOrderID,
        })
    },
    toDetailRec: function(event) {
        // var that = this
        var reportOrderID = event.currentTarget.dataset.reportorderid;
        wx.navigateTo({
            url: '../policeDetailRec/policeDetailRec?detailID=' + reportOrderID,
        })
    }
})