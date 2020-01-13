// pages/shop/shop.js
import { getData, putData,delData} from '../../utils/pageManager.js'
let app = getApp();
import indexsev from '../../service/indexsev.js'
import {img_url} from '../../service/baseconfig'
import {addCart,delCart} from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading:false,
    img_url,
    activeKey: 0,
    shop_details:{},
    goods:[],
    typeList:[],
    // 购物车相关 start
    show: false,
    shops: [
      { id:1,title:'海阔天空店',
        goods:[
          {title:'天空',img:"",price:20,num:2,checked:false},
          { title: '海阔', img: "", price: 21, num: 1,checked:false }
        ],
        checked:false
      },
      {
        id: 2, title: '天空海阔店',
        goods: [
          { title: '天空1', img: "", price: 20, num: 2, checked: false },
          { title: '海阔1', img: "", price: 1, num: 1, checked: false }
        ],
        checked: false
      }
    ]
    // 购物车相关 end
  },
  initHome(){
    let _this = this
    getData('posData').then(({ minlat, maxlat, minlng, maxlng }) => {
      // 初始化首页数据
      putData('nearData', indexsev.nearby_shop({
        little_lat: minlat, big_lat: maxlat,
        little_lon: minlng, big_lon: maxlng
      }))
    }, rej => {
      console.log('=====>>没有获取到用户位置信息')
    })

    getData("loginData").then((unionid) => {
      if (unionid) {
        putData("userLike", indexsev.user_like({ unionid }))
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {shopId} = options
    this.shopId = shopId
    this.pageInfo = { index: 1 }
    this.initData()
  },
  initData(){
    let sp = getData("shopData")
    if (sp)
    {
      sp.then(res=>{
        if (res.code==0)
        {
          console.log('======shopData')
          let shop_details = res.data
          this.setData({shop_details})
          delData("shopData")
        }
        else
        {
          wx.showToast({
            title: '获取店铺详情超时',
            icon: 'none'
          })
        }
        getData("labelData").then(res=>{
          if (res.code==0)
            {
              let typeList = res.data
              this.setData({typeList})
            }
            else
            {
              wx.showToast({
                title: '获取商品标签超时',
                icon: 'none'
              })
            }
        })
        getData("productData").then(res=>{
          if (res.code==0)
          {
            let list = res.data
            if (this.pageInfo.index == 1) {
              this.setData({ goods: list })
            }
            else {
              let { goods } = this.data
              this.setData({ goods: goods.concat(list) })
            }
          }
          else
            wx.showToast({
              title: '获取商品超时',
              icon: 'none'
            })
        })
      })
      return;
    }
    indexsev.shop_detail({'shop_id':this.shopId}).then(res=>{
      if (res.code==0)
        {
          let shop_details = res.data
          this.setData({shop_details})
        }
        else
        {
          wx.showToast({
            title: '获取店铺详情超时',
            icon: 'none'
          })
        }
    })

    indexsev.label_mgt({'shop_id':this.shopId}).then(res=>{
      if (res.code==0)
        {
          let typeList = res.data
          this.setData({typeList})
        }
        else
        {
          wx.showToast({
            title: '获取商品标签超时',
            icon: 'none'
          })
        }
    })
    this.getProduct()
  },
  getProduct(label){
    let pages = this.pageInfo.index
    indexsev.get_shop_commodity({'shop_id':this.shopId,label,pages}).then(res=>{
      if (res.code==0)
      {
        let list = res.data
        if (this.pageInfo.index == 1) {
          this.setData({ goods: list })
        }
        else {
          let { goods } = this.data
          this.setData({ goods: goods.concat(list) })
        }
      }
      else
        wx.showToast({
          title: '获取商品超时',
          icon: 'none'
        })
    })
  },
  toCar(e){
    console.log('----catch',e)
  },
  navChange(ev)
  {
    let {detail:index} = ev;
    this.pageInfo.index = 1
    if (index==0)
    {
      this.getProduct()
      return;
    }
    let {typeList} = this.data
    let type = typeList[index-1]
    this.type = type
    this.getProduct(type.id)
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  },
  showCar(e) {
    let show = this.data.show;
    this.setData({ show: true})
  },
  onClose(e){
    this.setData({show:false})
  },
/**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.showLoading)
      return;
    let pageInfo = this.pageInfo;
    pageInfo.index = pageInfo.index + 1;
    this.setData({ showLoading: true })
    this.getProduct(this.type)
  },
  addCart(){
    addCart()
  },
  delCart(){
    delCart()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})