// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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