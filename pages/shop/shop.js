// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    goods:[
      {
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
      }, 
      {
        title: '营养快线',
        price: 11
      }, 
      {
        title: '营养快线',
        price: 11
      }
    ],
    // 购物车相关 start
    show: true,
    shops: [
      {id:1,title:'海阔天空店',
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
  showCar(e) {
    let show = this.data.show;
    this.setData({ show: true})
  },
  onClose(e){
    this.setData({show:false})
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