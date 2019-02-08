var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        default: {
            conPhone: '点击输入电话号码',
            sendLocSelect: '选择地点',
            sendLocInput: '填写地点',
            recName: '填写姓名',
            phoneRear: '四位数字',
            //date: '点击选择日期', //往后加一天
        },
        dateRange: [],


        expressLocArray: [
            [],
            []
        ],
        expressLoc: '新东门' + '·' + '百世汇通', //这就是默认
        expFirstIndex: 0,
        expSecondIndex: 0,
        sendLocSelect: '', //'宿舍区' + '·' + '周园', //默认
        sendLocArray: [
            [],
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


        nextBtnIcon: "../../images/next.png",
        setDefFlag: false,
        pubImg: "../../images/publishIMG1.png",

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
        if (app.globalData.ourUserStatus == 4) {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    }
                }
            })
        }
        if (app.globalData.ourUserStatus == 1) {
            wx.showModal({
                title: '状态异常',
                content: '请前往我的>举报/申诉进度查看',
                confirmColor: '#faaf42',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.switchTab({
                            url: '../my/my'
                        })
                    }
                }
            })
        }
        var send_data = {
            'gId': app.globalData.sessionID
        }
        var that = this
        wx.request({
            url: urlModel.url.getAddr,
            data: send_data,
            success: function(res) {
                if (res.data.default) {
                    app.globalData.default = res.data.default
                }
            },
            complete: function() { //无论成功还是失败都会执行
                that.setData({
                    default: app.globalData.default,
                    sendLocSelect: app.globalData.default.sendLocSelect
                })
            }
        })

        this.setData({
                expressLocArray: app.globalData.expressLocArray,
                dormArea: app.globalData.dormArea,
                teachArea: app.globalData.teachArea,
                otherArea: app.globalData.otherArea,
                transCampus: app.globalData.transCampus,
                dateRange: app.globalData.dateRange
            }) //执行完才提交
        this.setData({
            sendLocArray: [
                ['宿舍区', '教学区', '其他区', '跨校区'], that.data.dormArea
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
                        break;

                    case 1:
                        data.sendLocArray[1] = this.data.teachArea;
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
    dateChange: function(e) {
        // 设置日期
        this.setData({
            dateIndex: e.detail.value
        })
    },
    bindTimeChange: function(e) { //设置时间
        this.setData({
            endTime: e.detail.value
        })
    },
    firstOrdSubmit: function(e) {
        wx.setStorageSync({
                key: 'FORMRaw1',
                data: e.detail.value,
            }) //设置 原始数据 缓存,后面会用到
        e.detail.value.DeRecLocSel = this.data.sendLocSelect;
        e.detail.value.selExCon = this.data.expressLoc;
        // e.detail.value.weightInfo = this.data.expWeight[this.data.weightIndex];
        e.detail.value.exTimeConDate = this.data.dateRange[this.data.dateIndex]
        if (e.detail.value.recLocInput == '') {
            e.detail.value.DeRecLocIn = this.data.default.sendLocInput;
        }
        if (e.detail.value.conPhone == '') {
            e.detail.value.conPhoneNum = this.data.default.conPhone;
        }
        if (e.detail.value.recName == '') {
            e.detail.value.recName = this.data.default.recName;
        }
        if (e.detail.value.phoneRear == '') {
            e.detail.value.phoneRear = this.data.default.phoneRear;
        }

        if (this.check_default_notset(e.detail.value)) {
            wx.showToast({
                title: '输入有误，请检查',
                icon: 'none'
            })
        } else { //非默认值，可以进入下一个
            //可以上传默认地址
            if (e.detail.value.setDefFlag == true) {
                var detail = e.detail.value
                var send_data = {
                    'userID': app.globalData.sessionID,
                    'sdLocSum': detail.DeRecLocSel,
                    'sdLocDetail': detail.recLocInput,
                    'contactNum': detail.conPhone,
                    'fetchName': detail.recName,
                    'phoneRare': detail.phoneRear
                }
                wx.request({
                    url: urlModel.url.postAddr,
                    method: 'POST',
                    data: send_data,
                    success: function(res) {
                        // console.log(res)

                    }
                })
            }
            wx.setStorageSync({
                key: 'FORM1',
                data: e.detail.value,
            })
            wx.navigateTo({
                url: '../publish2/publish2',
            })
        }
        // console.log('form发生了submit事件，携带数据为：', e.detail.value)

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
            content: '代领者将用联系电话与你联系，收货电话是领取你的快递时用的号码（建议使用不同号码）。',
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
    check_default_notset: function(data_tocheck) {
        for (var Key in data_tocheck) {
            if (Key == 'conPhone') {
                // console.log(Key)
                if (data_tocheck[Key] == '点击输入电话号码') { return true }
            } else if (Key == 'recLocInput') {
                // console.log(Key)
                if (data_tocheck[Key] == '填写地点') { return true }
            } else if (Key == 'recName') {
                // console.log(Key)
                if (data_tocheck[Key] == '填写姓名') { return true }
            } else if (Key == 'phoneRear') {
                // console.log(Key)
                if (data_tocheck[Key] == '四位数字') { return true }
            } else if (Key == 'DeRecLocSel') {
                // console.log(Key)
                if (data_tocheck[Key] == '选择地点') { return true }
            }
        }
        return false
    }
})