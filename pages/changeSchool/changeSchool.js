// pages/changeSchool/changeSchool.js
var app = getApp()
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
    search: function(e) {
        console.log(e.detail.value)
        var that = this
        wx.request({
            url: '', //填充查询url
            method: 'GET',
            data: e.detail.value,
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    answer: res.data.xx //需修改
                })
            },
            fail: function() {},
            complete: function() {}
        })
    },
    selectAnswer: function(e) {
        //console.log(e)
        var schoolid = e.currentTarget.dataset.schoolid
            // app.globalData.schoolID = schoolid
        wx.request({
            url: '', //填充选择url
            method: 'POST',
            data: {
                'schoolID': schoolid,
                'user_ID': app.globalData.user_ID
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function() {
                app.globalData.schoolID = schoolid
                app.globalData.schoolName = e.currentTarget.dataset.schoolname
                wx.showToast({
                    title: '修改成功',
                    icon: 'succes',
                    duration: 1000
                })
                setTimeout(function() {
                    wx.navigateBack({

                    })
                }, 1000);

            },
            fail: function() {},
            complete: function() {}
        })
    }
})