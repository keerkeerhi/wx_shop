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

module.exports = {
  formatTime,
  getMaxMinLongitudeLatitude
}
