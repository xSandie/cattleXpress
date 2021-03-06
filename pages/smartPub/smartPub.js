var app = getApp();
const urlModel = require('../../utils/urlSet.js');
const ui = require('../../utils/helper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pubImg: "../../images/publishIMG2.png",
    pullIcon:'../../images/pull.png',
    nextIcon: "../../images/next.png",
    showEdit:false,//是否展示详情编辑
    submitFlag:true,//点击提交表单时是否发布，true直接发布
    smartPub:true,
    haveShowCantPub:false,//已经弹窗过不能使用智能发布
    cardStyle:'sumCard',//卡片的class
    mainFormClass:'highForm',//主要表单的class
    default: {
      conPhone: '点击输入电话号码',
      sendLocSelect: '选择区域',
      sendLocInput: '填写地点',
      recName: '填写姓名',
      phoneRear: '四位数字',
      QQ: '可不填写'
      //TODO 每次点击都会覆盖这个
    },

    expressLocArray: [
      [],
      []
    ],
    expressLoc: '点击' + '·' + '选择', //这就是默认
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
    dateRange:[],
    dateIndex: 0,
    limitIndex:0,
    limitList:['无限制','限男生','限女生','官方团队'],
    expWeight: ['<0.5KG', '<1KG', '<5KG', '其他'],
    weightIndex: 0,
    expSize: ['小件', '中件', '大件'],
    sizeIndex: 0,

    nextBtnIcon: "../../images/next.png",
    setDefFlag: false,
    expDescript:'可在此简单描述下您的快递（不超过50个字）',
    recognHint:'快递短信 粘贴处，点击识别即可自动为您填写 取件码 和 快递站点 信息。',
    tempExpDescript:'可在此简单描述下您的快递（不超过50个字）',
    tempRecognHint:'快递短信 粘贴处，点击识别即可自动为您填写 取件码 和 快递站点 信息。',
    defaultReward:'2',
    expCode:'可输入取件码',
    confirmShape: "right",
    checkedCorlor: "#faaf42",
    leftValue: "同意",
    rightValue: "用户协议",
    beChecked:true,
    bePublic:true,
      adId:7//协议id
  },
  //todo 发布时才触发是否设置默认地址逻辑，发布完成后才进行默认地址请求
  /**
   * 生命周期函数--监听页面加载
   */
  myBePublic(e){
    console.log(e.detail.checked);
    if(e.detail.checked==false){
        this.setData({
          bePublic:false
        })
    }
    else{
      this.setData({
        bePublic:true
      })
    }
  },
  onLoad: function (options) {
    if(app.globalData.defaultLimit){
      this.setData({
        limitIndex:3
      })
    }
    this.setData({
      recognHint:'',
      smartPub:app.globalData.smartPub,
      defaultReward:app.globalData.defaultReward
    });
    if (app.globalData.smartPub==false){
        if (!this.data.haveShowCantPub){
          wx.showToast({
            title: '该校区暂无智能发布',
            icon:'none'
          });
          this.setData({
            haveShowCantPub:true
          })
        }
    }
    var that = this;
    var send_data = {
      'sessionID': app.globalData.sessionID
    };
    wx.request({
      url: urlModel.url.getAddr,
      data: send_data,
      success: function(res) {
        if (res.data.default) {
          app.globalData.default.conPhone = res.data.phone;
          app.globalData.default.phoneRear = res.data.phone_rear;
          app.globalData.default.recName = res.data.rec_name;
          app.globalData.default.sendLocInput = res.data.send_loc_detail;
          app.globalData.default.sendLocSelect = res.data.send_loc_sum;
          app.globalData.default.QQ = res.data.QQ || '可不填写'
        }
      },
      complete: function() { //无论成功还是失败都会执行
        that.setData({
          default: app.globalData.default,
          sendLocSelect: app.globalData.default.sendLocSelect
        });
        if (that.data.default.phoneRear == '四位数字') {
          that.setData({
            expDescript:'',
            cardStyle:'addrEditCard',
            showEdit:true
          })
        }
      }
    });

    this.setData({
      expressLocArray: app.globalData.expressLocArray,
      dormArea: app.globalData.dormArea,
      teachArea: app.globalData.teachArea,
      otherArea: app.globalData.otherArea,
      transCampus: app.globalData.transCampus,
      dateRange: app.globalData.dateRange
    }); //执行完才提交
    this.setData({
      sendLocArray: [
        ['宿舍区', '教学区', '其他区', '跨校区'], that.data.dormArea
      ],
    });
    setTimeout(that.recover,2000)
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
      ui.UIManager.toCertif(false)
    }else if (app.globalData.ourUserStatus == 1) {
      ui.UIManager.checkAbnormal()
    }
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  // 下拉刷新重填,同时获取默认地址
    
    var that = this;
    this.setData({
      expressLocArray: app.globalData.expressLocArray,
      dormArea: app.globalData.dormArea,
      teachArea: app.globalData.teachArea,
      otherArea: app.globalData.otherArea,
      transCampus: app.globalData.transCampus,
      dateRange: app.globalData.dateRange
    }); //执行完才提交
    this.setData({
      sendLocArray: [
        ['宿舍区', '教学区', '其他区', '跨校区'], that.data.dormArea
      ],
    });
    var send_data = {
      'sessionID': app.globalData.sessionID
    };
    wx.showLoading({
      title:'重置中'
    });
    wx.request({
      url: urlModel.url.getAddr,
      data: send_data,
      success: function(res) {
        if (res.data.default) {
          app.globalData.default.conPhone = res.data.phone;
          app.globalData.default.phoneRear = res.data.phone_rear;
          app.globalData.default.recName = res.data.rec_name;
          app.globalData.default.sendLocInput = res.data.send_loc_detail;
          app.globalData.default.sendLocSelect = res.data.send_loc_sum;
          app.globalData.default.QQ = res.data.QQ || '可不填写';
          wx.hideLoading();
          wx.showToast({
            title: '重置成功'
          })
        }else {
          wx.hideLoading();
          wx.showToast({
            title: '重置失败',
            icon:'none'
          })
        }
      },
      fail:function(){
        wx.hideLoading();
        wx.showToast({
          title: '重置失败',
          icon:'none'
        })
      },
      complete: function() { //无论成功还是失败都会执行
        that.setData({
          default: app.globalData.default,
          sendLocSelect: app.globalData.default.sendLocSelect
        });
        wx.stopPullDownRefresh()
      }
    });


    this.setData({
      smartPub:app.globalData.smartPub,
      defaultReward:app.globalData.defaultReward
    });
    if (app.globalData.smartPub==false){
      if (!this.data.haveShowCantPub){
        wx.showToast({
          title: '该校区暂无智能发布',
          icon:'none'
        });
        this.setData({
          haveShowCantPub:true
        })
      }
    }
  },
  onShareAppMessage: function () {
    return {
      title: '校园快递互助代取',
      path: '/pages/home/home',
      imageUrl: '/images/sharePic.jpg'
    }
  },
  scrollDown:function(){
    var that = this;
    this.setData({
      expDescript:'',
      recognHint:'',
      cardStyle:'addrEditCard',
      showEdit:!that.data.showEdit
    });//放下卡片的类
    setTimeout(that.recover,1000)



  },
  recover:function(){
    //动画播放完成后将文字设置成原来的
    var that = this;
    this.setData({
      expDescript:that.data.tempExpDescript,
      recognHint:that.data.tempRecognHint,
    })
  },
  scrollUp:function () {
    var that = this;
    this.setData({
      expDescript:'',
      recognHint:'',
      cardStyle:'sumCard',
      showEdit:!that.data.showEdit,
      submitFlag:false
    });//收起卡片的类
    setTimeout(that.recover,1000)
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
    console.log(this.data.default);
    //todo check bug
    app.globalData.default.phoneRear = that.data.default.phoneRear
  },
  setDefFlag:function () {
    //是否设置成默认值
    var that = this;
    this.setData({
      setDefFlag:!that.data.setDefFlag
    })
  },
  finOrdSubmit:function (e) {
    setTimeout(this.pubOrder,1000,e)
  },
  pubOrder:function (e) {
    //提交发布
    let that = this;
    console.log(e);
    var formId = e.detail.formId;
    var detail = e.detail.value;
    detail['form_id'] = formId;
    console.log('查看form_id:',formId);
    if(this.data.submitFlag){
      detail = this.fillAddrToDefault(detail);
      detail = this.fill2Pub(detail);
      detail = this.add2Pub(detail);
      // console.log('发布填充后',detail)
      detail['sessionID'] = app.globalData.sessionID;
      if (this.canPub(detail)){
        if(that.data.bePublic==true){
        console.log('发布逻辑');
        wx.showLoading({
          title:'发布中'
        });
        if (this.data.setDefFlag){
          //todo 设置默认地址+发布
          detail['set_default'] = true;
          detail = this.set2Standard(detail);
          console.log('发送要设置默认地址的发布请求',detail);
          wx.request({
            url: urlModel.url.pubOrder,
            data: detail,
            method:'POST',
            success: function(res) {
              if (res.statusCode == 200) {
                wx.hideLoading();
                wx.showToast({
                  title: '发布成功'
                });
                that.onLoad();//主要是为了获取默认地址
                wx.switchTab({
                  url: '../home/home',
                  success:function () {
                    app.globalData.reloadHomePage=true
                  }
                })
              }else {
                wx.hideLoading();
                wx.showToast({
                  title:'发布失败，请重试',
                  icon:'none'
                })
              }
            },
            fail: function() { //无论成功还是失败都会执行
              wx.hideLoading();
              wx.showToast({
                title:'发布失败，请重试',
                icon:'none'
              })
            }
          })
        }else{
          detail['set_default'] = false;
          detail = this.set2Standard(detail);
          console.log('直接发布请求',detail);
          wx.request({
            url: urlModel.url.pubOrder,
            data: detail,
            method:'POST',
            success: function(res) {
              if (res.statusCode == 200) {
                wx.hideLoading();
                wx.showToast({
                  title: '发布成功'
                });
                wx.switchTab({
                  url: '../home/home',
                  success:function () {
                    app.globalData.reloadHomePage=true
                  }
                })
              }else {
                wx.hideLoading();
                wx.showToast({
                  title:'发布失败，请重试',
                  icon:'none'
                })
              }
            },
            fail: function() { //无论成功还是失败都会执行
              wx.hideLoading();
              wx.showToast({
                title:'发布失败，请重试',
                icon:'none'
              })
            }
          })
        }
      }else{
        wx.showToast({
          title: '未同意免责声明',
          icon:'none'
        })
      }
      } else if(that.data.bePublic==true) {
        wx.showToast({
          title: '未填写完整，请检查~',
          icon:'none'
        })
      }else{
        wx.showToast({
          title: '未同意免责声明并且未填写完整，请检查',
          icon:'none'
        })
      }
    }else {
      console.log('收起面板');
      this.setData({
        submitFlag:true
      });//收起之后就可以发布了
      //设置展示信息
      detail = this.fillAddrToDefault(detail);//地址信息已经补全，可以进行设置成本页的default
      var set2Default = {
        'conPhone':detail.conPhoneNum,
        'sendLocSelect':detail.DeRecLocSel,
        'sendLocInput':detail.DeRecLocIn,
        'recName':detail.recName,
        'phoneRear':detail.phoneRear,
        'QQ':detail.QQ
      };
      //将已填信息暂存到globalData中
      app.globalData.default = set2Default;
      this.setData({
        default:set2Default
      })
    }
  },
  recognMsg:function (event) {
    console.log(event);
    var that = this;
    var msg = event.detail.value;
    if (msg.length <=1){
      return
    }
    if (msg.length <= 10){
      //长度不完全
      wx.showToast({
        title: '请贴入正确的信息~',
        icon: 'none'
      });

    } else {
      wx.showLoading({
        title: '识别中',
      });
      //todo 发起识别请求
      var send_data = {
        'msg':msg,
        'school_id':app.globalData.schoolID,
        'sessionID':app.globalData.sessionID
      };
     
      wx.request({
        url: urlModel.url.intelliRecogn,
        data: send_data,
        method:'POST',
        success: function(res) {
          wx.hideLoading();
          console.log(res)
          if (res.statusCode == 200) {
            that.setData({
              expCode:res.data.expcode,
              expressLoc:res.data.place + '·' + res.data.company
            });
            console.log(that.data.expCode)
            wx.showToast({
              title: '识别成功'
            })
          }else {
            wx.showToast({
              title: '识别失败，可重试',
              icon: 'none'
            })
          }
        },
        fail: function() {
          wx.hideLoading();
          wx.showToast({
            title: '识别失败，可重试',
            icon: 'none'
          })
        }
      })
    }
  },
  weInfoChange: function(e) {
    //重量选择改变
    console.log(e);
    this.setData({
      weightIndex: e.detail.value
    })
  },
  sizeInfoChange:function(e){
    //快递大小改变
    console.log(e);
    this.setData({
      sizeIndex: e.detail.value
    })
  },
  modifyCode:function(e){
    this.setData({
      expCode:e.detail.value
    })
  },
  bindLimitChange:function(e){
    //限制取件人改变
    console.log(e);
    this.setData({
      limitIndex: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    //时间改变
    console.log(e);
    this.setData({
      endTime: e.detail.value
    })
  },
  dateChange: function(e) {
    // 日期改变
    console.log(e);
    this.setData({
      dateIndex: e.detail.value
    })
  },
  exlocChange: function(e) {
    var selected = this.data.expressLocArray[0][this.data.expFirstIndex] + '·' + this.data.expressLocArray[1][this.data.expSecondIndex];
    this.setData({
      expressLoc: selected
    })
  },
  exlocColumnChange: function(e) {
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
  exlocChange: function(e) {
    var selected = this.data.expressLocArray[0][this.data.expFirstIndex] + '·' + this.data.expressLocArray[1][this.data.expSecondIndex];
    this.setData({
      expressLoc: selected
    })

  },
  exlocColumnChange: function(e) {
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
  sdlocChange: function(e) {
    var selected = this.data.sendLocArray[0][this.data.sendLocIndex[0]] + '·' + this.data.sendLocArray[1][this.data.sendLocIndex[1]];
    this.setData({
      sendLocSelect: selected
    })
  },
  sdlocColumnChange: function(e) {
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
        data.sendLocIndex[1] = 0;
        break;

      case 1:
        break;
    }
    this.setData(data);
  },
  
  fillAddrToDefault: function(detail_to_fill) {
    //如果信息中有 未填写的默认信息，进行补全
    console.log('修改前',detail_to_fill);
    for (var Key in detail_to_fill) {
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
    console.log('修改后',detail_to_fill);
    return detail_to_fill
  },
  fill2Pub:function (detail2Fill) {
    //TODO 发布前，补全expcode
    for (var Key in detail2Fill) {
      if (Key == 'fetchCode'){
        if (this.data.expCode != '可输入取件码'){
          detail2Fill[Key] = this.data.expCode
        }
      } else if (Key == 'reward') {
        if (detail2Fill[Key] == ''){
          detail2Fill[Key] = this.data.defaultReward
        }
      }
    }
    return detail2Fill
  },
  add2Pub:function (detail2Fill) {
    //将缺少收货地址信息的发布填充完
    if (detail2Fill['DeRecLocSel'] == undefined){
      detail2Fill['DeRecLocSel'] = this.data.default.sendLocSelect;
      detail2Fill['DeRecLocIn'] = this.data.default.sendLocInput;
      detail2Fill['conPhoneNum'] = this.data.default.conPhone;
      detail2Fill['phoneRear'] = this.data.default.phoneRear;
      detail2Fill['recName'] = this.data.default.recName;
      detail2Fill['QQ'] = this.data.default.QQ == '可不填写'?null:this.data.default.QQ
    }
    return detail2Fill
  },
  canPub:function (filledDetail) {
    //todo 确认是否填写完成可以发布
   if (filledDetail.DeRecLocSel == '选择区域'|| filledDetail.DeRecLocIn == '填写地点' ||
   filledDetail.conPhoneNum == '点击输入电话号码' || filledDetail.phoneRear == '四位数字' ||
   filledDetail.recName == '填写姓名'){//确认收货地址填写是否完成
     return false
   }
   if (filledDetail.fetchCode == '' || filledDetail.selExCon == '点击·选择'){//确认必要信息未填写完成
     return false
   }
   return true
  },
  set2Standard:function (detail2Set) {
    //todo 将变量名设置成符合规范的
    detail2Set['con_phone'] = detail2Set.conPhoneNum;
    detail2Set['send_loc_sum'] = detail2Set.DeRecLocSel;
    detail2Set['send_loc_input'] = detail2Set.DeRecLocIn;
    detail2Set['phone_rear'] = detail2Set.phoneRear;
    detail2Set['rec_name'] = detail2Set.recName;
    detail2Set['QQ'] = detail2Set.QQ;
        // ['无限制','限男生','限女生','官方团队'],
    if (detail2Set.limit == '限男生'){
      detail2Set['limit'] = 1
    }else if (detail2Set.limit == '限女生'){
      detail2Set['limit'] = 2
    } else if (detail2Set.limit == '官方团队') {
      detail2Set['limit'] = 3
    }else {
      detail2Set['limit'] = 0
    }
    detail2Set['exp_code'] = detail2Set.fetchCode;
    detail2Set['exp_station'] = detail2Set.selExCon;
    detail2Set['expire_time'] = detail2Set.exTimeConDate + ' ' + detail2Set.exTimeConTime;
    detail2Set['msg'] = detail2Set.message;
    detail2Set['exp_size'] = detail2Set.sizeInfo;
    detail2Set['exp_weight'] = detail2Set.weightInfo;
    detail2Set['description'] = detail2Set.otherInfo;
    return detail2Set
  }
});