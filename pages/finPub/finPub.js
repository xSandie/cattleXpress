Page({

    /**
     * 页面的初始数据
     */
    data: {
        DeRecLocIn: 'D1-15184',
        index: 0,
        selExCon: [
            ['阳光苑', '硕士楼负一层', '新勇'],
            ['申通', '韵达', '中通', '京东']
        ],

        default: {
            conPhoneNum: 15529268167,
            sendLoc: '宿舍区' + '·' + '周园',
            sendLocIn: 'D1-340',
            recName: '向书晗',
            phoneRear: '9021',
            date: '06-01', //往后加一天
            dateRange: ['06-01', '06-02', '06-03', '其他']
        },


        exlocArray: [
            ['新东门', '老东门', '硕士楼', '新勇西', '阳光苑二楼'],
            ['顺丰', '申通', '中通', '圆通', '百世汇通', '韵达', '天天快递', 'EMS', '京东']
        ],
        expressLoc: '新东门' + '·' + '百世汇通', //这就是默认
        exlocfirstIndex: 0,
        exlocSecondIndex: 0,
        sendLoc: '宿舍区' + '·' + '周园',
        sdlocArray: [
            ['宿舍区', '教学区', '其他区域', '跨校区'],
            ['周园', '秦园', '汉园', '唐园', '梅园', '兰园', '硕士楼', '研究生公寓', '博士2号楼', '竹园']
        ],
        sdlocIndex: [0, 0],
        sdlocfirstIndex: 0,
        sdlocSecondIndex: 0,

        column2_0: ['周园', '秦园', '汉园', '唐园', '梅园', '兰园', '硕士楼', '研究生公寓', '博士2号楼', '竹园'],
        column2_1: ['文津楼', '文渊楼', '文汇楼', '文澜楼', '格物楼', '致知楼', '逸夫科技楼', '六艺楼'],
        column2_2: ['图书馆', '校务楼', '阳光苑', '溢香楼', '上林体育馆', '新勇', '终南音乐厅', '教育博物馆', '游泳馆', '家属院', '校医院', '家园生活服务区', '师大附小', '其他'],
        column2_3: ['长雁通'],


        time: '12:00',
        dateSel: '06-01', //页面加载时将会获取并设置
        dateIndex: 0,


        nbtnIcon: "../../images/next.png",

        checkBtnIcon: "../../images/next.png",

        exCon: '',
        sdLoc: '',
        conPhoneNum: '',
        phoneRear: '',
        recName: '',

        checking: false,

        sexLimRange: [
            "无性别限制",
            "男",
            "女"
        ],
        sexIndex: 0,


        lastDep: "简单描述下您的快递（不超过50字）",
        worchecked: false,
        exWeight: ['<0.5KG', '<1KG', '<5KG', '其他'],
        weIndex: 0,
        checkboxItems: [
            { name: 'BEx', value: '大件' },
            { name: 'MEx', value: '中件' },
            { name: 'SEx', value: '小件', checked: true }
        ],

        rewardBoxItems: [
            { name: 2, value: '2元', checked: true },
            { name: 5, value: '5元' },
            { name: 10, value: '10元' }
        ],
        rewardTapTime: [
            0, 0, 0
        ],



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

    }
})