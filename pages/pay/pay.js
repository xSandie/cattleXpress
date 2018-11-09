// pages/pay/pay.js
const urlModel = require('../../utils/urlSet.js')
app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payCodeUrl:null,
    receiverSchoolId:null,
    receiverAvatar:null,
    receiverNickname:'专业黄牛',
    receiverLname:'黄'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if (options.orderId){
      wx.request({
  //获取对方支付二维码接口
        url: urlModel.url.toPayGet,
        method:'POST',
        data:{
          'orderID':options.orderId,
          'payerID': app.globalData.user_ID
        },
        success:function(res){
          if(res.statusCode==200){
            that.setData({
              payCodeUrl:'',
              receiverSchoolId:'',
              receiverAvatar:'',
              receiverNickname:'',
              receiverLname:''
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})