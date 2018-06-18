var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        exLogo: '../../images/STOLOGO.png',
        exLocTime: '周一至周日08：00至19：00',
        exInstance: '申通快递·阳光苑',
        //原实例时间地点

        exlocArray: [
            ['新东门', '老东门', '硕士楼', '新勇西', '阳光苑二楼'],
            ['顺丰', '申通', '中通', '圆通', '百世汇通', '韵达', '天天快递', 'EMS', '京东']
        ],
        expressLoc: '新东门' + '·' + '百世汇通', //这就是默认
        exlocfirstIndex: 0,
        exlocSecondIndex: 0,
        expressID: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { //获取快递站点基本信息
        var that = this
        wx.request({
            url: '', //填充单独报错URL
            method: 'GET',
            data: {
                'expressLocID': options.id,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    //设置页面参数
                    exLogo: res.data,
                    exLocTime: res.data,
                    exInstance: res.data,
                    expressLoc: res.data, //与上面相同
                    expressID: res.data,

                })
            },
            fail: function() {},
            complete: function() {}
        })
        this.setData({
            exlocArray: app.globalData.exlocArray
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
    fixReport: function(e) {
        var that = this
        console.log(e)
        wx.request({
            url: '', //填充报错URL
            method: 'POST',
            data: {
                'exLocTime': e.detail.value.reportIn,
                'exInstance': e.detail.value.selExCon,
                'expressID': that.data.expressID,
                'userID': app.globalData.user_ID
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    duration: 1000
                })
            },
            fail: function() {},
            complete: function() {}
        })
    },
    exlocChange: function(e) {
        console.log(e);
        console.log('时间picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.exlocArray[0][this.data.exlocfirstIndex] + '·' + this.data.exlocArray[1][this.data.exlocSecondIndex]
        this.setData({
            expressLoc: selected
        })

    },
    exlocColumnChange: function(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        if (e.detail.column == 0) {
            this.setData({
                exlocfirstIndex: e.detail.value
            })
        } else {
            this.setData({
                exlocSecondIndex: e.detail.value
            })
        }
    },
})