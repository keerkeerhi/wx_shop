// pages/mine/mine.js
import {getData} from '../../utils/pageManager'
import indesev from '../../service/indexsev'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname:'',
    image:'',
    likes:[],
    orderList:[],
    statusList:[0,1,2,undefined],
    navIndex: 0,
    showLoading:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    getData("loginData").then(({ unionid, nickname, image })=>{
      _this.setData({nickname,image})
      _this.unionid = unionid;
    })
    this.pageInfo = { index: 1 }
    getData("mineData").then(res=>{
      if (res.code==0)
      {
        _this.orderList = res.data
      }
      else
        wx.showToast({
          title: '获取订单信息超时',
          icon: 'none'
        })
    })
  },
  
  getOrder(){
    let {navIndex,statusList} = this.data
    let unionId = this.unionid
    let {index:pages} = this.pageInfo
    indesev.my_order({unionId,status:statusList[navIndex],pages}).then(res=>{
      if (res.code==0)
      {
        let list = res.data
        if (pages == 1) {
          this.setData({ orderList: list })
        }
        else {
          let { orderList } = this.data
          this.setData({ orderList: orderList.concat(list) })
        }
      }
    })
  },
  navTo(e){
    let {inx} = e.currentTarget.dataset
    this.setData({navIndex:inx})
    this.pageInfo = { index: 1 }
    this.getOrder()
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
    this.getOrder()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})