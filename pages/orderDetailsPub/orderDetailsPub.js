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
        cancelIcon: "../../images/cancelIcon.png",

        fetchCode: 'A1-4568',
        haoIcon: '../../images/numRear.png',
        mingIcon: '../../images/deName.png',
        jianIcon: '../../images/sizeIcon.png',
        shiIcon: '../../images/timeIcon.png',

        shiText: '05-07 16:00前',
        mingText: '向书晗',
        jianText: '小件',
        haoText: '9021',

        sdLoc: '宿舍区 硕士楼 D1-2245',
        weightInfo: '<0.5KG',
        otherInfo: '静安大火飞机喀什电话费就爱看华盛顿发射啊圣诞节快发哈设计开发和',
        exWorry: true,

        reName: "刘国权 41612057",
        reTime: " 接单时间：05-07 15:00",

        statusCode: 1,
        status: "",
        statusBack: "",
        statusBackWaitMe: "linear-gradient(90deg,#fed25c, #f9a93e)",
        statusBackFinOrRec: "linear-gradient(90deg,#4ED662, #37BD76)",
        statusBackOutofTime: "linear-gradient(90deg,#D6D6D6, #BABABA)",
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
        if (this.data.statusCode == 0 || this.data.statusCode == 1) {
            this.setData({
                statusBack: "linear-gradient(90deg,#fed25c, #f9a93e)",
            })
        } else if (this.data.statusCode == 2 || this.data.statusCode == 3) {
            this.setData({
                statusBack: "linear-gradient(90deg,#4ED662, #37BD76)"
            })
        } else if (this.data.statusCode == 4) {
            this.setData({
                statusBack: "linear-gradient(90deg,#D6D6D6, #BABABA)"
            })
        } else if (this.data.statusCode == 5 || this.data.statusCode == 6) {
            this.setData({
                    statusBack: "linear-gradient(90deg,#D6D6D6, #BABABA)"
                })
                //异常也不让用户太糟心
        }


        if (this.data.statusCode == 0) {
            this.setData({
                status: "待收货"
            })
        } else if (this.data.statusCode == 1) {
            this.setData({
                status: "待接单"
            })
        } else if (this.data.statusCode == 2) {
            this.setData({
                status: "待送达"
            })
        } else if (this.data.statusCode == 3) {
            this.setData({
                status: "已完成"
            })
        } else if (this.data.statusCode == 4) {
            this.setData({
                status: "已过期"
            })
        } else if (this.data.statusCode == 5 || this.data.statusCode == 6) {
            this.setData({
                    status: "异常"
                })
                //异常也不让用户太糟心
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

    }
})