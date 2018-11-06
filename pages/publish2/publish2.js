var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uploadList: null,
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

        publishIMG: "../../images/publishIMG2.png"
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
                    exCon: res.data.selExCon,
                    sdLoc: res.data.DeRecLocSel,
                    conPhoneNum: res.data.conPhoneNum,
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

    },
    checking: function() {
        this.setData({
            checking: true
        })
        console.log("检查按钮被点击了")
    },



    secOrdSubmit: function(e) {
        wx.setStorage({
            key: 'FORMrow2',
            data: e.detail.value,
        })


        if (e.detail.value.rewardIn == '') {
            e.detail.value.rewardIn = e.detail.value.reward;
        }
        e.detail.value.weightInfo = this.data.exWeight[this.data.weIndex];
        e.detail.value.sexLimit = this.data.sexLimRange[this.data.sexIndex]
        console.log(e.detail.value)
        var that = this;
        wx.setStorage({
                key: 'sizeArr',
                data: that.data.checkboxItems,
            })
            // setTimeout(function() {
        wx.setStorage({
            key: 'FORM2',
            data: e.detail.value,
        })
        wx.showLoading({
            title: '全速整合中',
            mask: true, //是否显示透明蒙层，防止触摸穿透，默认：false  
            success: function() {
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
                            console.log(uploadlist)
                            var event = uploadlist
                                // that.setData({
                                //     uploadList: uploadlist
                                // })
                            // console.log(event.DeRecLocSel)
                            //event已经是完整可上传的对象
                            //加入判空逻辑
                          if (that.check_none(event)) {
                            //有空的
                            wx.showToast({
                              title: '信息有空，请补全',
                              icon: 'none'
                            })
                          } else {
                            wx.request({
                              url: 'http://45.40.197.154/HelloWord/publish/publishinfo', //填充发布订单url
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
                              // header: {
                              //     "Content-Type": "application/x-www-form-urlencoded"
                              // },
                              success: function (res) {
                                if (res.statusCode == 200) {
                                  //订单发布成功后发送 是否 设置默认地址
                                  if (event.setDef == true) {
                                    wx.request({//设置默认地址
                                      url: '',
                                      data: '',
                                      success: function (res) {
                                        //设置成功
                                        if (res.statusCode == 200) {
                                          wx.hideLoading()
                                          //console.log("表单提交成功")
                                          wx.showToast({
                                            title: '发布成功',
                                            icon: 'success',
                                            duration: 2000
                                          })
                                          that.setData({
                                            checking: false
                                          })
                                          wx.switchTab({
                                            url: '../orders/orders',
                                          })
                                        }
                                      }
                                    })
                                  } else {
                                    wx.hideLoading()
                                    //console.log("表单提交成功")
                                    wx.showToast({
                                      title: '发布成功',
                                      icon: 'success',
                                      duration: 2000
                                    })
                                    that.setData({
                                      checking: false
                                    })
                                    wx.switchTab({
                                      url: '../orders/orders',
                                    })
                                  }
                                }

                              },
                              fail: function () {
                                wx.hideLoading()
                                wx.showModal({
                                  title: '提示',
                                  content: '网络不太畅通，请稍后再试噢',
                                  showCancel: false,
                                  confirmText: '返回',
                                  confirmColor: '#faaf42',
                                })
                                //console.log(app.globalData.userInfo)
                              },
                              complete: function () { }
                            })
                          }
                            

                        },
                        fail: function(res) {},
                        complete: function(res) {},
                    })
                }
            }, //接口调用成功的回调函数  
            fail: function() {}, //接口调用失败的回调函数  
            complete: function() {} //接口调用结束的回调函数  
        })

        // if (that.data.checking == true) {
        //     // wx.showToast({
        //     //     title: '全速整合中',
        //     //     icon: 'loading',
        //     //     duration: 1000
        //     // })
        //     wx.navigateTo({
        //         url: '../finPub/finPub',
        //     })
        // } else {
        //     wx.getStorage({
        //         key: 'FORM1',
        //         success: function(res) {
        //             var uploadlist = Object.assign({}, res.data, e.detail.value)
        //             console.log(uploadlist)
        //             that.setData({
        //                 uploadList: uploadlist
        //             })
        //             console.log(that.data.uploadList)
        //             wx.request({
        //                 url: '', //填充url发送表单json
        //                 method: 'POST',
        //                 data: {
        //                     'body': that.data.uploadList,
        //                     'user_ID': app.globalData.user_ID
        //                 },
        //                 header: {
        //                     "Content-Type": "applciation/json"
        //                 },
        //                 success: function() {
        //                     console.log("表单提交成功")
        //                     wx.showToast({
        //                         title: '发布成功',
        //                         icon: 'success',
        //                         duration: 2000
        //                     })
        //                     that.setData({
        //                         checking: false
        //                     })
        //                     wx.switchTab({
        //                         url: '../orders/orders',
        //                     })
        //                 },
        //                 fail: function() {
        //                     wx.showModal({
        //                             title: '提示',
        //                             content: '网络不太畅通，请稍后再试噢',
        //                             showCancel: false,
        //                             confirmText: '返回',
        //                             confirmColor: '#faaf42',
        //                         })
        //                         //console.log(app.globalData.userInfo)
        //                 },
        //                 complete: function() {}
        //             })

        //         },
        //         fail: function(res) {},
        //         complete: function(res) {},
        //     })
        // }
        // }, 1000);


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
            weIndex: e.detail.value
        })
    },

    worcheck: function() {
        var worchecked1 = !this.data.worchecked;
        this.setData({
            worchecked: worchecked1
        })
    },

    checkboxChange: function(e) {
        // console.log('大小估计radio发生change事件，携带value值为：', e.detail.value)
        // console.log(e)
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
  check_none: function (data_tocheck) {
    console.log(data_tocheck)
    for (var Key in data_tocheck) {
      if (data_tocheck[Key] == '') {//有空的返回true
        if (Key != 'setDef' && Key != 'otherInfo' && Key != 'worInfo') {
          return true
        }
      }
    }
    return false
  }
})