var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        expLogoUrl: '../../images/logo.jpg',
        expOpenTime: '周一至周日08：00至19：00',
        expStationName: '申通快递·阳光苑',
        //原实例时间地点
        hint:'填写时间，例如：周一至周日 9:00-19:00',//提示正确的格式

        expressLocArray: [
            ['新东门', '老东门', '硕士楼', '新勇西', '阳光苑二楼'],
            ['顺丰', '申通', '中通', '圆通', '百世汇通', '韵达', '天天快递', 'EMS', '京东']
        ],
        expressLoc: '新东门' + '·' + '百世汇通', //这就是默认
        expFirstIndex: 0,
        expSecondIndex: 0,
        expressId: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) { //获取快递站点基本信息
        var that = this
        var expStationName = options.title
        let expOpentime = options.time
        let logoUrl = options.logo
        this.setData({
            expStationName:expStationName,
            expOpenTime:expOpentime,
            expressLoc:expStationName,
            expLogoUrl:logoUrl
        })
        // let send_data = {
        //     'exp_company':expCom,
        //     'exp_station':expStation
        // }
        // wx.request({
        //     url: urlModel.url.reportExError, //填充单独报错URL
        //     method: 'GET',
        //     data: send_data,
        //     success: function(res) {
        //         that.setData({
        //             //设置页面参数
        //             expLogoUrl: res.data,
        //             expOpenTime: res.data,
        //             expStationName: res.data,
        //             expressLoc: res.data, //与上面相同
        //             expressId: res.data,
        //
        //         })
        //     },
        //     fail: function() {},
        //     complete: function() {}
        // })
        this.setData({
            expressLocArray: app.globalData.expressLocArray
        })
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
    fixReport: function(e) {
        var that = this
        console.log('提交表单',e)
        if(e.detail.value.expOpentime.length<6){
            wx.showToast({
              title: '请填写正确的营业时间~',
                icon:'none'
            })
            return
        }
        wx.showLoading({
            title:'提交中'
        })
        wx.request({
            url: urlModel.url.reportExError, //填充报错URL
            method: 'POST',
            data: {
                'exp_open_time': e.detail.value.expOpentime,
                'exp_company': e.detail.value.expCompany,
                'school_id': app.globalData.schoolID,
                'sessionID': app.globalData.sessionID
            },
            success: function(res) {
                wx.hideLoading()
                if (res.statusCode==200){
                    wx.showToast({
                        title: '感谢',
                        icon: 'success',
                        duration: 1000
                    })
                }else {
                    wx.showToast({
                        title:'提交失败，请重试',
                        icon:'none'
                    })
                }

            },
            fail: function() {
                wx.hideLoading()
                wx.showToast({
                title:'提交失败，请重试',
                icon:'none'
            })},
            complete: function() {}
        })
    },
    exlocChange: function(e) {
        console.log(e);
        console.log('时间picker发送选择改变，携带值为', e.detail.value)
        var selected = this.data.expressLocArray[0][this.data.expFirstIndex] + '·' + this.data.expressLocArray[1][this.data.expSecondIndex]
        this.setData({
            expressLoc: selected
        })

    },
    exlocColumnChange: function(e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
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
})