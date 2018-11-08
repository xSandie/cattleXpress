// pages/changeSchool/changeSchool.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        schoolIcon: "../../images/schoolIcon.png",
        answer: []
    },

    /*{
        name: "陕西师范大学（长安校区）",
        schoolID: 155
    }*/

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showModal({
            title: '抱歉',
            content: '目前只支持"陕西师范大学长安校区"',
            showCancel: false,
            confirmText: '加油!',
            confirmColor: '#faaf42',
            success: function(res) {
              wx.navigateBack({
              })
            },
            complete: function(res) {},
        })
        // wx.showToast({
        //     title: '目前只有"陕西师范大学长安校区"',
        //     icon: 'none',
        //     duration: 3000
        // })
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
        //console.log(e.detail.value)
        var that = this
        wx.request({
          url: 'http://45.40.197.154/HelloWord/firstpage/schoolinfo', //填充查询url
            method: 'GET',
            data: {
                school: e.detail.value.schoolName,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    answer: res.data //需修改
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
            url: 'http://45.40.197.154/HelloWord/firstpage/schoolidwaitreceive', //填充更改学校url
            method: 'POST',
            data: {
                Account: app.globalData.user_ID,
                schoolID: schoolid,
                Sex: app.globalData.sex
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
                //console.log(res)
                if (res.statusCode == 200) {
                    //console.log("更改提交成功")
                }
                app.globalData.schoolID = schoolid
                app.globalData.schoolName = e.currentTarget.dataset.schoolname
                    //console.log(app.globalData.schoolName)
                wx.showToast({
                    title: '修改成功',
                    icon: 'succes',
                    duration: 1000,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateBack({

                            })
                        }, 1000);

                    },
                    complete: function() {}
                })
            }
        })

    }
})