Page({

    /**
     * 页面的初始数据
     */
    data: {
        mySchoolName: '陕西师范大学（长安校区）',
        reward: '99',
        loctionSrc: "../../images/location.png",
        pubIcon: '../../images/publisher.png',
        hBtnIcon: '../../images/bTopIcon.png',
        pullIcon: '../../images/pull.png',
        hBtnText: '回到顶部',
        listCount: [{
                exInstance: '申通快递·阳光苑',
                sdInstance: '宿舍区 硕士楼',
                exWorry: true,
                reward: '2',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 18:00',
                pubName: '向同学 41612057'
            },
            {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058'
            },
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

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
    toSumDetail: function() {
        wx.navigateTo({
            url: "../orderDetailsVeiwer/orderDetailsVeiwer"
        })
    }
})