var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        DeRecLocIn: '',
        index: 0,
        selExCon: [
            [],
            []
        ],

        default: {
            conPhoneNum: '点击输入电话号码',
            sendLoc: '选择地点',
            sendLocIn: '填写地点',
            recName: '填写姓名',
            phoneRear: '四位数字',
            //date: '点击选择日期', //往后加一天
        },


        exlocArray: [
            [],
            []
        ],
        expressLoc: '', //这就是默认
        exlocfirstIndex: 0,
        exlocSecondIndex: 0,
        sendLoc: '',
        sdlocArray: [
            [],
            []
        ],
        sdlocIndex: [0, 0],
        sdlocfirstIndex: 0,
        sdlocSecondIndex: 0,

        column2_0: [],
        column2_1: [],
        column2_2: [],
        column2_3: [],

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
        if (app.globalData.default.sendLoc != null) {
            this.setData({
                default: app.globalData.default
            })
        }
        //设置成全局中的picker数组
        var that = this

        this.setData({
            exlocArray: app.globalData.exlocArray,
            column2_0: app.globalData.column2_0,
            column2_1: app.globalData.column2_1,
            column2_2: app.globalData.column2_2,
            column2_3: app.globalData.column2_3,
        })
        this.setData({
            sdlocArray: [
                ['宿舍区', '教学区', '其他区', '跨校区'], that.data.column2_0
            ],
            sendLoc: that.data.default.sendLoc
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
    sdlocChange: function(e) {
        // console.log(e);
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.sdlocArray[0][this.data.sdlocIndex[0]] + '·' + this.data.sdlocArray[1][this.data.sdlocIndex[1]]
        this.setData({
            sendLoc: selected
        })
    },
    sdlocColumnChange: function(e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
                        // console.log(data.sdlocArray[1])
                        break;

                    case 1:
                        data.sdlocArray[1] = this.data.column2_1;
                        // console.log(data.sdlocArray[1])
                        break;
                    case 2:
                        data.sdlocArray[1] = this.data.column2_2;
                        // console.log(data.sdlocArray[1])
                        break;
                    case 3:
                        data.sdlocArray[1] = this.data.column2_3;
                        // console.log(data.sdlocArray[1])
                        break;
                }
                data.sdlocIndex[1] = 0;
                break;

            case 1:
                break;
        }
        this.setData(data);
        // console.log(data)
    },


    exlocChange: function(e) {
        // console.log(e);
        // console.log('时间picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.exlocArray[0][this.data.exlocfirstIndex] + '·' + this.data.exlocArray[1][this.data.exlocSecondIndex]
        this.setData({
            expressLoc: selected
        })

    },
    exlocColumnChange: function(e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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

    replaceAddr: function(e) {
        var that = this
            // console.log(e)
        var mvalue = e.detail.value
        if (mvalue.DeRecLocIn == '') {
            mvalue.DeRecLocIn = this.data.default.sendLocIn
        }
        if (mvalue.DeRecLocSel == '') {
            mvalue.DeRecLocSel = this.data.default.sendLoc
        }
        if (mvalue.conPhoneNum == '') {
            mvalue.conPhoneNum = this.data.default.conPhoneNum
        }
        if (mvalue.phoneRear == '') {
            mvalue.phoneRear = this.data.default.phoneRear
        }
        if (mvalue.recName == '') {
            mvalue.recName = this.data.default.recName
        }
        wx.request({ //更改默认地址，为空的就是没变
            url: 'http://45.40.197.154/HelloWord/receivecode/insertaddress',
            method: 'POST',
            data: {
                'userID': app.globalData.user_ID, //加其他字段
                'sendArea': mvalue.DeRecLocSel,
                'sendLoc': mvalue.DeRecLocIn,
                'phoneRear': mvalue.phoneRear,
                'contactNum': mvalue.conPhoneNum,
                'recName': mvalue.recName
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    // console.log('默认地址修改', res)
                    wx.showToast({
                        title: '修改成功',
                        icon: 'success',
                        duration: 1000
                    })
                    setTimeout(function() {
                        wx.switchTab({
                            url: '../my/my',
                        })
                    }, 1000);
                }

            },
            fail: function() {},
            complete: function() {}
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
    }
})