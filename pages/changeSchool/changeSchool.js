// pages/changeSchool/changeSchool.js
var app = getApp()
const urlModel = require('../../utils/urlSet.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        schoolIcon: "../../images/schoolIcon.png",
        answer: []
            //     <view wx:for="{{answer}}">
            //     <view hover-class="answerHover1" class="answer" data-schoolID="{{item.schoolid}}" data-schoolName="{{item.schoolname}}"bindtap="selectAnswer">
            //         <text class="Ti">点击选择</text>
            //         <text class="con">{{item.schoolname}}</text>
            //     </view>
            // </view>
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
                content: '目前只支持"陕西师范大学"两校区',
                showCancel: false,
                confirmText: '加油!',
                confirmColor: '#faaf42',
                success: function(res) {
                    wx.navigateBack({})
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
            url: urlModel.url.searchSchool, //填充查询url
            method: 'GET',
            data: {
                school: e.detail.value.schoolName,
            },
            // header: {
            //     "Content-Type": "applciation/json"
            // },
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
            url: urlModel.url.changeSchool, //填充更改学校url
            method: 'POST',
            data: {
                userID: app.globalData.user_ID,
                schoolID: schoolid,
                // Sex: app.globalData.sex
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    app.globalData.userName = res.data.username
                    app.globalData.schoolNumb = res.data.school_num //学号
                    app.globalData.schoolID = res.data.school_id
                    app.globalData.schoolName = res.data.school_name
                    app.globalData.sex = res.data.sex
                    app.globalData.exlocArray = res.data.kuaidi
                    app.globalData.column2_0 = res.data.sushequ
                    app.globalData.column2_1 = res.data.jiaoxuequ
                    app.globalData.column2_2 = res.data.othersarea
                    app.globalData.column2_3 = res.data.kuaxiaoqu
                    app.globalData.balance = res.data.balance
                    app.globalData.dateRange = res.data.dateRange
                    app.globalData.havesetPayCode = res.data.havePayCode

                    app.globalData.msg_con = res.data.msg_con
                    app.globalData.msg_title = res.data.msg_title
                    app.globalData.sys_status = res.data.sys_status

                    if (res.data.default) { app.globalData.default = res.data.default }
                    app.globalData.user_ID = res.data.gId
                    app.globalData.ourUserStatus = res.data.user_status
                    if (res.data.user_status == 4) { app.globalData.certif = false } else { app.globalData.certif = true }
                    wx.showToast({
                        title: '修改成功',
                        icon: 'succes',
                        duration: 1000,
                        success: function() {},
                        complete: function() {}
                    })
                    setTimeout(function() { wx.navigateBack({}) }, 1000);
                }

            }
        })

    }
})