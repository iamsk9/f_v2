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
    var offerName = 'offers/';
    var selected = [];
    var id;

    function getUrl() {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    function getOfferUrl() {
      return Backand.getApiUrl() + baseUrl + offerName;
    }

    saveId = function(data){
      id = data;
      console.log(id);
    };

    loginingOut = function(){
      selected = [];
    };

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

    getOffers = function(id){
      return $http.get(getOfferUrl());
    };

    getSavedItems = function(){
      console.log(savedItems);
      return savedItems;
    };

    function getOrderUrl(objectName) {
      return Backand.getApiUrl() + baseUrl + objectName;
    }

    placeOrder = function(data, item){
      data.user_id = id;
      data.cost = item.cost;
      data.quantity = item.quantity;
      data.status = 0;
      console.log(item.item_id);
      data.item_id = item.item_id;
      console.log(data);
      console.log(data.item_id);
      return $http.post(getOrderUrl('orders/'), data);
  };

  getSelectedItems = function(cat_id){
  var i;
  var data = [];
  for(i=0;i<selected.length;i++){
    data = data.concat($filter('filter')(savedItems, {id:selected[i],cat_id:cat_id}));
  }
  console.log(savedItems);
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
      saveId: saveId,
      loginingOut:loginingOut,
      placeOrder: placeOrder,
      getOffers:getOffers,
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

  logining = function (data) {
    return $http({
            method: 'GET',
            url: getUrl(),
            params: {
                filter: JSON.stringify([
                  {fieldName: "email", operator: "equals", value: data.email}
                ])
            }
        }).then(function (response) {
          console.log(response);
            if (response.data && response.data.data && response.data.data.length == 1){
              console.log(response.data.data[0].id);
                return response.data.data[0];
            }
        });
  };

  return {
    addUser: addUser,
    logining: logining
  };
})
.service('validateService', function ($rootScope, $q, $ionicPopup) {
  function emailValidate(name){
         pattern = /^[a-z0-9_.]+@[a-z]+.[a-z]+$/i;
         if (!pattern.test(name) || name==null) {
           var invaliPopup = $ionicPopup.alert({
             title: 'OOPS!',
             template: 'Invalid Email'
           });
           return false;
         }
         return true;
       }
       return{
         emailValidate:emailValidate
       }
});
