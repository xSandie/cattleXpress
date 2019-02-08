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

        // wx.showModal({
        //         title: '抱歉',
        //         content: '目前只支持"陕西师范大学"两校区',
        //         showCancel: false,
        //         confirmText: '加油!',
        //         confirmColor: '#faaf42',
        //         success: function(res) {

        //         },
        //         complete: function(res) {},
        //     })

        wx.showToast({
            title: '目前只有"陕西师范大学"',
            icon: 'none',
            duration: 3000
        })
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
        var send_data = {
            'userID': app.globalData.sessionID
        }

        // var that = this
        wx.request({
            url: urlModel.url.getAllSchool,
            method: 'GET',
            data: send_data,
            success: function(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        answer: res.data.school_ans
                    })
                }
            }
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
    // search: function(e) {
    //     //console.log(e.detail.value)
    //     var that = this
    //     wx.request({
    //         url: urlModel.url.searchSchool, //填充查询url
    //         method: 'GET',
    //         data: {
    //             school: e.detail.value.schoolName,
    //         },
    //         // header: {
    //         //     "Content-Type": "applciation/json"
    //         // },
    //         success: function(res) {
    //             that.setData({
    //                 answer: res.data //需修改
    //             })
    //         },
    //         fail: function() {},
    //         complete: function() {}
    //     })
    // },
    selectAnswer: function(e) {
        //todo 考虑加入是否允许修改学校的逻辑
        let pages = getCurrentPages()
            // var prevPage = pages[pages.length - 2];
            // console.log(pages)

        var schoolid = e.currentTarget.dataset.schoolid
        wx.showLoading({
            title: '更改学校中',
            mask: true
        })
        wx.request({
            url: urlModel.url.changeSchool, //填充更改学校url
            method: 'POST',
            data: {
                userID: app.globalData.sessionID,
                schoolID: schoolid,
            },
            success: function(res) {
                if (res.statusCode == 200 && res.data.msg == 'ok') {
                    // app.globalData.userName = res.data.username
                    // app.globalData.schoolNumb = res.data.school_num //学号
                    // app.globalData.schoolID = res.data.school_id
                    // app.globalData.schoolName = res.data.school_name
                    // // app.globalData.sex = res.data.sex
                    // app.globalData.expressLocArray = res.data.kuaidi
                    // app.globalData.dormArea = res.data.sushequ
                    // app.globalData.teachArea = res.data.jiaoxuequ
                    // app.globalData.otherArea = res.data.othersarea
                    // app.globalData.transCampus = res.data.kuaxiaoqu
                    // app.globalData.balance = res.data.balance
                    // // app.globalData.dateRange = res.data.dateRange
                    // app.globalData.havePayCode = res.data.havePayCode

                    // app.globalData.msg_con = res.data.msg_con
                    // app.globalData.msg_title = res.data.msg_title
                    // app.globalData.sys_status = res.data.sys_status

                    // if (res.data.default) { app.globalData.default = res.data.default }
                    // app.globalData.sessionID = res.data.gId
                    // app.globalData.ourUserStatus = res.data.user_status
                    // if (res.data.user_status == 4) { app.globalData.haveCertif = false } else { app.globalData.haveCertif = true }
                    app.getUser().then(function(res) {
                        wx.hideLoading()
                        wx.showToast({
                            title: '修改成功',
                            duration: 1000,
                            success: function() {},
                            complete: function() {}
                        })
                        for (var index = 0; index < pages.length; index++) {
                            console.log(pages[index])
                            if (pages[index].route == 'pages/home/home') {
                                pages[index].setData({
                                    orderList: null
                                })
                                pages[index].onPullDownRefresh()
                                    // console.log(pages[index])
                            }

                        }
                        setTimeout(function() {

                            //设置首页为空逻辑，目前是前一页
                            wx.navigateBack({})
                        }, 1000);
                    })

                } else {
                    wx.hideLoading()
                    wx.showToast({
                        title: '修改失败，请重试',
                        icon: 'none',
                        duration: 2000
                    })
                }
            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                    title: '修改失败，请重试',
                    icon: 'none',
                    duration: 2000
                })
            }
        })

    }
})