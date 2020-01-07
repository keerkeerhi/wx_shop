//app.js
import indexsev from '/service/indexsev.js'
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
    
    // topHeight  device
    this.hObj = { 'ipx': 88, 'android': 45, 'ipn': 65 }
    // 判断设备是否为 iPhone X
    this.checkDevice()
  },
  onShow() {
    this.checkUpdate()
  },
  loginFun() {
    let _this = this
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
          if (res.code==0)
          {
            let { session_key, nickname, image, phone } = res.data;
            this.globalData.session_key = session_key;
            if (nickname) {
              this.globalData.userInfo = { nickname, image, phone };
              if (this.globalData.backFun)
                this.globalData.backFun()
            }
          }
          else
            wx.showToast({
              title: '获取用户信息超时',
              icon:'none'
            })
          // wx.setStorageSync('invite', data.share_code)
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    session_key: null,
    city: null
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