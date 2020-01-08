// pages/begin/beign.js
let app = getApp()
import indexsev from '../../service/indexsev.js'
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
import { getMaxMinLongitudeLatitude, fPromise } from '../../utils/util.js'
import { getData ,putData} from '../../utils/pageManager.js'

var qqmapsdk;
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
    getData("loginData").then(({ nickname, image, phone })=>{
      if (nickname) {
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }
      else
      {
        this.setData({loading:false})
      }
    })
    
    putData("homePage",new Promise((home_res,home_rej)=>{
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        key: 'I7SBZ-6WO6U-GI6VP-4BYNQ-GB4PK-THBKP'
      });


      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          qqmapsdk.reverseGeocoder({
            location: {
              latitude,
              longitude
            },
            success: function (res) {
              console.log('==>>address', res)
              let district = res.result.ad_info.district
              app.globalData.city = district;
              // wx.showToast({
              //   title: district,
              // })
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
            }
          })
          app.globalData.position = { longitude, latitude}
          let { minlat, maxlat, minlng, maxlng} = 
          getMaxMinLongitudeLatitude(longitude, latitude, 5);
          app.globalData.range = { minlat, maxlat, minlng, maxlng};
          console.log('===info')
          indexsev.nearby_shop({ little_lat: minlat, big_lat:maxlat,
            little_lon: minlng, big_lon:maxlng}).then(res=>{
              console.log("=======near_back")
            if (res.code==0)
            {
              home_res(res.data)
            }
            else
              home_rej(1)
          },rej=>{
            home_rej(1)
          })
        }
      })


    }))
    
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})