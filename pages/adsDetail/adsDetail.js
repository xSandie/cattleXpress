//index.js
//获取应用实例
const app = getApp()
const urlModel = require('../../utils/urlSet.js');
Page({
  data: {
    article: {}
  },
  onLoad: function (option) {
    wx.showLoading({
      title: '加载中',
    })
    const _ts = this;
    var adId = option.id;
    //请求markdown文件，并转换为内容
    wx.request({
      url: urlModel.url.adsDetail,
      data:{
        'ad_id':adId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(
          res.data,               // `markdown`或`html`文本内容
          'html'              // `markdown`或`html`
        );

        //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
        data = app.towxml.initData(data, {
          base: urlModel.url.relativeRoute,    // 需要解析的内容中相对路径的资源`base`地址
          app: _ts                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
        });

        //设置文档显示主题，默认'light'
        data.theme = 'light';

        //自定义事件，格式为`event_`+`绑定类型`+`_`+`事件类型`
        //例如`bind:touchstart`则为：
        this['event_bind_tap'] = (event)=>{
          // console.log(event.target.dataset._el);     // 打印出元素信息
          var e = event.target.dataset._el
          if('src' in e.attr){
              var src = e.attr.src;
            wx.previewImage({
              urls: [src],
            })
          }
        };

        //设置数据
        _ts.setData({
          article: data
        });
      }
    });
    wx.hideLoading();
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
