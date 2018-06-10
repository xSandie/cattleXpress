// pages/changeSchool/changeSchool.js
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        schoolIcon: "../../images/schoolIcon.png",
        answer: [{
            name: "陕西师范大学（长安校区）",
            schoolID: 155
        }]
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
    search:function(e){
      console.log(e.detail.value)
      wx.request({
        url: '', //填充url请求列表
        method: 'GET',
        data: {
          'schoolID': app.globalData.schoolID,
          'user_ID': app.globalData.user_ID,
          'time': 1
        },
        header: {
          "Content-Type": "applciation/json"
        },
        success: function (res) {
          that.setData({
            listCount: res.data.listCount
          })
        },
        fail: function () { },
        complete: function () { }
      })
    }
})