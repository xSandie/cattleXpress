# Cattle's Suggestions
## 便于理解
0. 尽量采用语义化变量名、函数名。
0. 后端返回前端的数据，使用后端变量名规范，赋值给符合前端变量名规范的变量。
## 减少冗余
0. wx.hideLoading尽量在complete回调中完成。
0. 尽量复用本模块中的函数。
## 便于修改
0. wx.showLoading 与 wx.hideLoading成对且尽量靠近出现。
0. view层尽量多使用变量绑定。
0. 发送给后端的数据，提前存入send_data变量中。
## 提升性能
0. 尽量减少setData次数。
## 友好提示
0. 减少弹窗，非重要事项改为顶部通知栏提示。
0. 及时调用wx.stopPullDownRefresh()，关闭加载动画。
0. 没有网络 或 出错时的空白、错误状态，须有操作提示，不允许未经设计的空白状态。
## 状态明确
0. 只有返回的状态码为200时，请求才算成功。
0. 后端明确返回各种状态码，如403 404 200 500。
0. 前端要取的数据，后端至少要有None值。

