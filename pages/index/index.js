//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isFocus:false,
    searchWords: '',
    banners:[1,2,3],
    likes:[
      {name:'金鸽瓜子',price:6},
      { name: '可口可乐', price: 6 },
      { name: '箭牌口香糖', price: 6 },
      { name: '旺旺牛奶糖', price: 6 },
      { name: '阿尔卑斯牛奶糖', price: 6 }
    ]
  },
  //事件处理函数
  beFocus() {
    this.setData({isFocus:true})
  },
  beNoFoc() {
    this.setData({ isFocus:false })
  },
  onLoad: function () {
    
  },
  bindKeyInput(e) {
    this.setData({
      searchWords: e.detail.value
    })
  },
  doSearch(){
    wx.navigateTo({
      url: '/pages/result/result',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})
