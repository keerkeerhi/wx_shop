const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
   * 附近位置最大最小经纬度计算 
   * @param   longitude  经度
   * @param   latitude   纬度
   * @param   distince    距离（千米）
   * @returns 格式：经度最小值-经度最大值-纬度最小值-纬度最大值
   */
const getMaxMinLongitudeLatitude = (longitude, latitude, distince)=>{
  let r = 6371.393;    // 地球半径千米
  let lng = longitude;
  let lat = latitude;
  let dlng = 2 * Math.asin(Math.sin(distince / (2 * r)) / Math.cos(lat * Math.PI / 180));
  dlng = dlng * 180 / Math.PI;
  let dlat = distince / r;
  dlat = dlat * 180 / Math.PI;
  let minlat = lat - dlat;
  let maxlat = lat + dlat;
  let minlng = lng - dlng;
  let maxlng = lng + dlng;
  return { minlat, maxlat, minlng , maxlng};
}

const fPromise = fn => obj => {
  return new Promise((resolve, reject) => {
    obj.complete = obj.success = res => {
      resolve(res)
    }
    obj.fail = err => {
      reject(err)
    }
    fn(obj);
  })
}

// goods = { id: '', price: '', num: '' }
const addCart = (shopId,goods,callBack)=>{
  wx.getStorage({
    key: 'shopCar',
    success (res) {
      let data = res.data
      let carObj;
      if (data)
        carObj = data
      else
        carObj = Object.create(null)
      let list;
      if (shopId in carObj)
        list = carObj[shopId]
      else
      {
        list = []
        carObj[shopId] = list;
      }
      list.push(goods)
      wx.setStorage({
        data: carObj,
        key: 'shopCar',
        success(res) {
          callBack(res)
        }
      })
    }
  })
}

function arrayIndex(list, val, key) {
  for (var i = 0; i < list.length; i++) {
    if (list[i][key] == val[key])
      return i;
  }
  return -1;
}
function arrayRemove(list, item, key) {
  var index = arrayIndex(list, item, key);
  if (index > -1) {
    list.splice(index, 1);
  }
}
const delCart = (shopId,goodsId,callBack)=>{
  wx.getStorage({
    key: 'shopCar',
    success (res) {
      let carObj = res.data
      let list = carObj[shopId]
      arrayRemove(list,{'id':goodsId},'id')
      wx.setStorage({
        data: carObj,
        key: 'shopCar',
        success(res) {
          callBack(res)
        }
      })
    }
  })
}

module.exports = {
  formatTime,
  getMaxMinLongitudeLatitude,
  fPromise,addCart,delCart
}
