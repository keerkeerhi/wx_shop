import {base_url} from './baseconfig.js'

// -------------基本接口
// 登录操作
const login_url = base_url + 'xuser-info/';
// 上传图片
const upload_file = base_url + 'base/upload_file/'

module.exports = {
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