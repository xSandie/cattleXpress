// pages/myCode/myCode.js
const urlModel = require('../../utils/urlSet.js')
app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    can_change:false,
    myPayCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {//每次显示重置myPayCode
  var that=this
    wx.request({
      url: urlModel.url.getMyPayCode,
      data:{
        gId:app.globalData.user_ID
      },
      success: function (res) {
        console.log(res)
        if(res.statusCode==200){
          that.setData({
            myPayCode: res.data.myPayCode + '?v=' + Math.random(),
            can_change: res.data.canChange
          })
        }      
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showHelp:function(){
    wx.showModal({
      title: '保存收款二维码',
      content: '1.点击右上角圆圈返回微信\r\n2.进入 我>钱包>收付款>二维码收款 中保存收款码\r\n3.注意：收款二维码是对方支付的唯一渠道！',
      confirmText:'知道啦',
      confirmColor:'#f9a93e',
      showCancel:false
    })
  },
  showLarge:function(){
    var that=this
    wx.previewImage({
      urls: [that.data.myPayCode],
    })
  },
  changeCode:function(){
    var that=this
    wx.chooseImage({
      count:1,
      sourceType: ['album'],
      sizeType: ['compressed'],
      success: function(res) {
        //发起上传图片请求
        tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: urlModel.url.changePayCode,
          filePath: tempFilePaths[0],
          name: 'payCode',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            //'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          formData: {
            gId: app.globalData.user_ID  //其他额外的formdata，userId
          },
          success:function(res){
            console.log(res)
            if(res.statusCode==200){              
                wx.showToast({
                  title: '上传成功',
                })
                that.onShow()
            } else {
              wx.showToast({
                title: '上传失败请重试',
              })
            }
          }
        })
      },
    })
  },
  upCode:function(){
    this.changeCode()
    this.setData({
      can_change:true
    })
    //然后服务器端也设置成true
  },
  upOrChangeCode:function(){
    if (this.data.can_change==true){
      this.changeCode()
    }else{
      this.upCode()
    }
  }
})