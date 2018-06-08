var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mySchoolName: '陕西师范大学（长安校区）',
        loctionSrc: "../../images/location.png",
        pubIcon: '../../images/publisher.png',
        topIcon: '../../images/bTopIcon.png',
        pullIcon: '../../images/pull.png',
        topubIcon: '../../images/hPubIcon.png',
        fabuOrDingbu: true, //true渲染发布
        listCount: [{
                exInstance: '申通快递·阳光苑',
                sdInstance: '宿舍区 硕士楼',
                exWorry: true,
                reward: '2',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 18:00',
                pubName: '向同学 41612057',
                id: 155,
                key: 2
            },
            {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058',
                id: 156,
                key: 1
            },
            {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058',
                id: 157,
                key: 1
            }, {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058',
                id: 158,
                key: 1
            }, {
                exInstance: '圆通快递·阳光苑',
                sdInstance: '宿舍区 周园',
                exWorry: false,
                reward: '5',
                exWeight: '<1KG',
                exSize: '小件',
                exExTime: '05-07 17:00',
                pubName: '刘同学 41612058',
                id: 159,
                key: 1
            }
        ],
        sendLoc: '选择快递送达地点',
        expressLoc: '选择取快递的站点',

        exlocArray: [
            ['新东门', '老东门', '硕士楼', '新勇西', '阳光苑二楼'],
            ['顺丰', '申通', '中通', '圆通', '百世汇通', '韵达', '天天快递', 'EMS', '京东']
        ],
        exlocfirstIndex: 0,
        exlocSecondIndex: 0,

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
        column2_3: ['长雁通']
    },
    /**
     * 会被动态设置的元素，exlocArray，sdlocArray,column2_0123,listCount
     **/

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            // console.log(res.userInfo)
                            //用户已经授权过,发送一个get请求3rd_session
                        }
                    })
                } else {
                    //未授权
                    wx.redirectTo({
                        url: '../welcome/welcome',
                    })
                }
            }
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
    onShow: function() {},

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
        this.setData({
            fabuOrDingbu: true
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        this.setData({
            fabuOrDingbu: false
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    toSumDetail: function(event) {
        console.log(event)
        var orderId = event.currentTarget.dataset.orderId;
        console.log(orderId)
        wx.navigateTo({
            url: "../orderDetailsVeiwer/orderDetailsVeiwer?id=" + orderId
        })

    },

    /**
     * 设置地点框里显示的值
     */
    exlocChange: function(e) {
        console.log(e);
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.exlocArray[0][this.data.exlocfirstIndex] + '·' + this.data.exlocArray[1][this.data.exlocSecondIndex]
        this.setData({
                expressLoc: selected
            })
            //发起筛选快递站点请求
        wx.request({
            url: 'test.php', //仅为示例，并非真实的接口地址
            data: {
                x: '',
                y: ''
            },
            success: function(res) {
                console.log(res.data)
                    //在此设置页面订单列表listCount
            }
        })
    },
    sdlocChange: function(e) {
        console.log(e);
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.sdlocArray[0][this.data.sdlocIndex[0]] + '·' + this.data.sdlocArray[1][this.data.sdlocIndex[1]]
        this.setData({
                sendLoc: selected
            })
            //发起筛选送达地点请求
        wx.request({
            url: 'test.php', //仅为示例，并非真实的接口地址
            data: {
                x: '',
                y: ''
            },
            success: function(res) {
                console.log(res.data)
                    //在此设置页面订单列表listCount
            }
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
    sdlocColumnChange: function(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            sdlocArray: this.data.sdlocArray,
            sdlocIndex: this.data.sdlocIndex
        }
        data.sdlocIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.sdlocIndex[0]) {
                    case 0:
                        data.sdlocArray[1] = this.data.column2_0;
                        console.log(data.sdlocArray[1])
                        break;

                    case 1:
                        data.sdlocArray[1] = this.data.column2_1;
                        console.log(data.sdlocArray[1])
                        break;
                    case 2:
                        data.sdlocArray[1] = this.data.column2_2;
                        console.log(data.sdlocArray[1])
                        break;
                    case 3:
                        data.sdlocArray[1] = this.data.column2_3;
                        console.log(data.sdlocArray[1])
                        break;
                }
                data.sdlocIndex[1] = 0;
                break;

            case 1:
                break;
        }
        this.setData(data);
        console.log(data)
    },
    changeSchool: function() {
        wx.navigateTo({
            url: '../changeSchool/changeSchool',
        })
    },
    toTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
        this.setData({
            fabuOrDingbu: true
        })
    },
    toPub: function() {
        wx.switchTab({
            url: '../publish1/publish1',
        })
    }
})