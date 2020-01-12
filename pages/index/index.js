//index.js
//获取应用实例
const app = getApp()
import {putData ,getData,delData } from '../../utils/pageManager.js'
import indexsev from '../../service/indexsev'
import { img_url} from '../../service/baseconfig.js'

Page({
  data: {
    img_url,
    position: '',
    isFocus:false,
    searchWords: '',
    banners: [1,2,3],
    thisPos: {lat1:0,lng1:0},
    likes:[],
    nearBy: [],
    adverts: []
  },
  //事件处理函数
  beFocus() {
    this.setData({isFocus:true})
  },
  beNoFoc() {
    this.setData({ isFocus:false })
  },
  toShop(e){
    let { shopid } = e.currentTarget.dataset
    putData("shopData", indexsev.shop_detail({'shop_id':shopid}))
    wx.navigateTo({
      url: '/pages/shop/shop?shopId='+shopid,
    })
  },
  onLoad: function () {
    let _this = this;
    getData('posData').then(({ latitude, longitude })=>{
      this.setData({ thisPos: { lat1: latitude, lng1: longitude } })
    })
    getData('nearData').then(res=>{
      console.log('====Homeback',res)
      if (res.code==0)
      {
        delData("nearData")
        this.setData({ nearBy: res.data })
      }
    },rej=>{
      console.log('======homePage.rej',rej)
    })
    getData('userLike').then(res=>{
      if (res.code==0)
      {
        delData("userLike")
        this.setData({ likes: res.data })
      }
    })
    indexsev.home_img().then(res=>{
      if (res.code==0)
      {
        this.setData({adverts:res.data})
      }
      else
        wx.showToast({
          title: '获取首页图片超时',
          icon: 'none'
        })
    })
    // todo 有可能获取不到city哦，是否处理
    this.setData({ position: app.globalData.city})
  },
  onShow(){
    console.log('=====onShow')
    this.setData({ searchWords: ''})
  },
  bindKeyInput(e) {
    this.searchWords = e.detail.value
    // this.setData({
    //   searchWords: e.detail.value
    // })
  },
  doSearch(){
    // todo 异步获取 ， 传searchWord 到搜索页面
    console.log('---sw-->>',this.searchWords)
    let { minlat, maxlat, minlng, maxlng} = app.globalData.range;
    putData("search_data",indexsev.search({keyword:this.searchWords,
      little_lat: minlat, big_lat:maxlat,
      little_lon: minlng, big_lon:maxlng}));
    wx.navigateTo({
      url: '/pages/result/result?searchWords=' + this.searchWords
    })
  }
})
