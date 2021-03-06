var app = getApp();
const urlModel = require('../../utils/urlSet.js');
const hintsModel = require('../../utils/hints.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        studentOrMaster: true, //true为本科生
        schoolIcon: "../../images/schoolIcon.png",
        nextIcon: "../../images/next.png",
        kefuIcon:'../../images/kefu.png',
        homeIcon:'../../images/zhuye.png',
        verifyCodeUrl: '', //验证码路径
        schoolName: "点击选择学校",
        row1Flag: false,
        row2Flag: false,
        row3Flag: false,
        accountHint: hintsModel.hintsManager.certifPage.account, //账号提示
        identity: 1, //1为本科生，2为研究生
        questionIcon: '../../images/question.png',
      confirmShape: "right",
      checkedCorlor: "#faaf42",
      leftValue: "同意",
    rightValue:"用户隐私协议",
    beChecked: true,
    bePublic:true,
        adId:8,
        showDefaultAddr:true//是否提示去设置默认地址
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if(options.from){
            if (options.from == 'my'){
                this.setData({
                    showDefaultAddr:false
                })
            }
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
      myBePublic(e) { 
        console.log(e.detail.checked);
        if (e.detail.checked == false) {
          this.setData({
            bePublic: false
          })
        }
        else {
          this.setData({
            bePublic: true
          })
        }
      },

    /**
     * 生命周期函数--监听页面显示
     */

    onShow: function() {
        var that = this;
        this.setData({
            schoolName: app.globalData.schoolName
        });
        if (app.globalData.schoolName == '点击选择学校') {
            wx.showToast({
                title: '请先选择学校',
                icon: 'none'
            })
        } else {
            if (this.data.studentOrMaster) { //true为本科生
                this.setData({
                    identity: 1
                })
            } else {
                this.setData({
                    identity: 2
                })
            }
            var send_data = {
                'sessionID': app.globalData.sessionID,
                'identity': this.data.identity,
                'school_id': app.globalData.schoolID
            };
            wx.request({
                url: urlModel.url.getCertifInfo,
                method: 'GET',
                data: send_data,
                success: function(res) {
                    console.log(res);
                    if (res.data.img_url) {
                        that.setData({
                            verifyCodeUrl: res.data.img_url + '?v=' + Math.random(),
                            accountHint: res.data.account_hint || hints.hintsManager.certifPage.account
                        })
                    }else {
                        wx.showToast({
                            title: res.data.error_hint,
                            icon: 'none',
                            duration: 1500
                        })
                    }
                },fail:function () {
                    that.setData({
                        accountHint: hintsModel.hintsManager.certifPage.account
                    })
                }
            })
        }
        //写具体的get函数 if schoolname=空就不发送验证，根据教职工还是学生get不同的数据
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
    selStudent: function() {
        var that = this;
        if (this.data.identity == 1) {

        } else {
            this.setData({
                studentOrMaster: true, //true为本科生
                identity: 1,
            });
            var send_data = {
                'sessionID': app.globalData.sessionID,
                'identity': 1,
                'school_id': app.globalData.schoolID
            };
            wx.request({
                url: urlModel.url.getCertifInfo,
                data: send_data,
                success: function(res) {
                    console.log(res);
                    if (res.data.img_url) {
                        that.setData({
                            verifyCodeUrl: res.data.img_url + '?v=' + Math.random(),
                            accountHint: res.data.account_hint || hintsModel.hintsManager.certifPage.account
                        })
                    }else {
                        wx.showToast({
                            title: res.data.error_hint,
                            icon: 'none',
                            duration: 1500
                        })
                    }
                }
            })


        }
    },
    selMaster: function() {
        var that = this;
        if (this.data.identity == 2) {
            return
        }
        this.setData({
            studentOrMaster: false,
            identity: 2,
        });
        var send_data = {
            'sessionID': app.globalData.sessionID,
            'identity': 2,
            'school_id': app.globalData.schoolID
        };
        wx.request({
            url: urlModel.url.getCertifInfo,
            data: send_data,
            success: function(res) {
                console.log(res);
                if (res.data.img_url) {
                    that.setData({
                        verifyCodeUrl: res.data.img_url + '?v=' + Math.random(),
                        accountHint: res.data.account_hint || hintsModel.hintsManager.certifPage.account
                    })
                }else {
                    wx.showToast({
                        title: res.data.error_hint,
                        icon: 'none',
                        duration: 1500
                    })
                }
            }
        })

    },
    schoolInput: function() {
        wx.navigateTo({
            url: '../changeSchool/changeSchool',
        })
    },
    change1: function() {
        this.setData({
            row1Flag: true
        })
    },
    change2: function() {
        this.setData({
            row2Flag: true
        })
    },
    change3: function() {
        this.setData({
            row3Flag: true
        })
    },
    haveCertif: function(e) {
        var that = this;
        var content = '';
        console.log(e);
        if (e.detail.value.schoolNumb == '' || e.detail.value.password == '' || e.detail.value.verifiedCode == '') {
          if(that.data.bePublic==false){
            content="填写完整信息以及同意用户隐私协议才能进行操作哦！"
          }else{
            content = '请填写完整信息'
          }
          wx.showModal({
            title: '信息不全',
            content: content,
            showCancel: false,
            confirmText: '返回',
            confirmColor: '#faaf42',
          })
        } else if(that.data.bePublic==false) {
          wx.showModal({
            title: "未同意用户隐私协议",
            content: hintsModel.hintsManager.certifPage.secret
          })
        }else{
            wx.showLoading({
                title: '认证中',
                mask: true
            });
            console.log(e.detail.value);
            wx.request({
                url: urlModel.url.postCertifMes, //填充认证url
                method: 'POST',
                data: {
                    'account': e.detail.value.schoolNumb,
                    'password': e.detail.value.password,
                    'verification_code': e.detail.value.verifiedCode,
                    'sessionID': app.globalData.sessionID,
                    'identity': that.data.identity,
                    'school_id': app.globalData.schoolID
                },
                success: function(res) {
                    console.log(res);
                    wx.hideLoading();
                    if (res.statusCode == 200) {
                        if (res.data.status == 1) {
                            console.log(res);
                                //设置姓名、学号、user_status
                            app.globalData.userName = res.data.name;
                            app.globalData.schoolNumb = res.data.school_numb;
                            app.globalData.ourUserStatus = res.data.user_status;
                            wx.showToast({
                                title: '认证成功',
                                icon: 'success',
                                duration: 1500,
                                success: function() {}
                            });
                            setTimeout(function() {
                                if (that.data.showDefaultAddr){
                                    wx.showModal({
                                        title: '建议',
                                        content: hintsModel.hintsManager.certifPage.setAddrSug,
                                        cancelText: '再说吧',
                                        confirmText: '现在就去',
                                        confirmColor: '#faaf42',
                                        success: function(res) {
                                            if (res.confirm) {
                                                wx.redirectTo({
                                                    url: '../defAddrEdit/defAddrEdit?path=haveCertif',
                                                })
                                            } else {
                                                wx.reLaunch({
                                                    url: '../home/home',
                                                })
                                            }
                                        }
                                    })
                                } else {
                                    wx.reLaunch({
                                        url: '../home/home',
                                    })
                                }
                            }, 500)
                        } else {
                            wx.showToast({
                                title: hintsModel.hintsManager.certifPage.certifError,
                                icon: 'none',
                                duration: 2000
                            });
                            //设置新的验证码地址
                            that.setData({
                                verifyCodeUrl: res.data.img_url + '?v=' + Math.random()
                            })
                        }
                    } else {
                        wx.showToast({
                            title: hintsModel.hintsManager.certifPage.certifError,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: function() {
                    wx.showToast({
                        title: hintsModel.hintsManager.certifPage.certifError,
                        icon: 'none',
                        duration: 2000
                    })
                },
                complete: function() {}
            })
        }

    },
    changeCode: function() {
        var that = this;
        var send_data = {
            'sessionID': app.globalData.sessionID,
            'identity': this.data.identity,
            'school_id': app.globalData.schoolID
        };
        wx.request({
            url: urlModel.url.getCertifInfo,
            method: 'GET',
            data: send_data,
            success: function(res) {
                console.log(res);
                if (res.data.img_url) {
                    that.setData({
                        verifyCodeUrl: res.data.img_url + '?v=' + Math.random(),
                    })
                }
            }
        })
    },
    backHome: function() {
        wx.switchTab({
            url: '../home/home',
        })
    },
    accountHint: function() {
        var that = this;
        wx.showModal({
            title: '账号？',
            content: that.data.accountHint,
            confirmColor: '#faaf42',
            showCancel: false,
            success: function(res) {
                if (res.confirm) {
                }
            }
        })
    }
});