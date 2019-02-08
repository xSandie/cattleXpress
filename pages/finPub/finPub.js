const app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sendLocInput: '',

        default: {
            conPhone: '',
            sendLocSelect: '',
            sendLocInput: '',
            recName: '',
            phoneRear: '',

        },
        dateRange: [],


        expressLocArray: [
            [],
            []
        ],
        expressLoc: '', //这就是默认
        expFirstIndex: 0,
        expSecondIndex: 0,

        sendLocSelect: '宿舍区' + '·' + '周园',
        sendLocArray: [
            ['宿舍区', '教学区', '其他区域', '跨校区'],
            []
        ],
        sendLocIndex: [0, 0],
        sendLocFirstIndex: 0,
        sendLocSecondIndex: 0,

        dormArea: [],
        teachArea: [],
        otherArea: [],
        transCampus: [],


        endTime: '22:00',
        dateSelect: '', //页面加载时将会获取并设置
        dateIndex: 0,


        nextIcon: "../../images/next.png",

        conPhone: '',
        phoneRear: '',
        recName: '',
        fetchCode: '',

        sexLimRange: [
            "无性别限制",
            "男",
            "女"
        ],
        sexIndex: 0,


        expDescript: "简单描述下您的快递（不超过50字）",
        urgentChecked: false,
        expWeight: ['<0.5KG', '<1KG', '<5KG', '其他'],
        weightIndex: 0,
        sizeCheckBox: [
            { name: 'BEx', value: '大件' },
            { name: 'MEx', value: '中件' },
            { name: 'SEx', value: '小件', checked: true }
        ],

        reward: '',
        setDefFlag: false,
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
            expressLocArray: app.globalData.expressLocArray,
            dormArea: app.globalData.dormArea,
            teachArea: app.globalData.teachArea,
            otherArea: app.globalData.otherArea,
            transCampus: app.globalData.transCampus,
            dateSelect: app.globalData.dateRange
        })
        this.setData({
            sendLocArray: [
                ['宿舍区', '教学区', '其他区', '跨校区'], that.data.dormArea
            ],
            sendLocSelect: that.data.default.sendLocSelect
        })
        wx.getStorage({
            key: 'sizeArr',
            success: function(res) {
                that.setData({
                    sizeCheckBox: res.data
                })
            },
        })
        wx.getStorage({
            key: 'FORMRaw1',
            success: function(res) {
                that.setData({
                    sendLocIndex: res.data.DeRecLocSel,
                    dateIndex: res.data.exTimeConDate,
                    setDefFlag: res.data.setDefFlag
                })
            }
        })
        wx.getStorage({
            key: 'FORM1',
            success: function(res) {
                that.setData({
                    conPhone: res.data.conPhone,
                    sendLocSelect: res.data.DeRecLocSel,
                    sendLocInput: res.data.recLocInput,
                    recName: res.data.recName,
                    phoneRear: res.data.phoneRear,
                    expressLoc: res.data.selExCon,
                })
            },
        })
        wx.getStorage({
            key: 'FORMRaw2',
            success: function(res) {
                that.setData({
                    fetchCode: res.data.fetchCode,
                    sexIndex: res.data.sexLimit,
                    weightIndex: res.data.weightInfo,
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
                    urgentChecked: res.data.worInfo,
                    expDescript: res.data.otherInfo
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
        return {
            title: '校园快递互助代取平台',
            path: '/pages/home/home',
            imageUrl: '/images/sharePic.jpg'
        }
    },
    finOrdSubmit: function(e) {
        //   console.log(this.data.dateIndex)
        //   console.log(this.data.dateRange)
        //default早已存在缓存中
        e.detail.value.DeRecLocSel = this.data.sendLocSelect;
        e.detail.value.selExCon = this.data.expressLoc;
        // e.detail.value.weightInfo = this.data.expWeight[this.data.weightIndex];
        e.detail.value.exTimeConDate = this.data.dateRange[this.data.dateIndex]
        if (e.detail.value.recLocInput == '') {
            e.detail.value.DeRecLocIn = this.data.sendLocInput;
        }
        if (e.detail.value.conPhone == '') {
            e.detail.value.conPhoneNum = this.data.conPhone;
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
            e.detail.value.otherInfo = this.data.expDescript
        }
        e.detail.value.weightInfo = this.data.expWeight[this.data.weightIndex];
        e.detail.value.sexLimit = this.data.sexLimRange[this.data.sexIndex];
        // console.log(e.detail.value)
        var event = e.detail.value //已经组装成可以发布了的对象了
            //加入判空逻辑
        if (this.check_none(event)) {
            //有空的
            wx.showToast({
                title: '信息有空，请补全',
                icon: 'none'
            })
            return
        } else {
            //可发布
            wx.showLoading({
                title: '发布中',
                mask: true
            })
            var that = this
            if (event.setDefFlag == true) {
                //上传默认地址
                var send_data = {
                        'userID': app.globalData.sessionID,
                        'sdLocSum': event.DeRecLocSel,
                        'sdLocDetail': event.recLocInput,
                        'contactNum': event.conPhone,
                        'fetchName': event.recName,
                        'phoneRare': event.phoneRear
                    }
                    //发起post请求
                wx.request({
                    url: urlModel.url.postAddr,
                    method: 'POST',
                    data: send_data,
                    success: function(res) {
                        // console.log(res)
                    }
                })
            }
            wx.request({
                url: urlModel.url.pubOrder, //填充发布订单url
                method: 'POST',
                data: {
                    userID: app.globalData.sessionID,
                    schoolID: app.globalData.schoolID,
                    //订单具体信息
                    contactNum: event.conPhone,
                    sendArea: event.DeRecLocSel,
                    sendLocSelect: event.recLocInput,
                    recName: event.recName,
                    phoneRear: event.phoneRear,
                    setDefault: event.setDefFlag,
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
                // header: {
                //   "Content-Type": "application/x-www-form-urlencoded"
                // },
                success: function(res) {
                    console.log(res)
                    wx.hideLoading()

                    if (res.statusCode == 200) {
                        //console.log("表单提交成功")
                        if (res.data.msg = 'ok') {

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
                        } else if (res.data.no_more_zero == true) {
                            wx.showToast({
                                title: '每个用户只能发布一次0元订单噢!',
                                icon: 'none',
                                duration: 3000
                            })
                        }
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
                    wx.hideLoading()
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
        }

    },
    worcheck: function() {
        var worchecked1 = !this.data.urgentChecked;
        this.setData({
                urgentChecked: worchecked1
            })
            // console.log(this.data.urgentChecked)
    },
    checkboxChange: function(e) {
        // console.log('大小估计radio发生change事件，携带value值为：', e.detail.value)
        // console.log(e)
        switch (e.detail.value) {
            case '大件':
                this.setData({
                    sizeCheckBox: [{ name: 'BEx', value: '大件', checked: true },
                        { name: 'MEx', value: '中件' },
                        { name: 'SEx', value: '小件' }
                    ]
                })
                break;
            case '中件':
                this.setData({
                    sizeCheckBox: [{ name: 'BEx', value: '大件' },
                        { name: 'MEx', value: '中件', checked: true },
                        { name: 'SEx', value: '小件' }
                    ]
                })
                break;
            case '小件':
                this.setData({
                    sizeCheckBox: [{ name: 'BEx', value: '大件' },
                        { name: 'MEx', value: '中件' },
                        { name: 'SEx', value: '小件', checked: true }
                    ]
                })
                break;
        }
    },
    weInfoChange: function(e) {
        // console.log(e);
        this.setData({
            weightIndex: e.detail.value
        })
    },
    sexLimitChange: function(e) {
        // console.log(e);
        this.setData({
            sexIndex: e.detail.value
        })
    },
    exlocChange: function(e) {
        // console.log(e);
        // console.log('时间picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.expressLocArray[0][this.data.expFirstIndex] + '·' + this.data.expressLocArray[1][this.data.expSecondIndex]
        this.setData({
            expressLoc: selected
        })

    },
    exlocColumnChange: function(e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        if (e.detail.column == 0) {
            this.setData({
                expFirstIndex: e.detail.value
            })
        } else {
            this.setData({
                expSecondIndex: e.detail.value
            })
        }
    },
    exlocChange: function(e) {
        // console.log(e);
        // console.log('时间picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.expressLocArray[0][this.data.expFirstIndex] + '·' + this.data.expressLocArray[1][this.data.expSecondIndex]
        this.setData({
            expressLoc: selected
        })

    },
    exlocColumnChange: function(e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        if (e.detail.column == 0) {
            this.setData({
                expFirstIndex: e.detail.value
            })
        } else {
            this.setData({
                expSecondIndex: e.detail.value
            })
        }
    },

    sdlocChange: function(e) {
        // console.log(e);
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.sendLocArray[0][this.data.sendLocIndex[0]] + '·' + this.data.sendLocArray[1][this.data.sendLocIndex[1]]
        this.setData({
            sendLocSelect: selected
        })
    },
    sdlocColumnChange: function(e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            sendLocArray: this.data.sendLocArray,
            sendLocIndex: this.data.sendLocIndex
        }
        data.sendLocIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.sendLocIndex[0]) {
                    case 0:
                        data.sendLocArray[1] = this.data.dormArea;
                        // console.log(data.sendLocArray[1])
                        break;

                    case 1:
                        data.sendLocArray[1] = this.data.teachArea;
                        // console.log(data.sendLocArray[1])
                        break;
                    case 2:
                        data.sendLocArray[1] = this.data.otherArea;
                        // console.log(data.sendLocArray[1])
                        break;
                    case 3:
                        data.sendLocArray[1] = this.data.transCampus;
                        // console.log(data.sendLocArray[1])
                        break;
                }
                data.sendLocIndex[1] = 0;
                break;

            case 1:
                break;
        }
        this.setData(data);
        // console.log(data)
    },
    dateChange: function(e) {
        // console.log(e);
        this.setData({
            dateIndex: e.detail.value
        })
    },
    bindTimeChange: function(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            endTime: e.detail.value
        })
    },
    setDefFlag: function() {
        var setDefault = this.data.setDefFlag;
        this.setData({
            setDefFlag: !setDefault
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
                    // console.log('用户点击确定')
                }
            }
        })
    },
    check_none: function(data_tocheck) {
        // console.log(data_tocheck)
        for (var Key in data_tocheck) {
            if (data_tocheck[Key] == '') { //有空的返回true
                if (Key != 'setDefFlag' && Key != 'otherInfo' && Key != 'worInfo') {
                    return true
                }
            }
        }
        return false
    }
})