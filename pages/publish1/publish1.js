Page({

    /**
     * 页面的初始数据
     */
    data: {
        DeContactNum: 15529268167,
        DeRecLocIn: 'D1-15184',
        index: 0,
        DeRecLocSel: [
            ['宿舍区', '教学区', '其他区域'],
            ['A区', 'B区', 'C区', 'D区']
        ],
        selExCon: [
            ['阳光苑', '硕士楼负一层', '新勇'],
            ['申通', '韵达', '中通', '京东']
        ],
        DeDate: '05-27',
        EndDate: '05-29',
        time: '12:00',
        date: '05-27',
        exWeight: ['<0.5KG', '<1KG', '<5KG', '其他'],
        nbtnIcon: "../../images/next.png",
        lastDep: "简单描述下您的快递（不超过50字）",
        worchecked: false,

        checkboxItems: [
            { name: 'LEX', value: '大件' },
            { name: 'MEX', value: '中件' },
            { name: 'SEX', value: '小件', checked: 'true' }
        ]
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
    firstOrdSubmit: function(e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    testTap: function() {
        console.log('按钮被点击了')
    }
})