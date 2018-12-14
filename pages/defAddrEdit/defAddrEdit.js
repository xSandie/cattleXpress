var app = getApp();
const urlModel = require('../../utils/urlSet.js')
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
        pullIcon: '../../images/pull.png',

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
        if (options.path == 'certif') {
            wx.showModal({
                title: '注意',
                content: '请确保 联系电话 正确',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#faaf42',
            })
        }
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
        // if (app.globalData.default.sendLoc != null) {
        //     this.setData({
        //         default: app.globalData.default
        //     })
        // }
        // //设置成全局中的picker数组
        // var that = this




        // this.setData({
        //     exlocArray: app.globalData.exlocArray,
        //     column2_0: app.globalData.column2_0,
        //     column2_1: app.globalData.column2_1,
        //     column2_2: app.globalData.column2_2,
        //     column2_3: app.globalData.column2_3,
        // })
        // this.setData({
        //     sdlocArray: [
        //         ['宿舍区', '教学区', '其他区', '跨校区'], that.data.column2_0
        //     ],
        //     sendLoc: that.data.default.sendLoc
        // })
        var send_data = {
            'gId': app.globalData.user_ID
        }
        var that = this
        wx.request({
            url: urlModel.url.getAddr,
            data: send_data,
            success: function(res) {
                //与发布界面 一致
                if (res.statusCode == 200) {
                    // console.log('获取默认地址成功')
                    // console.log(res)
                    if (res.data.default) {
                        app.globalData.default = res.data.default
                    }
                }

            },
            complete: function() { //无论成功还是失败都会执行
                that.setData({
                    default: app.globalData.default,
                    sendLoc: app.globalData.default.sendLoc //这里逻辑注意一下
                })
            }
        })

        this.setData({
                exlocArray: app.globalData.exlocArray,
                column2_0: app.globalData.column2_0,
                column2_1: app.globalData.column2_1,
                column2_2: app.globalData.column2_2,
                column2_3: app.globalData.column2_3,
                dateRange: app.globalData.dateRange
            }) //执行完才提交
        this.setData({
            sdlocArray: [
                ['宿舍区', '教学区', '其他区', '跨校区'], that.data.column2_0
            ],
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
    replaceAddr: function(e) {
        // console.log('submit')
        // console.log(e)
        var detail = e.detail.value
        var that = this
        if (that.checkNone(detail)) {
            //check none 一定要在上
            //默认情况 要 补全逻辑 返回detail
            detail = that.fill_detail(detail)
                // console.log('信息完整')

            var send_data = {
                    'userID': app.globalData.user_ID,
                    'sdLocSum': detail.DeRecLocSel,
                    'sdLocDetail': detail.DeRecLocIn,
                    'contactNum': detail.conPhoneNum,
                    'fetchName': detail.recName,
                    'phoneRare': detail.phoneRear
                }
                //发起post请求
            wx.request({
                url: urlModel.url.postAddr,
                method: 'POST',
                data: send_data,
                success: function(res) {
                    // console.log(res)
                    if (res.data.msg == 'ok') {
                        wx.showToast({
                            title: '修改成功',
                            complete: function() {
                                wx.switchTab({
                                    url: '../my/my',
                                })
                            }
                        })
                    } else {
                        wx.showToast({
                            title: '出错，请重试',
                            icon: 'none'
                        })
                    }
                }
            })
        }

    },
    checkNone: function(detail) {
        if ((detail.DeRecLocIn == '' || detail.conPhoneNum == '' || detail.phoneRear == '' || detail.recName == '') &&
            app.globalData.default.phoneRear == '四位数字') { //'四位数字'存在即说明没有设置过默认地址
            wx.showToast({
                title: '请补全信息',
                icon: 'none'
            })
            return false
        }
        return true
    },
    fill_detail: function(detail_to_fill) {
        //如果信息中有 未填写的默认信息，进行补全
        // var filled_detail={}
        // if (detail_to_fill.DeRecLocIn==''){
        //   detail_to_fill.DeRecLocIn = this.data.default.sendLocIn
        // }
        for (var Key in detail_to_fill) {
            if (detail_to_fill[Key] == '') {

                if (Key == 'conPhoneNum') {
                    // console.log(Key)
                    detail_to_fill[Key] = app.globalData.default.conPhoneNum
                } else if (Key == 'DeRecLocIn') {
                    // console.log(Key)
                    detail_to_fill[Key] = app.globalData.default.sendLocIn
                } else if (Key == 'recName') {
                    // console.log(Key)
                    detail_to_fill[Key] = app.globalData.default.recName
                } else if (Key == 'phoneRear') {
                    // console.log(Key)
                    detail_to_fill[Key] = app.globalData.default.phoneRear
                }

            }
        }
        // console.log(detail_to_fill)
        return detail_to_fill
    }
})