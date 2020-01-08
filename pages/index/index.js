//index.js
//获取应用实例
const app = getApp()
import { getData,delData } from '../../utils/pageManager.js'
Page({
  data: {
    position: '',
    isFocus:false,
    searchWords: '',
    banners: [1,2,3],
    thisPos: {lat1:0,lng1:0},
    likes:[
      { name:'金鸽瓜子',price:6 },
      { name: '可口可乐', price: 6 },
      { name: '箭牌口香糖', price: 6 },
      { name: '旺旺牛奶糖', price: 6 },
      { name: '阿尔卑斯牛奶糖', price: 6 }
    ],
    nearBy: []
  },
  //事件处理函数
  beFocus() {
    this.setData({isFocus:true})
  },
  beNoFoc() {
    this.setData({ isFocus:false })
  },
  onLoad: function () {
    console.log('------onLoad')
    let pos = app.globalData.position
    console.log('======>>',pos)
    this.setData({ thisPos: { lat1: pos.latitude, lng1: pos.longitude}})
    getData('homePage').then(res=>{
      if (res)
        this.setData({nearBy:res})
    },rej=>{
      console.log('======homePage.rej',rej)
    })
    this.setData({ position: app.globalData.city})
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
