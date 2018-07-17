var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardBack: "../../images/bigback.png",
        balance: null,
        creditScr: 185,
        level: 1,
        realName: "",
        // certif: false,
        certif: true,
        schoNum: "41612057",
        addressIcon: "../../images/myAdress.png",
        policeIcon: "../../images/police.png",
        nextIcon: "../../images/nextBlack.png",
        tempName: '实习黄牛'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // if (app.globalData.ourUserStatus == 4) {
        //     wx.showModal({
        //         title: '请认证',
        //         content: '点击确定前往教务系统认证！',
        //         confirmColor: '#faaf42',
        //         showCancel: false,
        //         success: function(res) {
        //             if (res.confirm) {
        //                 console.log('用户点击确定')
        //                 wx.redirectTo({
        //                     url: '../certifPage/certifPage'
        //                 })
        //             }
        //         }
        //     })
        // }
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
            balance: app.globalData.balance
        })
        var that = this
        wx.request({
            url: 'http://45.40.197.154/HelloWord/my/personinfo', //用户余额信用获取
            method: 'GET',
            data: {
                'Uid': app.globalData.user_ID,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                console.log(res)
                that.setData({
                    balance: res.data.balance, //修改参数
                    creditScr: res.data.credit,
                    level: res.data.Accress
                })
                app.globalData.balance = res.data.balance
            },
            fail: function() {},
            complete: function() {}
        })
        this.setData({
            realName: app.globalData.userName,
            schoNum: app.globalData.schoolNumb,

        })
        if (app.globalData.ourUserStatus != 4) {
            this.setData({
                certif: true
            })
        }
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
    toAddrEdit: function() {
        // console.log("addr被点击了");
        wx.navigateTo({
            url: '../defAddrEdit/defAddrEdit',
        })
    },
    toPoList: function() {
        // console.log("toPoList被点击了");
        wx.navigateTo({
            url: '../policeList/policeList',
        })
    },
    supportUs: function() {
        wx.showModal({
            title: '感谢',
            content: '开发团队富得很，暂时不需要支持噢！',
            showCancel: false,
            confirmText: '知道啦',
            confirmColor: '#faaf42'
        })
    },
    joinUs: function() {
        wx.showModal({
            title: '神秘的组织',
            content: '我们才不会轻易告诉你联系方式呢，哼！',
            showCancel: false,
            confirmText: '厉害了',
            confirmColor: '#faaf42'
        })
    }
})