angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,LoginService, $cordovaGeolocation, itemsService, validateService, $ionicModal, $timeout, $state, $ionicNavBarDelegate,Backand, $http, $rootScope, $ionicPopup) {

  var vm = this;
  vm.doLogin  = doLogin;
  vm.goToRegister = goToRegister;
  vm.logout = logout;

  /*$rootScope.isLogin = false;
  $rootScope.isInitial = true;*/

  $rootScope.isLogin = true;
  $rootScope.isInitial = false;

  function goToRegister(){
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.register');
  }

  function logout(){
    $rootScope.isLogin = false;
    $rootScope.isInitial = true;
    $rootScope.checkcart = false;
    itemsService.loginingOut();
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.login');
  }


  function doLogin() {
    /*
  if (validateService.emailValidate(vm.loginData.email)) {
    LoginService.logining(vm.loginData)
    .then(function(result){
      if(result!=null){
      $rootScope.isLogin = true;
      $rootScope.isInitial = false;
      if(vm.loginData.password == result.password){
        itemsService.saveId(result.id);
      var alertPopup = $ionicPopup.alert({
        title: 'Welcome!',
        template: 'Thank You for Logining In...'
      });
      vm.loginData.email = '';
      vm.loginData.password = '';
      $ionicNavBarDelegate.showBackButton(false);
      $state.go('app.categories');
    }else {
      invaliPopup = $ionicPopup.alert({
        title: 'OOPS!',
        template: 'Invalid Email Id or Password'
      });
    }
    }else{
      invaliPopup = $ionicPopup.alert({
        title: 'OOPS!',
        template: 'Invalid Emaid Id or Password'
      });
    }
  });*/
  $rootScope.isLogin = true;
  $rootScope.isInitial = false;
  $ionicNavBarDelegate.showBackButton(false);
  $state.go('app.categories');
//}
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

  $scope.moveToCart = function(){
    $state.go('checkout');
    $ionicNavBarDelegate.showBackButton(false);
  };
})
.controller('RegisterCtrl', function($scope, $state, $ionicNavBarDelegate, LoginService, $ionicPopup) {
  $scope.loginData = {};
  $scope.doSignUp = function(){
    console.log($scope.loginData.fullname);
    LoginService.addUser($scope.loginData)
    .then(function (result){
      var alertPopup = $ionicPopup.alert({
            title: 'Welcome!',
            template: 'Thank You for signing up...'
          });
    });
    $state.go('app.login');
    $ionicNavBarDelegate.showBackButton(false);
  };

  $scope.goToLogin = function(){
    $ionicNavBarDelegate.showBackButton(false);
    $state.go('app.register');
  };
})
.controller('MenuCtrl', function($scope, $ionicPopup, $rootScope, itemsService, $state, $ionicNavBarDelegate) {
  /*$scope.list_items = [
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f1.jpg',item_name:'Apple',id:1,item_id:'1',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f2.jpg',item_name:'Oranges',id:2,item_id:'2',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f3.jpg',item_name:'Watermelon',id:3,item_id:'3',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f4.jpg',item_name:'Banana',id:4,item_id:'4',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f5.jpg',item_name:'Strawberry',id:5,item_id:'5',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f6.jpg',item_name:'Pine Apple',id:6,item_id:'6',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f7.jpg',item_name:'Grapes',id:7,item_id:'7',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f8.jpg',item_name:'Guava',id:8,item_id:'8',cost:20,rating:4.5,qcost:20,quantity:1}
    ];*/

    $rootScope.checkcart = false;

    itemsService.getItems()
    .then(function(result){
      $scope.list_items = result.data.data;
      itemsService.saveItems(result.data.data);
    });

    $scope.clicked = function (id) {
      console.log(id);
      itemsService.selectedItem(id);
    };

    $scope.place_order = function () {
      $ionicNavBarDelegate.showBackButton(false);
      $state.go('app.checkout');
    };
})
.controller('CheckoutCtrl', function($scope, Backand, $http, $rootScope, $ionicPopup, $state,itemsService, $ionicNavBarDelegate, $timeout) {

  function getCost(){
    $scope.cart_items = itemsService.getSelectedItems();
    console.log($scope.cart_items);
    var sum = 0;
    for(i=0;i<$scope.cart_items.length;i++)
      sum = sum + parseInt($scope.cart_items[i].cost);
    $scope.total = sum;
  }

  $scope.$on('$ionicView.enter', function(){
    getCost();
  });

  $scope.proceed_payment = function(){
    if($scope.total==0){
      var alertPopup = $ionicPopup.alert({
        title: 'Sorry',
        template: 'Buy something to proceed for payment'
      });
      $ionicNavBarDelegate.showBackButton(false);
      $state.go('app.categories');
    }else {
      $ionicNavBarDelegate.showBackButton(false);
      $state.go('app.order');
    }
  };

  $scope.clicked = function (id) {
    itemsService.selectedItem(id);
    console.log(id);
    getCost();
  };

  $scope.increment = function(object){
    object.quantity = object.quantity + 1;
    object.qcost = parseInt(object.qcost) + parseInt(object.cost);
    $scope.total = $scope.total + parseInt(object.cost);
  };

  $scope.decrement = function(object){
    if (object.quantity-1!=0) {
      object.quantity = object.quantity - 1;
      object.qcost = parseInt(object.qcost) - parseInt(object.cost);
      $scope.total = $scope.total - parseInt(object.cost);
    }
    else {
      var alertPopup = $ionicPopup.alert({
       title: 'OOPS',
       template: "Quantity cannot be negative"
     });
    }
  };
  $scope.object = {};
  $scope.order = function(){
    /*
    for(i=0;i<$scope.cart_items.length;i++){
      console.log($scope.cart_items[i]);
      itemsService.placeOrder($scope.object, $scope.cart_items[i])
      .then(function(){
        console.log("placed");
      });
    }*/
   var confirmPopup = $ionicPopup.confirm({
     title: 'Note',
     template: 'Your order cannot be cancelled once you click the ok option'
   });

   confirmPopup.then(function(res) {
     if(res) {
       var alertPopup = $ionicPopup.alert({
        title: 'Thank You...',
        template: "Your Order has been placed.<br>Get Ready to enjoy."
      });
      $rootScope.checkcart = false;
      itemsService.loginingOut();
      $state.go('app.categories');
      $ionicNavBarDelegate.showBackButton(false);
     } else {
       $state.go('app.checkout');
       $ionicNavBarDelegate.showBackButton(false);
     }
   });
  };
})
.controller('OffersCtrl', function($scope, $ionicPopup, $rootScope, itemsService, $state, $ionicNavBarDelegate) {
  $scope.offers = [
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f1.jpg',item_name:'Apple',id:1,item_id:'1',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f2.jpg',item_name:'Oranges',id:2,item_id:'2',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f3.jpg',item_name:'Watermelon',id:3,item_id:'3',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f4.jpg',item_name:'Banana',id:4,item_id:'4',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f5.jpg',item_name:'Strawberry',id:5,item_id:'5',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f6.jpg',item_name:'Pine Apple',id:6,item_id:'6',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f7.jpg',item_name:'Grapes',id:7,item_id:'7',cost:20,rating:4.5,qcost:20,quantity:1},
      {cat_id:'1',filename:'https://files.backand.io/freshwordl/f8.jpg',item_name:'Guava',id:8,item_id:'8',cost:20,rating:4.5,qcost:20,quantity:1}
    ];
    /*
    itemsService.getOffers()
    .then(function(result){
      $scope.offers = result.data.data;
//      itemsService.saveItems(result.data.data);
    });*/
});
