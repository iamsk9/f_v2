angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $ionicNavBarDelegate,Backand, $http, $rootScope, $ionicPopup) {

  var vm = this;
  vm.doLogin  = doLogin;
  vm.goToRegister = goToRegister;

  function goToRegister(){
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.register');
  }

  function doLogin() {
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.categories');
  }
})
.controller('CategoryCtrl', function($scope, itemsService, $state, $ionicNavBarDelegate, $rootScope) {
  $scope.categories = [
    { image: 'img/p1.jpg', name: 'Fruits',id: 1 },
    { image: 'img/p2.jpg', name: 'Vegetables',id: 2 }
  ];
  $scope.selectCategory = function(id){
  itemsService.saveCategory(id);
  $state.go('app.menu_items');
  $rootScope.my_cat = id;
  console.log($rootScope.my_cat);
  $ionicNavBarDelegate.showBackButton(false);
};
})
.controller('RegisterCtrl', function($scope, $state, $ionicNavBarDelegate) {
  $scope.doSignUp = function() {
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.login');
  };

  $scope.goToLogin = function(){
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.register');
  };
})
.controller('MenuCtrl', function($scope, $ionicPopup, $rootScope, itemsService, $state, $ionicNavBarDelegate) {
  $scope.list_items = [
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f1.jpg',item_name:'Apple',id:1,item_id:'1',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f2.jpg',item_name:'Oranges',id:2,item_id:'2',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f3.jpg',item_name:'Watermelon',id:3,item_id:'3',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f4.jpg',item_name:'Banana',id:4,item_id:'4',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f5.jpg',item_name:'Strawberry',id:5,item_id:'5',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f6.jpg',item_name:'Pine Apple',id:6,item_id:'6',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f7.jpg',item_name:'Grapes',id:7,item_id:'7',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f8.jpg',item_name:'Guava',id:8,item_id:'8',cost:20,rating:4.5,qcost:20,quantity:1}
    ];

  itemsService.saveItems($scope.list_items);
    $scope.clicked = function (id) {
      itemsService.selectedItem(id);
    };

    $scope.place_order = function () {
      $ionicNavBarDelegate.showBackButton(false);
      $state.go('app.checkout');
    };
})
.controller('CheckoutCtrl', function($scope, Backand, $http, $ionicPopup, $state,itemsService, $ionicNavBarDelegate) {

  function getCost(){
    $scope.cart_items = itemsService.getSelectedItems();
    var sum = 0;
    for(i=0;i<$scope.cart_items.length;i++)
      sum = sum + parseInt($scope.cart_items[i].cost);
    $scope.total = sum;
  }

  $scope.$on('$ionicView.enter', function(){
    getCost();
  });

  $scope.proceed_payment = function(){
    $state.go('app.checkout');
  };

  $scope.clicked = function (id) {
    itemsService.selectedItem(id);
    console.log(id);
    getCost();
  };

  $scope.increment = function(object){
    object.quantity = object.quantity + 1;
    object.qcost = object.qcost + object.cost;
    $scope.total = $scope.total + object.cost;
  };

  $scope.decrement = function(object){
    object.quantity = object.quantity - 1;
    object.qcost = object.qcost - object.cost;
    $scope.total = $scope.total - object.cost;
  };

  $scope.proceed_payment = function(){
    console.log($scope.cart_items);
  }
})
.controller('OrderCtrl', function($scope, Backand, $http, $ionicPopup, $state, $location) {
  $scope.order = function(){
    console.log($scope.object);
  };
});
