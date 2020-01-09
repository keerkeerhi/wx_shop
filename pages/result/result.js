// pages/result/result.js
import {getData,delData} from '../../utils/pageManager'
let app = getApp()
import indexsev from '../../service/indexsev.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex:0,
    dataList:[],
    searchWords:"",
    position: '',
    thisPos: { lat1: 0, lng1: 0 }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {searchWords} = options;
    let { position, city } = app.globalData
    this.setData({ thisPos: { lat1: position.latitude, lng1: position.longitude } })
    this.setData({ searchWords, position: city })
    this.searchWords = searchWords
    let _this = this;
    getData("search_data").then(res=>{
      if (res.code==0)
      {
        _this.setData({dataList:res.data})
        delData("search_data")
      }
      else
        wx.showToast({
          title: '获取数据超时',
          icon: 'none'
        })
    })
  },
  toNav(e){
    let { inx: navIndex} = e.currentTarget.dataset
    this.setData({ navIndex,dataList:[]})
    // this.pageInfo = { num: 10, index: 1 }
    // this.getStus(this.parObj)
  },
  bindKeyInput(e) {
    let s = e.detail.value
    this.setData({ searchWords: s});
    this.searchWords = s;
  },
  doSearch() {
    // todo 异步获取 ， 传searchWord 到搜索页面
    console.log('---sw-->>', this.searchWords)
    let { minlat, maxlat, minlng, maxlng } = app.globalData.range;
    let _this = this;
    indexsev.search({
      keyword: this.searchWords,
      little_lat: minlat, big_lat: maxlat,
      little_lon: minlng, big_lon: maxlng
    }).then(res=>{
      if (res.code == 0) {
        _this.setData({ dataList: res.data })
      }
      else
        wx.showToast({
          title: '获取数据超时',
          icon: 'none'
        })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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