var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        studentOrTeacher: true,
        schoolIcon: "../../images/schoolIcon.png",
        passCertifIcon: "../../images/next.png",
        verifCode: '',
        schoolName: "点击选择学校",
        row1: false,
        row2: false,
        row3: false,
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
        this.setData({
            schoolName: app.globalData.schoolName
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
    selStudent: function() {
        this.setData({
            studentOrTeacher: true
        })
    },
    selTeacher: function() {
        this.setData({
            studentOrTeacher: false
        })
    },
    schoolInput: function() {
        wx.navigateTo({
            url: '../changeSchool/changeSchool',
        })
    },
    change1: function() {
        this.setData({
            row1: true
        })
        var that = this
        wx.request({
            url: '', //填充url请求列表
            method: 'GET',
            data: {
                'schoolID': app.globalData.schoolID,
                'studentOrTeacher': that.data.studentOrTeacher,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    verifCode: res.data
                })
            },
            fail: function() {},
            complete: function() {}
        })
    },
    change2: function() {
        this.setData({
            row2: true
        })
    },
    change3: function() {
        this.setData({
            row3: true
        })
    },
    certif: function(e) {
        console.log(e.detail.value)
        wx.request({
            url: '', //填充认证url
            method: 'POST',
            data: e.detail.value,
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                wx.showToast({
                    title: '认证成功',
                    icon: 'success',
                    duration: 1500
                })
                app.globalData.ourUserStatus = res.data.xx //需要替换
                app.globalData.sex = res.data.xx
                app.globalData.userName = res.data.xx
                app.globalData.schoolNumb = res.data.xx
                setTimeout(function() {
                    wx.navigateBack({})
                }, 1000);
            },
            fail: function() {
                // wx.showToast({
                //     title: '认证成功',
                //     icon: 'success',
                //     duration: 1000
                // })
                // setTimeout(function() {
                //     wx.navigateBack({})
                // }, 1000);
                wx.showModal({
                  title: '认证失败',
                  content: '请认真核对信息',
                  showCancel: false,
                  confirmText: '返回',
                  confirmColor: '#faaf42',
                })
            },
            complete: function() {}
        })
    }
})