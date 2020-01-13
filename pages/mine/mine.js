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
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    getData("loginData").then(({ unionid, session_key, nickname, image, phone,openid })=>{
      _this.setData({nickname,image})
      _this.unionid = unionid;
      _this.getOrder(unionid,status)
    })
  },
  
  getOrder(unionId,status){
    indesev.my_order({unionId,status}).then(res=>{
      if (res.code==0)
      {
        this.setData({orderList:res.data})
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