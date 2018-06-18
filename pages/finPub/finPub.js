var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sendLocIn: '',
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
        expressLoc: '', //这就是默认
        exlocfirstIndex: 0,
        exlocSecondIndex: 0,
        sendLoc: '宿舍区' + '·' + '周园',
        sdlocArray: [
            ['宿舍区', '教学区', '其他区域', '跨校区'],
           []
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
        fetchCode: '',

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

        reward: '',
        setDef: false,


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
      var that = this
        this.setData({
            exlocArray: app.globalData.exlocArray,
            column2_0: app.globalData.column2_0,
            column2_1: app.globalData.column2_1,
            column2_2: app.globalData.column2_2,
            column2_3: app.globalData.column2_3,
            sdlocArray: [['宿舍区', '教学区', '其他区', '跨校区'], that.data.column2_0]
        })
        var that = this
        wx.getStorage({
            key: 'sizeArr',
            success: function(res) {
                that.setData({
                    checkboxItems: res.data
                })
            },
        })
        wx.getStorage({
            key: 'FORMrow1',
            success: function(res) {
                that.setData({
                    sdlocIndex: res.data.DeRecLocSel,
                    dateIndex: res.data.exTimeConDate,
                    setDef: res.data.setDef
                })
            }
        })
        wx.getStorage({
            key: 'FORM1',
            success: function(res) {
                that.setData({
                    conPhoneNum: res.data.conPhoneNum,
                    sendLoc: res.data.DeRecLocSel,
                    sendLocIn: res.data.DeRecLocIn,
                    recName: res.data.recName,
                    phoneRear: res.data.phoneRear,
                    expressLoc: res.data.selExCon,
                })
            },
        })
        wx.getStorage({
            key: 'FORMrow2',
            success: function(res) {
                that.setData({
                    fetchCode: res.data.fetchCode,
                    sexIndex: res.data.sexLimit,
                    weIndex: res.data.weightInfo,
                })
            },
        })
        wx.getStorage({
            key: 'FORM2',
            success: function(res) {
                if (res.data.rewardIn instanceof Array) {
                    that.setData({
                        reward: res.data.rewardIn[0]
                    })
                } else {
                    that.setData({
                        reward: res.data.rewardIn
                    })
                }
                that.setData({
                    worchecked: res.data.worInfo,
                    lastDep: res.data.otherInfo
                })
            },
        })
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
    finOrdSubmit: function(e) {
        //default早已存在缓存中
        e.detail.value.DeRecLocSel = this.data.sendLoc;
        e.detail.value.selExCon = this.data.expressLoc;
        // e.detail.value.weightInfo = this.data.exWeight[this.data.weIndex];
        e.detail.value.exTimeConDate = this.data.default.dateRange[this.data.dateIndex]
        if (e.detail.value.DeRecLocIn == '') {
            e.detail.value.DeRecLocIn = this.data.sendLocIn;
        }
        if (e.detail.value.conPhoneNum == '') {
            e.detail.value.conPhoneNum = this.data.conPhoneNum;
        }
        if (e.detail.value.recName == '') {
            e.detail.value.recName = this.data.recName;
        }
        if (e.detail.value.phoneRear == '') {
            e.detail.value.phoneRear = this.data.phoneRear;
        }
        if (e.detail.value.rewardIn == '') {
            e.detail.value.rewardIn = this.data.reward;
        }
        if (e.detail.value.otherInfo == '') {
            e.detail.value.otherInfo = this.data.lastDep
        }
        e.detail.value.weightInfo = this.data.exWeight[this.data.weIndex];
        e.detail.value.sexLimit = this.data.sexLimRange[this.data.sexIndex];
        console.log(e.detail.value)
        var event = e.detail.value
        var that = this
        console.log(app.globalData.user_ID)
        wx.request({
            url: 'http://10.2.24.200:8080/HelloWord/publish/publishinfo', //填充发布订单url
            method: 'POST',
            data: {
                userID: app.globalData.user_ID,
                schoolID: app.globalData.schoolID,
                //订单具体信息
                contactNum: event.conPhoneNum,
                sendArea: event.DeRecLocSel,
                sendLoc: event.DeRecLocIn,
                recName: event.recName,
                phoneRear: event.phoneRear,
                setDefault: event.setDef,
                fetchCode: event.fetchCode,
                expressLoc: event.selExCon,
                deadline: event.exTimeConDate + ' ' + event.exTimeConTime,
                sexLimit: event.sexLimit,
                reward: event.rewardIn,
                weightEsti: event.weightInfo,
                sizeEsti: event.sizeInfo,
                worried: event.worInfo,
                depict: event.otherInfo,
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
                console.log(res)
                if (res.statusCode == 200) {
                    console.log("表单提交成功")
                    wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 1000
                    })
                    setTimeout(function() {
                        wx.switchTab({
                            url: '../orders/orders',
                        })
                    }, 1000);
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '出了点小问题，请稍后再试噢',
                        showCancel: false,
                        confirmText: '返回',
                        confirmColor: '#faaf42',
                    })
                }
            },
            fail: function() {
                // wx.showToast({
                //     title: '发布成功',
                //     icon: 'success',
                //     duration: 1000
                // })
                // setTimeout(function() {
                //     wx.switchTab({
                //         url: '../orders/orders',
                //     })
                // }, 1000);
            },
            complete: function() {}
        })
    },
    worcheck: function() {
        var worchecked1 = !this.data.worchecked;
        this.setData({
            worchecked: worchecked1
        })
        console.log(this.data.worchecked)
    },
    checkboxChange: function(e) {
        console.log('大小估计radio发生change事件，携带value值为：', e.detail.value)
        console.log(e)
        switch (e.detail.value) {
            case '大件':
                this.setData({
                    checkboxItems: [{ name: 'BEx', value: '大件', checked: true },
                        { name: 'MEx', value: '中件' },
                        { name: 'SEx', value: '小件' }
                    ]
                })
                break;
            case '中件':
                this.setData({
                    checkboxItems: [{ name: 'BEx', value: '大件' },
                        { name: 'MEx', value: '中件', checked: true },
                        { name: 'SEx', value: '小件' }
                    ]
                })
                break;
            case '小件':
                this.setData({
                    checkboxItems: [{ name: 'BEx', value: '大件' },
                        { name: 'MEx', value: '中件' },
                        { name: 'SEx', value: '小件', checked: true }
                    ]
                })
                break;
        }
    },
    weInfoChange: function(e) {
        console.log(e);
        this.setData({
            weIndex: e.detail.value
        })
    },
    sexLimitChange: function(e) {
        console.log(e);
        this.setData({
            sexIndex: e.detail.value
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

    sdlocChange: function(e) {
        console.log(e);
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.sdlocArray[0][this.data.sdlocIndex[0]] + '·' + this.data.sdlocArray[1][this.data.sdlocIndex[1]]
        this.setData({
            sendLoc: selected
        })
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
    dateChange: function(e) {
        console.log(e);
        this.setData({
            dateIndex: e.detail.value
        })
    },
    bindTimeChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            time: e.detail.value
        })
    },
    setDef: function() {
        var setDefault = this.data.setDef;
        this.setData({
            setDef: !setDefault
        })
    },
    differLink: function() {
        wx.showModal({
            title: '区别',
            content: '联系电话是代领者与你联系时使用的号码，收货电话是领取你的快递时用的号码（建议使用不同号码）。',
            confirmColor: '#faaf42',
            confirmText: '知道啦',
            showCancel: false,
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                }
            }
        })
    }
})