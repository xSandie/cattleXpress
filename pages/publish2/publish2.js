var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkBtnIcon: "../../images/next.png",

        expStation: '',
        sendLoc: '',
        conPhone: '',
        phoneRear: '',
        recName: '',

        checking: false,
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
        rewardBoxItems: [
            { name: 2, value: '2元', checked: true },
            { name: 5, value: '5元' },
            { name: 10, value: '10元' }
        ],
        pubImg2: "../../images/publishIMG2.png"
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
        this.setData({
            checking: false
        })
        var that = this;
        wx.getStorage({
            key: 'FORM1',
            success: function(res) {
                that.setData({
                    expStation: res.data.selExCon,
                    sendLoc: res.data.DeRecLocSel,
                    conPhone: res.data.conPhone,
                    phoneRear: res.data.phoneRear,
                    recName: res.data.recName
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
    checking: function() {
        this.setData({
                checking: true
            })
            // console.log("检查按钮被点击了")
    },



    secOrdSubmit: function(e) {
        wx.setStorageSync({
            key: 'FORMRaw2',
            data: e.detail.value,
        })


        if (e.detail.value.rewardIn == '') {
            e.detail.value.rewardIn = e.detail.value.reward;
        }
        e.detail.value.weightInfo = this.data.expWeight[this.data.weightIndex];
        e.detail.value.sexLimit = this.data.sexLimRange[this.data.sexIndex]
            // console.log(e.detail.value)
        var that = this;
        wx.setStorageSync({
                key: 'sizeArr',
                data: that.data.sizeCheckBox,
            })
            // setTimeout(function() {
        wx.setStorageSync({
            key: 'FORM2',
            data: e.detail.value,
        })
        wx.showLoading({
            title: '全速整合中',
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            success: function() {}, //接口调用成功的回调函数  
            fail: function() {}, //接口调用失败的回调函数  
            complete: function() {} //接口调用结束的回调函数  
        })
        setTimeout(function() {
            if (that.data.checking == true) {
                wx.hideLoading()
                wx.navigateTo({
                    url: '../finPub/finPub',
                })
            } else {
                wx.getStorage({
                    key: 'FORM1',
                    success: function(res) {
                        //获取完存储的缓存后发送 发布订单请求 和 设置默认地址请求
                        var uploadlist = Object.assign({}, res.data, e.detail.value)
                            // console.log(uploadlist)
                        var event = uploadlist
                            //event已经是完整可上传的对象
                            //加入判空逻辑
                        if (that.check_none(event)) {
                            //有空的
                            wx.hideLoading()
                            wx.showToast({
                                title: '信息有空，请补全',
                                icon: 'none'
                            })
                            return
                        } else {
                            // console.log(event)
                            wx.request({
                                url: urlModel.url.pubOrder, //填充发布订单url
                                method: 'POST',
                                // header: { "Content-Type": "application/x-www-form-urlencoded" },
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
                                success: function(res) {
                                    wx.hideLoading()
                                    if (res.statusCode == 200) {
                                        if (res.data.msg == 'ok') {
                                            wx.showToast({
                                                title: '发布成功',
                                                icon: 'success',
                                                duration: 2000
                                            })
                                            that.setData({
                                                checking: false
                                            })
                                            setTimeout(function() {
                                                wx.switchTab({
                                                    url: '../orders/orders',
                                                })
                                            }, 2000)
                                        } else if (res.data.no_more_zero == true) {
                                            wx.showToast({
                                                title: '每个用户只能发布一次0元订单噢!',
                                                icon: 'none',
                                                duration: 3000
                                            })
                                        }
                                    }
                                },
                                fail: function() {
                                    wx.hideLoading()
                                    wx.showModal({
                                        title: '提示',
                                        content: '网络不太畅通，请稍后再试噢',
                                        showCancel: false,
                                        confirmText: '返回',
                                        confirmColor: '#faaf42',
                                    })
                                },
                                complete: function() {}
                            })
                        }
                    },
                    fail: function(res) {},
                    complete: function(res) {},
                })
            }
        }, 2000)


    },
    sexLimitChange: function(e) {
        // console.log(e);
        this.setData({
            sexIndex: e.detail.value
        })
    },




    weInfoChange: function(e) {
        // console.log(e);
        this.setData({
            weightIndex: e.detail.value
        })
    },

    worcheck: function() {
        var worchecked1 = !this.data.urgentChecked;
        this.setData({
            urgentChecked: worchecked1
        })
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
    rewardChange: function(e) {
        var items = this.data.rewardBoxItems;
        var values = e.detail.value;
        for (var i = 0, lenI = items.length; i < lenI; i++) {
            items[i].checked = false; //一开始先设为未选中（其实还未提交）
            for (var j = 0, lenJ = values.length; j < lenJ; j++) {
                if (values.length > 1) {
                    values.shift(values[0]);
                }
                if (items[i].name == values[j]) {
                    items[i].checked = true;
                    break;
                }

            }
            this.setData({
                rewardBoxItems: items
            })
        }
        // console.log('赏金checkbox发生change事件，携带value值为：', e.detail.value)
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