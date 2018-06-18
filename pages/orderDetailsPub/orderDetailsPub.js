var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

        exLogo: '../../images/STOLOGO.png',
        exLocTime: '营业时间：' + '周一至周日08：00至19：00',
        exInstance: '阳光苑·申通快递',
        fxIcon: '../../images/fixBtnIcon.png',
        LName: '向',
        pubtime: '1月19日 12：00',
        reward: '20',
        expressID: '125789',
        orderID: '15895',
        finIcon: '../../images/checkLight.png',
        policeTAIcon: '../../images/policeDim.png',
        conTAIcon: '../../images/conDim.png',
        conIcon: '../../images/conIcon.png',
        policeIcon: '../../images/policeLight.png',
        cancelIcon: "../../images/cancelIcon.png",

        fetchCode: 'A1-4568',
        haoIcon: '../../images/numRear.png',
        mingIcon: '../../images/deName.png',
        jianIcon: '../../images/sizeIcon.png',
        shiIcon: '../../images/timeIcon.png',

        shiText: '05-07 16:00前',
        mingText: '向书晗',
        jianText: '小件',
        haoText: '9021',

        sdLoc: '宿舍区 硕士楼 D1-2245',
        weightInfo: '<0.5KG',
        otherInfo: '静安大火飞机喀什电话费就爱看华盛顿发射啊圣诞节快发哈设计开发和',
        exWorry: true,

        reName: "刘国权 41612057",
        reTime: " 接单时间：05-07 15:00",

        statusCode: 0,
        status: "",
        statusBack: "",
        statusBackWaitMe: "linear-gradient(90deg,#fed25c, #f9a93e)",
        statusBackFinOrRec: "linear-gradient(90deg,#4ED662, #37BD76)",
        statusBackOutofTime: "linear-gradient(90deg,#D6D6D6, #BABABA)",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        var that = this
        wx.request({
            url: '', //填充请求订单具体信息url
            method: 'GET',
            data: {
                'orderID': options.id,
                'user_ID': app.globalData.user_ID,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    //设置页面参数，设置orderID
                })
            },
            fail: function() {},
            complete: function() {}
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
    onShow: function() {
        if (this.data.statusCode == 0 || this.data.statusCode == 1) {
            this.setData({
                statusBack: "linear-gradient(90deg,#fed25c, #f9a93e)",
            })
        } else if (this.data.statusCode == 2 || this.data.statusCode == 3) {
            this.setData({
                statusBack: "linear-gradient(90deg,#4ED662, #37BD76)"
            })
        } else if (this.data.statusCode == 4) {
            this.setData({
                statusBack: "linear-gradient(90deg,#D6D6D6, #BABABA)"
            })
        } else if (this.data.statusCode == 5 || this.data.statusCode == 6) {
            this.setData({
                    statusBack: "linear-gradient(90deg,#D6D6D6, #BABABA)"
                })
                //异常也不让用户太糟心
        }


        if (this.data.statusCode == 0) {
            this.setData({
                status: "待收货"
            })
        } else if (this.data.statusCode == 1) {
            this.setData({
                status: "待接单"
            })
        } else if (this.data.statusCode == 2) {
            this.setData({
                status: "待送达"
            })
        } else if (this.data.statusCode == 3) {
            this.setData({
                status: "已完成"
            })
        } else if (this.data.statusCode == 4) {
            this.setData({
                status: "已过期"
            })
        } else if (this.data.statusCode == 5 || this.data.statusCode == 6) {
            this.setData({
                    status: "异常"
                })
                //异常也不让用户太糟心
        }

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
        var that = this
        wx.request({
            url: '', //填充请求订单具体信息url
            method: 'GET',
            data: {
                'orderID': that.orderID,
                'user_ID': app.globalData.user_ID,
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                that.setData({
                    //设置页面参数，设置orderID
                })
            },
            fail: function() {},
            complete: function() {}
        })
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
    toFix: function(event) {
        var expressID = event.currentTarget.dataset.expressId
        console.log(expressID)
        wx.navigateTo({
            url: '../reportExError/reportExError?id=' + expressID,
        })
    },
    conTA: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.phoneNum //仅为示例，并非真实的电话号码
        })
    },
    toLaw: function() {
        wx.showModal({
            title: '请谨慎举报',
            content: '遇以下情况可举报用户：\r\n1、快递被接单者领走但未被送达；\r\n2、快递被接单者损坏；\r\n3、接单者送达后未收到酬劳；\r\n4、接单者送达后收到的酬劳少于接单前商定的酬劳；\r\n5、其他损害用户利益的行为。\r\n我们将视情况给予违规用户处罚。',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    policeTA: function(event) {
        var that = this
        wx.showModal({
            title: '确定举报？',
            content: '请谨慎举报',
            confirmText: '确认举报',
            confirmColor: '#faaf42',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.redirectTo({
                        url: '../policeDetailProposal/policeDetailProposal?id=' + that.data.expressID
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    finOrder: function() {
      var that = this
      wx.showModal({
        title: '确认',
        content: '确认收货后赏金就自动给对方了噢！',
        confirmText: '好的',
        confirmColor: '#faaf42',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: '', //填充完成订单url
              method: 'GET',
              data: {
                'orderID': that.data.expressID,
                'user_ID': app.globalData.user_ID,
              },
              header: {
                "Content-Type": "applciation/json"
              },
              success: function (res) {
                that.setData({
                  //设置页面参数
                  statusCode: 0,
                })
                wx.showToast({
                  title: '已完成',
                  icon: 'success',
                  duration: 1000
                })
              },
              fail: function () { },
              complete: function () { }
            })
          }
        }
      })
        
        
    }
})