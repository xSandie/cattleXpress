Page({

    /**
     * 页面的初始数据
     */
    data: {
        exLogo: '../../images/STOLOGO.png',
        exLocTime: '营业时间：' + '周一至周日08：00至19：00',
        exInstance: '阳光苑·申通快递',
        fxIcon: '../../images/fixBtnIcon.png',
        LName: '向',
        pubtime: '1月19日 12：00',
        reward: '20',

        finIcon: '../../images/checkLight.png',
        policeTAIcon: '../../images/policeDim.png',
        conTAIcon: '../../images/conDim.png',
        conIcon: '../../images/conIcon.png',
        policeIcon: '../../images/policeLight.png',

        fetchCode: 'A1-4568',
        haoIcon: '../../images/numRear.png',
        mingIcon: '../../images/deName.png',
        jianIcon: '../../images/sizeIcon.png',
        shiIcon: '../../images/timeIcon.png',

        shiText: '05-07 16:00',
        mingText: '向书晗',
        jianText: '小件',
        haoText: '9021',

        sdLoc: '宿舍区 硕士楼 D1-2245',
        weightInfo: '<0.5KG',
        otherInfo: '静安大火飞机喀什电话费就爱看华盛顿发射啊圣诞节快发哈设计开发和',
        exWorry: true,
        phoneNum: '15622578294',

        statusCode: 0,
        expressID: '1562'

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options.id)
        var that = this
        wx.request({
            url: '', //填充请求订单具体信息url
            method: 'GET',
            data: {
                'orderID': options.id,
                'user_ID': app.globalData.user_ID,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    //设置页面参数，
                })
            },
            fail: function() {},
            complete: function() {}
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
    conTA: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.phoneNum //仅为示例，并非真实的电话号码
        })
    },
    toLaw: function() {
        wx.showModal({
            title: '请谨慎举报',
            content: '遇以下情况可举报用户：\r\n1、快递被接单者领走但未被送达；\r\n2、快递被接单者损坏；\r\n3、接单者送达后未收到酬劳；\r\n4、接单者送达后收到的酬劳少于接单前商定的酬劳；\r\n5、其他损害用户利益的行为。\r\n我们将视情况给予违规用户处罚。',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    policeTA: function(event) {
        var that = this
        wx.showModal({
            title: '确定举报？',
            content: '请谨慎举报',
            confirmText: '确认举报',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                        url: '../policeDetailProposal/policeDetailProposal?id=' + that.data.expressID
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    toFix: function(event) {
        var expressID = event.currentTarget.dataset.expressId
        console.log(expressID)
        wx.navigateTo({
            url: '../reportExError/reportExError?id=' + expressID,
        })
    },
    finOrder: function() {
        var that = this
        wx.request({
            url: '', //填充完成订单url
            method: 'GET',
            data: {
                'orderID': that.data.expressID,
                'user_ID': app.globalData.user_ID,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    //设置页面参数
                    statusCode: 0,
                })
                wx.showToast({
                    title: '等待对方确认',
                    icon: 'success',
                    duration: 1000
                })
            },
            fail: function() {},
            complete: function() {}
        })
    }

})