// pages/create_order/create_order.js
import indexsev from '../../service/indexsev'
import {getData} from '../../utils/pageManager'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    goods:[1,2,3,4,5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {oNo} = options
    console.log('======>>',oNo)
    oNo = "20200112143853997023";
    this.oNo = oNo;
    let _this = this;
    getData("loginData").then(({ openid })=>{
      _this.openid = openid
    });
    indexsev.order_detail({OrderNumber:oNo}).then(res=>{
      if (res.code==0)
      {
        _this.setData({order:res.data})
      }
      else
        wx.showToast({
          title: '获取订单信息超时',
          icon: 'none'
        })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  submit_order(){
    let money = 5;
    indexsev.pay({price:parseInt(money*100),OrderNumber:this.oNo,openid:this.openid}).then(res=>{
      if (res.code==0)
      {
        let {prepay_id, nonceStr, paySign, timeStamp} = res.data
        wx.requestPayment({
          nonceStr,
          package: "prepay_id=" + prepay_id,
          paySign,
          timeStamp,
          signType: 'MD5',
          success (res) {
            // todo 已支付订单
          },
          fail (res) {
            // todo 待支付订单
          }
        })
      }
      else
        wx.showToast({
          title: '支付超时',
          icon: 'none'
        })
    })
  },
  chooseAdd(){
    wx.chooseAddress({
      success (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  updateOrder(type){
    indexsev.edit_order().then(res=>{
      if (res.code!=0)
      {
        switch(type){
          // 更新通讯地址
          case 1:break;
          // 更新备注
          case 2:break;
        }
      }
    })
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