# SimpleNews
# 预览地址：https://hujinhui666.github.io/SimpleNews/unpackage/dist/build/h5/
## 简约新闻采用uniapp、vue2 框架写的
已适配微信小程序、移动端网页
关键技术点：浏览历史记录来处理
uni.setStorageSync("historyArr", historyArr)

uni.getStorageSync("historyArr") || []
## 引用第三方时间格式化库
