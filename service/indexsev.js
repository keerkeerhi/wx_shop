import {base_url} from './baseconfig.js'

// -------------基本接口
// 登录操作
const login_url = base_url + 'xuser-info/';
// 上传图片
const upload_file = base_url + 'base/upload_file/'
// 更新用户信息
const updateUser = base_url + 'decrypt/';
// 所有美食
const food = base_url + 'food/';
// 所有百货
const department = base_url + 'department/'
// 所有汽车用品
const car = base_url + 'car/'
// 所有服饰
const apparel = base_url + 'apparel/'
// 首页推荐
const home = base_url + 'home/'
// 商品详情
const com_details = base_url + 'com-details/'
// 创建订单
const create_order = base_url + 'create-order/'
// 消费者我的订单
const my_order = base_url + 'my-order/'
// 附近商家
const nearby_shop = base_url + 'nearby-shop/'
// 搜索
const search = base_url + 'search/'
// 猜你喜欢
const user_like = base_url + 'user-like/'
// 店铺详情
const shop_detail = base_url + 'shop-details/'
// 广告banner
const home_img = base_url + 'home-img/'
// 商品标签
const label_mgt = base_url + 'label-mgt/'
// 根据标签获取商品
const get_shop_commodity = base_url + 'get-shop-commodity/'
// 商品详情
const goods_details = base_url + 'com-details/'
// 订单详情
const order_detail = base_url + 'order-details/'
// 更新订单
const edit_order = base_url + 'edit-order/'
// 支付
const pay = base_url + 'pay/'
// 我的订单
const my_order = base_url + 'my-order/'
module.exports = {
  my_order(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: my_order,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  pay(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: pay,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  edit_order(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: edit_order,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  order_detail(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: order_detail,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  goods_details(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: goods_details,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  get_shop_commodity(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: get_shop_commodity,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  label_mgt(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: label_mgt,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  home_img(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: home_img,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  shop_detail(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: shop_detail,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  user_like(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: user_like,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  search(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: search,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  nearby_shop(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: nearby_shop,
        method: "GET",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  my_order(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: my_order,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  create_order(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: create_order,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  com_details(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: com_details,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  home(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: home,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  getApparel(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: apparel,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  getCar(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: car,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  department(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: department,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  getFood(data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: food,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  login(data){
    return new Promise((resolve, reject)=>{
      wx.request({
        url: login_url,
        method: "GET",
        data,
        success(res){
          resolve(res.data)
        },
        fail(res){
          reject(res)
        }
      })
    })
  },
  updateUser(data){
    return new Promise((resolve, reject) => {
      wx.request({
        url: updateUser,
        method: "POST",
        data,
        success(res) {
          resolve(res.data)
        },
        fail(res) {
          reject(res)
        }
      })
    })
  },
  upload_file(openid, localId) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: upload_file,
        filePath: localId,
        name: 'image',
        formData: {openid},
        success: function (result) {
          let res = JSON.parse(result.data)
          resolve(res)
        },
        fail(e) {
          reject(rej)
        }
      })
    })
  }
} 