// component/header/header.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showHome: { // 是否显示home按钮         
      type: Boolean,
      value: false
    },

    titleBarHeight: {
      type: String,
      value: app.config.titleBarHeight,
    },

    statusBarHeight: {
      type: String,
      value: app.config.statusBarHeight,
    },

    title: {
      type: String,
      value: ''
    },

    indexPage: {
      type: String,
      value: '/pages/index/index'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBack: false
  },
  ready: function () {
    this.setData({ showBack: getCurrentPages().length > 1})
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _goBack: function () {
      wx.navigateBack({
        delta: 1
      });
    },

    _goHome: function () {
      wx.switchTab({
        url: "/pages/index/index"
      });
    },

    toIndex(){
      let url = this.properties.indexPage
      wx.reLaunch({
        url
      })
    }
  }
})