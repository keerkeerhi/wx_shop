const promiseList = {};
module.exports = {
  putData: function (pageName, data) {
    promiseList[pageName] = data;
  },
  getData: function (pageName) {
    return promiseList[pageName];
  },
  delData: function (pageName) {
    delete promiseList[pageName];
  }
}