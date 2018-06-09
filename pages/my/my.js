Page({

    /**
     * 页面的初始数据
     */
    data: {
        cardBack: "../../images/bigback.png",
        balance: '40.00',
        creditScr: 185,
        level: 1,
        realName: "向书晗",
        certif: true,
        schoNum: "41612057",
        addressIcon: "../../images/myAdress.png",
        policeIcon: "../../images/police.png",
        nextIcon: "../../images/nextBlack.png"
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
    toAddrEdit: function() {
        console.log("addr被点击了");
        wx.navigateTo({
            url: '../defAddrEdit/defAddrEdit',
        })
    },
    toPoList: function() {
        console.log("toPoList被点击了");
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