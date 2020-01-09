// pages/begin/beign.js
let app = getApp()
import indexsev from '../../service/indexsev.js'
import { getData ,putData} from '../../utils/pageManager.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    getData("loginData").then(({ unionid,nickname, image, phone })=>{
      if (nickname) {
        _this.initHome()
        _this.getLike(unionid)
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
      else
      {
        this.setData({loading:false})
      }
    })
  },
  initHome() {
    getData('posData').then(({ minlat, maxlat, minlng, maxlng })=>{
      // 初始化首页数据
      putData('nearData',indexsev.nearby_shop({
        little_lat: minlat, big_lat: maxlat,
        little_lon: minlng, big_lon: maxlng
      }))
    },rej=>{
      console.log('=====>>没有获取到用户位置信息')
    })
  },
  getLike(unionid){
    putData("userLike",indexsev.user_like({ unionid}))
  },
  userBack(e) {
    let _this = this;
    let detail = e.detail
    if (detail.errMsg.indexOf('ok') > -1) {
      let sessionKey = app.globalData.session_key;
      let { iv, encryptedData } = detail
      console.log('-----info',detail)
      indexsev.updateUser({ encryptedData, iv, sessionKey }).then(res => {
        if (res.code==0)
        {
          let { unionid } = res.data;
          _this.getLike(unionid)
          _this.updateLoginData(res.data)
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
        else
          wx.showToast({
            title: '获取用户信息超时',
            icon: 'none'
          })
      })
    }
  },
  updateLoginData({ unionid, session_key, nickname, image, phone}){
    putData("loginData", new Promise((login_res, login_rej) => {
      login_res({ unionid, session_key, nickname, image, phone })
    }));
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})