angular.module('starter.services', [])

.service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
  })

  .service('itemsService', function ($http, Backand, $filter) {

    var savedCategory;
    var savedItems = [];
    var baseUrl = '/1/objects/';
    var objectName = 'items/';
    var selected = [];

    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    saveCategory = function (data) {
      savedCategory = data;
    };

    getSavedCategory = function(){
      return savedCategory;
    };

    saveItems = function (data) {
      savedItems = data;
      console.log(data);
    };

    getItems = function(id){
      return $http.get(getUrl());
    };

    getSavedItems = function(){
      console.log(savedItems);
      return savedItems;
    };

    getSelectedItems = function(){
      var i;
      var data = [];
      for(i=0;i<selected.length;i++){
        data = data.concat($filter('filter')(savedItems, {id:selected[i]}));
      }
      console.log(savedItems);
      console.log(selected);
      console.log(data);
      return data;
    };

    selectedItem = function (id) {
      var index = selected.indexOf(id);
      if (index > -1)
          selected.splice(index, 1);
      else
          selected.push(id);
      console.log(selected);
    };

    return {
      saveCategory: saveCategory,
      saveItems: saveItems,
      getSavedCategory: getSavedCategory,
      getItems: getItems,
      getSelectedItems: getSelectedItems,
      selectedItem: selectedItem,
      getSavedItems: getSavedItems
    };
})
.service('LoginService', function ($http, Backand) {
  var self = this,
  baseUrl = '/1/objects/',
  objectName = 'user/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + objectName;
  }

  function getUrlForId(id) {
    return getUrl() + id;
  }

  addUser = function (data) {
    console.log(data);
    return $http.post(getUrl(), data);
  };

  return {
    addUser: addUser,
  };
});
