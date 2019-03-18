# Cattle's Suggestions
## 便于理解
0. 尽量采用语义化变量名、函数名。
## 减少冗余
0. wx.hideLoading尽量在complete回调中完成。
0. 尽量复用本模块中的函数。
## 便于修改
0. wx.showLoading 与 wx.hideLoading成对且尽量靠近出现。
0. view层尽量多使用变量绑定。
## 提升性能
0. 尽量减少setData次数。
## 友好提示
0. 减少弹窗，非重要事项改为顶部通知栏提示。
0. 及时调用wx.stopPullDownRefresh()，关闭加载动画。
