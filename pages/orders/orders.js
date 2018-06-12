Page({

    /**
     * 页面的初始数据
     */
    data: {
        navbar: ['未完成', '已完成'],
        currentTab: 0,
        ongoRecListCount: [{
            exState: '4',
            reward: '6',
            exInstance: '圆通·硕士楼',
            sdInstance: '宿舍区 周园',
            exWorry: true,
            fetchCode: 'A1-400121',
            fatchPhone: '9021',
            fetchName: '张筠瑶',
            exWeight: '<1KG',
            exSize: '小件',
            exExTime: '05-07 18:00'
        }, {
            exState: '0',
            reward: '6',
            exInstance: '中通·新勇',
            sdInstance: '宿舍区 硕士楼',
            exWorry: false,
            fetchCode: 'A1-401541',
            fatchPhone: '9021',
            fetchName: '向书晗',
            exWeight: '<1KG',
            exSize: '小件',
            exExTime: '05-07 18:00'
        }],
        ongoPubListCount: [{
                exState: '1',
                reward: '5',
                exInstance: '京东·新勇',
                sdInstance: '宿舍区 硕士楼',
                exWorry: true,
                recName: '刘同学 41612058',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 18:00'
            },
            {
                exState: '2',
                reward: '16',
                exInstance: '黄马甲·新东门',
                sdInstance: '宿舍区 硕士楼',
                exWorry: true,
                recName: '刘同学 41612058',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 18:00'
            }
        ],

        finRecListCount: [{
            exState: '3',
            reward: '6',
            exInstance: '圆通·硕士楼',
            sdInstance: '宿舍区 周园',
            exWorry: true,
            exWeight: '<1KG',
            exSize: '小件',
            exExTime: '05-07 18:00',
            pubName: '向同学'
        }, {
            exState: '3',
            reward: '6',
            exInstance: '中通·新勇',
            sdInstance: '宿舍区 硕士楼',
            exWorry: false,
            exWeight: '<1KG',
            exSize: '小件',
            exExTime: '05-07 18:00',
            pubName: '向同学'

        }],
        finPubListCount: [{
                exState: '4',
                reward: '5',
                exInstance: '京东·新勇',
                sdInstance: '宿舍区 硕士楼',
                exWorry: true,
                recName: '无',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 18:00'
            },
            {
                exState: '3',
                reward: '16',
                exInstance: '黄马甲·新东门',
                sdInstance: '宿舍区 硕士楼',
                exWorry: true,
                recName: '刘同学',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 18:00'
            },
            {
                exState: '5',
                reward: '16',
                exInstance: '黄马甲·新东门',
                sdInstance: '宿舍区 硕士楼',
                exWorry: true,
                recName: '刘同学',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 18:00',
            }
        ],

        pubIcon: '../../images/publisher.png',
        atEnd: false
    },
    //0代表已接单待支付，1代表等待接单，2代表对方已接单未完成，3代表已完成,4代表已过期,5代表异常。
    navbarTap: function(e) {
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        })
        console.log(e.currentTarget.dataset.idx)
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
    toPubDetails: function() {
        wx.navigateTo({
            url: '../orderDetailsPub/orderDetailsPub',
        })
    }
})