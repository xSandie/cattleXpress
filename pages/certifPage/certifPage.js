var app = getApp()
const urlModel = require('../../utils/urlSet.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        studentOrTeacher: true,
        schoolIcon: "../../images/schoolIcon.png",
        passCertifIcon: "../../images/next.png",
        verifCodePath: '', //验证码路径
        schoolName: "点击选择学校",
        row1: false,
        row2: false,
        row3: false,
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
      var that=this
        this.setData({
            schoolName: app.globalData.schoolName
        })
      if (app.globalData.schoolName=='点击选择学校'){
          wx.showToast({
            title: '请先选择学校',
            icon:'none'
          })
        }else{
          send_data={
            'gId':app.globalData.user_ID
          }
          wx.request({
            url: urlModel.url.getCertifCode,
            method:'POST',
            data:send_data,
            success:function(res){
              console.log(res)
              if(res.data.img_url){
                that.setData({
                  verifCodePath: res.data.img_url+'?v='+Math.random()
                })
              }
            }
          })
        }
        //写具体的get函数 ifschoolname=空就不发送验证，根据教职工还是学生get不同的数据
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
    selStudent: function() {
        this.setData({
            studentOrTeacher: true
        })
    },
    selTeacher: function() {
        // this.setData({
        //     studentOrTeacher: false
        // })
        wx.showToast({
          title: '暂时不支持 教职工/研究生 认证噢！',
          icon:'none'
        })
    },
    schoolInput: function() {
        wx.navigateTo({
            url: '../changeSchool/changeSchool',
        })
    },
    change1: function() {
        this.setData({
            row1: true
        })
    },
    change2: function() {
        this.setData({
            row2: true
        })
    },
    change3: function() {
        this.setData({
            row3: true
        })
    },
    certif: function(e) {
      if (e.detail.value.schoolNumb == '' || e.detail.value.password == '' || e.detail.value.verifiedCode==''){
        wx.showModal({
          title: '信息不全',
          content: '请填写完整信息',
          showCancel: false,
          confirmText: '返回',
          confirmColor: '#faaf42',
        })
      }else{
        var that = this
        console.log(e.detail.value)
        wx.request({
          url: urlModel.url.postCertifMes, //填充认证url
          method: 'POST',
          data: {
            'zjh': e.detail.value.schoolNumb,
            'mm': e.detail.value.password,
            'yzm': e.detail.value.verifiedCode,
            'gId': app.globalData.user_ID,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            console.log(res)
            if (res.statusCode == 200) {
              if (res.data.status == 1) {

                //设置姓名、学号、status
                app.globalData.ourUserStatus=0
                app.globalData.userName = res.data.name
                app.globalData.schoolNumb = res.data.schoolNum
                app.globalData.ourUserStatus = res.data.user_status
                wx.showToast({
                  title: '认证成功',
                  icon: 'success',
                  duration: 1500,
                  success: function () {
                    wx.showToast({
                      title: '最后，请设置默认联系方式',
                      success:function(){
                        wx.redirectTo({
                          url: '../defAddrEdit/defAddrEdit?path=certif'
                        })
                      }
                    })          
                  }
                })
              } else {
                wx.showModal({
                  title: '认证失败',
                  content: '请认真核对信息',
                  showCancel: false,
                  confirmText: '返回',
                  confirmColor: '#faaf42',
                })
                //设置新的验证码地址
                that.setData({
                  verifCodePath: res.data.imgUrl + '?v=' + Math.random()
                })
              }
            } else {

            }
            // setTimeout(function() {
            //     wx.navigateBack({})
            // }, 1000);
          },
          fail: function () {
          },
          complete: function () { }
        })
      }
      
    },
    changeCode:function(){
      var that=this
      send_data = {
        'gId': app.globalData.user_ID
      }
      wx.request({
        url: urlModel.url.getCertifCode,
        method: 'POST',
        data: send_data,
        success: function (res) {
          console.log(res)
          if (res.data.img_url) {
            that.setData({
              verifCodePath: res.data.img_url+'?v='+Math.random()
            })
          }
        }
      })
    }
})