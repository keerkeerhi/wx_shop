//app.js
import indexsev from '/service/indexsev.js'
import { putData } from './utils/pageManager.js'
var QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
import { getMaxMinLongitudeLatitude } from './utils/util.js'
var qqmapsdk;
App({
  onLaunch: function (options) {
    this.initUtil()
    // 展示本地存储能力
    let { query } = options
    if (query.code) {
      // this.globalData.code = query.code
      wx.setStorageSync('inviteother', query.code)
    }
    this.loginFun()
    this.initPos()
    // topHeight  device
    this.hObj = { 'ipx': 88, 'android': 45, 'ipn': 65 }
    // 判断设备是否为 iPhone X
    this.checkDevice()
  },
  initPos(){
    let _this = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'I7SBZ-6WO6U-GI6VP-4BYNQ-GB4PK-THBKP'
    });
    putData("posData", new Promise((pos_res, pos_rej) => {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          let { minlat, maxlat, minlng, maxlng } =
            getMaxMinLongitudeLatitude(longitude, latitude, 5);
          pos_res({ minlat, maxlat, minlng, maxlng, latitude, longitude })
          
          // 获取用户所在地
          qqmapsdk.reverseGeocoder({
            location: {
              latitude,
              longitude
            },
            success: function (res) {
              let district = res.result.ad_info.district
              _this.globalData.city = district;
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {}
          })

        }
      })

    }))
  },
  onShow() {
    this.checkUpdate()
  },
  loginFun() {
    let _this = this
    putData("loginData",new Promise((login_res,login_rej)=>{
      // 登录
      wx.login({
        success: res => {
          let params = {
            code: res.code,
            // invite: wx.getStorageSync('inviteother'),
          }
          wx.showLoading({
            title: '查询用户状态',
          })
          indexsev.login(params).then(res => {
            console.log('logback', res)
            wx.hideLoading();
            if (res.code == 0) {
              let { unionid,session_key, nickname, image, phone,openid } = res.data;
              _this.globalData.session_key = session_key;
              // wx.setStorageSync("unionid", unionid)
              // wx.setStorageSync("session_key", session_key)
              // wx.setStorage({ key: 'unionid', data: unionid})
              // wx.setStorage({ key: 'session_key', data: session_key })
              if (nickname) {
                _this.globalData.userInfo = { nickname, image, phone };
              }
              login_res({ unionid, session_key, nickname, image, phone,openid })
            }
            else
              wx.showToast({
                title: '获取用户信息超时',
                icon: 'none'
              })
            // wx.setStorageSync('invite', data.share_code)
          })
        }
      })
    }))
  },
  globalData: {
    userInfo: null,
    session_key: null,
    city: null,
    position: null,
    range: null
  },
  initUtil() {
    // padStart()方法的polyfill
    if (!String.prototype.padStart) {
      String.prototype.padStart = function (targetLength, padString) {
        // 截断数字或将非数字转换为0
        targetLength = targetLength >> 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '))
        if (this.length > targetLength || padString === '') {
          return String(this);
        }
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          // 添加到初始值以确保长度足够
          padString += padString.repeat(targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(this);
      };
    }
  },
  // getSystemInfo 貌似是同步方法，
  // 因为它总是在其他页面onLoad之前已经返回
  checkDevice: function () {
    const self = this
    wx.getSystemInfo({
      success: function (res) {
        let { screenWidth, screenHeight, platform, model, statusBarHeight, } = res;
        self.globalData.screenWidth = screenWidth
        self.globalData.screenHeight = screenHeight
        let totalTopHeight = 68
        if (platform == 'android') {
          self.globalData.topHeight = self.hObj['android']
          self.globalData.device = 'android'
        }
        else {
          totalTopHeight = 64
          self.globalData.topHeight = self.hObj['ipn']
          self.globalData.device = 'ipn'
        }

        // 根据 model 进行判断
        if (model.search('iPhone X') != -1) {
          self.globalData.topHeight = self.hObj['ipx']
          self.globalData.bottomM = 34
          self.globalData.device = 'ipx'
          totalTopHeight = 88
        }
        self.config.statusBarHeight = statusBarHeight
        self.config.titleBarHeight = totalTopHeight - statusBarHeight
      }
    })
  },
  config: {
    // 自定义header ↓
    titleBarHeight: 0,
    statusBarHeight: 0
    // 自定义header ↑
  },
  checkUpdate() {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log('versionBack==>', res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })

    })

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  }
})