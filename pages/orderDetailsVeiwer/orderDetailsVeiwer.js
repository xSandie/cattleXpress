Page({

    /**
     * 页面的初始数据
     */
    data: {
        exLogo: '../../images/STOLOGO.png',
        exLocTime: '营业时间：' + '周一至周日08：00至19：00',
        exInstance: '申通快递·阳光苑',
        fxIcon: '../../images/fixBtnIcon.png',
        conIcon: '../../images/checkLight.png',
        sdInstance: '宿舍区 硕士楼',

        exWorry: true,
        exWeight: '<1KG',
        exSize: '小件',
        exExTime: '05-07 18:00',

        dText: '氨基酸的覅加瓦尔覅骄傲i圣诞节发士大夫艰苦拉萨的积分收到回复骄傲是的回复的覅加瓦尔放假啊撒谎的飞机',

        reward: '20',
        schNum: '41612057',
        LName: '向',
        pubtime: '1月19日 12：00',

        phoneNum: 15529268167,
        certif: false

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
    /**
     * 接单按钮按下
     */
    recOrder: function() {
        if (this.data.certif == true) {
            wx.showModal({
                title: '确认接单',
                content: '接单后要准时送达噢',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../orderDetailsRec/orderDetailsRec'
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }

    },
    conTA: function() {
        if (this.data.certif == false) {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.makePhoneCall({
                phoneNumber: this.data.phoneNum //仅为示例，并非真实的电话号码
            })
        }
    }
})