// pages/shop/shop.js
import { getData, putData,delData} from '../../utils/pageManager.js'
let app = getApp();
import indexsev from '../../service/indexsev.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    shop_details:{},
    goods:[],
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
    getData("shopData").then(res=>{
      if (res.code==0)
      {
        let { shop_details, shop_commodity} = res.data
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
    })
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
  getGoods(params) {
    Object.assign(params, this.pageInfo)
    indexsev.wx_student(this.parObj).then(res => {
      this.setData({ showLoading: false })
      if (res.code == 0) {
        let { students: list, num } = res.data

        if (this.pageInfo.index == 0) {
          this.setData({ dataList: list, num })
        }
        else {
          let { dataList } = this.data
          this.setData({ dataList: dataList.concat(list), num })
        }
      }
      else
        wx.showToast({
          title: '获取会员列表超时',
          icon: 'none'
        })
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