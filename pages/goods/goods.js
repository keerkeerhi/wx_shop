// pages/goods/goods.js
import indexsev from '../../service/indexsev'
import {img_url} from '../../service/baseconfig'
import {getData} from '../../utils/pageManager'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    img_url,
    imgs:[],
    goods:{},
    currentNum: 1
  },
  onClose(){this.setData({show:false})},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {gId} = options
    gId = 5;
    let _this = this;
    getData("loginData").then(({ unionid })=>{
      _this.unionId = unionid
    });
    indexsev.goods_details({com_id:gId}).then(res=>{
      if (res.code==0)
      {
        let goods = res.data[0]
        let imgs = []
        for (let key in goods)
        {
          console.log('----->key',key)
          if (key.indexOf('img')>-1&&goods[key])
            imgs.push(goods[key])
        }
        console.log('----->>',goods,imgs)
        this.setData({goods,imgs})
      }
      else
        wx.showToast({
          title: '获取商品信息超时',
          icon: 'none'
        })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showNum(){
    this.setData({show:true})
  },
  onChange(e){
    let {detail:currentNum} = e
    this.setData({currentNum})
  },
  getOrder(){
    let unionId = this.unionId
    let {currentNum:CommodityNumber,goods} = this.data
    let {ShopDetails__id,id,price:OrderPrice} = goods
    indexsev.create_order({RelatedShop:ShopDetails__id,
      unionId,OrderAddress:'',OrderPhone:'',CommodityNumber,
      OrderCommodity:id,OrderPrice,OrderNotes:''}).then(res=>{
      if (res.code==0)
      {
        wx.navigateTo({
          url: '/pages/create_order/create_order?oNo='+res.data
        })
      }
      else
        wx.showToast({
          title: '服务器超时',
        })
    })
  }
})