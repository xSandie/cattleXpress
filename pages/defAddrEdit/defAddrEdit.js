var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        recLocInput: '',
        pullIcon: '../../images/pull.png',

        default: {
            conPhone: '点击输入电话号码',
            sendLocSelect: '选择区域',
            sendLocInput: '填写地点',
            recName: '填写姓名',
            phoneRear: '四位数字',
            QQ:'可不填写'
        },
        phoneRear: '', //提交时,用于 补全信息 的 临时存储变量
        sendLocSelect: '',
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

        btnText: '确认修改'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options.path == 'haveCertif') {
            // 从认证界面过来
            wx.showToast({
                title: '请确保 联系电话 正确',
                icon: 'none',
                duration: 5000
            });
            this.setData({
                btnText: '确认设置'
            })
        }
        var send_data = {
            'sessionID': app.globalData.sessionID
        };
        var that = this;
        wx.request({
            url: urlModel.url.getAddr,
            data: send_data,
            success: function(res) {
                //与发布界面 一致
                console.log('onload:',res);
                if (res.statusCode == 200) {
                    if (res.data.default) {
                        let temp = {
                            conPhone: res.data.phone,
                            sendLocSelect: res.data.send_loc_sum,
                            sendLocInput: res.data.send_loc_detail,
                            recName: res.data.rec_name,
                            phoneRear: res.data.phone_rear,
                            QQ:res.data.QQ==null?'可不填写':res.data.QQ
                        };
                        app.globalData.default = temp
                    }
                }

            },
            complete: function() { //无论成功还是失败都会执行
                that.setData({
                    default: app.globalData.default,
                    sendLocSelect:app.globalData.default.sendLocSelect
                })
            }
        });

        this.setData({
            dormArea: app.globalData.dormArea,
            teachArea: app.globalData.teachArea,
            otherArea: app.globalData.otherArea,
            transCampus: app.globalData.transCampus,
            dateRange: app.globalData.dateRange,
            sendLocArray: [
                ['宿舍区', '教学区', '其他区', '跨校区'], app.globalData.dormArea
            ]
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        wx.showLoading({
            title:'重置中'
        });
        var send_data = {
            'sessionID': app.globalData.sessionID
        };
        var that = this;
        wx.request({
            url: urlModel.url.getAddr,
            data: send_data,
            success: function(res) {
                //与发布界面 一致
                if (res.statusCode == 200) {
                    if (res.data.default) {
                        let temp = {
                            conPhone: res.data.phone,
                            sendLocSelect: res.data.send_loc_sum,
                            sendLocInput: res.data.send_loc_detail,
                            recName: res.data.rec_name,
                            phoneRear: res.data.phone_rear,
                            QQ:res.data.QQ==null?'可不填写':res.data.QQ
                        };
                        app.globalData.default = temp
                    }
                }

            },
            complete: function() { //无论成功还是失败都会执行
                that.setData({
                    default: app.globalData.default,
                    sendLocSelect:app.globalData.default.sendLocSelect
                })
            }
        });
        this.setData({
            dormArea: app.globalData.dormArea,
            teachArea: app.globalData.teachArea,
            otherArea: app.globalData.otherArea,
            transCampus: app.globalData.transCampus,
            dateRange: app.globalData.dateRange,
            sendLocArray: [
                ['宿舍区', '教学区', '其他区', '跨校区'], app.globalData.dormArea
            ]
        });
        wx.hideLoading();
        wx.stopPullDownRefresh()
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
        var selected = this.data.sendLocArray[0][this.data.sendLocIndex[0]] + '·' + this.data.sendLocArray[1][this.data.sendLocIndex[1]];
        this.setData({
            sendLocSelect: selected
        })
    },
    sdlocColumnChange: function(e) {
        // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            sendLocArray: this.data.sendLocArray,
            sendLocIndex: this.data.sendLocIndex
        };
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
                        break;
                    case 3:
                        data.sendLocArray[1] = this.data.transCampus;
                        break;
                }
                data.sendLocIndex[1] = 0; //首列切换后，第二列切换为第一个选项
                break;
            case 1:
                break;
        }
        this.setData({
            sendLocArray: data.sendLocArray,
            sendLocIndex: data.sendLocIndex
        });
    },
    differLink: function() {
        wx.showModal({
            title: '区别',
            content: '联系电话是代领者与你联系时使用的号码，收货电话是领取你的快递时用的号码（建议使用不同号码）。',
            confirmColor: '#faaf42',
            confirmText: '知道啦',
            showCancel: false,
            success: function(res) {}
        })
    },
    replaceAddr: function(e) {
        var detail = e.detail.value;
        if (detail.phoneRear == '' && this.data.phoneRear != '') { //说明自动 生成了手机尾号 且 未自行填写尾号
            detail.phoneRear = this.data.phoneRear
        }
        if (detail.conPhone == '' && this.data.default.conPhone != '点击输入电话号码'){
            detail.conPhone = this.data.default.conPhone
        }
        var that = this;
        if (!that.checkNone(detail)) {
            //check none 一定要在上，存在没有写的去补全
            //默认情况 要 补全逻辑 返回detail
            wx.showLoading({
              title: '修改中'
            });
            detail = that.fillDetailToDefault(detail);

            var send_data = {
                'sessionID': app.globalData.sessionID,
                'sendLocSum': detail.DeRecLocSel,
                'sendLocDetail': detail.DeRecLocIn,
                'contactNum': detail.conPhoneNum,
                'fetchName': detail.recName,
                'phoneRear': detail.phoneRear,
                'QQ':detail.QQ=='可不填写'?null:detail.QQ
            };
            console.log('ready:',send_data);
                //发起post请求
            wx.request({
                url: urlModel.url.postAddr,
                method: 'POST',
                data: send_data,
                success: function(res) {
                    if (res.statusCode==200) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '修改成功',
                        });
                        setTimeout(()=>{wx.switchTab({
                            url: '../my/my',
                        })},2000)

                    } else {
                        wx.hideLoading();
                        wx.showToast({
                            title: '出错，请重试',
                            icon: 'none'
                        })
                    }
                },fail:function () {
                    wx.hideLoading();
                    wx.showToast({
                        title: '出错，请重试',
                        icon: 'none'
                    })
                }
            })
        }

    },
    checkNone: function(detail) {
        //设置了默认地址，空不空无所谓；未设置默认地址为空就提示补全
        if ((detail.recLocInput == '' || detail.conPhone == '' || detail.phoneRear == '' || detail.recName == '' || detail.DeRecLocSel == '选择区域') &&
            app.globalData.default.phoneRear == '四位数字') { //'四位数字'存在即说明没有设置过默认地址
            wx.showToast({
                    title: '请补全信息',
                    icon: 'none'
                });
                //存在未填写信息，提示补全
            return true
        }
        return false
    },
    fillDetailToDefault: function(detail_to_fill) {
        //如果信息中有 未填写的默认信息，进行补全
        for (var Key in detail_to_fill) {
            //todo 修改大改变量名
            if (detail_to_fill[Key] == '') {
                if (Key == 'conPhoneNum') {
                    detail_to_fill[Key] = app.globalData.default.conPhone
                } else if (Key == 'DeRecLocIn') {
                    detail_to_fill[Key] = app.globalData.default.sendLocInput
                } else if (Key == 'recName') {
                    detail_to_fill[Key] = app.globalData.default.recName
                } else if (Key == 'phoneRear') {
                    detail_to_fill[Key] = app.globalData.default.phoneRear
                }else if (Key == 'DeRecLocSel') {
                    detail_to_fill[Key] = app.globalData.default.sendLocSelect
                }else if (Key == 'QQ'){
                    detail_to_fill[Key] = app.globalData.default.QQ
                }
            }
        }
        return detail_to_fill
    },
    check_notset_all: function(data_tocheck) {
        //检查 默认地址 是否 没有填写完整，没有返回true，设置过返回false
        for (var Key in data_tocheck) {
            if (Key == 'conPhoneNum') {
                // console.log(Key)
                if (data_tocheck[Key] == '点击输入电话号码') { return true }
            } else if (Key == 'DeRecLocIn') {
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
                if (data_tocheck[Key] == '选择区域') { return true }
            }
        }
        return false
    },
    extractPhoneRear: function(e) {
        var that = this;
        console.log(e);
        var inputNumb = e.detail.value;
        if (inputNumb.length < 11 && inputNumb.length >= 1) {
            //输入手机号小于11位 且 大于1位
            wx.showToast({
                title: '手机号码有误',
                icon: 'none'
            })
        } else if (inputNumb.length == 11) {
            this.data.default.phoneRear = inputNumb[7] + inputNumb[8] + inputNumb[9] + inputNumb[10];
            this.setData({
                default: that.data.default,
                phoneRear: that.data.default.phoneRear
            })
        }
        console.log(this.data.default)
    },
    getPhoneNumber:function (e) {
        console.log(e)
    }
});