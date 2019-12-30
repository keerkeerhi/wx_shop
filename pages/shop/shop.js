// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    goods:[{
      title:'营养快线',
      price: 11
    },
      {
        title: '营养快线',
        price: 11
      },
      {
        title: '营养快线',
        price: 11
      },
      {
        title: '营养快线',
        price: 11
      }, {
        title: '营养快线',
        price: 11
      }, {
        title: '营养快线',
        price: 11
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  toCar(e){
    console.log('----catch',e)
  },
  onChange(event) {
    wx.showToast({
      icon: 'none',
      title: `切换至第${event.detail}项`
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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