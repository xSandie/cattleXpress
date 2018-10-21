var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        exLogo: '../../images/STOLOGO.png',
        exLocTime: '',
        exInstance: '',
        fxIcon: '../../images/fixBtnIcon.png',
        conIcon: '../../images/checkLight.png',
        sdInstance: '',

        exWorry: null,
        exWeight: '',
        exSize: '',
        exExTime: '',

        dText: '',

        reward: '',
        schNum: '',
        LName: '',
        pubtime: '',
        orderId: '',
        phoneNum: '',

        expressID: ''

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        // console.log(options.id);

        var that = this
            // wx.request({
            //   url: "https://liudongtushuguan.cn/v2/movie/subject/"+options.id,
            //   //method:"GET",默认
            //   header:{
            //     "content-type":"json"
            //   },

        //   //捎带数据传送给server,异步调用

        //   //接收到服务器返回数据进行处理
        //   success:function(res){
        //     console.log(res);
        //     //res是返回数据的对象，只要有返回数据就是成功，会抽取返回的状态码403 200之类的
        //     if(res.statusCode==200){
        //     that.setData({
        //       movie:res.data//movie是新增的变量，此时this指向的是wx.request内部
        //       })
        //       //动态设置title
        //       wx.setNavigationBarTitle({
        //         title: res.data.rating.average+"分："+res.data.title,
        //       })
        //       wx.hideNavigationBarLoading();
        //     }
        //   },
        //   complete:function(){
        //     //最后都会运行
        //   },

        // })
        wx.request({
          url: 'http://45.40.197.154/HelloWord/firstpage/waitreceiveinfo', //填充请求浏览者订单详情url
            method: 'GET',
            data: {
                'orderID': options.id,
                //'user_ID': app.globalData.user_ID,为以后埋点做准备
            },
            header: {
                "Content-Type": "applciation/json"
            },
            success: function(res) {
                // console.log(res)
                that.setData({
                    //设置页面参数
                    exLogo: res.data.exLogo,
                    exLocTime: res.data.exLocTime,
                    exInstance: res.data.exInstance,
                    expressID: res.data.expressID,
                    //以上是快递站点信息
                    orderId: res.data.orderId,
                    sdInstance: res.data.sdInstance,
                    exWorry: res.data.exWorry,
                    exWeight: res.data.exWeight,
                    exSize: res.data.exSize,
                    exExTime: res.data.exExTime,
                    reward: res.data.reward,
                    schNum: res.data.schNum,
                    LName: res.data.LName,
                    pubtime: res.data.pubtime,
                    phoneNum: res.data.phoneNum,
                    dText: res.data.dText
                })
            },
            fail: function() {},
            complete: function() {}
        })

        // console.log("ok")//会先执行ok再等到收到数据执行success
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
    /**
     * 接单按钮按下
     */
    recOrder: function(event) {
        if (app.globalData.certif == true) {
            var orderId = event.currentTarget.dataset.orderId;
            wx.showModal({
                title: '确认接单',
                content: '接单后要准时送达噢',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        //接单动作
                        wx.request({
                            url: 'http://45.40.197.154/HelloWord/receivecode/getopenid', //订单动作接口
                            method: 'POST',
                            data: {
                                'orderID': orderId,
                                'user_ID': app.globalData.user_ID,
                                'nextStat': 2
                            },
                            success: function(res) {
                                // console.log(event)
                                // console.log(orderId)
                                wx.redirectTo({
                                    url: "../orderDetailsRec/orderDetailsRec?id=" + orderId
                                })
                            },
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        }

    },
    conTA: function() {
        if (app.globalData.certif == false) {
            wx.showModal({
                title: '请认证',
                content: '点击确定前往教务系统认证！',
                confirmColor: '#faaf42',
                success: function(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.redirectTo({
                            url: '../certifPage/certifPage'
                        })
                    } else if (res.cancel) {
                        // console.log('用户点击取消')
                    }
                }
            })
        } else {
            wx.makePhoneCall({
                phoneNumber: this.data.phoneNum //仅为示例，并非真实的电话号码
            })
        }
    },
    toFix: function(event) {
        // var expressID = event.currentTarget.dataset.expressId
        // console.log(expressID)
        // wx.navigateTo({
        //     url: '../reportExError/reportExError?id=' + expressID,
        // })
        wx.showModal({
            title: '敬请期待',
            content: '攻城狮加紧完善中',
            confirmColor: '#faaf42',
            showCancel: false,
            confirmText: '期待噢',
            success: function(res) {
                if (res.confirm) {}
            }
        })
    }
})