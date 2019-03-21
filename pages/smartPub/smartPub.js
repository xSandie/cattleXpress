var app = getApp();
const urlModel = require('../../utils/urlSet.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pubImg: "../../images/publishIMG2.png",
    pullIcon:'../../images/pull.png',
    nextIcon: "../../images/next.png",
    showEdit:true,//是否展示详情编辑
    submitFlag:true,//点击提交表单时是否发布，true直接发布
    cardStyle:'addrEditCard',//卡片的class
    mainFormClass:'highForm',//主要表单的class
    default: {
      conPhone: '点击输入电话号码',
      sendLocSelect: '选择地点',
      sendLocInput: '填写地点',
      recName: '填写姓名',
      phoneRear: '四位数字',
      QQ: '可不填写'
      //TODO 每次点击都会覆盖这个
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
    expDescript:'可在此简单描述下您的快递（不超过50个字）'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var send_data = {
      'sessionID': app.globalData.sessionID
    }
    wx.request({
      url: urlModel.url.getAddr,
      data: send_data,
      success: function(res) {
        if (res.data.default) {
          app.globalData.default.conPhone = res.data.phone
          app.globalData.default.phoneRear = res.data.phone_rear
          app.globalData.default.recName = res.data.rec_name
          app.globalData.default.sendLocInput = res.data.send_loc_detail
          app.globalData.default.sendLocSelect = res.data.send_loc_sum
          app.globalData.default.QQ = res.data.QQ || '可不填写'
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  //TODO 下拉刷新重填
  },
  onShareAppMessage: function () {
    return {
      title: '校园快递互助代取',
      path: '/pages/home/home',
      imageUrl: '/images/sharePic.jpg'
    }
  },
  scrollDown:function(){
    var that = this
    this.setData({
      cardStyle:'addrEditCard',
      showEdit:!that.data.showEdit
    })//放下卡片的类
  },
  scrollUp:function () {
    var that = this
    this.setData({
      cardStyle:'sumCard',
      showEdit:!that.data.showEdit,
      submitFlag:false
    })//收起卡片的类
  },
  differLink:function () {
    wx.showModal({
      title: '区别',
      content: '联系电话是代领者与你联系时使用的号码，收货电话是领取你的快递时用的号码（建议使用不同号码）。',
      confirmColor: '#faaf42',
      confirmText: '知道啦',
      showCancel: false,
      success: function(res) {}
    })
  },
  extractPhoneRear: function(e) {
    var that = this
    console.log(e)
    var inputNumb = e.detail.value
    if (inputNumb.length < 11 && inputNumb.length >= 1) {
      //输入手机号小于11位 且 大于1位
      wx.showToast({
        title: '手机号码有误',
        icon: 'none'
      })
    } else if (inputNumb.length == 11) {
      this.data.default.phoneRear = inputNumb[7] + inputNumb[8] + inputNumb[9] + inputNumb[10]
      this.setData({
        default: that.data.default,
        phoneRear: that.data.default.phoneRear
      })
    }
    console.log(this.data.default)
  },
  setDefFlag:function () {
    //是否设置成默认值
    var that = this
    this.setData({
      setDefFlag:!that.data.setDefFlag
    })
  },
  finOrdSubmit:function (e) {
    //提交表单
    setTimeout(this.pubOrder,1000,e)
  },
  pubOrder:function (e) {
    //提交发布
    if(this.data.submitFlag){
      //TODO 执行发布逻辑
    }else {
      //TODO 设置展示信息

      if (this.data.setDefFlag) {
        //TODO 设置默认信息，发请求
      }
    }
  }
})