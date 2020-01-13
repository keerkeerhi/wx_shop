// pages/order_detail/order_detail.js
import indexsev from '../../service/indexsev'
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    indexsev.order_detail({OrderNumber:this.oNo}).then(res=>{
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})